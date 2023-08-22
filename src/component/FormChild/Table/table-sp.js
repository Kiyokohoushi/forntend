import React, { useEffect, useState } from "react";

import { Button, Popconfirm, Table, message } from "antd";
import Modalsp from "../Sp/modal_sp";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";

function Table_sp(props) {
  const [Visible, setVisibleModal] = useState(false);
  const [Action, setAction] = useState();
  const [DSSanPham, setDSSanPham] = useState();
  const [DataEdit, setDataEdit] = useState();

  // async and await dùng axios để tránh việc mất đồng bộ javascript

  async function getDSSanPham() {
    await axios
      .get("https://localhost:7177/api/SP/DanhSachSP?page=1")
      .then((res) => {
        setDSSanPham(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDSSanPham();
  }, []);

  function addSanPham() {
    setVisibleModal(true);
    setAction("Them");
    setDataEdit(null);
  }
  function showEdit(record) {
    setVisibleModal(true);
    setAction("Edit");
    setDataEdit(record);
  }
  function hiddenModal() {
    setVisibleModal(false);
  }

  function onCancel() {
    setVisibleModal(false);
  }

  async function themSanPham(dataUpdate){
    axios.post("https://localhost:7177/api/SP/ThemSP", dataUpdate,{
      headers: {
        'Content-Type': 'multipart/form-data' // Định dạng của dữ liệu
      }
    })
    .then((res)=> {
      if(res.data.status >=1){
        message.success(res.data.messeage)
      }else{
        message.error(res.data.messeage)
      }
    }).catch((error) => {
      console.log(error)
    });
  }
  async function suaSanPham(dataUpdate){
    axios.put("https://localhost:7177/api/SP/SuaSP", dataUpdate,{
      headers: {
        'Content-Type': 'multipart/form-data' // Định dạng của dữ liệu
      }
      })
    .then((res)=> {
      if(res.data.status >=1){
        message.success(res.data.messeage)
      }else{
        message.error(res.data.messeage)
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  async function deleteSanPham(mSanPham) {
    await axios
      .delete("https://localhost:7177/api/SP/XoaSP?msp=" + mSanPham)
      .then((res) => {
        if (res.data.data <= 1) {
          message.success("Xóa thành công");
          getDSSanPham();
        } else {
          message.error("Lỗi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function save(dataUpdate){
    //nếu là action là them thì chạy themSanPham và ngược lại
    if(Action ==="Them"){
      await themSanPham(dataUpdate)
    }else{
      await suaSanPham(dataUpdate)
    }
    await getDSSanPham();
    hiddenModal();
  }

  function thaotac(record) {
    return (
      <>
        <EyeOutlined style={{ color: "#1677ff", marginLeft: "40px" }} />
        <EditOutlined
          style={{ color: "#1677ff", marginLeft: "40px" }}
          onClick={() => showEdit(record)}
        />
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => deleteSanPham(record.mSanPham)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <DeleteOutlined style={{ color: "#1677ff", marginLeft: "40px" }} />
        </Popconfirm>
        <Modalsp
          visible={Visible}
          action={Action}
          hiddenModal={hiddenModal}
          onCancel={onCancel}
          dataEdit={DataEdit}
          save={save}
        ></Modalsp>
      </>
    );
  }

  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "picture",
      align: "center",
      key: "picture",
      render: (hinhanh) => (
        <img
          src={hinhanh}
          alt="Hình ảnh"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Mã Sản Phẩm",
      align: "center",
      dataIndex: "mSanPham",
      key: "mSanPham",
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      dataIndex: "tenSP",
      key: "tenSP",
    },
    {
      title: "Loại Sản Phẩm",
      align: "center",
      dataIndex: "loaiSanPham",
      key: "loaiSanPham",
    },
    {
      title: "Giá",
      align: "center",
      dataIndex: "donGia",
      key: "donGia",
    },
    {
      title: "Số Lượng",
      align: "center",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    { title: "Thao tác", align: "center", render: thaotac },
  ];

  return (
    <div>
      <Button
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          marginBottom: "10px",
        }}
        onClick={() => addSanPham()}
      >
        <PlusOutlined />
        Thêm mới sản phẩm
      </Button>
      <Table columns={columns} dataSource={DSSanPham} bordered />
    </div>
  );
}

export default Table_sp;
