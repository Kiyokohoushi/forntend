import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table, message } from "antd";
import Modalsp from "../Sp/QLSP/modal_sp";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../../css/SanPham.css";
import axios from "axios";

function Table_sp(props) {
  const [Visible, setVisibleModal] = useState(false);
  const [Action, setAction] = useState();
  const [DSSanPham, setDSSanPham] = useState([]);
  const [DataEdit, setDataEdit] = useState();
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const handleSearch = () => {
    if (searchText.trim() === "") {
      // Nếu thanh tìm kiếm trống, hiển thị toàn bộ danh sách
      getDSSanPham(1);
    } else {
      // Nếu có từ khóa tìm kiếm, thực hiện tìm kiếm và cập nhật filteredData
      const filtered = DSSanPham.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(searchText.toLowerCase())
        )
      );
      setDSSanPham(filtered);
    }
  };

  useEffect(() => {
    // Gọi hàm handleSearch khi searchText thay đổi
    handleSearch();
  }, [searchText]);

  function getDSSanPham() {
    axios
      .get("https://localhost:7177/api/SP/DanhSachSP?page=1")
      .then((res) => {
        setDSSanPham(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function themMoi(formData) {
    await axios
      .post("https://localhost:7177/api/SP/ThemSP", formData)
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res);
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        message.error("Lỗi", error);
      });
  }
  async function suaSP(formData) {
    await axios
      .put("https://localhost:7177/api/SP/SuaSP", formData)
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res);
          message.success(res.data.messeage);
        } else {
          message.error(res.data.messeage);
        }
      })
      .catch((error) => {
        message.error("Lỗi", error);
      });
  }

  useEffect(() => {
    getDSSanPham();
  }, []);

  function showAdd() {
    setVisibleModal(true);
    setAction("Add");
    setDataEdit(null);
  }
  function showEdit(data) {
    setVisibleModal(true);
    setAction("Edit");
    setDataEdit(data);
  }
  function showChiTiet(data) {
    setVisibleModal(true);
    setAction("ChiTiet");
    setDataEdit(data);
  }
  function hiddenModal() {
    setVisibleModal(false);
  }

  function deleteSanPham(MSanPham) {
    axios
      .delete("https://localhost:7177/api/SP/XoaSP?msp=" + MSanPham)
      .then((res) => {
        if (res.data.data <= 1) {
          message.success(res.data.message);
          getDSSanPham();
        } else {
          message.error("Lỗi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function save(formData) {
    if (Action === "Add") {
      await themMoi(formData);
    } else {
      await suaSP(formData);
    }
    await getDSSanPham();
    hiddenModal();
  }
  function thaotac(data) {
    return (
      <>
        <EyeOutlined
          style={{ color: "#1677ff", marginLeft: "40px" }}
          onClick={() => showChiTiet(data)}
        />
        <EditOutlined
          style={{ color: "#1677ff", marginLeft: "40px" }}
          onClick={() => showEdit(data)}
        />
        <Popconfirm
          title="Bạn có chắc muốn xóa?"
          onConfirm={() => deleteSanPham(data.mSanPham)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <DeleteOutlined style={{ color: "#1677ff", marginLeft: "40px" }} />
        </Popconfirm>
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
      <div className="headerSP">
        <Button
          style={{
            backgroundColor: "#1677ff",
            color: "white",
            marginBottom: "10px",
          }}
          onClick={showAdd}
        >
          <PlusOutlined />
          Thêm mới sản phẩm
        </Button>
        <div className="search">
          <Input
            placeholder="Tìm kiếm"
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              alignitems: "center",
              justifyContent: "flexend",
            }}
          />
          <Button
            style={{
              backgroundColor: "#1677ff",
              color: "white",
              marginLeft: "10px",
            }}
            onClick={handleSearch}
          >
            <SearchOutlined />
            Tìm kiếm
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={DSSanPham} bordered />
      <Modalsp
        visible={Visible}
        action={Action}
        hiddenModal={hiddenModal}
        dataEdit={DataEdit}
        save={save}
      ></Modalsp>
    </div>
  );
}

export default Table_sp;
