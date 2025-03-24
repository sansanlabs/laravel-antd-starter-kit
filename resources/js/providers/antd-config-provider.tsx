import useLocale from "@/hooks/use-locale";
import { ConfigProvider } from "antd";
import { useTheme } from "antd-style";
import enUS from "antd/locale/en_US";
import idID from "antd/locale/id_ID";
import jaJP from "antd/locale/ja_JP";

type AntdConfigProviderType = {
  children: React.ReactNode;
};

export default function AntdConfigProvider({ children }: AntdConfigProviderType) {
  const { locale } = useLocale();
  const { colorBgBase, colorBorder, colorFillAlter } = useTheme();

  return (
    <ConfigProvider
      locale={locale === "id" ? idID : locale === "ja" ? jaJP : enUS}
      theme={{
        token: {
          colorPrimary: "#124C9A",
          colorLink: "#124C9A",
          colorBgElevated: colorBgBase,
          colorBgLayout: colorBgBase,
          boxShadowSecondary: `inset 0 0 0 1px ${colorBorder}`,
          colorSplit: colorBorder,
          // colorBorder: colorSplit,
          colorBgContainer: colorBgBase,
        },
        components: {
          Layout: {
            bodyBg: colorBgBase,
            siderBg: colorFillAlter,
            headerBg: colorBgBase,
          },
          Button: {
            defaultShadow: "none",
            dangerShadow: "none",
          },
          Form: {
            verticalLabelPadding: 0,
          },
          Table: {
            headerBorderRadius: 0,
          },
          Message: {
            contentBg: colorFillAlter,
            // boxShadow:
            //   "0 6px 16px 0 rgba(255, 255, 255, 0.12), 0 3px 6px -4px rgba(255, 255, 255, 0.08), 0 9px 28px 8px rgba(255, 255, 255, 0.05)",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
