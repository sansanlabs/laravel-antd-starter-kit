import DashboardCompanyLogo from "@/components/dashboard-company-logo";
import DashboardDropdownUser from "@/components/dashboard-dropdown-user";
import DashboardFooter from "@/components/dashboard-footer";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebarInnerMenu from "@/components/dashboard-sidebar-inner-menu";
import DashboardSidebarMenu from "@/components/dashboard-sidebar-menu";
import { Head } from "@inertiajs/react";
import { Divider, Drawer, Flex, Layout, MenuProps, Typography } from "antd";
import { useResponsive, useTheme } from "antd-style";
import { useState } from "react";

type MenuItemList = Required<MenuProps>["items"][number];

type DashboardLayoutType = {
  title: string;
  extra?: React.ReactNode;
  submenus?: MenuItemList[];
  children: React.ReactNode;
};

export default function DashboardLayout({ title, submenus, extra, children }: DashboardLayoutType) {
  const { colorBorder } = useTheme();
  const { mobile } = useResponsive();

  const [isSidebarPanelCollapsed, setIsSidebarPanelCollapsed] = useState<boolean>(
    JSON.parse(localStorage.getItem("isSidebarPanelCollapsed") ?? "false")
  );
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);

  const SidebarContent = () => {
    return (
      <div
        style={{
          position: "sticky",
          display: "flex",
          flexDirection: "column",
          height: "100dvh",
          overflow: "auto",
        }}
      >
        <DashboardCompanyLogo />
        <Divider style={{ margin: 0 }} />
        <DashboardSidebarMenu isSidebarPanelCollapsed={isSidebarPanelCollapsed} />
        <Divider style={{ margin: 0 }} />
        <DashboardDropdownUser />
      </div>
    );
  };

  return (
    <>
      <Head title={title} />
      <Layout style={{ minHeight: "100dvh" }}>
        <Drawer
          onClose={() => {
            setIsSidebarDrawerOpen(false);
          }}
          placement="left"
          width={272}
          open={mobile ? isSidebarDrawerOpen : false}
          style={{
            borderRight: `1px solid ${colorBorder}`,
          }}
          styles={{
            header: { display: "none" },
            body: { padding: 0 },
          }}
        >
          <SidebarContent />
        </Drawer>

        <Layout.Sider
          theme="dark"
          width={272}
          collapsedWidth={0}
          trigger={null}
          collapsed={isSidebarPanelCollapsed}
          onCollapse={() => {
            setIsSidebarDrawerOpen(false);
            setIsSidebarPanelCollapsed(false);
            localStorage.setItem("isSidebarPanelCollapsed", "false");
          }}
          style={{
            display: mobile ? "none" : "block",
            position: "sticky",
            top: 0,
            height: "100dvh",
            borderRight: `1px solid ${colorBorder}`,
          }}
        >
          <SidebarContent />
        </Layout.Sider>

        <Layout style={{ minHeight: "100dvh" }}>
          <DashboardHeader
            isSidebarDrawerOpen={isSidebarDrawerOpen}
            setIsSidebarDrawerOpen={setIsSidebarDrawerOpen}
            isSidebarPanelCollapsed={isSidebarPanelCollapsed}
            setIsSidebarPanelCollapsed={setIsSidebarPanelCollapsed}
          />

          <Layout.Content
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: 16,
            }}
          >
            <Flex
              gap={16}
              justify="space-between"
              align="center"
              style={{
                paddingInline: 16,
                paddingTop: 16,
                minHeight: 48,
              }}
            >
              <Typography.Title level={4} style={{ margin: 0 }}>
                {title}
              </Typography.Title>
              <Flex gap="small">{extra}</Flex>
            </Flex>

            <Flex gap={16} vertical={mobile} flex={1} style={{ paddingInline: 16 }}>
              <DashboardSidebarInnerMenu submenus={submenus} />

              <Flex flex={1} vertical gap={16}>
                {children}
              </Flex>
            </Flex>
          </Layout.Content>

          <DashboardFooter />
        </Layout>
      </Layout>
    </>
  );
}
