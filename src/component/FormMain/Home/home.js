import React from "react";
import { Avatar, Button, Layout, Popconfirm, message } from "antd";
import Menu from "../menu/menu";
import "../../../css/main.css";
import { Outlet, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const { Header, Sider, Content } = Layout;

function Home(props) {
  const navigate = useNavigate();
  const NameUser = localStorage.getItem("User");

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
          <div className="right_header">
            <div>
              <Avatar size={"large"} icon={<UserOutlined />} style={{marginRight:"10px"}} />
            </div>
            <div>
              <input
                value={NameUser}
                style={{ border: "0px", fontSize: "15px" }}
                disabled
              ></input>
            </div>
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
