import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, Table, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import SettingCN from "../QuanTri/ChucNang/settingCN";
import axios from "axios";

function Table_cn(props) {
  const [DSChucNang, setDSChucNang] = useState();
  const { confirm } = Modal;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Tên chức năng",
      align: "center",
      dataIndex: "tenChucNang",
      key: "tenChucNang",
    },
    {
      title: "Ghi chú",
      align: "center",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: "Thao tác",
      align: "center",
      render: thaotac,
    },
  ];

  function showDelete(chucNangid) {
    confirm({
      centered: true,
      title: (
        <p style={{ color: "red" }}>Bạn có muốn xóa chức năng này không ?</p>
      ),
      icon: <WarningFilled style={{ color: "red" }} />,
      cancelText: "Không",
      okText: "Có",
      onOk(){
        axios.delete("https://localhost:7177/api/ChucNang/XoaChucNang?id="+chucNangid)
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
          getDSChucNang();
        }).catch((err) => {
          console.log(err);
        });
      }
    });
  }

  function thaotac(data) {
    return (
      <>
        <SettingsOutlinedIcon onClick={ShowSetting} />
        <EditOutlinedIcon style={{ marginLeft: "40px" }} />
        <DeleteOutlineOutlinedIcon
          style={{ marginLeft: "40px" }}
          onClick={() => showDelete(data.chucNangid)}
        />
      </>
    );
  }

  async function getDSChucNang(){
    await axios.get("https://localhost:7177/api/ChucNang/DSChucNang?page=1")
    .then((res)=>{
      console.log(res);
      setDSChucNang(res.data.data);
    }).catch((error)=>{
      console.log(error);
    })
  }
  useEffect(()=>{
    getDSChucNang();
  },[])

  const [show, setShow] = useState(false);
  function ShowSetting() {
    setShow(true);
  }
  function HiddentShow() {
    setShow(false);
  }

  return (
    <div>
    {show? <SettingCN HiddentShow={HiddentShow} data={DSChucNang} />:null}
      <Button
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          marginBottom: "10px",
        }}
      >
        Thêm
      </Button>

      <Table columns={columns} dataSource={DSChucNang} />
    </div>
  );
}

export default Table_cn;
