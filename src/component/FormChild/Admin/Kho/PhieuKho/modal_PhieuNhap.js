import { Button, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Modal_PhieuKho(props) {
  const [form] = Form.useForm();
  const [dataNhaCungCap, setDataNhaCungCap] = useState([]);
  const [Value, setValue] = useState();

  useEffect(() => {
    if (props.action === "Edit" && props.DataEdit.ID_PhieuNhap) {
      form.setFieldsValue({ ...props.DataEdit });
    } else {
      form.resetFields();
    }
    getDSNhaCungCap();
  }, [form, props.DataEdit, props.action]);

  function getDSNhaCungCap() {
    axios
      .get("https://localhost:7177/api/NhaCungCap/DanhSachNCC?page=1")
      .then((res) => {
        setDataNhaCungCap(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

function handleOption(value){
  setValue(value);
}
function handleSave(){
  form.submit();
}

async function onFinish(values){
    if(props.action === "Add"){
      const DataForm = {
        NguoiNhapHang: values.NguoiNhapHang,
        id_NhaCungCap: Value,
      };
      await props.Save(DataForm);
    }
    if(props.action==="Edit"){
      const DataForm = {
        ID_PhieuNhap: props.DataEdit.ID_PhieuNhap,
        NguoiNhapHang: values.NguoiNhapHang,
        NgayNhap: props.DataEdit.NgayNhap,
        id_NhaCungCap:Value,
      };
      await props.Save(DataForm);
    }
  }
  return (
    <div>
      <Modal
        title={
          props.action === "Add"
            ? "Thêm mới phiếu nhập"
            : props.action === "Edit"
            ? "Chỉnh sửa phiếp nhập"
            : null
        }
        open={props.show}
        onCancel={props.hiddenModal}
        footer={
          [
            <Button onClick={props.hiddenModal}>Hủy</Button>,
            <Button type="primary" onClick={handleSave}>Lưu</Button>
          ]
        }
      >
        <Form form={form} layout="horizontal" autoComplete="off" onFinish={onFinish}>
          <Form.Item label={"Người nhập :"} name="NguoiNhapHang">
            <Input
              className="costumInput"
              name="NguoiNhapHang"
            />
          </Form.Item>
          <Form.Item label={"Nhà cung cấp :"} name="NhaCungCap">
            <Select style={{ width: "340px", float: "right" }} onChange={(value)=>handleOption(value)}>
             {dataNhaCungCap.map((items) => (
              <option value={items.id_NhaCungCap} key={items.id_NhaCungCap}>{items.TenNhaCungCap}</option>
             ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Modal_PhieuKho;
