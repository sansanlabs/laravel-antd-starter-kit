import AuthLayout from "@/layouts/auth-layout";
import { Head, Link, router } from "@inertiajs/react";
import { App, Button, Form, Input, Typography } from "antd";
import { useState } from "react";

type ForgotPasswordFormType = {
  email: string;
};

export default function ForgotPassword() {
  const { message, notification } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formForgotPassword] = Form.useForm();

  const onFinish = (values: ForgotPasswordFormType) => {
    router.post(route("password.email"), values, {
      onStart: () => {
        notification.destroy();
        setIsProcessing(true);
      },
      onSuccess: ({ props }) => {
        const { status } = props;
        notification.info({
          placement: "top",
          message: "Info",
          description: status as React.ReactNode,
          duration: 0,
        });
        formForgotPassword.resetFields();
      },
      onError: () => {
        message.error("Failed");
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
      <Head title="Forgot password" />

      <Form layout="vertical" form={formForgotPassword} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }, { type: "email" }]}>
          <Input allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          Email password reset link
        </Button>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        Or, return to <Link href={route("login")}>login</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
