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

  const [formProfile] = Form.useForm();

  const onReset = () => {
    formProfile.resetFields();
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
          router.put(route("profile.update"), values, {
            onSuccess: () => {
              message.destroy();
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              message.destroy();
              message.error(__(locale, "message.error"));

              const errorFields = ["name", "email"];
              const errorsArray = errorFields
                .map((field) => (errors[field] ? { name: field, errors: [errors[field]] } : null))
                .filter((item) => item !== null);
              formProfile.setFields(errorsArray);
              formProfile.scrollToField(errorsArray[0].name, { behavior: "smooth", block: "center" });
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
