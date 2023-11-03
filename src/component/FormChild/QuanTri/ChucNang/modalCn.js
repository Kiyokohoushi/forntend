import {
  Button,
  Checkbox,
  Form,
  Input,
  List,
  Modal,
  Select,
  Space,
} from "antd";
import "../../../../css/ChucNang.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function ModalCn(props) {
  const [form] = Form.useForm();
  const DataND = props.DataND;
  const [tenNND, setTenNND] = useState();
  const [ghiChu, setGhiChu] = useState();
  const [DataChucNang, setDataChucNang] = useState();
  const [DsChucNang, setDSChucNang] = useState([]);

  const [checkboxStates, setCheckboxStates] = useState({}); // Mảng trạng thái checkbox

  function getDSChucNang() {
    axios
      .get("https://localhost:7177/api/ChucNang/DSChucNang?page=1")
      .then((res) => {
        setDSChucNang(res.data.Data);
      });
  }

  function LayDataCN(value) {
    const DuLieuDuocChon = value.map((value) => {
      const DL = DsChucNang.find((item) => item.ChucNangid === value);
      return DL;
    });
    setDataChucNang(DuLieuDuocChon);
    console.log(DuLieuDuocChon);
  }

  // Hàm xử lý thay đổi trạng thái checkbox cho một idChucNang cụ thể
  const handleCheckboxChange = (idChucNang, key, value) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [idChucNang]: {
        ...prevState[idChucNang],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    if (props.action === "Edit") {
      form.setFieldsValue({ ...DataND });
    } else {
      form.resetFields();
    }
    getDSChucNang();
  }, [DataND, form, props.action]);

  async function onSave() {
    if (props.action === "Add") {
      const formData = {
        TenNND: tenNND,
        GhiChu: ghiChu,
      };
      await props.Save(formData);
      props.hiddentShow();
    }
    if (props.action === "Edit") {
      const dataOnField = await form.validateFields();
      console.log(dataOnField);
      const formData = new FormData();
      formData.append("NNDID", DataND.NNDID);
      formData.append("TenNND", dataOnField.TenNND);
      formData.append("GhiChu", dataOnField.GhiChu);
      await props.Save(formData);
      props.hiddentShow();
    }
    if (props.action === "AddCN") {
      DataChucNang.forEach((item) => {
        const dataToSave = {
          ChucNang: item.ChucNangid,
          NNDID: props.DataNND.NNDID,
          Xem: checkboxStates[item.ChucNangid]?.Xem || false,
          Them: checkboxStates[item.ChucNangid]?.Them || false,
          Sua: checkboxStates[item.ChucNangid]?.Sua || false,
          Xoa: checkboxStates[item.ChucNangid]?.Xoa || false,
        };
        props.OnSave(dataToSave);
      });
      props.unShow();
    }
  }

  return (
    <div>
      {props.action === "Add" || props.action === "Edit" ? (
        <Modal
          title={
            props.action === "Add"
              ? "Thêm nhóm người dùng"
              : "Cập nhật nhóm người dùng"
          }
          open={
            props.action === "Add" || props.action === "Edit"
              ? props.show
              : null
          }
          onCancel={props.hiddentShow}
          footer={[
            <Button onClick={props.hiddentShow}>Hủy</Button>,
            <Button type="primary" onClick={onSave}>
              Lưu
            </Button>,
          ]}
        >
          <Form form={form} layout="horizontal" autoComplete="off">
            <Form.Item
              label={"Nhập tên nhóm :"}
              name={"TenNND"}
              onChange={(e) => setTenNND(e.target.value)}
            >
              <Input className="costumInput" />
            </Form.Item>
            <Form.Item
              label={"Ghi chú"}
              name={"GhiChu"}
              onChange={(e) => setGhiChu(e.target.value)}
            >
              <Input className="costumInput" />
            </Form.Item>
          </Form>
        </Modal>
      ) : null}

      {props.action === "AddCN" ? (
        <Modal
          title="Thêm mới chức năng"
          open={props.visible}
          onCancel={props.unShow}
          footer={[
            <Button onClick={props.unShow}>Hủy</Button>,
            <Button onClick={onSave} key="Submit" type="primary">
              Lưu
            </Button>,
          ]}
        >
          <Form form={form} layout="horizontal" autoComplete="off">
            <Form.Item label="Tên Chức Năng :">
              <Select mode="multiple" onChange={(value) => LayDataCN(value)}>
                {DsChucNang.map((CN) => (
                  <option key={CN.ChucNangid} value={CN.ChucNangid}>
                    {CN.TenChucNang}
                  </option>
                ))}
              </Select>
            </Form.Item>
            <List
              dataSource={DataChucNang}
              renderItem={(item) => (
                <List.Item
                  key={item.ChucNangid}
                  value={item.ChucNangid}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontWeight: "bold" }}>{item.TenChucNang}</span>
                  <Space direction="horizontal" size={10}>
                    <Checkbox
                      checked={checkboxStates[item.ChucNangid]?.Xem || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          item.ChucNangid,
                          "Xem",
                          e.target.checked
                        )
                      }
                    >
                      Xem
                    </Checkbox>
                    <Checkbox
                      checked={checkboxStates[item.ChucNangid]?.Sua || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          item.ChucNangid,
                          "Sua",
                          e.target.checked
                        )
                      }
                    >
                      Sửa
                    </Checkbox>
                    <Checkbox
                      checked={checkboxStates[item.ChucNangid]?.Xoa || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          item.ChucNangid,
                          "Xoa",
                          e.target.checked
                        )
                      }
                    >
                      Xóa
                    </Checkbox>
                    <Checkbox
                      checked={checkboxStates[item.ChucNangid]?.Them || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          item.ChucNangid,
                          "Them",
                          e.target.checked
                        )
                      }
                    >
                      Thêm
                    </Checkbox>
                  </Space>
                </List.Item>
              )}
            />
          </Form>
        </Modal>
      ) : null}
    </div>
  );
}

export default ModalCn;
