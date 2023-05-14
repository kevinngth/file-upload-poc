import { Layout as AntdLayout, theme } from "antd";
import { Typography } from "antd";
import React from "react";
const { Paragraph, Title } = Typography;

const { Content } = AntdLayout;

const Layout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout>
      <Content
        style={{
          padding: "0 50px",
          height: "100vh",
        }}
      >
        <Title>File Upload System</Title>
        <Paragraph>Built with React, FastAPI and S3</Paragraph>
        <AntdLayout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </AntdLayout>
      </Content>
    </AntdLayout>
  );
};

export default Layout;
