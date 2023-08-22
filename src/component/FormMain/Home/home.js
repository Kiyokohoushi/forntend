import React from "react";
import { Layout } from "antd";
import Menu from "../menu/menu";
import "../../../css/main.css";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function home(props) {
  return (
    <Layout>
      <Sider style={{ backgroundColor: "white" }}>
        <Menu />
      </Sider>
      <Layout>
        <Header className="Header" style={{ backgroundColor: "white" }}>
          <h5>Quản Lý Hệ Thống</h5>
        </Header>
        <Content className="Content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default home;
