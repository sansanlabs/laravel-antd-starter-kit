import AuthLayout from "@/layouts/auth-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Form } from "antd";
import { useState } from "react";

export default function VerifyEmail() {
  const { locale } = usePage<SharedData>().props;
  const { modal, message, notification } = App.useApp();

  const [isProcessing, setIsProcessing] = useState(false);
  const [formVerifyEmail] = Form.useForm();

  const onFinish = () => {
    router.post(
      route("verification.send"),
      {},
      {
        onStart: () => {
          notification.destroy();
          setIsProcessing(true);
        },
        onSuccess: ({ props }) => {
          const { status } = props;
          if (status === "verification-link-sent") {
            notification.info({
              placement: "top",
              message: __(locale, "lang.info"),
              description: __(locale, "auth.verify_email_status") as React.ReactNode,
              duration: 0,
            });
          }
        },
        onError: (errors) => {
          handleFormErrorMessages(errors, message, formVerifyEmail);
        },
        onFinish: () => {
          setIsProcessing(false);
        },
      }
    );
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
      title={__(locale, "auth.verify_email")}
      titlePage={__(locale, "auth.verify_email_title_page")}
      descriptionPage={__(locale, "auth.verify_email_desc_page")}
    >
      <Form layout="vertical" form={formVerifyEmail} onFinish={onFinish}>
        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          {__(locale, "auth.resend_verification_email")}
        </Button>
      </Form>

      <Button type="link" style={{ marginBlock: 8 }} onClick={onLogout}>
        {__(locale, "auth.logout")}
      </Button>
    </AuthLayout>
  );
}
