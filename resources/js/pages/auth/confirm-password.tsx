import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Form, Input } from "antd";
import { useState } from "react";

type ConfirmPasswordFormType = {
  email: string;
};

export default function ConfirmPassword() {
  const { locale } = usePage<SharedData>().props;
  const { message } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formConfirmPassword] = Form.useForm();

  const onFinish = (values: ConfirmPasswordFormType) => {
    router.post(route("password.confirm"), values, {
      onStart: () => {
        setIsProcessing(true);
      },
      onError: (errors) => {
        handleFormErrorMessages(errors, message, formConfirmPassword);
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title={__(locale, "auth.confirm_password")}
      titlePage={__(locale, "auth.confirm_password_title_page")}
      descriptionPage={__(locale, "auth.confirm_password_desc_page")}
    >
      <Form layout="vertical" form={formConfirmPassword} onFinish={onFinish}>
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

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          {__(locale, "auth.confirm_password")}
        </Button>
      </Form>
    </AuthLayout>
  );
}
