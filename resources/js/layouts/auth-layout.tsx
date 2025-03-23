import AuthFooter from "@/components/auth-footer";
import AuthHeader from "@/components/auth-header";
import { SharedData } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { Col, Flex, Layout, Row, Typography } from "antd";

import AuthBg from "../../../public/assets/images/auth-bg.svg";

type AuthLayoutType = {
  children: React.ReactNode;
  title: string;
  titlePage: string;
  descriptionPage: string;
};

export default function AuthLayout({ children, title, titlePage, descriptionPage }: AuthLayoutType) {
  const {
    quote: { message, author },
  } = usePage<SharedData>().props;

  return (
    <>
      <Head title={title} />
      <Layout
        style={{
          minHeight: "100dvh",
        }}
      >
        <Row>
          <Col
            xs={0}
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
            <Flex
              vertical
              style={{
                position: "absolute",
                bottom: 16,
              }}
            >
              <Typography.Text strong italic>
                <q>{message}</q>
              </Typography.Text>
              <Typography.Text type="secondary">{author}</Typography.Text>
            </Flex>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              width: "100%",
              minHeight: "100dvh",
              maxWidth: "23rem",
              marginInline: "auto",
              gap: 16,
              paddingInline: 16,
            }}
          >
            <Flex vertical flex={1} justify="center" style={{ width: "100%", height: "100%" }}>
              <AuthHeader />

              <Typography.Title level={4} style={{ margin: 0 }}>
                {titlePage}
              </Typography.Title>
              <Typography.Paragraph>{descriptionPage}</Typography.Paragraph>

              {children}

              <AuthFooter />
            </Flex>
          </Col>
        </Row>
      </Layout>
    </>
  );
}
