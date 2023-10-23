import { Button, Form, Input, Modal } from "antd";
import "../../../../css/ChucNang.css";
import React, { useEffect, useState } from "react";

function ModalCn(props) {
  const [form] = Form.useForm();
  const [tenNND, setTenNND] = useState();
  const [ghiChu, setGhiChu] = useState();
  const [tenChucNang, setTenChucNang] = useState();

  useEffect(() => {
    if (props.action === "Edit") {
    } else {
      form.resetFields();
    }
  });
  async function onSave() {
    if (props.action === "Add") {
      const formData = {
        TenNND: tenNND,
        GhiChu: ghiChu,
      };
      await props.Save(formData);
      props.hiddentShow();
    }
    if (props.action === "AddCN") {
      const formData = tenChucNang
      await props.OnSave(formData);
      props.unShow();
    }
  }
  
  if (props.action === "Add" || props.action === "Edit") {
    return (
      <div>
        <Modal
          title={
            props.action === "Add"
              ? "Thêm nhóm người dùng"
              : "Cập nhập nhóm người dùng"
          }
          open={
            props.action === "Add" || props.action === "Edit"
              ? props.show
              : null
          }
          onCancel={props.hiddentShow}
          footer={[
            <Button onClick={props.hiddentShow}> Hủy</Button>,
            <Button type="primary" onClick={onSave}>
              Lưu
            </Button>,
          ]}
        >
          <Form form={form} layout="horizontal" autoComplete="off">
            <Form.Item
              label={"Nhập tên nhóm :"}
              onChange={(e) => setTenNND(e.target.value)}
            >
              <Input className="costumInput" />
            </Form.Item>
            <Form.Item
              label={"Ghi chú"}
              onChange={(e) => setGhiChu(e.target.value)}
            >
              <Input className="costumInput" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
  if (props.action === "AddCN") {
    return (
      <div>
        <Modal
          title={"Thêm mới chức năng"}
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
            <Form.Item
              label="Tên Chức Năng :"
              onChange={(e) => {
                setTenChucNang(e.target.value);
              }}
            >
              <Input className="costumInput" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ModalCn;
