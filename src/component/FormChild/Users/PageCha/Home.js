import React, { useEffect, useState } from "react";
import logo from "../PageCha/Image/Logo.png";
import "../../../../css/Users/PageCha/Home.css";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { Avatar, Button, Dropdown, Modal, Input, Layout, Space, Badge } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Home(props) {
  const location = useLocation();
  const IdUser = parseInt(localStorage.getItem("ID"));
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState();
  const [DsGioHang, setDsGioHang] = useState(0);
  const items = [
    {
      label: <Link to={"/user/account"}>Tài khoản của tôi</Link>,
    },
    {
      label: "Đơn hàng",
    },
    {
      label: "Đăng xuất",
      danger: true,
      onClick: Logout,
    },
  ];

  async function Logout() {
    confirm({
      centered: true,
      title: "Thông Báo",
      content: "Bạn có muốn đăng xuất không",
      cancelText: "Hủy",
      okText: "Có",
      onOk() {
        localStorage.clear();
        navigate("/login");
      },
    });
  }
  function getDSGioHang() {
    axios
      .get("https://localhost:7177/api/GioHang/DanhSachSP?page=1")
      .then((res) => {
        const data = res.data.Data;
        const LocDS = data.filter((items) => items.idUser === IdUser);  
        setDsGioHang(LocDS);
      });
  }
  useEffect(() => {
    let CheckToken = localStorage.getItem("User");
    setIsLogin(CheckToken);
    getDSGioHang()
  }, []);
  return (
    <div>
      <Layout>
        <Header
          style={{
            width: "100%",
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
                <p className="Logo">MR</p>
              </div>
              <div className="BoxMenu">
                <Space direction="horizontal" size={30} style={{ width:"100%", minHeight:"64px"}}>
                  <Link to={"/"} className={location.pathname === "/"? "Active_Link":""}>Trang chủ</Link>
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
                  <Badge color={"#1677ff"} count={DsGioHang.length} size="small">
                    <Link to={"/GioHang"} className={location.pathname==="/GioHang"?"Active_Cart":""}>
                      <ShoppingCartOutlined />
                      Giỏ hàng
                    </Link>
                    </Badge>
                    <Link to={"/Notification"}>
                      <BellOutlined />
                    </Link>
                  </Space>
                </div>
              </Space>
              <div className="BoxAccount">
                <div className="Name">
                  {isLogin ? (
                    <div className="BoxIsLogin">
                      <p style={{ fontSize: "20px", color: "blueviolet", marginRight:"5px" }}>
                        {isLogin}
                      </p>
                      <Dropdown
                        menu={{ items }}
                        trigger={"click"}
                        overlayStyle={{ width: "180px" }}
                      >
                        <Avatar icon={<UserOutlined/>} />
                      </Dropdown>
                    </div>
                  ) : (
                    <div className="ButtonAccount">
                      <Link to={"/register"}>Đăng ký</Link>
                      <span style={{ margin: "0 10px" }}>|</span>
                      <Link
                        to={"/login"}
                        style={{
                          marginRight: "10px",
                        }}
                      >
                        Đăng nhập
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </Space>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer>
          <div className="TitleFooter">
            <h2 style={{ marginBottom: "20px" }}>Thông tin khác</h2>
            <Space.Compact
              style={{
                width: "30%",
              }}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Input your email"
                style={{ borderRadius: "20px 0 0 20px", width: "68%" }}
              />
              <Button
                type="primary"
                style={{
                  backgroundColor: "blueviolet",
                  borderRadius: "0 20px 20px 0",
                  minHeight: "41.6px",
                  width: "30%",
                }}
              >
                Subscribe
              </Button>
            </Space.Compact>
          </div>
          <div className="ContentFooter">
            <div className="SanPham">
              <h2>Sản phẩm</h2>
              <p>Sức khỏe và làm đẹp</p>
              <p>Thời trang</p>
              <p>Điện tử</p>
              <p>Quần áo</p>
              <p>Sản phẩm thực phẩm và đồ uống</p>
            </div>
            <div className="CSKH">
              <h2>Chăm sóc khách hàng</h2>
              <p>Blog</p>
              <p>Hướng dẫn mua hàng</p>
              <p>Hướng dẫn bán hàng</p>
              <p>Liên hệ để được tư vấn</p>
            </div>
            <div className="ThanhToan">
              <h2>Hình thức thanh toán</h2>
              <p>Visa</p>
              <p>Thanh toán khi nhận hàng</p>
              <p>Thẻ tín dụng</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default Home;
