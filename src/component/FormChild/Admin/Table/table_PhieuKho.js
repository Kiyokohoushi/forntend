import { PlusOutlined, SearchOutlined, WarningFilled } from "@ant-design/icons";
import { Button, DatePicker, Input, Space, Table, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ModalNK from "../Kho/PhieuKho/modal_PhieuNhap";
import TablePK from "../Kho/PhieuKho/table_EX";
import "../../../../css/phieukho.css";
import axios from "axios";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Hidden } from "@mui/material";

const { Search } = Input;

function Table_PhieuKho(props) {
  const [Show, setShow] = useState(false);
  const [Action, setAction] = useState();
  const [DSPhieuNhap, setDSPhieuNhap] = useState();
  const [DataEdit, setDataEdit] = useState();
  const { confirm } = Modal;

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

  async function ThemMoi(FormData){
    axios.post("https://localhost:7177/api/PhieuNhap/ThemPhieuNhap",FormData)
    .then((res) => {
      if(res.data.Status ===1){
        message.success(res.data.Message)
        getDSPhieuNhap();
      }else{
        message.error(res.data.Message)
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  async function SuaPN(FormData){
    axios.put("https://localhost:7177/api/PhieuNhap/SuaPhieuNhap",FormData)
    .then((res) =>{
      if(res.data.Status ===1){
        message.success(res.data.Message);
        getDSPhieuNhap();
      }else{
        message.error(res.data.Message);
      }
    }).catch((error) =>{
      console.log(error);
    })
  }
  function ShowDelete(id) {
    confirm({
      centered: true,
      title: <p style={{ color: "red" }}>Bạn có muốn xóa không ?</p>,
      icon: <WarningFilled style={{ color: "red" }} />,
      cancelText: "Không",
      okText: "Có",
      onOk() {
        axios
          .delete("https://localhost:7177/api/PhieuNhap/XoaPhieuNhap", {
            data:id,
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response.data.Status === 1) {
              message.success(response.data.Message);
              getDSPhieuNhap();
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
      title: "Tên nhà cung cấp",
      dataIndex: "TenNhaCungCap",
      key: "TenNhaCungCap",
      align: "center",
    },
    {
      title: "Thao Tác",
      render: Thaotac,
      align: "center",
    },
  ];

  function Thaotac(data) {
    return (
      <div>
        <Space direction="horizontal" size={30}>
          <EditOutlined onClick={()=>ShowEdit(data)}/>
          <DeleteOutline onClick={()=>ShowDelete(data.ID_PhieuNhap)}/>
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
  function HiddenModal() {
    setShow(false);
  }

  async function onSave(FormData) {
    if(Action==="Add"){
      await ThemMoi(FormData);
    }if(Action==="Edit"){
      await SuaPN(FormData);
    }
    HiddenModal();
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
            <TablePK idPhieuNhap={record.ID_PhieuNhap} />
          ),
        }}
        dataSource={DSPhieuNhap}
        bordered
      />
      <ModalNK show={Show} Save={onSave} hiddenModal={HiddenModal} action={Action} DataEdit={DataEdit}/>
    </div>
  );
}

export default Table_PhieuKho;
