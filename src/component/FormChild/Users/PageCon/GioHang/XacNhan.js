import { Button, Checkbox, Input, Layout, Radio } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../../../css/Users/PageCon/XacNhan.css";
import {
  AccountCircleOutlined,
  DeleteOutline,
  LocalShippingOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import Paypal from "../image/PayPal_horizontally_Logo_2014.png";
import axios from "axios";

function XacNhan(props) {
  const navigate = useNavigate();
  const id_DH = localStorage.getItem("id_DH");
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const countitems = selectedItems.length;
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

  function handleXacNhan() {
    axios
      .get("https://localhost:7177/api/Payment/start-payment/" + id_DH)
      .then((res) => {
      window.location.replace(res.data);
      });
  }

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
                        {id_DH}
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
                  <div className="Title_Content">
                    <h3 style={{ display: "flex", alignItems: "center" }}>
                      <LocalShippingOutlined /> Tùy chọn hình thức giao hàng
                    </h3>
                  </div>
                  <div className="SelectOption_DH">
                    {OptionDH.map((items) => (
                      <div className="Option_DH">
                        <div className="OptionItem" id={items.id}>
                        <Radio>
                          <div className="Info_Option">
                            <div className="Cost_Option">
                              {new Intl.NumberFormat("vi-VN").format(
                                items.cost
                              )}{" "}
                              đ
                            </div>
                            <div className="Name_Option">{items.name}</div>
                            <div className="Detail_Option">{items.detail}</div>
                          </div>
                          </Radio>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="LeftContentBottom_DH">
                <div className="MainContentBottom_DH">
                  <div className="Title_Content">
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
                    <Input />
                  </div>
                </div>
              </div>
            </div>
            <div className="RightContentXacNhanDH">
              <div className="RightContent_PTTT">
                <div className="Title_Content">
                  <h3 style={{ display: "flex", alignItems: "center" }}>
                    Phương thức thanh toán
                  </h3>
                </div>
                <div className="Main_PTTT">
                  <p>Thay đổi phương thức thanh toán</p>
                  <Radio>Thanh toán khi nhận hàng</Radio>
                  <p>Hoặc</p>
                  <Radio>
                    <img
                      src={Paypal}
                      alt="Paypal"
                      width={"150px"}
                      height={"40px"}
                    />
                  </Radio>
                </div>
              </div>
              <div className="RightContent_CTTT">
                <div className="Title_CTTT">
                  <h3 style={{ display: "flex", alignItems: "center" }}>
                    Chi tiết thanh toán
                  </h3>
                </div>
                <div className="Main_CTTT">
                  <div className="RightContentMid">
                    <div className="TamTinh">
                      <p>Tạm tính ({countitems} Sản phẩm) :</p>
                      <p>
                        {new Intl.NumberFormat("vi-VN").format(totalPrice)} đ
                      </p>
                    </div>
                    <div className="TamTinh">
                      <p>Phí vận chuyển :</p>
                      <p>{new Intl.NumberFormat("vi-VN").format(25000)} đ</p>
                    </div>
                  </div>
                  <div className="RightContentBot">
                    <div className="TamTinh">
                      <p>Tổng cộng :</p>
                      <p>
                        {new Intl.NumberFormat("vi-VN").format(
                          totalPrice + 25000
                        )}{" "}
                        đ
                      </p>
                    </div>
                    <Button
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "blueviolet",
                        color: "white",
                        marginTop: "20px",
                      }}
                      onClick={() => handleXacNhan()}
                    >
                      Đặt hàng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default XacNhan;
