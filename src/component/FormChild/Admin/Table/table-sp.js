import React, { useEffect, useState } from "react";
import { Button, Input, Pagination, Popconfirm, Table, message } from "antd";
import Modalsp from "../Sp/QLSP/modal_sp";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "../../../../css/SanPham.css";
import axios from "axios";

function Table_sp(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [Visible, setVisibleModal] = useState(false);
  const [Action, setAction] = useState();
  const [DSSanPham, setDSSanPham] = useState([]);
  const [DataEdit, setDataEdit] = useState();
  const [searchText, setSearchText] = useState("");
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [pagination, setPagination] = React.useState({
    total: DSSanPham.length, // Tổng số mục
    showTotal: (total) => `Tổng ${total} items`,
  });

  const handleSearch = () => {};

  useEffect(() => {
    // Gọi hàm handleSearch khi searchText thay đổi
    if (searchText.trim() === "") {
      // Nếu thanh tìm kiếm trống, hiển thị toàn bộ danh sách
      getAllData(1);
    } else {
      const regex = new RegExp(`^${searchText}`, "i");
      const filtered = DSSanPham.filter((item) => regex.test(item.TenSP));
      setDSSanPham(filtered);
    }
  }, [searchText]);

  async function getAllData() {
    let allData = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(`https://localhost:7177/api/SP/DanhSachSP?page=${page}`);
        const data = response.data.Data;

        if (data.length === 0) {
          // Không còn dữ liệu trang nào, thoát vòng lặp
          break;
        }

        allData = allData.concat(data);
        page++;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ trang", page, ":", error);
        break;
      }
    }

    setDSSanPham(allData);
    console.log(allData);
  }


  async function suaSP(formData) {
    await axios
      .put("https://localhost:7177/api/SP/SuaSP", formData)
      .then((res) => {
        if (res.data.Status === 1) {
          console.log(res);
          message.success(res.data.Message);
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.error("Lỗi", error);
      });
  }

  useEffect(() => {
    getAllData();
  }, []);

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
        if (res.data.Data <= 1) {
          message.success(res.data.Message);
          getAllData();
        } else {
          message.error("Lỗi");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function save(formData) {
    if (Action === "Edit") {
      await suaSP(formData);
    }
    await getAllData();
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
          onConfirm={() => deleteSanPham(data.MSanPham)}
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
      dataIndex: "Picture",
      align: "center",
      key: "Picture",
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
      dataIndex: "MSanPham",
      key: "MSanPham",
    },
    {
      title: "Tên Sản Phẩm",
      align: "center",
      dataIndex: "TenSP",
      key: "TenSP",
    },
    { title: "Thao tác", align: "center", render: thaotac },
  ];

  return (
    <div>
      <div className="headerSP">
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
      <Table columns={columns} dataSource={DSSanPham} pagination={pagination} bordered />
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
