import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Table } from "antd";
import React, { useState } from "react";
import ModalNK from '../../FormChild/Kho/PhieuKho/modal_PhieuKho'
import "../../../css/phieukho.css";

const { Search } = Input;

function Table_PhieuKho(props) {
  const [Show, setShow] = useState(false);
  const [Action, setAction] = useState();
  const columns = [
    {
      title: "STT",
      render: (_, data, index) => index + 1,
      align: "center",
    },
    {
      title: "Mã Số Phiếu",
      dataIndex: "MSPhieu",
      key: "MSPhieu",
      align: "center",
    },
    {
      title: "Tên Hàng Hóa",
      dataIndex: "tenHangHoa",
      key: "tenHangHoa",
      align: "center",
    },
    {
      title: "Ngày Nhập",
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      align: "center",
    },
    {
      title: "Người Nhập",
      dataIndex: "nguoiNhap",
      key: "nguoiNhap",
      align: "center",
    },
    {
      title: "Số Lượng",
      children: [
        {
          title: "Thực Nhập",
          dataIndex: "thucNhap",
          key: "thucNhap",
          align: "center",
        },
        {
          title: "Đơn Vị Tính",
          dataIndex: "donViTinh",
          key: "donViTinh",
          align: "center",
        },
      ],
      align: "center",
    },
    {
      title: "Đơn Giá",
      dataIndex: "donGia",
      key: "donGia",
      align: "center",
    },
    {
      title: "Thành Tiền",
      dataIndex: "thanhTien",
      key: "thanhTien",
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
          <DatePicker style={{ height: "32px", marginRight:"10px" }} placeholder="Từ ngày" />
          <DatePicker style={{ height: "32px" }} placeholder="Đến ngày" />
        </div>
        <div className="Buttom">
          <Button type="primary" style={{marginRight:"10px"}} onClick={ShowAdd}>
            <PlusOutlined />
            Tạo Phiếu Nhập
          </Button>
          <Button type="primary">Xuất File Excel</Button>
        </div>
      </div>
      <Table columns={columns} bordered />
      <ModalNK
        show={Show}
        hiddenModal={HiddenModal}
        action ={Action}
      />
    </div>
  );
}

export default Table_PhieuKho;
