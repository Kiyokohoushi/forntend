import { Checkbox, Input, Layout, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { useLocation } from "react-router-dom";
import "../../../../../css/Users/PageCon/XacNhan.css";
import {
  AccountCircleOutlined,
  DeleteOutline,
  LocalShippingOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";

function XacNhan(props) {
  const location = useLocation();
  const data = location.state && location.state.data;
  const OptionDH = [
    {
      id: "1",
      name: "GH tiêu chuẩn",
      cost: "25000",
      detail: "Giao hàng từ 2-5 ngày",
    },
    {
      id: "2",
      name: "GH hỏa tốc",
      cost: "35000",
      detail: "giao từ 1-2 ngày",
    },
  ];
  return (
    <>
      <Layout
        style={{
          backgroundColor: "white",
          margin: "20px 100px 0 100px",
          padding: 0,
        }}
      >
        <Header
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            width: "100%",
            height: "max-content",
          }}
        >
          <h1 style={{ margin: "10px" }}>Xác nhận đơn hàng</h1>
        </Header>
        <Content
          style={{
            width: "100%",
            backgroundColor: "#fff",
            minHeight: "700px",
            padding: 0,
          }}
        >
          <div className="MainContentXacNhanDH">
            <div className="LeftContentXacNhanDH">
              <div className="LeftContentTop_DH">
                <div className="MainCart_DH">
                  <div className="TitleCart_DH">
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                      <ShoppingCartOutlined />
                      Thông tin đơn hàng
                    </h3>
                    <p>
                      Mã đơn hàng:{" "}
                      <span style={{ color: "#898ade", fontWeight: "bold" }}>
                        {localStorage.getItem("id_DH")}
                      </span>
                    </p>
                  </div>
                  <div className="CartItem">
                    {data.Items.map((item) => (
                      <div className="SanPhamCart" key={item.ID_GioHang}>
                        <div className="CartInner">
                          <div className="CartLeft">
                            <img
                              src={item.Picture}
                              alt="Anh"
                              height={"100px"}
                              width={"100px"}
                            />
                            <p>{item.TenSanPham}</p>
                          </div>

                          <div className="CartMiddle">
                            <p>
                              {new Intl.NumberFormat("vi-VN").format(
                                item.GiaBan
                              )}{" "}
                              đ
                            </p>
                          </div>
                          <div className="CartRight">
                            <p>Số lượng:{item.SoLuong}</p>
                            <DeleteOutline />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="LeftContentMid_DH">
                <div className="MainLeftContentMid_DH">
                  <div className="TitleShipping_DH">
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingOutlined /> Tùy chọn hình thức giao hàng
                    </h3>
                  </div>
                  <div className="SelectOption_DH">
                    {OptionDH.map((items) => (
                      <div className="Option_DH">
                        <div className="OptionItem" id={items.id}>
                          {items.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="LeftContentBottom_DH">
                <div className="MainContentBottom_DH">
                  <div className="Title_InfoUser">
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                      <AccountCircleOutlined /> Thông tin khách hàng
                    </h3>
                  </div>
                  <div className="Input_InfoUser">
                    <div className="InputLeft_DH">
                      <p>Họ tên</p>
                      <Input />
                    </div>
                    <div className="InputRight_DH">
                      <p>Số điện thoại</p>
                      <Input />
                    </div>
                  </div>
                  <div className="InputAddress">
                    <p>Địa chỉ</p>
                    <Input/>
                  </div>
                </div>
              </div>
            </div>
            <div className="RightContentXacNhanDH">
              <div className="RightContent_PTTT">
              <div className="Title_PTTT">
                <h3 style={{ display: "flex", alignItems: "center" }}>Phương thức thanh toán</h3>
              </div>
              <div className="Main_PTTT">
                <p>Thay đổi phương thức thanh toán</p>
                <Checkbox>Thanh toán khi nhận hàng</Checkbox>
                <p>Hoặc</p>
                <Checkbox></Checkbox>
              </div>
              </div>
              <div className="RightContent_CTTT">
              <div className="Title_CTTT">
                <h3 style={{ display: "flex", alignItems: "center" }}>Chi tiết thanh toán</h3>
              </div>
              <div className="Main_CTTT"></div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default XacNhan;
