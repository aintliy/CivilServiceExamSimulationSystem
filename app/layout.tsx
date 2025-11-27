import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';
import "./globals.css";

export const metadata: Metadata = {
  title: "无相考试系统 - 公务员面试笔试培训平台",
  description: "AI辅助面试训练，专家精准点评",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body style={{ margin: 0, padding: 0 }}>
        <AntdRegistry>
          <AuthProvider>
            <AuthGuard>
              {children}
            </AuthGuard>
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
