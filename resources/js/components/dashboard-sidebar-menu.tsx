import { findParentPath } from "@/lib/utils";
import { MenuItem } from "@/types";
import { ConfigProvider, Menu, MenuProps, theme } from "antd";
import { LuChartPie, LuFileInput, LuFileOutput, LuGroup, LuMenu, LuMinus, LuPlus } from "react-icons/lu";

type DashboardSidebarMenuType = {
  isSidebarPanelCollapsed: boolean;
};

type MenuItemList = Required<MenuProps>["items"][number];

export default function DashboardSidebarMenu({ isSidebarPanelCollapsed }: DashboardSidebarMenuType) {
  const items: MenuItemList[] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LuChartPie size={16} />,
    },
    {
      key: "forms",
      label: "Forms",
      icon: <LuGroup size={16} />,
    },
    {
      key: "components",
      label: "Components",
      icon: <LuFileInput size={16} />,
    },
    {
      key: "errors",
      label: "Errors",
      icon: <LuFileOutput size={16} />,
      children: [
        {
          key: "403",
          label: "Error 404",
          icon: <LuFileOutput size={16} />,
        },
        {
          key: "404",
          label: "Error 404",
          icon: <LuFileOutput size={16} />,
        },
        {
          key: "500",
          label: "Error 500",
          icon: <LuFileOutput size={16} />,
        },
      ],
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
          defaultOpenKeys={isSidebarPanelCollapsed ? [] : findParentPath(items as MenuItem[], "menu_level_3")}
          defaultSelectedKeys={["menu_level_3"]}
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
