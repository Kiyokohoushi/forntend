import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import React from "react";

function themmoi(props) {
  return (
    <div>
      <Form>
        <Form.Item name="HinhAnh" label="Hình Ảnh">
          <Upload listType="picture">
            <Button icon={<UploadOutlined />}>Tải Lên</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="MaSanPham" label="Mã Sản Phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="TenSanPham" label="Tên Sản Phẩm">
          <Input />
        </Form.Item>

        <Form.Item name="LoaiSanPham" label="Loại Sản Phẩm">
          <Input />
        </Form.Item>

        <Form.Item name="gia" label="Giá">
          <InputNumber />
        </Form.Item>
        <Form.Item name="soluong" label="Số Lượng">
          <InputNumber />
        </Form.Item>
      </Form>
    </div>
  );
}

export default themmoi;
