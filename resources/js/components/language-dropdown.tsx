import useLocale from "@/hooks/use-locale";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { App, Button, Dropdown } from "antd";

export default function LanguageDropdown() {
  const { locale } = usePage<SharedData>().props;
  const { message } = App.useApp();
  const { setLocale } = useLocale();

  const onChangeLanguage = (key: string) => {
    router.put(
      route("localization.update", { locale: key }),
      {},
      {
        onStart: () => {
          message.destroy();
          message.loading(__(locale, "message.processing"));
        },
        onSuccess: ({ props }) => {
          const { locale } = props as unknown as SharedData;
          localStorage.setItem("locale", locale);
          setLocale(locale);
          message.destroy();
          message.success(__(locale, "message.success"));
        },
        onError: () => {
          message.destroy();
          message.error(__(locale, "message.error_server"));
        },
      }
    );
  };
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        selectable: true,
        selectedKeys: [locale],
        items: [
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
      }}
    >
      <Button
        type="text"
        icon={<span style={{ fontFamily: "monospace" }}>{locale === "en" ? "EN" : locale === "id" ? "ID" : "JP"}</span>}
      />
    </Dropdown>
  );
}
