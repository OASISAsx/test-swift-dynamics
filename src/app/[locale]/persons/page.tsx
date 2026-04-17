"use client";

import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";
import PersonManagement from "@/components/PersonManagement";
import PersonsLoader from "@/components/PersonsLoader";
import HeaderNav from "@/components/HeaderNav";

const { Content } = Layout;

export default function PersonsPage() {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderNav />
      <PersonsLoader />
      <Content>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: "32px" }}
          >
            {t("nav.persons")}
          </Typography.Title>
          <PersonManagement />
        </div>
      </Content>
    </Layout>
  );
}
