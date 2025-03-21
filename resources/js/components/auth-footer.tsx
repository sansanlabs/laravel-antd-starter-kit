import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { ConfigProvider, Layout, Typography } from "antd";
import { useTheme } from "antd-style";
import { useEffect, useState } from "react";

export default function AuthFooter() {
  const { appName } = usePage<SharedData>().props;
  const { colorBorder } = useTheme();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: { lineHeight: 1.3 },
      }}
    >
      <Layout.Footer
        style={{
          height: 67,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: `1px solid ${colorBorder}`,
        }}
      >
        <Typography.Paragraph
          type="secondary"
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          &copy; Copyright {year} {appName}.
          <br />
          Lorem Ipsum Inc. All rights reserved.
          <br />
        </Typography.Paragraph>
      </Layout.Footer>
    </ConfigProvider>
  );
}
