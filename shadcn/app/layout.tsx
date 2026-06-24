import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "定投记录管理",
  description: "轻量专业的定投持仓记录主界面",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
