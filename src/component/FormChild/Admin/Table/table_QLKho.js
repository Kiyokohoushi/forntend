import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../css/phieukho.css";
import { Table, Input, Button, message } from "antd";
const { Search } = Input;

function Table_QLKho(props) {
  const [DSKho, setDSKho] = useState(null);

  async function getDSKho() {
    await axios
      .get("https://localhost:7177/api/ChiTietPhieuNhap/DanhSachKho?page=1")
      .then((res) => {
        if (res.status === 200) {
          setDSKho(res.data.Data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getDSKhoHetHang(){
   await axios.get("https://localhost:7177/api/ChiTietPhieuNhap/DanhSachKhoDaHetHang?page=1")
    .then((res)=>{
      if(res.status === 200){
        setDSKho(res.data.Data)
      }
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  async function getDSKhoSapHet(){
   await axios.get("https://localhost:7177/api/ChiTietPhieuNhap/DanhSachKhoSapHetHang?page=1")
    .then((res)=>{
      if(res.status === 200){
      setDSKho(res.data.Data);
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
  useEffect(() => {
    getDSKho();
  }, []);
  const columns = [
    {
      title: "STT",
      render: (_, data, index) => index + 1,
      align: "center",
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "MSanPham",
      key: "MSanPham",
      align: "center",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "TenSanPham",
      key: "TenGiaPham",
      align: "center",

    },
    {
      title: "Giá bán",
      dataIndex: "GiaBan",
      key: "GiaBan",
      align: "center",

    },
    {
      title: "SoLuong",
      dataIndex: "SoLuong",
      key: "SoLuong",
      align: "center",

    },
    {
      title: "Loại hàng",
      dataIndex: "LoaiSanPham",
      key: "LoaiSanPham",
      align: "center",
    },
  ];
  return (
    <>
      <div className="headerQLKho">
        <div className="Search_QLKho">
          <Search placeholder="Tìm kiếm theo tên" />
        </div>
        <div className="Filter_Kho">
          <Button style={{ color: "red", width: "150px", borderRadius: "0px" }} onClick={()=>getDSKho()}>
            Tất Cả
          </Button>
          <Button
            style={{ color: "orange", width: "150px", borderRadius: "0px" }} onClick={()=>getDSKhoSapHet()}
          >
            Sắp Hết Hàng
          </Button>
          <Button
            style={{ color: "Blue", width: "150px", borderRadius: "0px" }} onClick={()=>getDSKhoHetHang()}
          >
            Đã Hết Hàng
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={DSKho} />
    </>
  );
}

export default Table_QLKho;
