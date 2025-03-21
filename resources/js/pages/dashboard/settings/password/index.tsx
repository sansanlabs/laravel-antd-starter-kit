import MenuSetting from "@/components/menu-setting";
import SectionRequired from "@/components/section-required";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Flex, Form, Input } from "antd";

export default function Index() {
  const {
    locale,
    auth: { user: authUser },
  } = usePage<SharedData>().props;
  const { modal, message } = App.useApp();

  const [formPassword] = Form.useForm();

  const onReset = () => {
    formPassword.resetFields();
  };

  const onSave = (values) => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });
        return new Promise((resolve) => {
          router.put(route("password.update"), values, {
            onSuccess: () => {
              message.destroy();
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              message.destroy();
              message.error(__(locale, "message.error"));

              const errorFields = ["current_password", "password"];
              const errorsArray = errorFields
                .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
                .filter((item) => item !== null);
              formPassword.setFields(errorsArray);
              formPassword.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  return (
    <DashboardLayout title={__(locale, "lang.password")} submenus={MenuSetting()}>
      <Form
        layout="vertical"
        form={formPassword}
        initialValues={{
          name: authUser.name,
          email: authUser.email,
        }}
        onFinish={onSave}
      >
        <SectionRequired />

        <Form.Item label="Password" name="current_password" rules={[{ required: true }]}>
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password allowClear />
        </Form.Item>

        <Form.Item
          label="Password confirmation"
          name="password_confirmation"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The new password that you entered do not match!"));
              },
            }),
          ]}
        >
          <Input.Password allowClear />
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
