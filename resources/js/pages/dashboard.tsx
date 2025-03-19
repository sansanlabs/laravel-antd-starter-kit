import DashboardLayout from "@/layouts/dashboard-layout";
import { Head } from "@inertiajs/react";
import { Button, Empty, Flex } from "antd";
import { LuPlus } from "react-icons/lu";

export default function Dashboard() {
  return (
    <DashboardLayout extra={<Button icon={<LuPlus />}>Add Users</Button>}>
      <Head title="Dashboard" />

      <Flex flex={1} justify="center" align="center">
        <Empty />
      </Flex>
    </DashboardLayout>
  );
}
