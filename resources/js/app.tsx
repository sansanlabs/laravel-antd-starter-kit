import { StyleProvider } from "@ant-design/cssinjs";
import "@ant-design/v5-patch-for-react-19";
import { createInertiaApp } from "@inertiajs/react";
import { App as AntdApp } from "antd";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import "../css/app.css";
import { initializeTheme } from "./hooks/use-appearance";
import AntdConfigProvider from "./providers/antd-config-provider";
import AntdThemeProvider from "./providers/antd-theme-provider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob("./pages/**/*.tsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <StyleProvider layer>
        <AntdThemeProvider>
          <AntdConfigProvider>
            <AntdApp>
              <App {...props} />
            </AntdApp>
          </AntdConfigProvider>
        </AntdThemeProvider>
      </StyleProvider>
    );
  },
  progress: {
    color: "#1677FF",
  },
});

// This will set light / dark mode on load...
initializeTheme();
