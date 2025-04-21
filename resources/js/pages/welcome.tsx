import { __ } from "@/lib/utils";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";
import { Button, Flex, Layout } from "antd";

export default function Welcome() {
  const { auth, locale } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Welcome" />

      <Layout style={{ minHeight: "100dvh" }}>
        {auth.user ? (
          <Link href={route("dashboard.index")}>
            <Button>{__(locale, "lang.dashboard")}</Button>
          </Link>
        ) : (
          <Flex gap={8}>
            <Link href={route("login")}>
              <Button type="link">{__(locale, "auth.login")}</Button>
            </Link>
            <Link href={route("register")}>
              <Button color="primary" variant="outlined">
                {__(locale, "auth.register")}
              </Button>
            </Link>
          </Flex>
        )}
      </Layout>
    </>
  );
}
