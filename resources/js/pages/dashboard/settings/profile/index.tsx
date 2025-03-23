import MenuSetting from "@/components/menu-setting";
import SectionRequired from "@/components/section-required";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Flex, Form, Input, Typography } from "antd";

type ProfileFormType = {
  name: string;
  email: string;
};

export default function Index() {
  const {
    locale,
    auth: { user: authUser },
  } = usePage<SharedData>().props;
  const { modal, message } = App.useApp();

  const [formProfile] = Form.useForm();

  const onReset = () => {
    formProfile.resetFields();
  };

  const onSave = (values: ProfileFormType) => {
    const isEmailChange = authUser.email !== values.email;
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: isEmailChange ? (
        <>
          <Typography.Paragraph>{__(locale, "lang.confirm_email_change")}</Typography.Paragraph>
          <Typography.Paragraph>{__(locale, "modal_confirm.desc")}</Typography.Paragraph>
        </>
      ) : (
        __(locale, "modal_confirm.desc")
      ),
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });
        return new Promise((resolve) => {
          router.put(route("profile.update"), values, {
            onSuccess: () => {
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              handleFormErrorMessages(errors, message, formProfile);
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  return (
    <DashboardLayout title={__(locale, "lang.profile")} submenus={MenuSetting()}>
      <Form
        layout="vertical"
        form={formProfile}
        initialValues={{
          name: authUser.name,
          email: authUser.email,
        }}
        onFinish={onSave}
        style={{ maxWidth: "40rem", width: "100%" }}
      >
        <SectionRequired />

        <Form.Item
          label={__(locale, "lang.name")}
          name="name"
          rules={[{ required: true, message: __(locale, "validation.required", { attribute: "name" }) }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={__(locale, "lang.email")}
          name="email"
          rules={[
            { required: true, message: __(locale, "validation.required", { attribute: "email" }) },
            { type: "email", message: __(locale, "validation.email", { attribute: "email" }) },
          ]}
        >
          <Input />
        </Form.Item>

        <Flex gap={8} justify="end">
          <Button onClick={onReset}>{__(locale, "lang.reset")}</Button>
          <Button htmlType="submit" type="primary">
            {__(locale, "lang.save")}
          </Button>
        </Flex>
      </Form>
    </DashboardLayout>
  );
}
