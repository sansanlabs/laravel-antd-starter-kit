import AuthLayout from "@/layouts/auth-layout";
import { __ } from "@/lib/utils";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { App, Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";

type LoginFormType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const { locale } = usePage().props;
  const { message } = App.useApp();

  console.log(locale);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formLogin] = Form.useForm();

  const onFinish = (values: LoginFormType) => {
    router.post(route("login"), values, {
      onStart: () => {
        setIsProcessing(true);
      },
      onSuccess: () => {
        formLogin.resetFields();
      },
      onError: (errors) => {
        message.error("Failed");
        const errorFields = ["email", "password"];
        const errorsArray = errorFields
          .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
          .filter((item) => item !== null);
        formLogin.setFields(errorsArray);
        formLogin.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
      <Head title="Log in" />

      <Form layout="vertical" form={formLogin} onFinish={onFinish}>
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
          label={
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <span>Password</span>
              <Link href={route("password.request")} style={{ marginRight: -14, fontWeight: "normal" }}>
                Forgot password ?
              </Link>
            </Flex>
          }
          name="password"
          rules={[{ required: true, message: __(locale, "validation.required", { attribute: "password" }) }]}
        >
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Flex style={{ marginTop: -10 }}>
          <Button block type="primary" htmlType="submit" loading={isProcessing}>
            Login
          </Button>
        </Flex>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        Don't have an account? <Link href={route("register")}>Sign up here</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
