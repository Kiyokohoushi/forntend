import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Table } from "antd";
import React, { useEffect, useState } from "react";
import ModalNK from "../Kho/PhieuKho/modal_PhieuKho";
import "../../../../css/phieukho.css";
import axios from "axios";

const { Search } = Input;

function Table_PhieuKho(props) {
  const [Show, setShow] = useState(false);
  const [Action, setAction] = useState();
  const [DSPhieuNhap, setDSPhieuNhap] = useState();

  async function getDSPhieuNhap() {
    await axios
      .get("https://localhost:7177/api/PhieuNhap/DanhSachPhieuNhap?page=1")
      .then((res) => {
        setDSPhieuNhap(res.data.Data);
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
      render: (_, data, index) => index + 1,
      align: "center",
    },
    {
      title: "Mã Số Phiếu",
      dataIndex: "ID_PhieuNhap",
      key: "ID_PhieuNhap",
      align: "center",
    },
    {
      title: "Ngày nhập",
      dataIndex: "NgayNhap",
      key: "NgayNhap",
      align: "center",
      render: (text, record) => {
        // Giả sử "NgayNhap" là một chuỗi Ngày hợp lệ, nếu không, điều chỉnh theo cần thiết
        const dateObject = new Date(text);
        const formattedDate = dateObject.toLocaleDateString("vi-VN", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Người nhập",
      dataIndex: "NguoiNhapHang",
      key: "NguoiNhapHang",
      align: "center",
    },
    {
      title: "Tên đơn vị",
      dataIndex: "TenDonVi",
      key: "TenDonVi",
      align: "center",
    },
    {
      title: "Thao Tác",
      render: Thaotac,
      align: "center",
    },
  ];

  function Thaotac() {
    return <di></di>;
  }
  function ShowAdd() {
    setShow(true);
    setAction("Add");
  }
  function ShowEdit() {
    setShow(true);
    setAction("Edit");
  }
  function HiddenModal() {
    setShow(false);
  }
  return (
    <div>
      <div className="headerPhieu">
        <div className="Search">
          <Search placeholder="Tìm kiếm nhập theo tên" />
        </div>
        <div className="date">
          <DatePicker
            style={{ height: "32px", marginRight: "10px" }}
            placeholder="Từ ngày"
          />
          <DatePicker style={{ height: "32px" }} placeholder="Đến ngày" />
        </div>
        <div className="Buttom">
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={ShowAdd}
          >
            <PlusOutlined />
            Tạo Phiếu Nhập
          </Button>
          <Button type="primary">Xuất File Excel</Button>
        </div>
      </div>
      <Table
        columns={columns}
        rowKey={"ID_PhieuNhap"}
        expandable={{
         expandedRowRender: (record) => (
          <Table/>
         )
        }}
        dataSource={DSPhieuNhap}
        bordered
      />
      <ModalNK show={Show} hiddenModal={HiddenModal} action={Action} />
    </div>
  );
}

export default Table_PhieuKho;
