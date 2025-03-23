import DashboardLayout from "@/layouts/dashboard-layout";
import { __ } from "@/lib/utils";
import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { Card, Col, ConfigProvider, Row, Statistic, Table, theme } from "antd";
import { LuBriefcaseBusiness, LuCalendarX, LuGlobe, LuPlane, LuUsersRound } from "react-icons/lu";

export default function Dashboard() {
  const { locale } = usePage<SharedData>().props;
  const {
    token: { colorFillAlter },
  } = theme.useToken();

  return (
    <DashboardLayout title={__(locale, "lang.dashboard")}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: colorFillAlter,
          },
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic
                title={__(locale, "lang.total_employees")}
                prefix={
                  <LuUsersRound
                    style={{
                      marginBottom: -3,
                      marginRight: 4,
                    }}
                  />
                }
                value={333}
                valueStyle={{ fontWeight: 500 }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title={__(locale, "lang.employees_in_office")}
                prefix={
                  <LuBriefcaseBusiness
                    style={{
                      marginBottom: -3,
                      marginRight: 4,
                    }}
                  />
                }
                value={250}
                valueStyle={{ fontWeight: 500 }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title={__(locale, "lang.employees_on_leave")}
                prefix={
                  <LuCalendarX
                    style={{
                      marginBottom: -3,
                      marginRight: 4,
                    }}
                  />
                }
                value={50}
                valueStyle={{ fontWeight: 500 }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title={__(locale, "lang.employees_on_business_trip")}
                prefix={
                  <LuPlane
                    style={{
                      marginBottom: -3,
                      marginRight: 4,
                    }}
                  />
                }
                value={33}
                valueStyle={{ fontWeight: 500 }}
              />
            </Card>
          </Col>
        </Row>
      </ConfigProvider>

      <Table bordered />
    </DashboardLayout>
  );
}
