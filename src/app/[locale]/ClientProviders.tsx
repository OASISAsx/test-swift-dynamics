"use client";

import "@ant-design/v5-patch-for-react-19";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ConfigProvider, App as AntdApp } from "antd";
import LocaleProvider from "./LocaleProvider";

export default function ClientProviders({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffa200",
          },
          components: {
            App: {
              colorBgContainer: "transparent",
            },
          },
        }}
      >
        <LocaleProvider locale={locale}>
          <AntdApp style={{ background: "transparent" }}>{children}</AntdApp>
        </LocaleProvider>
      </ConfigProvider>
    </Provider>
  );
}
