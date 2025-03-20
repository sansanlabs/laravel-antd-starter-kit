import { prefersDark, useAppearance } from "@/hooks/use-appearance";
import { ThemeMode, ThemeProvider } from "antd-style";

export default function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { appearance, updateAppearance } = useAppearance();

  const isDark = appearance === "dark" || (appearance === "system" && prefersDark());
  const themeMode = appearance === "system" ? "auto" : appearance;
  const appearanceApp = isDark ? "dark" : "light";

  return (
    <ThemeProvider
      onAppearanceChange={(value) => {
        updateAppearance(value);
        localStorage.setItem("appearance", value);
      }}
      theme={{
        cssVar: true,
        token: {
          screenXS: 480,
          screenSM: 576,
          screenMD: 768,
          screenLG: 992,
          screenXL: 1200,
          screenXXL: 1600,
          fontFamily: "Geist",
          colorBgBase: isDark ? "#141414" : "#FFF",
        },
        components: {
          Layout: {
            headerPadding: "8px 16px",
            footerPadding: "8px 16px",
          },
          Menu: {
            itemPaddingInline: 8,
            itemMarginInline: 8,
            itemBorderRadius: 6,
            itemHeight: 34,
          },
        },
      }}
      appearance={appearanceApp}
      themeMode={themeMode as ThemeMode}
    >
      {children}
    </ThemeProvider>
  );
}
