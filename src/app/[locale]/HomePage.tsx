"use client";

import React from "react";
import { Layout, Typography, Card, Row, Col } from "antd";
import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import HeaderNav from "@/components/HeaderNav";

const { Content } = Layout;

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(`/${i18n.language}${path}`);
  };

  const cards = [
    {
      key: "shapes",
      title: t("nav.shapes"),
      icon: <AppstoreOutlined style={{ fontSize: 48, color: "#ffa200" }} />,
      path: "/shapes",
    },
    {
      key: "persons",
      title: t("nav.persons"),
      icon: <TeamOutlined style={{ fontSize: 48, color: "#ffa200" }} />,
      path: "/persons",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderNav />
      <Content>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: "32px" }}
          >
            {t("nav.home")}
          </Typography.Title>
          <Row gutter={[24, 24]} justify="center">
            {cards.map((card) => (
              <Col xs={24} sm={12} md={8} key={card.key}>
                <Card
                  hoverable
                  onClick={() => navigateTo(card.path)}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <div style={{ marginBottom: 16 }}>{card.icon}</div>
                  <Typography.Title level={4}>{card.title}</Typography.Title>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
}
