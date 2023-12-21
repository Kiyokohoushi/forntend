import React, { useEffect, useState } from "react";
import { Checkbox, Layout, Button, Input, InputNumber } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { DeleteOutlined } from "@ant-design/icons";
import "../../../../../css/Users/PageCon/GioHang.css";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";

const GioHang = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const countitems = selectedItems.length;
  const [DsGioHang, setDSGioHang] = useState([]);
  const [ThongTinSP, setThongTinSP] = useState();
  const Token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

  const handleCheckboxChange = (id, price) => {
    const isSelected = selectedItems.includes(id);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
      setTotalPrice(totalPrice - price);
    } else {
      setSelectedItems([...selectedItems, id]);
      setTotalPrice(totalPrice + price);
    }
  };

  const handleDeleteButtonClick = () => {
    // Xử lý xóa các sản phẩm đã chọn khỏi danh sách data
    const updatedData = DsGioHang.filter(
      (item) => !selectedItems.includes(item.Msanpham)
    );
    setSelectedItems([]);
    setTotalPrice(0);

    // Thực hiện các xử lý khác tại đây nếu cần
    console.log("DELETED selected items:", selectedItems);
    console.log("Updated data:", updatedData);
  };

  // Danh Sach ro hang
  function getDSGioHang() {
    const IdUser = parseInt(localStorage.getItem("ID"));
    axios
      .get("https://localhost:7177/api/GioHang/DanhSachSP?page=1")
      .then((res) => {
        const data = res.data.Data;
        const LocDS = data.filter((items) => items.idUser === IdUser);  
        setDSGioHang(LocDS);
      });
  }
  // function getThongTinSP(Id){
  //   axios.get("https://localhost:7177/api/GioHang/ChiTietSP" + Id)
  //   .then((res)=>{

  //     setThongTinSP(res.data.Data)
  //   }).catch((err)=>{
  //     console.error(err);
  //   });
  // }
  useEffect(() => {
    getDSGioHang();
  }, []);
  return (
    <div>
      <Layout
        style={{
          backgroundColor: "white",
          margin: "20px 100px 0 100px",
          padding: 0,
        }}
      >
        <Header style={{ backgroundColor: "#f5f5f5", padding: 0 }}>
          <h1>Giỏ Hàng</h1>
        </Header>
        <Content
          style={{
            backgroundColor: "#f5f5f5",
            minHeight: "700px",
            padding: 0,
          }}
        >
          <div className="MainContent">
            <div className="LeftContent">
              <div className="TopLeftContent">
                <div className="CheckboxWrap">
                  <Checkbox style={{ marginRight: "10px" }} />
                  <p>SELECT All</p>
                </div>
                <div className="DeleteWrap">
                  <DeleteOutlined onClick={handleDeleteButtonClick} />
                  <p>DELETE</p>
                </div>
              </div>
              <div className="BottomLeftContent">
                {DsGioHang.map((item) =>( 
                  <div className="SanPhamCart" key={item.ID_GioHang}>
                    <div className="CartInner">
                      <div className="CartLeft">
                        <Checkbox
                          style={{ marginRight: "10px" }}
                          onChange={() =>
                            handleCheckboxChange(item.ID_GioHang, item.GiaBan)
                          }
                        />
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
                          {new Intl.NumberFormat("vi-VN").format(item.GiaBan)} đ
                        </p>
                      </div>
                      <div className="CartRight">
                        <InputNumber defaultValue={item.GioSoLuong} />
                        <DeleteOutline />
                      </div>
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
            <div className="RightContent">
              <div className="RightContentTop">
                <h2>Thông tin đơn hàng</h2>
              </div>
              <div className="RightContentMid">
                <div className="TamTinh">
                  <p>Tạm tính ({countitems} Sản phẩm) :</p>
                  <p>{new Intl.NumberFormat("vi-VN").format(totalPrice)} đ</p>
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
                    {new Intl.NumberFormat("vi-VN").format(totalPrice + 25000)}
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
                >
                  Xác nhận giỏ hàng ({countitems})
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default GioHang;
