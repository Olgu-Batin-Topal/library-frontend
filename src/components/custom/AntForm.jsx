import React, { useCallback } from "react";

// Ant Design
import { Form, Button } from "antd";

// Toastify
import { toast } from "react-toastify";

function AntForm({
  form,
  name,
  onFinish,
  buttonValue = null,
  isPending = false,
  ...props
}) {
  const handleFinishFailed = useCallback(() => {
    toast.error("Form gönderimi başarısız oldu. Lütfen hataları kontrol edin.");
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      name={name}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
      {...props}
    >
      {props.children}

      <Form.Item>
        <Button
          color="green"
          variant="solid"
          htmlType="submit"
          disabled={isPending}
        >
          {buttonValue ?? "Kaydet"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default React.memo(AntForm);
