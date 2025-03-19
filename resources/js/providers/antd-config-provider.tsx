import { ConfigProvider } from "antd";
import { useTheme } from "antd-style";

type AntdConfigProviderType = {
  children: React.ReactNode;
};

export default function AntdConfigProvider({ children }: AntdConfigProviderType) {
  const { colorBgBase, colorBorder, colorFillAlter } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#124C9A",
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
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
