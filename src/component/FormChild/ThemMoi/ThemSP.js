import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload, message } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React from "react";
import { useState } from "react";

function ThemSP(props) {
  const [form] = Form.useForm();
  const [Anh, setAnh] = useState();
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  // const [MaSP, setMaSP] = useState();
  // const [TenSP, setTenSP] = useState();
  // const [LoaiSP, setLoaiSP] = useState();
  // const [SoLuong, setSoLuong] = useState();
  // const [DonGia, setDonGia] = useState();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("file", Anh);
    formData.append("MSanPham", values.mSanPham);
    formData.append("TenSP", values.tenSp);
    formData.append("LoaiSanPham", values.loaiSanPham);
    formData.append("SoLuong", values.soLuong);
    formData.append("DonGia", values.donGia);

    try {
      const res = await axios.post(
        "https://localhost:7177/api/SP/ThemSP",
        formData
      );

      if (res.data.Status === 1) {
        console.log(res);
        message.success(res.data.Message);
        form.resetFields();
      } else {
        message.error(res.data.Message);
      }
    } catch (error) {
      message.error("Lỗi " + error);
    }
  };

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
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              name="picture"
              label="Hình Ảnh"
              onChange={(e) => {
                setAnh(e.target.files[0]);
              }}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.reject(
                        "Vui lòng tải lên một hình ảnh cho sản phẩm"
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload
                name="picture"
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
              rules={[
                {
                  required: true,
                  message: "Mã sản phẩm không thể để trống.",
                },
              ]}
            >
              <Input name="mSanPham" />
            </Form.Item>
            <Form.Item
              name="tenSp"
              label="Tên Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm.",
                },
              ]}
            >
              <Input name="tenSp" />
            </Form.Item>

            <Form.Item
              name="loaiSanPham"
              label="Loại Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hoặc cung cấp loại sản phẩm.",
                },
              ]}
            >
              <Input name="loaiSanPham" />
            </Form.Item>

            <Form.Item
              name="donGia"
              label="Giá"
              rules={[
                {
                  required: true,
                  message: "Vui lòng cung cấp giá sản phẩm.",
                },
              ]}
            >
              <Input name="donGia" />
            </Form.Item>
            <Form.Item
              name="soLuong"
              label="Số Lượng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng cung cấp số lượng sản phẩm.",
                },
              ]}
            >
              <Input name="soLuong" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: "5px" }}
            >
              Thêm Mới
            </Button>
          </Form>
        </Content>
      </Content>
    </div>
  );
}

export default ThemSP;
