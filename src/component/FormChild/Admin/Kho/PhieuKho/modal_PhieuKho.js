import { Form, Input, Modal, Select } from "antd";
import React from "react";

function Modal_PhieuKho(props) {
  const [form] = Form.useForm();
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
      >
        <Form form={form} layout="horizontal" autoComplete="off">
          <Form.Item label={"Mã phiếu nhập :"}>
            <Input className="costumInput" disabled/>
          </Form.Item>
          <Form.Item label={"Mã SP :"}>
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item label={"Tên hàng hóa :"}>
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item label={"Thực nhập :"}>
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item label={"Đơn vị tính :"}>
            <Select style={{ width: "340px", float:"right" }} />
          </Form.Item>
          <Form.Item label={"Đơn giá :"}>
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item label={"Thành tiền :"}>
            <Input className="costumInput" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Modal_PhieuKho;
