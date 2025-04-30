import DashboardLayout from "@/layouts/dashboard-layout";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Flex } from "antd";

import FormRole from "./partials/form-role";

type CreateType = {
  allPermissions: {
    name: "string";
    options: {
      id: string;
      name: string;
      description: string;
    }[];
  }[];
};

export default function Create({ allPermissions }: CreateType) {
  const { locale } = usePage<SharedData>().props;

  return (
    <DashboardLayout
      title={__(locale, "lang.create_role")}
      breadcrumb={[
        {
          title: __(locale, "lang.roles"),
          url: route("roles.index"),
        },
        {
          title: __(locale, "lang.create_role"),
        },
      ]}
      activeMenu="roles"
    >
      <Flex vertical gap={16} style={{ maxWidth: "48rem" }}>
        <FormRole permissions={allPermissions} />
      </Flex>
    </DashboardLayout>
  );
}
