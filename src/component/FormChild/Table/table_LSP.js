import { Table, Input, Button, Space, Modal } from "antd";
import "../../../css/LoaiSp.css";
import React, { useState } from "react";
import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import ModalLoaiSP from "../Sp/LoaiSP/modal_LoaiSP";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

const { Search } = Input;

function Table_LSP(props) {
  const [Show, setShow] = useState(false);
  const [Action, setAction] = useState();
  const { confirm } = Modal;

  const columns = [
    {
      title: "STT",
      render: (_, data, index) => index + 1,
      align: "center",
    },
    {
      title: "Loại Sản Phẩm",
      dataIndex: "loaiSP",
      key: "loaiSP",
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
    },
    {
      title: "Thao Tác",
      render: thaotac,
      align: "center",
    },
  ];
  const data = [
    {
      loaiSP: "Xe cộ",
      trangThai: "Đang kinh doanh",
    },
  ];
  function thaotac(data) {
    return (
      <div>
        <Space direction="horizontal" size={20}>
          <EditOutlined onClick={() => ShowEdit(data)} />
          <DeleteOutline onClick={() => ShowDelete(data)} />
        </Space>
      </div>
    );
  }

  function ShowAdd() {
    setShow(true);
    setAction("Add");
  }
  function ShowEdit() {
    setShow(true);
    setAction("Edit");
  }
  function ShowDelete() {
    confirm({
      centered: true,
      title: (
        <p style={{ color: "red" }}>Bạn có muốn xóa không ?</p>
      ),
      icon: <WarningFilled style={{ color: "red" }} />,
      cancelText: "Không",
      okText: "Có",
    });
  }
  function HiddenShow() {
    setShow(false);
  }

  return (
    <div>
      <div className="header_LoaiSP">
        <div className="Search_LoaiSP">
          <Search placeholder="Tìm kiếm theo tên" />
        </div>
        <div className="Button_LoaiSP">
          <Button type="primary" onClick={ShowAdd}>
            <PlusOutlined />
            Thêm Mới
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={data} bordered />
      <ModalLoaiSP show={Show} hidden={HiddenShow} action={Action} />
    </div>
  );
}

export default Table_LSP;
