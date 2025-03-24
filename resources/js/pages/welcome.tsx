import LanguageDropdown from "@/components/language-dropdown";
import ThemeDropdown from "@/components/theme-dropdown";
import { __ } from "@/lib/utils";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button, Col, ConfigProvider, Divider, Flex, Layout, Row, Tooltip, Typography } from "antd";
import { useTheme } from "antd-style";
import { useEffect, useState } from "react";
import { LuBookOpenText, LuCodesandbox } from "react-icons/lu";
import { SiFacebook, SiGithub, SiInstagram, SiThreads, SiX } from "react-icons/si";

import LogoIpsumFull from "../../../public/assets/images/logo-ipsum-full.svg";

export default function Welcome() {
  const { appName, auth, locale } = usePage<SharedData>().props;
  const { colorBorder, colorFillAlter, colorTextSecondary } = useTheme();
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const items = [
    {
      name: "Laravel",
      url: "https://laravel.com/",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
    },
    {
      name: "Ant Design",
      url: "https://ant.design/",
      logoUrl: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
    },
    {
      name: "Tailwind",
      url: "https://tailwindcss.com/",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
    },
    {
      name: "Inertia",
      url: "https://inertiajs.com/",
      logoUrl: "https://avatars.githubusercontent.com/u/47703742?s=200&v=4",
    },
    {
      name: "React",
      url: "https://react.dev/",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg",
    },
    {
      name: "TypeScript",
      url: "https://www.typescriptlang.org/",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    },
  ];

  return (
    <Layout style={{ minHeight: "100dvh" }}>
      <Head title="Welcome" />
      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 20,
          backgroundColor: "transparent",
          backdropFilter: "blur(50px)",
        }}
      >
        <Flex
          justify="space-between"
          align="center"
          style={{
            maxWidth: 1376,
            width: "100%",
            marginInline: "auto",
          }}
        >
          <img
            src={LogoIpsumFull}
            alt="Logo Ipsum"
            style={{
              height: 35,
            }}
          />

          <Flex gap={8} align="center">
            <Flex gap={2}>
              <LanguageDropdown />
              <ThemeDropdown />
            </Flex>
            <Divider
              type="vertical"
              style={{
                marginInline: 4,
                height: 30,
              }}
            />
            {auth.user ? (
              <Link href={route("dashboard.index")}>
                <Button> {__(locale, "lang.dashboard")}</Button>
              </Link>
            ) : (
              <>
                <Link href={route("login")}>
                  <Button color="primary" variant="outlined">
                    {__(locale, "auth.login")}
                  </Button>
                </Link>
                <Link href={route("register")}>
                  <Button type="primary">{__(locale, "auth.register")}</Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Layout.Header>

      <Layout.Content
        style={{
          padding: 16,
        }}
      >
        <Col
          style={{
            maxWidth: 1376,
            width: "100%",
            marginInline: "auto",
          }}
        >
          <Flex vertical justify="center" align="center" style={{ minHeight: 450 }}>
            <Typography.Title
              style={{
                fontSize: 60,
              }}
            >
              Laravel Antd Starter Kit
            </Typography.Title>

            <Typography.Paragraph style={{ fontSize: 20, textAlign: "center" }}>
              A Laravel starter kit with Ant Design, Tailwind, Inertia, React, <br /> and TypeScript optimized for
              modern web development.
            </Typography.Paragraph>

            <Flex gap={16}>
              <Button type="primary" size="large" icon={<LuCodesandbox />}>
                Get Starter
              </Button>
              <Button color="primary" variant="outlined" size="large" icon={<LuBookOpenText />}>
                Learn More
              </Button>
            </Flex>
          </Flex>

          <Typography.Paragraph style={{ textAlign: "center", marginTop: 20 }}>Build with:</Typography.Paragraph>
          <Flex justify="center" gap={16}>
            {items.map((item) => (
              <Tooltip id={item.name} title={item.name}>
                <a href={item.url} target="_blank">
                  <img src={item.logoUrl} alt={`Logo ${item.name}`} style={{ height: 40 }} />
                </a>
              </Tooltip>
            ))}
          </Flex>
        </Col>
      </Layout.Content>

      <Layout.Footer
        style={{
          paddingInline: 16,
          paddingBlock: 0,
          marginTop: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: colorFillAlter,
        }}
      >
        <Flex
          vertical
          style={{
            maxWidth: 1376,
            width: "100%",
            marginInline: "auto",
          }}
        >
          <Row gutter={[16, 16]} style={{ width: "100%", marginBlock: 50 }}>
            <Col xs={24} md={8}>
              <Typography.Paragraph strong style={{ fontSize: 16 }}>
                {appName}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum quas nemo delectus? Iure modi magni
                itaque cumque quaerat obcaecati corrupti ullam, libero consectetur eaque laboriosam magnam alias!
                Blanditiis, doloribus vero?
              </Typography.Paragraph>
              <Flex gap={16} align="center" style={{ paddingTop: 10 }}>
                <a href="https://github.com/sansanlabs/laravel-antd-starter-kit">
                  <ConfigProvider
                    theme={{
                      token: {
                        // colorLink: "blue",
                        colorLinkHover: colorTextSecondary,
                      },
                    }}
                  >
                    <SiThreads size={24} />
                  </ConfigProvider>
                </a>
                <a href="https://github.com/sansanlabs/laravel-antd-starter-kit">
                  <SiInstagram size={24} />
                </a>
                <a href="https://github.com/sansanlabs/laravel-antd-starter-kit">
                  <SiX size={24} />
                </a>
                <a href="https://github.com/sansanlabs/laravel-antd-starter-kit">
                  <SiFacebook size={24} />
                </a>
                <a href="https://github.com/sansanlabs/laravel-antd-starter-kit">
                  <SiGithub size={24} />
                </a>
              </Flex>
            </Col>
            <Col xs={24} md={4}>
              <Typography.Paragraph strong style={{ fontSize: 16 }}>
                Solutions
              </Typography.Paragraph>

              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
            </Col>
            <Col xs={24} md={4}>
              <Typography.Paragraph strong style={{ fontSize: 16 }}>
                Support
              </Typography.Paragraph>

              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
            </Col>
            <Col xs={24} md={4}>
              <Typography.Paragraph strong style={{ fontSize: 16 }}>
                Sites
              </Typography.Paragraph>

              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
            </Col>
            <Col xs={24} md={4}>
              <Typography.Paragraph strong style={{ fontSize: 16 }}>
                Legal
              </Typography.Paragraph>

              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
              <Typography.Paragraph style={{ margin: 0 }}>Lorem ipsum</Typography.Paragraph>
            </Col>
          </Row>

          <Typography.Paragraph
            type="secondary"
            style={{
              textAlign: "center",
              borderTop: `1px solid ${colorBorder}`,
              margin: 0,
              paddingBlock: 16,
            }}
          >
            &copy; Copyright {year} {appName}. Lorem Ipsum Inc. All rights reserved.
          </Typography.Paragraph>
        </Flex>
      </Layout.Footer>
    </Layout>
  );
}
