import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";

const { Content, Footer } = Layout

const SidebarLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <AppHeader />
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ระบบรายงานโครงการยุทธศาสตร์ ©2025 Created by Strategic Planning Department
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarLayout;
