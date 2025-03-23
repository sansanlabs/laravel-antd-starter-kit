import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Button, ConfigProvider, Dropdown, Menu, MenuProps, theme } from "antd";
import { useResponsive } from "antd-style";

type MenuItemList = Required<MenuProps>["items"][number];

type DashboardSidebarInnerMenuType = {
  submenus?: MenuItemList[];
};

export default function DashboardSidebarInnerMenu({ submenus }: DashboardSidebarInnerMenuType) {
  const { mobile } = useResponsive();
  const { locale, activeMenuContent } = usePage<SharedData>().props;

  const {
    token: { colorText, colorFillSecondary, colorFillQuaternary },
  } = theme.useToken();

  return (
    <>
      {mobile && submenus && (
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
              selectedKeys: [activeMenuContent],
              items: submenus,
            }}
          >
            <Button block type="primary">
              {__(locale, "lang.menu")}
            </Button>
          </Dropdown>
        </div>
      )}

      {!mobile && submenus && (
        <div
          style={{
            minHeight: 0,
            height: `${submenus.length * 38}px`,
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
              defaultSelectedKeys={[activeMenuContent]}
              items={submenus}
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
