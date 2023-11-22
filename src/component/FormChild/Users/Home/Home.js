import React, { useEffect, useState } from "react";
import logo from "../Image/Logo.png";
import "../../../../css/Users/Trangchu.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Avatar, Button, Input, Layout, Space } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";

function Home(props) {
  const [isLogin, setIsLogin] = useState();

  useEffect(() => {
    let CheckToken = localStorage.getItem("User");

    setIsLogin(CheckToken);
  }, []);
  return (
    <div>
      <Layout>
        <Header
          style={{
            padding: "0 10px",
            display: "flex",
            backgroundColor: "white",
            alignItems: "center",
          }}
        >
          <div className="Left">
            <Space direction="horizontal" size={30}>
              <div className="BoxLogo">
                <img src={logo} alt="Logo" width={44} height={44} />
                <p className="Logo">Logo</p>
              </div>
              <div className="BoxMenu">
                <Space direction="horizontal" size={30}>
                  <Link to={"/TrangChu"}>Trang chủ</Link>
                  <Link to={"#"}>Trở thành người bán hàng</Link>
                  <Link to={"#"}>Khuyến mại</Link>
                  <Link to={"#"}>Thể loại</Link>
                </Space>
              </div>
            </Space>
          </div>
          <div className="Right">
            <Space direction="horizontal">
              <Space direction="horizontal" size={211}>
                <div className="BoxSearch">
                  <Input
                    size="small"
                    prefix={<SearchOutlined />}
                    style={{
                      borderRadius: "20px",
                    }}
                  />
                </div>
                <div className="BoxOrderCart">
                  <Space direction="horizontal" size={10}>
                    <Link to={"/GioHang"}>
                      <ShoppingCartOutlined />
                      Giỏ hàng
                    </Link>
                    <Link to={"/Notification"}>
                      <BellOutlined />
                    </Link>
                  </Space>
                </div>
              </Space>
              <div className="BoxAccount">
                <div className="Name">
                  {isLogin ? (
                    <p style={{fontSize: "20px", color:"blueviolet"}}>{isLogin}</p>
                  ) : (
                    <div className="ButtonAccount">
                      <Link to={"/register"}>Đăng ký</Link>
                      <span style={{ margin: "0 10px" }}>|</span>
                      <Link to={"/login"} style={{
                        marginRight: "10px",
                      }}>Đăng nhập</Link>
                    </div>
                  )}
                </div>
                <Avatar />
              </div>
            </Space>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <p>Footer</p>
        </Footer>
      </Layout>
    </div>
  );
}

export default Home;
