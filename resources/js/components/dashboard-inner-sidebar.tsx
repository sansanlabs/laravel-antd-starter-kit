import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Button, ConfigProvider, Dropdown, Menu, MenuProps, theme } from "antd";
import { useResponsive } from "antd-style";

type DashboardInnerSidebarType = {
  innerSidebarMenu?: MenuItemList[];
  innerSidebarActiveMenu?: string;
};

type MenuItemList = Required<MenuProps>["items"][number];

export default function DashboardInnerSidebar({
  innerSidebarMenu,
  innerSidebarActiveMenu = "",
}: DashboardInnerSidebarType) {
  const { mobile } = useResponsive();
  const { locale } = usePage<SharedData>().props;

  const {
    token: { colorText, colorFillSecondary, colorFillQuaternary },
  } = theme.useToken();

  return (
    <>
      {mobile && innerSidebarMenu && (
        <div
          style={{
            minHeight: 0,
            height: 38,
            position: "sticky",
            top: 80,
            zIndex: 20,
            display: "flex",
            overflow: "auto",
          }}
        >
          <Dropdown
            menu={{
              selectable: true,
              selectedKeys: [innerSidebarActiveMenu],
              items: innerSidebarMenu,
            }}
          >
            <Button block type="primary">
              {__(locale, "lang.menu")}
            </Button>
          </Dropdown>
        </div>
      )}

      {!mobile && innerSidebarMenu && (
        <div
          style={{
            minHeight: 0,
            height: `${innerSidebarMenu.length * 38}px`,
            position: "sticky",
            top: 83,
            display: "flex",
            overflow: "auto",
          }}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemMarginInline: 0,
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
              theme="dark"
              defaultSelectedKeys={[innerSidebarActiveMenu]}
              items={innerSidebarMenu}
              style={{
                marginTop: -4,
                width: 230,
                border: "none",
              }}
            />
          </ConfigProvider>
        </div>
      )}
    </>
  );
}
