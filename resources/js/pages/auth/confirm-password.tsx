import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Flex, Form, Input } from "antd";
import { useState } from "react";

type ConfirmPasswordFormType = {
  email: string;
};

export default function ConfirmPassword() {
  const { locale } = usePage<SharedData>().props;
  const { modal, message } = App.useApp();

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

  const onLogout = () => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      okText: __(locale, "auth.logout"),
      okButtonProps: { danger: true },
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });

        return new Promise((resolve) => {
          router.post(
            route("logout"),
            {},
            {
              onSuccess: () => {
                message.success(__(locale, "message.success"));
              },
              onError: () => {
                message.error(__(locale, "message.error_server"));
              },
              onFinish: resolve,
            }
          );
        });
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

        <Flex justify="center">
          <Button type="link" style={{ marginBlock: 8 }} onClick={onLogout}>
            {__(locale, "auth.logout")}
          </Button>
        </Flex>
      </Form>
    </AuthLayout>
  );
}
