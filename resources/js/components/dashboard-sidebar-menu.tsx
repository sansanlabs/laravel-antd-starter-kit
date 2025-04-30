import { __, findParentPath } from "@/lib/utils";
import { MenuItem, SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ConfigProvider, Flex, Menu, MenuProps, theme } from "antd";
import { LuBookKey, LuChartPie, LuKey, LuMinus, LuPlus, LuShieldCheck } from "react-icons/lu";
import { SiLaravel } from "react-icons/si";

type DashboardSidebarMenuType = {
  activeMenu?: string;
  isSidebarPanelCollapsed: boolean;
};

type MenuItemList = Required<MenuProps>["items"][number];

export default function DashboardSidebarMenu({ activeMenu = "", isSidebarPanelCollapsed }: DashboardSidebarMenuType) {
  const { locale } = usePage<SharedData>().props;

  const items: MenuItemList[] = [
    {
      key: "dashboard",
      label: <Link href={route("dashboard.index")}>{__(locale, "lang.dashboard")}</Link>,
      icon: <LuChartPie size={16} />,
    },
    // {
    //   key: "users",
    //   label: <Link href={route("users.index")}>{__(locale, "lang.users")}</Link>,
    //   icon: <LuUsersRound size={16} />,
    // },
    // {
    //   key: "all-user-activity-logs",
    //   label: <Link href={route("all-user-activity-logs.index")}>{__(locale, "lang.user_activity_logs")}</Link>,
    //   icon: <LuHistory size={16} />,
    // },
    {
      key: "roles-and-permissions",
      label: __(locale, "lang.roles_and_permissions"),
      icon: <LuShieldCheck size={16} />,
      children: [
        {
          key: "roles",
          label: <Link href={route("roles.index")}>{__(locale, "lang.roles")}</Link>,
          icon: <LuBookKey size={16} />,
        },
        {
          key: "permissions",
          label: <Link href={route("permissions.index")}>{__(locale, "lang.permissions")}</Link>,
          icon: <LuKey size={16} />,
        },
      ],
    },
    {
      type: "divider",
    },
    {
      key: "laravel-telescope",
      label: (
        <a href="/dashboard/laravel-telescope" target="_blank">
          {__(locale, "lang.laravel_telescope")}
        </a>
      ),
      icon: <SiLaravel size={16} style={{ strokeWidth: 0.6 }} />,
    },
  ].filter(Boolean) as MenuItemList[];

  const {
    token: { colorText, colorFillSecondary, colorFillQuaternary },
  } = theme.useToken();

  return (
    <Flex flex="1 1 0%" style={{ minHeight: 0, overflow: "auto" }}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              zIndexPopup: -1,
              darkItemBg: "transparent",
              darkItemColor: colorText,
              darkItemHoverColor: colorText,
              darkItemHoverBg: colorFillSecondary,
              darkSubMenuItemBg: colorFillQuaternary,
            },
          },
        }}
      >
        <Menu
          style={{
            overflow: "auto",
            border: "none",
            paddingBlock: 4,
          }}
          mode="inline"
          items={items}
          theme="dark"
          defaultOpenKeys={isSidebarPanelCollapsed ? [] : findParentPath(items as MenuItem[], activeMenu)}
          defaultSelectedKeys={[activeMenu]}
          expandIcon={({ isOpen }) => (
            <div style={{ position: "absolute", right: 8, top: 2 }}>
              {isOpen ? <LuMinus size={14} /> : <LuPlus size={14} />}
            </div>
          )}
        />
      </ConfigProvider>
    </Flex>
  );
}
