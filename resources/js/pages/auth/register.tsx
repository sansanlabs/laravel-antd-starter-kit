import AuthLayout from "@/layouts/auth-layout";
import { __ } from "@/lib/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { App, Button, Divider, Form, Input, Typography } from "antd";
import { useState } from "react";

type RegisterFormType = {
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { locale } = usePage().props;
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
        message.error("Failed");
        const errorFields = ["email", "password", "password_confirmation"];
        const errorsArray = errorFields
          .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
          .filter((item) => item !== null);
        formRegister.setFields(errorsArray);
        formRegister.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout title="Create an account" description="Enter your details below to create your account">
      <Head title="Register" />

      <Form layout="vertical" form={formRegister} onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: __(locale, "validation.required", { attribute: "name" }) }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: __(locale, "validation.required", { attribute: "email" }) },
            { type: "email", message: __(locale, "validation.email", { attribute: "email" }) },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: __(locale, "validation.required", { attribute: "password" }) }]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item
          label="Password confirmation"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", { attribute: "password confirmation" }),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(__(locale, "validation.confirmed", { attribute: "password confirmation" }))
                );
              },
            }),
          ]}
        >
          <Input.Password allowClear />
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          Register
        </Button>
      </Form>

      <Divider plain>Or register with</Divider>
      <Button type="primary" block>
        Register using selnajaya email
      </Button>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        Already have an account? <Link href={route("login")}>Login here</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
