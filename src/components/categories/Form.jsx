import { Drawer, Form, Input } from "antd";

// Hooks
import { useCreateCategory } from "./../../hooks/categories/useCreateCategory";
import { useUpdateCategory } from "./../../hooks/categories/useUpdateCategory";

// Custom Components
import AntForm from "./../custom/AntForm";

export default function CategoriesForm({
  form,
  open,
  setOpen,
  selectedCategory,
  setSelectedCategory,
}) {
  // Hooks
  const { mutate: createCategory, isPending } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  // Reset
  const resetHandle = () => {
    setOpen(false);
    setSelectedCategory({});
    form.resetFields();
  };

  return (
    <Drawer open={open} onClose={resetHandle}>
      <AntForm
        form={form}
        name="categoriesForm"
        onFinish={(values) => {
          selectedCategory.id == null
            ? createCategory(values, {
                onSuccess: () => {
                  resetHandle();
                },
              })
            : updateCategory(
                {
                  id: selectedCategory.id,
                  categoryData: values,
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
          label="Kategori Adı"
          name="name"
          rules={[
            { required: true, message: "Lütfen kategori adını girin!" },
            {
              max: 255,
              message: "Kategori adı en fazla 255 karakter olabilir!",
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Kategori adını girin"
            showCount
            maxLength={255}
          />
        </Form.Item>
        <Form.Item
          label="Açıklama"
          name="description"
          rules={[
            { required: true, message: "Lütfen açıklama girin!" },
            { max: 1000, message: "Açıklama en fazla 500 karakter olabilir!" },
          ]}
        >
          <Input.TextArea
            size="large"
            placeholder="Açıklama girin"
            showCount
            maxLength={1000}
            rows={4}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
      </AntForm>
    </Drawer>
  );
}
