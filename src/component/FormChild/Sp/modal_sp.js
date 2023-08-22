import React, { useRef, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function Modal_sp(props) {
  const frmSanPham = useRef();
  useEffect(() => {
    //Nếu sự kiện là edit thì lấy dataEdit đổ lên các input trên form
    if (props.action === "Edit" && props.dataEdit.mSanPham) {
      frmSanPham.current?.setFieldsValue({
        ...props.dataEdit,
      });
    } 
    else {
      frmSanPham.current?.resetFields();
    }
  }, [props.dataEdit]);

  async function onSave() {
    const dataUpdate = await frmSanPham.current?.validateFields();
    if (dataUpdate!= null) {
      await props.save(dataUpdate);
    }
    await frmSanPham.current?.resetFields();
  }
  return (
    <>
      <Modal
        open={props.visible}
        title={
          props.action === "Them" ? "Thêm mới sản phẩm" : "Cập nhập sản phẩm"
        }
        onCancel={props.onCancel}
        footer={[
          <Button key="back" onClick={props.hiddenModal}>
            Thoát
          </Button>,
          <Button key="submit" type="primary" onClick={onSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form ref={frmSanPham} layout="vertical" autoComplete="off">
          <Form.Item
            name="picture"
            id="picture"
            label="Hình Ảnh"
          >
            <Upload listType="Picture">
              <Button icon={<UploadOutlined />}>Tải Lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="mSanPham"
            id="mSanPham"
            label="Mã Sản Phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập id sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tenSP"
            id="tenSp"
            label="Tên Sản Phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="loaiSanPham"
            id="loaiSanPham"
            label="Loại Sản Phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập loại sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="donGia"
            id="donGia"
            label="Giá"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá sản phẩm",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name="soLuong"
            id="soLuong"
            label="Số Lượng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng sản phẩm",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Modal_sp;
