import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Col, Layout, Row, Typography } from "antd";

import AuthBg from "../../../public/assets/images/auth-bg.svg";

type AuthLayoutType = {
  children: React.ReactNode;
  title: string;
  description: string;
};

export default function AuthLayout({ children, title, description }: AuthLayoutType) {
  const {
    quote: { message, author },
  } = usePage<SharedData>().props;

  return (
    <Layout
      style={{
        minHeight: "100dvh",
      }}
    >
      <Row>
        <Col
          sm={0}
          md={12}
          style={{
            height: "100dvh",
            background: `url('${AuthBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "sticky",
            top: 0,
            padding: 16,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 16,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography.Text strong italic>
              <q>{message}</q>
            </Typography.Text>
            <Typography.Text type="secondary">{author}</Typography.Text>
          </div>
        </Col>
        <Col
          sm={24}
          md={12}
          style={{
            width: "100%",
            minHeight: "100dvh",
            maxWidth: "23rem",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            paddingInline: 16,
          }}
        >
          <div
            style={{
              width: "100%",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <AuthHeader />

            <Typography.Title level={4} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>

            {children}
          </div>
          <AuthFooter />
        </Col>
      </Row>
    </Layout>
  );
}
