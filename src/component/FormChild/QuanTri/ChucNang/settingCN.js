import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, List, Select, Space, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalCn from "./modalCn";
import InfiniteScroll from "react-infinite-scroll-component";
import { Close } from "@mui/icons-material";

function SettingCN(props) {
  const [Visible, setVisible] = useState(false);
  const [Action, setAction] = useState();

  const [dataND, setDataND] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [dataChucNangNND, setDataChucNangNND] = useState([]);
  const [DSChucNang, setDSChucNang] = useState([]);
  const dataNND = props.Data;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [Xem, setXem] = useState(false);
  const [Them, setThem] = useState(false);
  const [Sua, setSua] = useState(false);
  const [Xoa, setXoa] = useState(false);

  const [idCNNND, setIdCNNND] = useState();
  const [IdCN, setIdChuCNang] = useState();
  const [IdUser, setUser] = useState("");
  const [idChucNang, setIdCN] = useState("");

  useEffect(() => {
    //Account
    getDSUser();
    //DSChucngNangNND
    getDSChucNangNND();
    //DSNguoiDungNND
    getDSUserNND();
    //DS ChucNang
    getDSChucNang();
  }, []);

  //Danh sách người dùng trong nhóm người dùng
  function getDSUserNND() {
    axios
      .get("https://localhost:7177/api/NguoiDungTrongNhom/DanhSachNND?page=1")
      .then((res) => {
        const data = res.data.Data;
        const LocUsers = data.filter((user) => user.TenNND === dataNND.TenNND); //Lọc danh sách người dùng dựa vào tên Nhóm người dùng
        setDataND(LocUsers);
        console.log(LocUsers);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Xóa người dùng trong nhóm người dùng
  function DeleteND(data) {
    let DataND = {
      NNDID: dataNND.NNDID,
      idUser: data,
    };
    axios
      .delete("https://localhost:7177/api/NguoiDungTrongNhom/XoaNDTrongNhom", {
        data: DataND,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDSUserNND();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Thêm người dùng vào nhóm người dùng
  function ThemNDND(idnd) {
    setUser(idnd);
    let dataND = {
      NNDID: dataNND.NNDID,
      idUser: idnd,
    };
    axios
      .post(
        "https://localhost:7177/api/NguoiDungTrongNhom/ThenNDvaoNhom",
        dataND
      )
      .then((res) => {
        console.log(res);
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDSUserNND();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Danh sách chức năng nhóm người dùng
  function getDSChucNangNND() {
    axios
      .get("https://localhost:7177/api/ChucNangCuaNND/DanhSachCNCuaNND2?page=1")
      .then((res) => {
        const DataDDSCN = res.data.Data;

        const LocTen = DataDDSCN.filter(
          (data) => data.TenNND === dataNND.TenNND
        );

        setDataChucNangNND(LocTen);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Thêm mới chức năng của nhóm người dùng
  function ThemMoiChucNangNND(id) {
    setIdCN(id);
    console.log(id);
    let DataCNNND = {
      ChucNang: id,
      NNDID: dataNND.NNDID,
    };
    axios
      .post(
        "https://localhost:7177/api/ChucNangCuaNND/ThemChucNangCuaNND",
        DataCNNND
      )
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDSChucNangNND();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Xóa chức năng nhóm người dùng
  function DeleteCNNND(data) {
    axios
      .delete("https://localhost:7177/api/ChucNangCuaNND/XoaCNCN?id=" + data)
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDSChucNangNND();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Sửa chức năng
  function UpdateCNNND() {
    let newData = {
      idChucNangCuaNND: idCNNND,
      ChucNang: IdCN,
      NNDID: dataNND.NNDID,
      Xem: Xem,
      Them: Them,
      Sua: Sua,
      Xoa: Xoa,
    };
    axios
      .put("https://localhost:7177/api/ChucNangCuaNND/SuaCNCN", newData)
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //CheckBox và tìm kiếm chức năng nhóm người dùng
  function ThayDoiNND(idcnnnd) {
    axios
      .post(
        "https://localhost:7177/api/ChucNangCuaNND/ChiTietCNCNND?id=" + idcnnnd
      )
      .then((response) => {
        const dataCN = response.data;
        console.log(dataCN);

        setIdChuCNang(dataCN.ChungNangid);
        setIdCNNND(dataCN.idChucNangCuaNND);
        setThem(dataCN.Them);
        setSua(dataCN.Sua);
        setXoa(dataCN.Xoa);
        setXem(dataCN.Xem);
      });
  }

  //Danh sách chức năng
  function getDSChucNang() {
    axios
      .get("https://localhost:7177/api/ChucNang/DSChucNang?page=1")
      .then((res) => {
        setDSChucNang(res.data.Data);
      });
  }

  //Thêm mới chức năng
  function ThemMoiCN(formData) {
    axios
      .post(
        "https://localhost:7177/api/ChucNang/ThemChucNang?namecn=" + formData
      )
      .then((res) => {
        if (res.data.Status === 1) {
          message.success(res.data.Message);
          getDSChucNang();
        } else {
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Danh sách người dùng
  function getDSUser() {
    axios
      .get("https://localhost:7177/api/TK/admin/DanhSachTK?page=1")
      .then((res) => {
        setDataUser(res.data.Data);
      })
      .catch((errors) => {
        console.log(errors);
      });
  }

  //Xử lý acction
  async function onSave(formData) {
    if (Action === "AddCN") {
      await ThemMoiCN(formData);
    }
  }
  function ShowAddCN() {
    setVisible(true);
    setAction("AddCN");
  }
  function UnShow() {
    setVisible(false);
  }

  return (
    <div>
      <Space direction="vertical" size={20} style={{ margin: "10px" }}>
        <Button onClick={props.HiddentShow}>Đóng</Button>
        <Space direction="horizontal" size={20}>
          <Card
            title="THÊM NGƯỜI DÙNG"
            style={{ width: "637px", minHeight: "450px" }}
          >
            <Space direction="vertical" size={20}>
              <Select
                placeholder={"Chọn thêm người dùng"}
                style={{ width: "580px" }}
                value={IdUser}
                onChange={(value) => ThemNDND(value)}
              >
                {dataUser.map((DataUser) => (
                  <option key={dataUser.idUser} value={DataUser.idUser}>
                    {DataUser.Username}
                  </option>
                ))}
              </Select>
              <div
                style={{
                  height: 300,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <InfiniteScroll dataLength={dataND.length}>
                  <List
                    dataSource={dataND}
                    renderItem={(item) => (
                      <List.Item
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Close
                          fontSize="small"
                          onClick={() => DeleteND(item.idUser)}
                        />
                        {item.Username}
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Space>
          </Card>
          <Card title="THÊM CHỨC NĂNG" style={{ width: "637px" }}>
            <Space direction="vertical" size={20}>
              <Button type="primary" onClick={ShowAddCN}>
                <PlusOutlined />
                Thêm chức năng
              </Button>
              <Select
                placeholder={"Chọn hoặc thêm chức năng"}
                style={{ width: "580px" }}
                value={idChucNang}
                onChange={(value) => ThemMoiChucNangNND(value)}
              >
                {DSChucNang.map((itemCN) => (
                  <option key={itemCN.ChucNangid} value={itemCN.ChucNangid}>
                    {itemCN.TenChucNang}
                  </option>
                ))}
              </Select>
              <Space direction="horizontal" size={70}>
                <Checkbox
                  checked={Xem}
                  onChange={(e) => setXem(e.target.checked)}
                >
                  Xem
                </Checkbox>
                <Checkbox
                  checked={Sua}
                  onChange={(e) => setSua(e.target.checked)}
                >
                  Sửa
                </Checkbox>
                <Checkbox
                  checked={Xoa}
                  onChange={(e) => setXoa(e.target.checked)}
                >
                  Xóa
                </Checkbox>
                <Checkbox
                  checked={Them}
                  onChange={(e) => setThem(e.target.checked)}
                >
                  Thêm
                </Checkbox>
                <Button onClick={UpdateCNNND}>Lưu</Button>
              </Space>
              <div
                style={{
                  height: 200,
                  overflow: "auto",
                  padding: "0 16px",
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <InfiniteScroll dataLength={dataChucNangNND.length}>
                  <List
                    dataSource={dataChucNangNND}
                    renderItem={(item) => (
                      <List.Item
                        key={item.idChucNangCuaNND}
                        value={item.idChucNangCuaNND}
                        onClick={() => ThayDoiNND(item.idChucNangCuaNND)}
                      >
                        {item.TenChucNang}
                        <DeleteOutlined
                          style={{ float: "right" }}
                          onClick={() => DeleteCNNND(item.idChucNangCuaNND)}
                        />
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
            </Space>
          </Card>
        </Space>
      </Space>
      <ModalCn
        OnSave={onSave}
        visible={Visible}
        unShow={UnShow}
        action={Action}
      />
    </div>
  );
}

export default SettingCN;
