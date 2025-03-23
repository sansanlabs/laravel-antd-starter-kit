import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { App, Button, Checkbox, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";

type LoginFormType = {
  email: string;
  password: string;
  remember: boolean;
};

export default function Login() {
  const { locale } = usePage<SharedData>().props;
  const { message } = App.useApp();

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
        handleFormErrorMessages(errors, message, formLogin);
      },
      onFinish: () => {
        setIsProcessing(false);
      },
    });
  };

  return (
    <AuthLayout
      title={__(locale, "auth.login")}
      titlePage={__(locale, "auth.login_title_page")}
      descriptionPage={__(locale, "auth.login_desc_page")}
    >
      <Form layout="vertical" form={formLogin} onFinish={onFinish}>
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
          label={
            <Flex justify="space-between" align="center" style={{ width: "100%" }}>
              <span>{__(locale, "lang.password")}</span>
              <Link href={route("password.request")} style={{ marginRight: -14, fontWeight: "normal" }}>
                {__(locale, "auth.forgot_password")} ?
              </Link>
            </Flex>
          }
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
        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>{__(locale, "lang.remember_me")}</Checkbox>
        </Form.Item>

        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          {__(locale, "auth.login")}
        </Button>
      </Form>

      <Typography.Paragraph style={{ marginTop: 16, textAlign: "center" }}>
        {__(locale, "auth.dont_have_an_account")}?{" "}
        <Link href={route("register")}>{__(locale, "auth.sign_up_here")}</Link>
      </Typography.Paragraph>
    </AuthLayout>
  );
}
