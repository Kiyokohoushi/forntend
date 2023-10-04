import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React from "react";
import { useState } from "react";

function ThemSP(props) {
  const [form] = Form.useForm();
  const [Anh, setAnh] = useState();
  const [MaSP, setMaSP] = useState();
  const [TenSP, setTenSP] = useState();
  const [LoaiSP, setLoaiSP] = useState();
  const [SoLuong, setSoLuong] = useState();
  const [DonGia, setDonGia] = useState();

  function onSave() {
    const formData = new FormData();
    formData.append("file", Anh);
    formData.append("MSanPham", MaSP);
    formData.append("TenSP", TenSP);
    formData.append("LoaiSanPham", LoaiSP);
    formData.append("SoLuong", SoLuong);
    formData.append("DonGia", DonGia);

    axios
      .post("https://localhost:7177/api/SP/ThemSP", formData)
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res);
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((error) => {
        message.error("Lỗi", error);
      });
  }
  return (
    <div>
      <Content
        style={{
          padding: 10,
          marginTop: 2,
          minHeight: 1000,
          background: "#ffff",
        }}
      >
        <Content
          style={{
            borderRadius: "8px 8px 0 0",
            background: "#F5F5F5",
            border: "1px solid #f0f0f0",
            height: 55,
            fontWeight: "bold",
            padding: "16px 25px",
          }}
        >
          Thêm mới sản phẩm
        </Content>
        <Content
          style={{
            padding: 24,
            background: "#ffff",
            border: "1px solid #f0f0f0",
            borderRadius: " 0 0 8px 8px",
          }}
        >
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item
              name="picture"
              label="Hình Ảnh"
              onChange={(e) => {
                setAnh(e.target.files[0]);
              }}
            >
              <Upload
                listType="picture"
                accept="jpg, gif, png, jpeg "
                beforeUpload={(file) => {
                  console.log(file);
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Tải Lên</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="mSanPham"
              label="Mã Sản Phẩm"
              onChange={(e) => setMaSP(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tenSp"
              label="Tên Sản Phẩm"
              onChange={(e) => setTenSP(e.target.value)}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="loaiSanPham"
              label="Loại Sản Phẩm"
              onChange={(e) => setLoaiSP(e.target.value)}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="donGia"
              label="Giá"
              onChange={(e) => setDonGia(e.target.value)}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="soLuong"
              label="Số Lượng"
              onChange={(e) => setSoLuong(e.target.value)}
            >
              <Input />
            </Form.Item>
          <Button type="primary" style={{ marginBottom: "5px" }} onClick={onSave}>
            Thêm Mới
          </Button>
          </Form>
        </Content>
      </Content>
    </div>
  );
}

export default ThemSP;
