import {
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
} from "antd";

// Hooks
import { useCreateBook } from "./../../hooks/books/useCreateBook";
import { useUpdateBook } from "./../../hooks/books/useUpdateBook";

// Custom Components
import AntForm from "./../custom/AntForm";

// Moment
import moment from "./../../helpers/moment";

export default function BooksForm({
  authors = [],
  categories = [],
  form,
  open,
  setOpen,
  selectedBook,
  setSelectedBook,
}) {
  // Hooks
  const { mutate: createBook, isPending } = useCreateBook();
  const { mutate: updateBook } = useUpdateBook();

  // Reset
  const resetHandle = () => {
    setOpen(false);
    setSelectedBook({});
    form.resetFields();
  };

  return (
    <Drawer open={open} onClose={resetHandle}>
      <AntForm
        form={form}
        name="booksForm"
        onFinish={(values) => {
          const data = {
            ...values,
            publication_year: moment(values.publication_year).year(),
          };

          selectedBook.id == null
            ? createBook(data, {
                onSuccess: () => {
                  resetHandle();
                },
              })
            : updateBook(
                {
                  id: selectedBook.id,
                  bookData: data,
                },
                {
                  onSuccess: () => {
                    resetHandle();
                  },
                }
              );
        }}
        isPending={isPending}
      >
        <Form.Item
          label="Kitap Adı"
          name="title"
          rules={[
            { required: true, message: "Lütfen kitap adını girin!" },
            {
              max: 255,
              message: "Kitap adı en fazla 255 karakter olabilir!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Kitap adını girin"
            showCount
            maxLength={255}
          />
        </Form.Item>

        <Form.Item
          label="Yazar"
          name="author_id"
          rules={[{ required: true, message: "Lütfen yazar seçin!" }]}
        >
          <Select
            size="large"
            placeholder="Yazar seçin"
            options={authors.map((author) => ({
              label: author.name,
              value: author.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Kategori"
          name="category_id"
          rules={[{ required: true, message: "Lütfen kategori seçin!" }]}
        >
          <Select
            size="large"
            placeholder="Kategori seçin"
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="ISBN"
          name="isbn"
          rules={[{ required: true, message: "Lütfen ISBN girin!" }]}
        >
          <Input
            size="large"
            placeholder="ISBN girin"
            showCount
            minLength={13}
            maxLength={13}
          />
        </Form.Item>

        <Form.Item
          label="Yayın Yılı"
          name="publication_year"
          rules={[{ required: true, message: "Lütfen yayın yılı girin!" }]}
        >
          <DatePicker
            size="large"
            placeholder="Yayın yılı seçin"
            format="YYYY"
            picker="year"
            style={{ width: "100%" }}
            allowClear={false}
          />
        </Form.Item>

        <Form.Item
          label="Sayfa Sayısı"
          name="page_count"
          rules={[{ required: true, message: "Lütfen sayfa sayısını girin!" }]}
        >
          <InputNumber
            size="large"
            placeholder="Sayfa sayısını girin"
            min={1}
            style={{ width: "100%" }}
            controls={true}
          />
        </Form.Item>

        <Form.Item
          label="Mevcut"
          name="is_available"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch
            size="large"
            checkedChildren="Evet"
            unCheckedChildren="Hayır"
            defaultChecked={true}
          />
        </Form.Item>
      </AntForm>
    </Drawer>
  );
}
