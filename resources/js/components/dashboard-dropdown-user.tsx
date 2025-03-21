import useLocale from "@/hooks/use-locale";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Avatar, Button, ConfigProvider, Dropdown, Flex } from "antd";
import { ThemeMode, useThemeMode } from "antd-style";
import {
  LuChevronsUpDown,
  LuLanguages,
  LuLogOut,
  LuMonitor,
  LuMoon,
  LuPalette,
  LuSun,
  LuUserRound,
} from "react-icons/lu";

export default function DashbordDropdownUser() {
  const {
    auth: { user: authUser },
    locale,
  } = usePage<SharedData>().props;

  const { message, modal } = App.useApp();
  const { themeMode, setThemeMode } = useThemeMode();
  const { setLocale } = useLocale();

  const onLogout = () => {
    const modalConfirm = modal.confirm({
      title: String(__(locale, "modal_confirm.title")),
      content: String(__(locale, "modal_confirm.desc")),
      okText: String(__(locale, "auth.logout")),
      okButtonProps: { danger: true },
      cancelButtonProps: { disabled: false },
      onOk: () => {
        modalConfirm.update({
          cancelButtonProps: { disabled: true },
        });

        return new Promise((resolve) => {
          router.post(
            route("logout"),
            {},
            {
              onSuccess: () => {
                message.destroy();
                message.success(String(__(locale, "message.success")));
              },
              onError: () => {
                message.destroy();
                message.error(String(__(locale, "message.error")));
              },
              onFinish: resolve,
            }
          );
        });
      },
    });
  };

  const onChangeLanguage = (key: string) => {
    router.put(
      route("localization.update", { locale: key }),
      {},
      {
        onStart: () => {
          message.destroy();
          message.loading(String(__(locale, "message.processing")));
        },
        onSuccess: ({ props }) => {
          const { locale } = props as unknown as SharedData;
          localStorage.setItem("locale", locale);
          setLocale(locale);
          message.destroy();
          message.success(String(__(locale, "message.success")));
        },
        onError: () => {
          message.destroy();
          message.error(String(__(locale, "message.error")));
        },
      }
    );
  };

  const Detail = () => {
    return (
      <ConfigProvider
        theme={{
          token: {
            lineHeight: 0,
          },
        }}
      >
        <Flex flex={1} gap="small" align="center" style={{ minWidth: 0 }}>
          <Avatar shape="square" icon={<LuUserRound size={20} />} />
          <Flex vertical flex={1} style={{ minWidth: 0 }}>
            <span style={{ textAlign: "start", fontSize: 14, fontWeight: 600 }}>{authUser.name}</span>
            <span
              style={{
                marginTop: -4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textAlign: "start",
                fontSize: 12,
              }}
            >
              {authUser.email}
            </span>
          </Flex>
        </Flex>
      </ConfigProvider>
    );
  };

  return (
    <div style={{ margin: 8, height: 50 }}>
      <Dropdown
        // open
        trigger={["click"]}
        menu={{
          selectable: true,
          multiple: true,
          selectedKeys: [locale, themeMode],
          items: [
            {
              key: "detail",
              label: <Detail />,
            },
            { type: "divider" },
            {
              key: "language",
              label: String(__(locale, "lang.language")),
              icon: <LuLanguages size={14} style={{ marginTop: 4 }} />,

              children: [
                {
                  key: "en",
                  label: "English",
                  icon: <span style={{ fontFamily: "monospace" }}>EN</span>,
                },
                {
                  key: "id",
                  label: "Indonesian",
                  icon: <span style={{ fontFamily: "monospace" }}>ID</span>,
                },
                {
                  key: "ja",
                  label: "Japanese",
                  icon: <span style={{ fontFamily: "monospace" }}>JP</span>,
                },
              ],
              onClick: ({ key }) => onChangeLanguage(key),
            },
            {
              key: "theme",
              label: String(__(locale, "lang.theme")),
              icon: <LuPalette size={14} style={{ marginTop: 4 }} />,
              children: [
                {
                  key: "auto",
                  label: String(__(locale, "lang.auto")),
                  icon: <LuMonitor size={14} />,
                },
                {
                  key: "light",
                  label: String(__(locale, "lang.light")),
                  icon: <LuSun size={14} />,
                },
                {
                  key: "dark",
                  label: String(__(locale, "lang.dark")),
                  icon: <LuMoon size={14} />,
                },
              ],
              onClick: ({ key }) => setThemeMode(key as ThemeMode),
            },
            { type: "divider" },
            {
              key: "logout",
              label: String(__(locale, "auth.logout")),
              icon: <LuLogOut size={14} />,
              danger: true,
              onClick: onLogout,
            },
          ],
        }}
      >
        <Button type="text" style={{ height: "100%", width: "100%", padding: 8 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <Detail />
            <LuChevronsUpDown size={16} />
          </div>
        </Button>
      </Dropdown>
    </div>
  );
}
