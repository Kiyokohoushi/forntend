import React, { useEffect, useState } from "react";
import { Layout, Button, Input, InputNumber } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { DeleteOutlined } from "@ant-design/icons";
import "../../../../../css/Users/PageCon/GioHang.css";
import { DeleteOutline, LocationOnOutlined } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GioHang(props){
  const navigate = useNavigate();
  const IdUser = parseInt(localStorage.getItem("ID"));
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const countitems = selectedItems.length;
  const [DsGioHang, setDSGioHang] = useState([]);
  // const [ThongTinSP, setThongTinSP] = useState();
  const Token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

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

  function handleXacNhan(){
    axios.post("https://localhost:7177/api/Payment/process-payment?idUser="+IdUser)
    .then((res) =>{
      const data= res.data;
      localStorage.setItem("id_DH", data.OrderId);
      navigate("/XacNhan", { state:{data}})
    })
  }
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
        <Header style={{ backgroundColor: "#fff", padding:"10px", width:"100%", height:"max-content" }}>
          <h1 style={{margin:"10px"}}>Giỏ Hàng</h1>
        </Header>
        <Content
          style={{
            backgroundColor: "#fff",
            minHeight: "700px",
            padding: 0,
          }}
        >
          <div className="MainContent">
            <div className="LeftContent">
              <div className="TopLeftContent">
                <div className="DeleteWrap">
                  <DeleteOutlined onClick={handleDeleteButtonClick} />
                  <p>Delete All</p>
                </div>
              </div>
              <div className="BottomLeftContent">
                {DsGioHang.map((item) =>( 
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
            <div className="RightContentTitle">
              <h4 style={{display:"flex", alignItems:"center"}}><LocationOnOutlined fontSize="small"/>Địa chỉ :</h4>
              <Input placeholder="Nhập địa chỉ vào đây..." style={{marginTop:"10px",border:"0px"}}/>
            </div>
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
                  onClick={()=> handleXacNhan()}
                >
                  Xác nhận đơn hàng
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
