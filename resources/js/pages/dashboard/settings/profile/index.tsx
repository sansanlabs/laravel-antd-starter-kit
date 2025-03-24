import MenuSetting from "@/components/menu-setting";
import SectionRequired from "@/components/section-required";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { Alert, App, Button, Divider, Flex, Form, Input, Modal, Typography } from "antd";
import { useState } from "react";

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

  const [isModalDeleteAccountOpen, setIsModalDeleteAccountOpen] = useState(false);

  const [formProfile] = Form.useForm();
  const [formDeleteAccount] = Form.useForm();

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

  const onDelete = () => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });
        return new Promise((resolve) => {
          router.delete(route("profile.destroy"), {
            onSuccess: () => {
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              handleFormErrorMessages(errors, message, formDeleteAccount);
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  return (
    <DashboardLayout title={__(locale, "lang.profile")} submenus={MenuSetting()}>
      <Flex vertical style={{ maxWidth: "40rem", width: "100%" }} gap={16}>
        <Form
          layout="vertical"
          form={formProfile}
          initialValues={{
            name: authUser.name,
            email: authUser.email,
          }}
          onFinish={onSave}
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

        <Divider />

        <Alert
          message={__(locale, "lang.warning")}
          showIcon
          description={
            <>
              {__(locale, "lang.delete_account_desc")}
              <Flex justify="center" style={{ marginTop: 10 }}>
                <Button
                  danger
                  type="primary"
                  onClick={() => {
                    setIsModalDeleteAccountOpen(true);
                  }}
                >
                  {__(locale, "lang.delete_account")}
                </Button>
              </Flex>
            </>
          }
          type="error"
        />
      </Flex>

      <Modal
        title={__(locale, "lang.delete_account")}
        open={isModalDeleteAccountOpen}
        maskClosable={false}
        okButtonProps={{ danger: true, htmlType: "submit", form: "formDeleteAccount" }}
        okText={__(locale, "lang.delete_account")}
        onCancel={() => {
          formDeleteAccount.resetFields();
          setIsModalDeleteAccountOpen(false);
        }}
      >
        <Form layout="vertical" name="formDeleteAccount" form={formDeleteAccount} onFinish={onDelete}>
          <SectionRequired />

          <Form.Item
            label={__(locale, "lang.password")}
            name="password"
            rules={[{ required: true, message: __(locale, "validation.required", { attribute: "password" }) }]}
          >
            <Input.Password allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </DashboardLayout>
  );
}
