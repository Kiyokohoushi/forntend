import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Table_EX(props) {
  const [DsPhieuNhap, setDsPhieuNhap] = useState();

  async function getDSPhieuNhap() {
    axios
      .get(
        "https://localhost:7177/api/ChiTietPhieuNhap/DanhSachPhieuNhapKho?page=1"
      )
      .then((res) => {
        setDsPhieuNhap(res.data.Data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    getDSPhieuNhap();
  }, []);

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Mã Số Phiếu",
      dataIndex: "ID_PhieuNhap",
      key: "ID_PhieuNhap",
      align: "center",
    },
    {
      title: "Mã số sản phẩm",
      dataIndex: "MSanPham",
      key: "MSanPham",
      align: "center",
    },
    {
      title: "Tên Hàng Hóa",
      dataIndex: "TenSanPham",
      key: "TenSanPham",
      align: "center",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "TenLoaiSP",
      key: "TenLoaiSP",
      align: "center",
    },

    {
      title: "Thực Nhập",
      dataIndex: "SoLuong",
      key: "SoLuong",
      align: "center",
    },
    {
      title: "Đơn Vị Tính",
      dataIndex: "TenDonVi",
      key: "TenDonVi",
      align: "center",
    },

    {
      title: "Đơn Giá",
      dataIndex: "DonGia",
      key: "DonGia",
      align: "center",
    },
    {
      title: "Thành Tiền",
      dataIndex: "ThanhTien",
      key: "ThanhTien",
      align: "center",
    },
    {
      title: "Thao Tác",
      render: Thaotac,
      align: "center",
    },
  ];

  function Thaotac() {}
  return (
    <div>
      <Table columns={columns} dataSource={DsPhieuNhap} />
    </div>
  );
}

export default Table_EX;
