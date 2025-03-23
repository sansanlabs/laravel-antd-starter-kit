import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Button, Dropdown } from "antd";
import { ThemeMode, useThemeMode } from "antd-style";
import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";

export default function ThemeDropdown() {
  const { locale } = usePage<SharedData>().props;
  const { themeMode, setThemeMode } = useThemeMode();

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        selectable: true,
        selectedKeys: [themeMode],
        items: [
          {
            key: "auto",
            label: __(locale, "lang.system"),
            icon: <LuMonitor size={14} />,
          },
          {
            key: "light",
            label: __(locale, "lang.light"),
            icon: <LuSun size={14} />,
          },
          {
            key: "dark",
            label: __(locale, "lang.dark"),
            icon: <LuMoon size={14} />,
          },
        ],
        onClick: ({ key }) => setThemeMode(key as ThemeMode),
      }}
    >
      <Button
        type="text"
        icon={themeMode === "auto" ? <LuMonitor /> : themeMode === "light" ? <LuSun /> : <LuMoon />}
      />
    </Dropdown>
  );
}
