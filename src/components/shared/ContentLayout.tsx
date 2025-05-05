"use client";

import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "100vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          position: "fixed",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default ContentLayout;
