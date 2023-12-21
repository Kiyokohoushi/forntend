import { Avatar, Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import "../../../../../css/Users/PageCon/UserMenu.css";
import React, { useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

function Menu(props) {
  const [Show, setShow] = useState(false);
  const location = useLocation();

  const CurrentPathName = location.pathname;
  function ShowMenu() {
    setShow(!Show);
  }
  return (
    <div>
      <Layout
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "700px",
          padding: 0,
        }}
      >
        <Sider style={{ backgroundColor: "#f8f9fa" }}>
          <div className="TopSider">
            <div className="Avatar">
              <Avatar size={"large"} />
            </div>
            <div className="NameAndFix">
              <p>{localStorage.getItem("User")}</p>
              <Link to={"/"}>
                Sửa hồ sơ <FormOutlined />
              </Link>
            </div>
          </div>
          <div className="BottomSider">
            <div className="DropdownMenu">
              <Space direction="vertical">
                <Link to={"/user/account"}>Tài khoản của tôi</Link>
                {CurrentPathName === "/user/account" ? (
                  <div className="MenuHide">
                    <Space direction="vertical">
                      <Link to={"/user/account/profile"}>Hồ sơ</Link>
                      <Link to={"/user/payment"}>Ngân hàng</Link>
                      <Link to={"/user/address"}>Địa chỉ</Link>
                      <Link to={"/user/repass"}>Đổi mật khẩu</Link>
                    </Space>
                  </div>
                ) : null}
              </Space>
            </div>
          </div>
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </div>
  );
}

export default Menu;
