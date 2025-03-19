import AuthLayout from "@/layouts/auth-layout";
import { Head, router } from "@inertiajs/react";
import { App, Button, Form, Input } from "antd";
import { useState } from "react";

type ResetPasswordProps = {
  token: string;
  email: string;
};

type ResetPasswordFormType = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
  const { message } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formResetPassword] = Form.useForm();

  const onFinish = (values: ResetPasswordFormType) => {
    values.token = token;

    router.post(route("password.store"), values, {
      onStart: () => {
        setIsProcessing(true);
      },
      onSuccess: () => {
        formResetPassword.resetFields();
      },
      onError: (errors) => {
        message.error("Failed");
        const errorFields = ["email", "password", "password_confirmation"];
        const errorsArray = errorFields
          .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
          .filter((item) => item !== null);
        formResetPassword.setFields(errorsArray);
        formResetPassword.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout title="Reset password" description="Please enter your new password below">
      <Head title="Reset password" />

      <Form layout="vertical" form={formResetPassword} onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true }]} initialValue={email}>
          <Input allowClear readOnly />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="Password confirmation"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          Reset password
        </Button>
      </Form>
    </AuthLayout>
  );
}
