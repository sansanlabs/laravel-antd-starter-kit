import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { App, Button, Form, Input, Typography } from "antd";
import { useState } from "react";

type RegisterFormType = {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { locale } = usePage<SharedData>().props;
  const { message } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formRegister] = Form.useForm();

  const onFinish = (values: RegisterFormType) => {
    router.post(route("register"), values, {
      onStart: () => {
        setIsProcessing(true);
      },
      onSuccess: () => {
        formRegister.resetFields();
      },
      onError: (errors) => {
        handleFormErrorMessages(errors, message, formRegister);
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title={__(locale, "auth.register")}
      titlePage={__(locale, "auth.register_title_page")}
      descriptionPage={__(locale, "auth.register_desc_page")}
    >
      <Head title="Register" />

      <Form layout="vertical" form={formRegister} onFinish={onFinish}>
        <Form.Item
          label={__(locale, "lang.name")}
          name="name"
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", { attribute: __(locale, "lang.name").toLowerCase() }),
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
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
          {__(locale, "auth.register")}
        </Button>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        {__(locale, "auth.already_have_an_account")}? <Link href={route("login")}>{__(locale, "auth.login_here")}</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
