import AuthLayout from "@/layouts/auth-layout";
import { Head, router } from "@inertiajs/react";
import { App, Button, Form, Input } from "antd";
import { useState } from "react";

type ConfirmPasswordFormType = {
  email: string;
};

export default function ConfirmPassword() {
  const { message } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formConfirmPassword] = Form.useForm();

  const onFinish = (values: ConfirmPasswordFormType) => {
    router.post(route("password.confirm"), values, {
      onStart: () => {
        setIsProcessing(true);
      },
      onError: (errors) => {
        message.error("Failed");
        const errorFields = ["password"];
        const errorsArray = errorFields
          .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
          .filter((item) => item !== null);
        formConfirmPassword.setFields(errorsArray);
        formConfirmPassword.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title="Confirm your password"
      description="This is a secure area of the application. Please confirm your password before continuing."
    >
      <Head title="Confirm password" />

      <Form layout="vertical" form={formConfirmPassword} onFinish={onFinish}>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          Confirm password
        </Button>
      </Form>
    </AuthLayout>
  );
}
