import InnerSidebarMenuUser from "@/components/inner-sidebar-menu-setting";
import SectionRequired from "@/components/section-required";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __, handleFormErrorMessages } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Flex, Form, Input } from "antd";

type PasswordFormType = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

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

  const onSave = (values: PasswordFormType) => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });
        return new Promise((resolve) => {
          router.put(route("settings.password.update"), values, {
            onSuccess: () => {
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              handleFormErrorMessages(errors, message, formPassword);
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  return (
    <DashboardLayout
      title={__(locale, "lang.password")}
      breadcrumb={[
        {
          title: __(locale, "lang.settings"),
          url: route("settings.profile.index"),
        },
        {
          title: __(locale, "lang.password"),
        },
      ]}
      innerSidebarMenu={InnerSidebarMenuUser()}
      innerSidebarActiveMenu="password"
    >
      <Form
        layout="vertical"
        form={formPassword}
        initialValues={{
          name: authUser.name,
          email: authUser.email,
        }}
        onFinish={onSave}
        style={{ maxWidth: "40rem", width: "100%" }}
      >
        <SectionRequired />

        <Form.Item
          label={__(locale, "lang.current_password")}
          name="current_password"
          rules={[
            {
              required: true,
              message: __(locale, "validation.required", {
                attribute: __(locale, "lang.current_password").toLowerCase(),
              }),
            },
          ]}
        >
          <Input.Password allowClear />
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
