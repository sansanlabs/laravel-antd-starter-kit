import { Breadcrumb, Button, Divider, Layout } from "antd";
import { useResponsive, useTheme } from "antd-style";
import { LuHouse, LuPanelLeft, LuUserRound } from "react-icons/lu";

type DashboardHeaderType = {
  isSidebarDrawerOpen: boolean;
  setIsSidebarDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarPanelCollapsed: boolean;
  setIsSidebarPanelCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardHeader({
  isSidebarDrawerOpen,
  setIsSidebarDrawerOpen,
  isSidebarPanelCollapsed,
  setIsSidebarPanelCollapsed,
}: DashboardHeaderType) {
  const { colorBorder } = useTheme();
  const { mobile } = useResponsive();

  const items = [
    {
      href: "",
      title: <LuHouse style={{ marginTop: 4 }} />,
    },
    {
      href: "",
      title: (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <LuUserRound />
          <span>Application List</span>
        </div>
      ),
    },
    {
      title: "Application",
    },
  ];

  return (
    <Layout.Header
      style={{
        height: 67,
        position: "sticky",
        top: 0,
        display: "flex",
        alignItems: "center",
        gap: 16,
        borderBottom: `1px solid ${colorBorder}`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          onClick={() => {
            if (mobile) {
              setIsSidebarDrawerOpen(!isSidebarDrawerOpen);
            } else {
              setIsSidebarPanelCollapsed(!isSidebarPanelCollapsed);
              localStorage.setItem("isSidebarPanelCollapsed", (!isSidebarPanelCollapsed).toString());
            }
          }}
          icon={<LuPanelLeft />}
        />
      </div>
      <Divider type="vertical" className="!m-0 !h-8" />

      {/* <Breadcrumb className="!mb-0.5 hidden md:block" items={items} /> */}
      <Breadcrumb
        style={{
          paddingTop: 5,
        }}
        items={items}
      />
    </Layout.Header>
  );
}
