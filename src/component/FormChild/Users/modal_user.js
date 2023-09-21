import { Form, Input, InputNumber, Modal, Select } from "antd";
import React from "react";
import "../../../css/User.css";

function ModalUser(props) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title={
          props.action === "Add"
            ? "Thêm mới người dùng"
            : "Chỉnh sửa người dùng"
        }
        open={props.visible}
        onCancel={props.hiddenModal}
      >
        <Form form={form} autoComplete="false" className="formcustom">
          <Form.Item name="username" label="Tên hiển thị: ">
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item name="phoneNumber" label="Số điện thoại: ">
            <InputNumber className="costumInput" />
          </Form.Item>
          <Form.Item name="email" label="Email: ">
            <Input className="costumInput" />
          </Form.Item>
          <Form.Item name="vaitro" label="Vai trò: ">
            <Select
              style={{
                width: "340px",
                float: "right",
              }}
            >
              <Select.Option value="Quản trị người dùng">Admin</Select.Option>
              <Select.Option value="Người bán">Salesman</Select.Option>
              <Select.Option value="Người mua">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="isActive" label="Trạng thái: ">
            <Select
              style={{
                width: "340px",
                float: "right",
              }}
            >
              <Select.Option value="1">Hoạt động</Select.Option>
              <Select.Option value="0">Khóa</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalUser;
