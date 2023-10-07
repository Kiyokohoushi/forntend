import { Button, Form, Input, Modal, Select } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

function Modal_LoaiSP(props) {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title={
          props.action === "Add"
            ? "Thêm mới"
            : props.action === "Edit"
            ? "Cập nhật"
            : " Xóa"
        }
        open={props.show}
        onCancel={props.hidden}
        footer={
          props.action === "Add" || props.action === "Edit"
            ? [<Button type="primary">Cập nhật</Button>, <Button onClick={props.hidden}>Hủy</Button>]
            : [<Button type="primary">Xóa</Button>, <Button onClick={props.hidden}>Hủy</Button>]
        }
      >
        {props.action === "Add" ? (
          <Form form={form} layout="horizontal" autoComplete="off">
            <Form.Item
              label={"Loại sản phẩm :"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label={"Loại trạng thái :"}>
              <Select
                options={[
                  {
                    value: "Đang kinh doanh",
                    label: "Đang kinh doanh",
                  },
                  {
                    value: "Ngừng kinh doanh",
                    label: "Ngừng khinh doanh",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        ) : (
          props.action === "Edit" && (
            <Form form={form} layout="horizontal" autoComplete="off">
              <Form.Item label="Loại sản phẩm">
                <Input disabled />
              </Form.Item>

              <Form.Item label={"Loại trạng thái :"}>
                <Select
                  options={[
                    {
                      value: "Đang kinh doanh",
                      label: "Đang kinh doanh",
                    },
                    {
                      value: "Ngừng kinh doanh",
                      label: "Ngừng khinh doanh",
                    },
                  ]}
                />
              </Form.Item>
            </Form>
          )
        )}
        {props.action === "Delete" && (
          <Form form={form}>
            <Content>Bạn có chắc muốn xóa không ?</Content>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default Modal_LoaiSP;
