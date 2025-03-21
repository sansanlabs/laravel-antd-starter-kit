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
          className="sticky top-20 z-20 flex min-h-0 overflow-auto"
          style={{
            height: 38,
          }}
        >
          <Dropdown
            menu={{
              selectable: true,
              selectedKeys: [activeMenuContent],
              items: submenus,
            }}
          >
            <Button block type="primary" className="!z-0">
              {__(locale, "lang.menu")}
            </Button>
          </Dropdown>
        </div>
      )}

      {!mobile && submenus && (
        <div
          className="sticky top-[83px] flex min-h-0 overflow-auto"
          style={{
            height: `${submenus.length * 38}px`,
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
              className="!-mt-1 !w-[230px] !border-none"
              defaultSelectedKeys={[activeMenuContent]}
              items={submenus}
            />
          </ConfigProvider>
        </div>
      )}
    </>
  );
}
