import { Button, Form, Input, Modal, message } from "antd";
import React, { useEffect } from "react";

function Modal_NhapHang(props) {
  const [form] = Form.useForm();


  useEffect(() => {
    if(props.action === "Edit" && props.DataEdit.ID_ChiTietNhap) {
      form.setFieldsValue({...props.DataEdit})
    }
    else{
      form.resetFields();
    }
  })
  async function handleSave() {
    form.submit();
  }
  async function onFinish(values) {
  if(props.action === "Add"){
    const Data = {
      ID_PhieuNhap: props.idPhieuNhap,
      MSanPham: values.MSanPham,
      SoLuong: values.SoLuong,
      DonGia: values.DonGia,
      ThanhTien: values.ThanhTien,
    };
    await props.Save(Data);
  }
  if(props.action==="Edit"){
    const Data = {
      ID_ChiTietNhap: props.DataEdit.ID_ChiTietNhap,
      ID_PhieuNhap: props.DataEdit.ID_PhieuNhap,
      MSanPham: values.MSanPham,
      SoLuong: values.SoLuong,
      DonGia: values.DonGia,
      ThanhTien: values.ThanhTien,
    };
    await props.Save(Data);
  }
  
  }
  return (
    <div>
      <Modal
        title={props.action === "Add" ? "Thêm mới" : "Chỉnh sửa"}
        open={props.show}
        onCancel={props.hidden}
        footer={[
          <Button onClick={props.hidden}>Hủy</Button>,
          <Button type="primary" onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          autoComplete="off"
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label="Mã sản phẩm :" name="MSanPham">
            <Input name="MSanPham" />
          </Form.Item>
          <Form.Item label="Số lượng :" name={"SoLuong"}>
            <Input name="SoLuong" />
          </Form.Item>
          <Form.Item label="Đơn giá :" name={"DonGia"}>
            <Input name="DonGia" />
          </Form.Item>
          <Form.Item label="Thành tiền :" name={"ThanhTien"}>
            <Input name="ThanhTien" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Modal_NhapHang;
