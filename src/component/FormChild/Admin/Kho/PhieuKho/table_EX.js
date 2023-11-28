import { Button, Space, Table, message, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalNhapHang from "./modal_NhapHang";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { WarningFilled } from "@ant-design/icons";

const Table_EX = ({ idPhieuNhap }) => {
  const [DsPhieuNhap, setDsPhieuNhap] = useState();
  const [show, setShow] = useState(false);
  const [IDPhieuNhap, setIDPhieuNhap] = useState();
  const [action, setAction] = useState(null);
  const { confirm } = Modal;
  const [DataEdit, setDataEdit] = useState(null);

  //Danh sách phiếu nhập kho
  async function getDSPhieuNhapKho() {
    await axios
      .get(
        "https://localhost:7177/api/ChiTietPhieuNhap/DanhSachChiTietNhap?page=1"
      )
      .then((res) => {
        const data = res.data.Data;
        const LocData = data.filter(
          (item) => item.ID_PhieuNhap === idPhieuNhap
        );
        setDsPhieuNhap(LocData);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //Thêm mới phiếu nhập kho
  async function ThemMoi(DataForm) {
    await axios
      .post(
        "https://localhost:7177/api/ChiTietPhieuNhap/ThemChiTietNhap",
        DataForm
      )
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          console.log(res.data);
          getDSPhieuNhapKho();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //Sửa phiếu nhập kho
  function SuaPhieuNhap(DataForm) {
    axios.put("https://localhost:7177/api/ChiTietPhieuNhap/SuaChiTietNhap",DataForm)
    .then((res)=>{
      if(res.data.Status === 1) {
      message.success(res.data.Message);
      getDSPhieuNhapKho();
      }else{
        message.error(res.data.Message);
      }
    }).catch((err) => {
      console.log(err);
    }); 
  }
  //Xóa phiếu nhập kho
  function ShowDelete(id) {
    confirm({
      centered: true,
      title: <p style={{ color: "red" }}>Bạn có muốn xóa không ?</p>,
      icon: <WarningFilled style={{ color: "red" }} />,
      cancelText: "Không",
      okText: "Có",
      onOk() {
        axios
          .delete(
            "https://localhost:7177/api/ChiTietPhieuNhap/XoaChiTietNhap",
            {
              data: id,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data.Status === 1) {
              message.success(response.data.Message);
              getDSPhieuNhapKho();
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
    getDSPhieuNhapKho();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function ShowAdd(idPhieuNhap) {
    setShow(true);
    setAction("Add");
    setIDPhieuNhap(idPhieuNhap);
  }
  function ShowEdit(data) {
    setShow(true);
    setAction("Edit");
    setDataEdit(data);
  }
  function hidden() {
    setShow(false);
  }
  async function OnSave(DataForm) {
    if (action === "Add") {
      await ThemMoi(DataForm);
    }
    if (action === "Edit") {
      await SuaPhieuNhap(DataForm);
    }
    hidden();
  }

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    // {
    //   title: "Mã Số Phiếu",
    //   dataIndex: "ID_PhieuNhap",
    //   key: "ID_PhieuNhap",
    //   align: "center",
    // },
    {
      title: "Mã số sản phẩm",
      dataIndex: "MSanPham",
      key: "MSanPham",
      align: "center",
    },
    // {
    //   title: "Tên Hàng Hóa",
    //   dataIndex: "TenSanPham",
    //   key: "TenSanPham",
    //   align: "center",
    // },
    // {
    //   title: "Loại sản phẩm",
    //   dataIndex: "TenLoaiSP",
    //   key: "TenLoaiSP",
    //   align: "center",
    // },
    {
      title: "Số lượng",
      dataIndex: "SoLuong",
      key: "SoLuong",
      align: "center",
    },
    // {
    //   title: "Đơn Vị Tính",
    //   dataIndex: "TenDonVi",
    //   key: "TenDonVi",
    //   align: "center",
    // },
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

  function Thaotac(data) {
    return (
      <div>
        <Space direction="horizontal" size={30}>
          <EditOutlined onClick={() => ShowEdit(data)} />
          <DeleteOutlined onClick={() => ShowDelete(data.ID_ChiTietNhap)} />
        </Space>
      </div>
    );
  }
  return (
    <div>
      <div
        className="Table"
        style={{ border: "1px solid black", borderRadius: "20px", padding: "10px", margin:"0", backgroundColor: "white" }}
      >
        <Button
          type="primary"
          style={{ float: "left", marginBottom: "10px"}}
          onClick={() => ShowAdd(idPhieuNhap)}
        >
          Nhập hàng
        </Button>
        <Table columns={columns} dataSource={DsPhieuNhap} bordered />
      </div>

      <ModalNhapHang
        show={show}
        action={action}
        hidden={hidden}
        idPhieuNhap={IDPhieuNhap}
        Save={OnSave}
        DataEdit={DataEdit}
      />
    </div>
  );
};

export default Table_EX;
