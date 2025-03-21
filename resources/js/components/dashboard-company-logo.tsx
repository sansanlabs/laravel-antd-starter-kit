import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Button, ConfigProvider, Flex, Typography } from "antd";

import LogoIpsum from "../../../public/assets/images/logo-ipsum.svg";

export default function DashboardCompanyLogo() {
  const { appName } = usePage<SharedData>().props;

  return (
    <div style={{ margin: 8, height: 50 }}>
      <Link href="/">
        <Button type="text" style={{ height: "100%", width: "100%", padding: 8 }}>
          <ConfigProvider
            theme={{
              token: {
                lineHeight: 1.2,
              },
            }}
          >
            <Flex flex={1} gap="small" align="center" style={{ minWidth: 0 }}>
              <img src={LogoIpsum} alt="" style={{ height: 32 }} />
              <Flex vertical flex={1} className="min-w-0">
                <Typography.Text strong className="text-start">
                  Lorem Ipsum Inc
                </Typography.Text>
                <Typography.Text
                  style={{
                    textAlign: "start",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: 12,
                  }}
                >
                  {appName}
                </Typography.Text>
              </Flex>
            </Flex>
          </ConfigProvider>
        </Button>
      </Link>
    </div>
  );
}
