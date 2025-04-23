import ColumnCreatedAtUpdatedAt from "@/components/column-created-at-updated-at";
import Datatable from "@/components/datatable";
import InputSearchDatatable from "@/components/input-search-datatable";
import SortIcon from "@/components/sort-icon";
import DashboardLayout from "@/layouts/dashboard-layout";
import { __, getDefaultSortOrder } from "@/lib/utils";
import { PermissionType, QueryResultType, SharedData } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { App, Button, Dropdown, Flex, Typography } from "antd";
import { LuChevronDown, LuEye, LuPencilLine, LuPlus, LuTrash2 } from "react-icons/lu";

type IndexType = {
  queryResult: QueryResultType;
  pemissionsTotal: number;
};

export default function Index({ queryResult, pemissionsTotal }: IndexType) {
  const { modal, message } = App.useApp();
  const { locale } = usePage<SharedData>().props;

  const onDelete = (id: string) => {
    const modalConfirm = modal.confirm({
      title: __(locale, "modal_confirm.title"),
      content: __(locale, "modal_confirm.desc"),
      okButtonProps: { danger: true },
      okText: __(locale, "lang.delete"),
      cancelButtonProps: { disabled: false },
      onOk: async () => {
        return new Promise((resolve) => {
          router.delete(route("roles.destroy", { role: id }), {
            onStart: () => {
              modalConfirm.update({ cancelButtonProps: { disabled: true } });
            },
            onSuccess: () => {
              message.destroy();
              message.success(__(locale, "message.success"));
            },
            onError: () => {
              message.destroy();
              message.error(__(locale, "message.error_server"));
            },
            onFinish: resolve,
          });
        });
      },
    });
  };

  const columns: object[] = [
    {
      title: __(locale, "lang.name"),
      key: "name",
      dataIndex: "name",
      sorter: true,
      defaultSortOrder: getDefaultSortOrder(queryResult, "name"),
    },
    {
      title: __(locale, "lang.permissions"),
      key: "permissions",
      dataIndex: "permissions",
      render: (permissions: PermissionType[]) => (
        <Typography.Text>
          {permissions.length}/{pemissionsTotal} {__(locale, "lang.permissions")}
        </Typography.Text>
      ),
    },
    ...ColumnCreatedAtUpdatedAt(queryResult),
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
          menu={{
            items: [
              {
                key: "detail",
                label: <Link href={route("roles.show", { role: id })}>{__(locale, "lang.detail")}</Link>,
                icon: <LuEye size={14} />,
              },
              {
                key: "edit",
                label: <Link href={route("roles.edit", { role: id })}>{__(locale, "lang.edit")}</Link>,
                icon: <LuPencilLine size={14} />,
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                label: __(locale, "lang.delete"),
                icon: <LuTrash2 size={14} />,
                danger: true,
                onClick: () => onDelete(id),
              },
            ],
          }}
        >
          <Button icon={<LuChevronDown size={16} style={{ marginBottom: -2 }} />} />
        </Dropdown>
      ),
    },
  ].map((column) => {
    if (column.sorter) {
      return { ...column, sortIcon: ({ sortOrder }: { sortOrder: string }) => <SortIcon sortOrder={sortOrder} /> };
    }
    return column;
  });

  return (
    <DashboardLayout
      title={__(locale, "lang.roles")}
      activeMenu="roles"
      breadcrumb={[
        {
          title: __(locale, "lang.roles"),
        },
      ]}
      extra={
        <>
          <Link href={route("roles.create")}>
            <Button type="primary" icon={<LuPlus />}>
              {__(locale, "lang.create_role")}
            </Button>
          </Link>
          <InputSearchDatatable queryResult={queryResult} route={route("roles.index")} />
        </>
      }
    >
      <Datatable queryResult={queryResult} route={route("roles.index")} columns={columns} />
    </DashboardLayout>
  );
}
