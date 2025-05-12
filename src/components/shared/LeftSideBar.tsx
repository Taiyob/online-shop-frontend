"use client";

import React, { useState } from "react";
import {
  HomeOutlined,
  OrderedListOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import LogoutForm from "../LogoutForm";
import Link from "next/link";

const { Sider } = Layout;

const LeftSideBar = () => {
  const router = useRouter();
  const [collapsed] = useState(false);
  const pathname = usePathname();

  const getKeyFromPath = (path: string) => {
    if (path.includes("/dashboard/all-users")) return "1";
    if (path.includes("/dashboard/products")) return "2";
    if (path.includes("/dashboard/orders")) return "3";
    return "";
  };

  const selectedKey = getKeyFromPath(pathname);

  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link href={`/dashboard/all-users`}>All Users List</Link>,
    },
    {
      key: "2",
      icon: <ProductOutlined />,
      label: <Link href={`/dashboard`}>All Products List</Link>,
    },
    {
      key: "3",
      icon: <OrderedListOutlined />,
      label: <Link href={`/dashboard`}>All Orders</Link>,
    },
  ];

  return (
    <Layout>
      <Sider
        width={330}
        collapsedWidth={80}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Top content */}
          <div>
            <div className="demo-logo-vertical" />
            <h1 className="text-white px-5 py-5">
              <Link href={`/dashboard`}>Admin Dashboard</Link> :{" "}
              <span className="text-pink-400">Jannatul Ferdous</span>
            </h1>
            <Menu
              theme="dark"
              mode="inline"
              //defaultSelectedKeys={["1"]}
              selectedKeys={[selectedKey]}
              items={menuItems}
            />
          </div>

          {/* Bottom content */}
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
              zIndex: 999,
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <LogoutForm />
            <Button
              onClick={() => router.push("/")}
              type="primary"
              shape="circle"
              icon={<HomeOutlined />}
            />
          </div>
        </div>
      </Sider>
    </Layout>
  );
};

export default LeftSideBar;

/* <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </Content>
      </Layout> */

// pass: oli123oli
