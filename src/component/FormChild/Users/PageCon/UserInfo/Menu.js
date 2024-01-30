import { Avatar, Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import "../../../../../css/Users/PageCon/UserMenu.css";
import React, { useState } from "react";
import { FormOutlined, UserOutlined } from "@ant-design/icons";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

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
              <Link to={"/user/account"}>
                Sửa hồ sơ <FormOutlined />
              </Link>
            </div>
          </div>
          <div className="BottomSider">
            <div className="DropdownMenu">
              <Space direction="vertical">
                <Link to={"/user/account"}>
                  <UserOutlined /> Tài khoản của tôi
                </Link>
                {CurrentPathName === "/user/account" ||
                CurrentPathName === "/user/address" ||
                CurrentPathName === "/user/repass" ? (
                  <div className="MenuHide">
                    <Space direction="vertical">
                      <NavLink
                        to="/user/account"
                        className={
                          location.pathname === "/user/account"
                            ? "activeLink"
                            : ""
                        }
                      >
                        Hồ sơ
                      </NavLink>
                      <NavLink
                        to="/user/address"
                        className={
                          location.pathname === "/user/address"
                            ? "activeLink"
                            : ""
                        }
                      >
                        Địa chỉ
                      </NavLink>
                      <NavLink
                        to="/user/repass"
                        className={
                          location.pathname === "/user/repass"
                            ? "activeLink"
                            : ""
                        }
                      >
                        Đổi mật khẩu
                      </NavLink>
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
