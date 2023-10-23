import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, WarningFilled } from "@ant-design/icons";
import ModalUser from "../QuanTri/Users/modal_user";
import axios from "axios";

function Table_user(props) {
  const [visible, setVisibleModal] = useState(false);
  const [action, setAction] = useState();
  const [DSTaiKhoan, setDSTaiKhoan] = useState([]);
  const { confirm } = Modal;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  async function deleteTK(sdt){
    await axios.delete("https://localhost:7177/api/TK/XoaTK?sdt="+sdt)
    .then((res)=>{
      console.log(res);
      message.success(res.data.Message);
      getDSTaiKhoan();
    }).catch((error)=>{
      console.log(error);
    });
  }
  async function getDSTaiKhoan() {
    await axios
      .get("https://localhost:7177/api/TK/admin/DanhSachTK?page=1")
      .then((res) => {
        setDSTaiKhoan(res.data.Data);
        console.log(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDSTaiKhoan();
  }, []);

  function showAdd() {
    setVisibleModal(true);
    setAction("Add");
  }
  function showEdit() {
    setVisibleModal(true);
    setAction("Edit");
  }
  function showDelete(sdt) {
    confirm({
      centered: true,
      title:<p style={{color:"red"}}>Bạn có muốn xóa dữ liệu của người dùng này không ?</p>,
      icon:<WarningFilled style={{color:"red"}}/>,
      cancelText: "Không",
      okText: "Có",
      onOk(){
        deleteTK(sdt);
      },
    });
  }
  function hiddenModal() {
    setVisibleModal(false);
  }

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Tên hiển thị",
      align: "center",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Số điện thoại",
      align: "center",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Email",
      align: "center",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Trạng thái",
      align:"center",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      align: "center",
      title: "Thao tác",
      render: thaotac,
    },
  ];
  function thaotac(data) {
    return (
      <>
      <EditOutlined
          style={{ color: "#1677ff", marginLeft: "40px" }}
          onClick={() => showEdit(data)}
        />
        <DeleteOutlined onClick={()=>showDelete(data.PhoneNumber)} style={{ color: "#1677ff", marginLeft: "40px" }}/>
      </>
    );
  }
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#169bd4",
          color: "white",
          marginBottom: "10px",
          float: "right",
        }}
        onClick={showAdd}
      >
        Tạo mới người dùng
      </Button>
      <Table columns={columns} dataSource={DSTaiKhoan} bordered />
      <ModalUser
        visible={visible}
        hiddenModal={hiddenModal}
        action={action}
      ></ModalUser>
    </div>
  );
}

export default Table_user;
