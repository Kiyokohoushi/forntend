import { FileAddOutlined } from "@ant-design/icons";
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
  const dataNND = props.Data;
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [checkboxStates, setCheckboxStates] = useState({}); // Mảng trạng thái checkbox

  const [IdUser, setUser] = useState("");
  const [Disabled, setDisabled] = useState(true);

  useEffect(() => {
    //Account
    getDSUser();
    //DSChucngNangNND
    getDSChucNangNND();
    //DSNguoiDungNND
    getDSUserNND();
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

        // Khởi tạo trạng thái checkbox từ dữ liệu item
        const checkboxStates = {};
        LocTen.forEach((item) => {
          checkboxStates[item.idChucNangCuaNND] = {
            Xem: item.Xem,
            Sua: item.Sua,
            Xoa: item.Xoa,
            Them: item.Them,
          };
          console.log(checkboxStates);
        });

        setDataChucNangNND(LocTen);
        setCheckboxStates(checkboxStates);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //Thêm mới chức năng của nhóm người dùng
  function ThemMoiChucNangNND(formData) {
    axios
      .post(
        "https://localhost:7177/api/ChucNangCuaNND/ThemChucNangCuaNND",
        formData
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
    dataChucNangNND.forEach((item) => {
      const newData = {
        idChucNangCuaNND: item.idChucNangCuaNND,
        ChucNang: item.ChungNangid,
        NNDID: item.NNDID,
        Xem: checkboxStates[item.idChucNangCuaNND]?.Xem || false,
        Them: checkboxStates[item.idChucNangCuaNND]?.Them || false,
        Sua: checkboxStates[item.idChucNangCuaNND]?.Sua || false,
        Xoa: checkboxStates[item.idChucNangCuaNND]?.Xoa || false,
      };
      console.log(newData)
      axios
        .put("https://localhost:7177/api/ChucNangCuaNND/SuaCNCN",newData)
        .then((res) => {
          if (res.data.Status === 1) {
            message.success(res.data.Message);
            setDisabled(true);
          } else {
            message.error(res.data.Message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  // Hàm xử lý thay đổi trạng thái checkbox cho một idChucNang cụ thể
  // Hàm xử lý thay đổi trạng thái checkbox cho một idChucNang cụ thể
  const handleCheckboxChange = (idChucNangCuaNND, key, value) => {
    setDisabled(false);
    setCheckboxStates((prevState) => ({
      ...prevState,
      [idChucNangCuaNND]: {
        ...prevState[idChucNangCuaNND],
        [key]: value,
      },
    }));
  };

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
      await ThemMoiChucNangNND(formData);
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
          <Card
            title="THÊM CHỨC NĂNG"
            style={{ width: "637px", minHeight: "450px" }}
          >
            <Space direction="vertical" size={20}>
              <Space
                direction="horizontal"
                size={10}
                style={{ float: "right" }}
              >
                <Button disabled={Disabled} onClick={UpdateCNNND}>
                  <FileAddOutlined /> Lưu
                </Button>
                <Button type="primary" onClick={ShowAddCN}>
                  <FileAddOutlined />
                  Thêm chức năng
                </Button>
              </Space>
              <div
                style={{
                  height: 300,
                  width: 600,
                  overflow: "auto",
                  padding: "0 16px",
                }}
              >
                <InfiniteScroll dataLength={dataChucNangNND.length}>
                  <List
                    dataSource={dataChucNangNND}
                    renderItem={(item) => (
                      <List.Item
                        key={item.idChucNangCuaNND}
                        value={item.idChucNangCuaNND}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.TenChucNang}
                        <Space direction="horizontal" size={10}>
                          <Checkbox
                            checked={checkboxStates[item.idChucNangCuaNND].Xem}
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.idChucNangCuaNND,
                                "Xem",
                                e.target.checked
                              )
                            }
                          >
                            Xem
                          </Checkbox>
                          <Checkbox
                            checked={checkboxStates[item.idChucNangCuaNND].Sua}
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.idChucNangCuaNND,
                                "Sua",
                                e.target.checked
                              )
                            }
                          >
                            Sửa
                          </Checkbox>
                          <Checkbox
                            checked={checkboxStates[item.idChucNangCuaNND].Xoa}
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.idChucNangCuaNND,
                                "Xoa",
                                e.target.checked
                              )
                            }
                          >
                            Xóa
                          </Checkbox>
                          <Checkbox
                            checked={checkboxStates[item.idChucNangCuaNND].Them}
                            onChange={(e) =>
                              handleCheckboxChange(
                                item.idChucNangCuaNND,
                                "Them",
                                e.target.checked
                              )
                            }
                          >
                            Thêm
                          </Checkbox>
                          <Close
                            style={{ float: "right" }}
                            onClick={() => DeleteCNNND(item.idChucNangCuaNND)}
                          />
                        </Space>
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
        DataNND={dataNND}
      />
    </div>
  );
}

export default SettingCN;
