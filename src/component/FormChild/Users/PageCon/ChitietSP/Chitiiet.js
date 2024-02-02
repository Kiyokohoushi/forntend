import { Breadcrumb, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../../../../css/Users/PageCon/Chitiet.css";

function Chitiiet(props) {
  const location = useLocation();
  const data = location.state && location.state.SanPham;
  const [ThongTinSanPham, setThongTinSanPham] = useState([]);

  function getThongTinSanPham() {
    axios
      .post(
        "https://localhost:7177/api/TrangChuDSSP/ChiTietSP " + data.MaSanPham
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setThongTinSanPham(response.data);
        } else {
          message.error("Lỗi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getThongTinSanPham();
  }, []);
  return (
    <div>
      <Layout
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "20px 70px 0px 70px",
        }}
      >
        <Breadcrumb
          items={[
            {
              title: "Trang chủ",
              href: "/",
            },
            {
              title: data.LoaiSanPham,
              href: "/search",
            },
            {
              title: ThongTinSanPham.TenSanPham,
            },
          ]}
          style={{
            backgroundColor: "#f5f5f5",
            margin: "10px 70px 0px 70px",
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        />
        <Content style={{ margin: "10px 70px 10px 70px" }}>
          <div className="MainContent_Items">
            <div className="MainContent_ItemPicture">
              <img src={data.Picture} alt="Anh sản phẩm" width={460} height={460}/>
            </div>
            <div className="MainContent_ItemsDetails">
              <h1>{data.TenSanPham}</h1>
            </div>
          </div>
          <div className="Mota_Items">
            <h3>Mô tả sản phẩm </h3>
          </div>
          <div className="RatesUser_items">
            <h3>Đánh giá sản phẩm </h3>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Chitiiet;
