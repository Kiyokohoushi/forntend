import { PlusOutlined, WarningFilled } from "@ant-design/icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, Table, Modal, message } from "antd";
import ModalCn from "../QuanTri/ChucNang/modalCn";
import React, { useEffect, useState } from "react";
import SettingCN from "../QuanTri/ChucNang/settingCN";
import axios from "axios";

function Table_cn(props) {
  const [DSChucNang, setDSChucNang] = useState();
  const [DataND, setDataND] = useState();
  const [DataEdit, setDataEdit] = useState();
  const [Action, setAction] = useState();
  const { confirm } = Modal;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Tên nhóm người dùng",
      align: "center",
      dataIndex: "TenNND",
      key: "TenNND",
    },
    {
      title: "Ghi chú",
      align: "center",
      dataIndex: "GhiChu",
      key: "GhiChu",
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
      onOk() {
        axios
          .delete("https://localhost:7177/api/NND/DeleteNND?id=" + chucNangid)
          .then((res) => {
            console.log(res);
            message.success(res.data.Message);
            getDSChucNang();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  function thaotac(data) {
    return (
      <>
        <SettingsOutlinedIcon onClick={() => ShowSetting(data)} />
        <EditOutlinedIcon style={{ marginLeft: "40px" }} onClick={()=>ShowEdit(data)} />
        <DeleteOutlineOutlinedIcon
          style={{ marginLeft: "40px" }}
          onClick={() => showDelete(data.NNDID)}
        />
      </>
    );
  }

  async function getDSChucNang() {
    await axios
      .get("https://localhost:7177/api/NND/DanhSachNND?page=1")
      .then((res) => {
        console.log(res);
        setDSChucNang(res.data.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getDSChucNang();
  }, []);

  async function ThemMoi(formData) {
    await axios
      .post("https://localhost:7177/api/NND/ThemNND", formData)
      .then((res) => {
        if (res.data.Status === 1) {
          console.log(res);
          message.success(res.data.Message);
          getDSChucNang();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function Sua(formData) {
    await axios
      .put("https://localhost:7177/api/NND/SuaNND", formData)
      .then((res) => {
        if (res.data.Status === 1) {
          console.log(res);
          message.success(res.data.Message);
          getDSChucNang();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onSave(formData) {
    if (Action === "Add") {
      await ThemMoi(formData);
    }
    if (Action === "Edit") {
      await Sua(formData);
    }
  }

  const [show, setShow] = useState(false);
  function ShowSetting(data) {
    setShow(true);
    setAction("Settings");
    setDataEdit(data);
  }
  function ShowAdd() {
    setShow(true);
    setAction("Add");
  }
  function ShowEdit(data) {
    setShow(true);
    setAction("Edit");
    setDataND(data);
  }
  function HiddentShow() {
    setShow(false);
  }

  return (
    <div>
      {show && Action === "Settings" ? (
        <SettingCN HiddentShow={HiddentShow} Data={DataEdit} />
      ) : null}
      <Button
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          marginBottom: "10px",
        }}
        onClick={ShowAdd}
      >
        Thêm
      </Button>

      <Table columns={columns} dataSource={DSChucNang} />
      <ModalCn
        Save={onSave}
        show={show}
        hiddentShow={HiddentShow}
        action={Action}
        DataND={DataND}
      ></ModalCn>
    </div>
  );
}

export default Table_cn;
