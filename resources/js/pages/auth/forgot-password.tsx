import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { App, Button, Form, Input, Typography } from "antd";
import { useState } from "react";

type ForgotPasswordFormType = {
  email: string;
};

export default function ForgotPassword() {
  const { locale } = usePage<SharedData>().props;
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
          message: __(locale, "lang.info"),
          description: status as React.ReactNode,
          duration: 0,
        });
        formForgotPassword.resetFields();
      },
      onError: (errors) => {
        handleFormErrorMessages(errors, message, formForgotPassword);
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title={__(locale, "auth.forgot_password")}
      titlePage={__(locale, "auth.forgot_password_title_page")}
      descriptionPage={__(locale, "auth.forgot_password_desc_page")}
    >
      <Form layout="vertical" form={formForgotPassword} onFinish={onFinish}>
        <Form.Item
          label={__(locale, "lang.email")}
          name="email"
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", { attribute: __(locale, "lang.email").toLowerCase() }),
            },
            {
              type: "email",
              message: __(locale, "validation.email", { attribute: __(locale, "lang.email").toLowerCase() }),
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          {__(locale, "auth.email_password_reset_link")}
        </Button>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        {__(locale, "auth.or_return_to")} <Link href={route("login")}>{__(locale, "auth.login")}</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
