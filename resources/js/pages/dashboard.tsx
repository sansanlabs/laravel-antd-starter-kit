import DashboardLayout from "@/layouts/dashboard-layout";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Button, Flex, Table } from "antd";
import { LuPlus } from "react-icons/lu";

export default function Dashboard() {
  const { locale } = usePage<SharedData>().props;

  return (
    <DashboardLayout title={__(locale, "lang.dashboard")}>
      <Table bordered />
    </DashboardLayout>
  );
}
