import AuthLayout from "@/layouts/auth-layout";
import { Head, router } from "@inertiajs/react";
import { App, Button, Form } from "antd";
import { useState } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
  const { message, notification } = App.useApp();

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
              message: "Info",
              description:
                "A new verification link has been sent to the email address you provided during registration." as React.ReactNode,
              duration: 0,
            });
          }
        },
        onError: () => {
          message.error("Failed");
        },
        onFinish: () => {
          setIsProcessing(false);
        },
      }
    );
  };

  return (
    <AuthLayout
      title="Verify email"
      description="Please verify your email address by clicking on the link we just emailed to you."
    >
      <Head title="Email verification" />

      {status === "verification-link-sent" && (
        <div className="mb-4 text-center text-sm font-medium text-green-600"></div>
      )}

      <Form layout="vertical" form={formVerifyEmail} onFinish={onFinish}>
        <Button block type="primary" htmlType="submit" loading={isProcessing}>
          Resend verification email
        </Button>
      </Form>

      <Button type="link" style={{ marginTop: 8 }} onClick={() => router.post(route("logout"))}>
        Logout
      </Button>
    </AuthLayout>
  );
}
