import { __, findParentPath } from "@/lib/utils";
import { MenuItem, SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ConfigProvider, Menu, MenuProps, theme } from "antd";
import { LuChartPie, LuMenu, LuMinus, LuPlus } from "react-icons/lu";

type DashboardSidebarMenuType = {
  isSidebarPanelCollapsed: boolean;
};

type MenuItemList = Required<MenuProps>["items"][number];

export default function DashboardSidebarMenu({ isSidebarPanelCollapsed }: DashboardSidebarMenuType) {
  const { locale, activeMenu } = usePage<SharedData>().props;

  const items: MenuItemList[] = [
    {
      key: "dashboard",
      label: <Link href={route("dashboard.index")}>{__(locale, "lang.dashboard")}</Link>,
      icon: <LuChartPie size={16} />,
    },
    {
      key: "menu",
      label: "Menu Level",
      icon: <LuMenu size={16} />,
      children: [
        {
          key: "menu_level_1",
          label: "Menu Level 1",
          icon: <LuMenu size={16} />,

          children: [
            {
              key: "menu_level_2",
              label: "Menu Level 2",
              icon: <LuMenu size={16} />,

              children: [
                {
                  key: "menu_level_3",
                  label: "Menu Level 3",
                  icon: <LuMenu size={16} />,
                },
              ],
            },
          ],
        },
      ],
    },
  ].filter(Boolean);

  const {
    token: { colorText, colorFillSecondary, colorFillQuaternary },
  } = theme.useToken();

  return (
    <div
      style={{
        minHeight: 0,
        display: "flex",
        flex: "1 1 0%",
        overflow: "auto",
      }}
    >
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
          expandIcon={({ isOpen }) => {
            return (
              <div style={{ position: "absolute", right: 8 }}>
                {isOpen ? <LuMinus size={14} /> : <LuPlus size={14} />}
              </div>
            );
          }}
        />
      </ConfigProvider>
    </div>
  );
}
