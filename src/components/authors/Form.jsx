import { Drawer, Form, Input } from "antd";

// Hooks
import { useCreateAuthor } from "./../../hooks/authors/useCreateAuthor";
import { useUpdateAuthor } from "./../../hooks/authors/useUpdateAuthor";

// Custom Components
import AntForm from "./../custom/AntForm";

export default function AuthorsForm({
  form,
  open,
  setOpen,
  selectedAuthor,
  setSelectedAuthor,
}) {
  // Hooks
  const { mutate: createAuthor, isPending } = useCreateAuthor();
  const { mutate: updateAuthor } = useUpdateAuthor();

  // Reset
  const resetHandle = () => {
    setOpen(false);
    setSelectedAuthor({});
    form.resetFields();
  };

  return (
    <Drawer open={open} onClose={resetHandle}>
      <AntForm
        form={form}
        name="authorsForm"
        onFinish={(values) => {
          selectedAuthor.id == null
            ? createAuthor(values, {
                onSuccess: () => {
                  resetHandle();
                },
              })
            : updateAuthor(
                {
                  id: selectedAuthor.id,
                  authorData: values,
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
          label="Ad Soyad"
          name="name"
          rules={[
            { required: true, message: "Lütfen adınızı girin!" },
            { max: 255, message: "Ad Soyad en fazla 255 karakter olabilir!" },
          ]}
        >
          <Input
            size="large"
            placeholder="Ad Soyadınızı girin"
            showCount
            maxLength={255}
          />
        </Form.Item>
        <Form.Item
          label="E-posta"
          name="email"
          rules={[
            { required: true, message: "Lütfen e-posta adresinizi girin!" },
            { type: "email", message: "Geçerli bir e-posta adresi girin!" },
          ]}
        >
          <Input
            size="large"
            placeholder="E-posta adresinizi girin"
            showCount
            maxLength={255}
          />
        </Form.Item>
      </AntForm>
    </Drawer>
  );
}
