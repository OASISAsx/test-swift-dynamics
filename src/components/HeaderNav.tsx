"use client";

import React from "react";
import { Button, Layout, Menu } from "antd";
import { AppstoreOutlined, TeamOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import LanguageSelector from "./LanguageSelector";

const { Header } = Layout;

const HeaderNav: React.FC = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  // Extract locale from pathname and get path without locale prefix
  const localeMatch = pathname?.match(/^\/(th|en)/);
  const locale = localeMatch ? localeMatch[1] : "en";
  const pathWithoutLocale = pathname?.replace(/^\/(th|en)/, "") || "/";

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreOutlined />,
      label: t("nav.home"),
    },
    {
      key: "/shapes",
      icon: <AppstoreOutlined />,
      label: t("nav.shapes"),
    },
    {
      key: "/persons",
      icon: <TeamOutlined />,
      label: t("nav.persons"),
    },
  ];

  // const handleMenuClick = ({ key }: { key: string }) => {
  //   router.push(`/${locale}${key}`);
  // };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <div>
        <Button onClick={() => router.push(`/${locale}`)}>Home</Button>
      </div>
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', color: '#333' }}>
          {t('nav.appTitle')}
        </h1>
        <Menu
          mode="horizontal"
          selectedKeys={[pathWithoutLocale]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0, border: 'none' }}
        />
      </div> */}
      <LanguageSelector />
    </Header>
  );
};

export default HeaderNav;
