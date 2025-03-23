import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
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
  const { locale } = usePage<SharedData>().props;
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
        message.success(__(locale, "message.success"));
        formResetPassword.resetFields();
      },
      onError: (errors) => {
        handleFormErrorMessages(errors, message, formResetPassword);
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title={__(locale, "auth.reset_password")}
      titlePage={__(locale, "auth.reset_password_title_page")}
      descriptionPage={__(locale, "auth.please_enter_your_new_password_below")}
    >
      <Form layout="vertical" form={formResetPassword} onFinish={onFinish}>
        <Form.Item label={__(locale, "lang.email")} name="email" rules={[{ required: true }]} initialValue={email}>
          <Input allowClear readOnly />
        </Form.Item>

        <Form.Item
          label={__(locale, "lang.password")}
          name="password"
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", { attribute: __(locale, "lang.password").toLowerCase() }),
            },
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          label={__(locale, "lang.password_confirmation")}
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", {
                attribute: __(locale, "lang.password_confirmation").toLowerCase(),
              }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    __(locale, "validation.confirmed", {
                      attribute: __(locale, "lang.password_confirmation").toLowerCase(),
                    })
                  )
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          {__(locale, "auth.reset_password")}
        </Button>
      </Form>
    </AuthLayout>
  );
}
