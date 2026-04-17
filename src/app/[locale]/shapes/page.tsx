"use client";

import React from "react";
import { Layout, Typography } from "antd";
import { useTranslation } from "react-i18next";
import ShapesSection from "@/components/ShapesSection";
import HeaderNav from "@/components/HeaderNav";

const { Content } = Layout;

export default function ShapesPage() {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderNav />
      <Content>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
          <Typography.Title
            level={2}
            style={{ textAlign: "center", marginBottom: "32px" }}
          >
            {t("nav.shapes")}
          </Typography.Title>
          <ShapesSection />
        </div>
      </Content>
    </Layout>
  );
}
