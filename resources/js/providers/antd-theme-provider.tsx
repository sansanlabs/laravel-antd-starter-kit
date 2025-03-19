import { ThemeMode, ThemeProvider } from "antd-style";
import { useState } from "react";

export default function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const [selectedAppearence, setSelectedAppearence] = useState(localStorage.getItem("appearance") || "light");

  return (
    <ThemeProvider
      onAppearanceChange={(value) => {
        setSelectedAppearence(value);
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
          colorBgBase: selectedAppearence === "dark" ? "#141414" : "#FFF",
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
      appearance={selectedAppearence}
      themeMode={selectedAppearence as ThemeMode}
    >
      {children}
    </ThemeProvider>
  );
}
