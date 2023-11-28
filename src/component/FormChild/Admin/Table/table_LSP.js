import { Table, Input, Button, Space, Modal, message } from "antd";
import "../../../../css/LoaiSp.css";
import React, { useEffect, useState } from "react";
import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import ModalLoaiSP from "../Sp/LoaiSP/modal_LoaiSP";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import axios from "axios";

const { Search } = Input;

function Table_LSP(props) {
  const [Show, setShow] = useState(false);
  const [Action, setAction] = useState();
  const [DataEdit, setDataEdit] = useState();
  const [DataLsp, setDataLsp] = useState([]);
  const { confirm } = Modal;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  async function getDataLsp() {
    await axios
      .get("https://localhost:7177/api/LoaiSanPham/DanhSachLoaiSP?page=1")
      .then((res) => {
        setDataLsp(res.data.Data);
        console.log(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function ThemLSP(formData) {
    axios
      .post("https://localhost:7177/api/LoaiSanPham/ThemLoaiSP", formData)
      .then((response) => {
        if (response.data.Status === 1) {
          message.success(response.data.Message);
          getDataLsp();
        } else {
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function SuaLSP(formData) {
    axios
      .put("https://localhost:7177/api/LoaiSanPham/SuaLoaiSP", formData)
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDataLsp();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getDataLsp();
  }, []);

  async function onSave(formData) {
    if (Action === "Edit") {
      await SuaLSP(formData);
    }
    if (Action === "Add") {
      await ThemLSP(formData);
    }
    HiddenShow();
  }

  const columns = [
    {
      title: "STT",
      render: (_, data, index) => index + 1,
      align: "center",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "TenLoaiSP",
      key: "TenLoaiSP",
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "MoTaLoaiSP",
      key: "MoTaLoaiSP",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      align: "center",
      render: (TrangThai) =>
        TrangThai ? "Đang kinh doanh" : "Ngừng kinh doanh",
    },
    {
      title: "Thao Tác",
      render: thaotac,
      align: "center",
    },
  ];

  function thaotac(data) {
    return (
      <div>
        <Space direction="horizontal" size={20}>
          <EditOutlined onClick={() => ShowEdit(data)} />
          <DeleteOutline onClick={() => ShowDelete(data.ID_LoaiSanPham)} />
        </Space>
      </div>
    );
  }

  function ShowAdd() {
    setShow(true);
    setAction("Add");
  }
  function ShowEdit(data) {
    setShow(true);
    setAction("Edit");
    setDataEdit(data);
  }
  function ShowDelete(id) {
    confirm({
      centered: true,
      title: <p style={{ color: "red" }}>Bạn có muốn xóa không ?</p>,
      icon: <WarningFilled style={{ color: "red" }} />,
      okText: "Có",
      cancelText: "Không",
      onOk() {
        axios
          .delete("https://localhost:7177/api/LoaiSanPham/XoaLoaiSP", {
            data:id,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.Status === 1) {
              message.success(response.data.Message);
              getDataLsp();
            } else {
              message.error(response.data.Message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      },
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
      <Table columns={columns} dataSource={DataLsp} bordered />
      <ModalLoaiSP
        Save={onSave}
        show={Show}
        hidden={HiddenShow}
        action={Action}
        Data={DataEdit}
      />
    </div>
  );
}

export default Table_LSP;
