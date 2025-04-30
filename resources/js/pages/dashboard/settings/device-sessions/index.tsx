import Datatable from "@/components/datatable";
import InnerSidebarMenuUser from "@/components/inner-sidebar-menu-setting";
import InputSearchDatatable from "@/components/input-search-datatable";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __ } from "@/lib/utils";
import { QueryResultType, SessionType, SharedData, UserType } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Dropdown, TableProps, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { LuChevronDown, LuLogOut } from "react-icons/lu";
import { UAParser } from "ua-parser-js";

type IndexType = {
  user: UserType;
  queryResult: QueryResultType;
  sessionId: string;
};

export default function Index({ user, queryResult, sessionId }: IndexType) {
  const { locale } = usePage<SharedData>().props;
  const { modal, message } = App.useApp();

  queryResult.data.sort((a: SessionType, b: SessionType) => (a.id === sessionId ? -1 : b.id === sessionId ? 1 : 0));

  const onLogoutSelectedDevice = (id: string) => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      cancelButtonProps: { disabled: false },
      okButtonProps: { danger: true },
      onOk: () => {
        return new Promise((resolve) => {
          router.delete(route("settings.device-sessions.destroy", { user: user.id, deviceSession: id }), {
            onStart: () => {
              modalConfirm.update({ cancelButtonProps: { disabled: true } });
            },
            onSuccess: () => {
              message.destroy();
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              message.destroy();
              message.error(errors.error_server);
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  const onLogoutAllDevice = () => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      cancelButtonProps: { disabled: false },
      okButtonProps: { danger: true },
      onOk: () => {
        return new Promise((resolve) => {
          router.delete(route("settings.device-sessions.destroy-all", { user: user.id }), {
            onStart: () => {
              modalConfirm.update({ cancelButtonProps: { disabled: true } });
            },
            onSuccess: () => {
              message.destroy();
              message.success(__(locale, "message.success"));
            },
            onError: (errors) => {
              message.destroy();
              message.error(errors.error_server);
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  const columns = [
    {
      title: __(locale, "lang.agent"),
      dataIndex: "agent",
      key: "agent",
      render: (agent: string) => {
        const { browser, os } = UAParser(agent);
        return (
          <Typography.Text style={{ margin: 0 }}>
            {os.name} - {browser.name}
          </Typography.Text>
        );
      },
    },
    {
      title: __(locale, "lang.ip_address"),
      dataIndex: "ip_address",
      key: "ip_address",
      render: (ip_address: string, record: SessionType) => {
        if (record.id === sessionId) {
          return <Tag color="green">{__(locale, "lang.this_device")}</Tag>;
        }

        return <Typography.Text>{ip_address}</Typography.Text>;
      },
    },
    {
      title: __(locale, "lang.last_activity"),
      dataIndex: "last_activity",
      key: "last_activity",
      render: (last_activity: number, record: SessionType) => {
        const lastActivity = new Date(last_activity * 1000);
        if (record.id === sessionId) {
          return <Tag color="green">{__(locale, "lang.now")}</Tag>;
        }
        return (
          <Typography.Text>{dayjs(lastActivity).locale(locale).format("dddd, DD MMM YYYY | HH:mm:ss")}</Typography.Text>
        );
      },
    },

    {
      title: __(locale, "lang.action"),
      dataIndex: "id",
      key: "id",
      fixed: "right",
      align: "center",
      width: 1,
      render: (id: string) => (
        <Dropdown
          trigger={["click"]}
          placement="bottomRight"
          disabled={id === sessionId}
          menu={{
            items: [
              {
                key: "detail",
                label: __(locale, "lang.logout_this_device"),
                icon: <LuLogOut size={14} />,
                danger: true,
                onClick: () => onLogoutSelectedDevice(id),
              },
            ],
          }}
        >
          <Button icon={<LuChevronDown size={16} style={{ marginBottom: -2 }} />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <DashboardLayout
      title={`${__(locale, "lang.device_sessions")}`}
      activeMenu=""
      breadcrumb={[
        {
          title: __(locale, "lang.settings"),
          url: route("settings.profile.index"),
        },
        {
          title: __(locale, "lang.device_sessions"),
        },
      ]}
      innerSidebarMenu={InnerSidebarMenuUser()}
      innerSidebarActiveMenu="device-sessions"
      extra={
        <>
          <Button
            danger
            type="primary"
            icon={<LuLogOut />}
            disabled={queryResult.data.length === 1}
            onClick={onLogoutAllDevice}
          >
            {__(locale, "lang.logout_all_device")}
          </Button>
          <InputSearchDatatable queryResult={queryResult} route={route("settings.device-sessions.index")} />
        </>
      }
    >
      <Datatable
        queryResult={queryResult}
        route={route("settings.device-sessions.index")}
        columns={columns as TableProps["columns"]}
      />
    </DashboardLayout>
  );
}
