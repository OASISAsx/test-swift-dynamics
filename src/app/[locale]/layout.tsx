import { AntdRegistry } from "@ant-design/nextjs-registry";
import React from "react";
import "@ant-design/v5-patch-for-react-19";
import "../globals.scss";
import ClientProviders from "./ClientProviders";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Test",
  description: "A test project for Next.js 13 with Ant Design and i18n",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale || "en"}>
      <body>
        <AntdRegistry>
          <ClientProviders locale={locale}>{children}</ClientProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
