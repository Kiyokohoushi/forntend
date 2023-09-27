import React from "react";
import { Avatar, Button, Layout, Popconfirm, message } from "antd";
import Menu from "../menu/menu";
import "../../../css/main.css";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const { Header, Sider, Content } = Layout;


function Home(props) {
  const navigate = useNavigate()

  function confirm() {
    localStorage.removeItem("LoginCT");
      message.success("Đăng xuất thành công");
      navigate("/login");
  }
  return (
    <Layout>
      <Sider style={{ backgroundColor: "white" }}>
        <Menu />
      </Sider>
      <Layout>
        <Header
          className="Header"
          style={{ backgroundColor: "white", padding: "0px" }}
        >
          <div className="title">
            <p>QUẢN LÝ HỆ THỐNG</p>
          </div>
          <div className="avatar">
            <Avatar icon={<UserOutlined />} />
          </div>
          <div className="avatar">
            <input
              value="Tên đăng nhập"
              style={{ border: "0px", fontSize: "15px" }}
              disabled
            ></input>
            <Popconfirm
              title="Đăng xuất"
              onConfirm={confirm}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger>Đăng xuất</Button>
            </Popconfirm>
          </div>
        </Header>
        <Content className="Content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Home;
