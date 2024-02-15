import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

function ThemSP(props) {
  const [form] = Form.useForm();
  const [Anh, setAnh] = useState([]);
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [DSLoaiSanPham, setDSLoaiSanPham] = useState([]);
  // const [TenSP, setTenSP] = useState();
  // const [LoaiSP, setLoaiSP] = useState();
  // const [SoLuong, setSoLuong] = useState();
  // const [DonGia, setDonGia] = useState();

  async function GetDSLoaiSanPham() {
    axios
      .get("https://localhost:7177/api/LoaiSanPham/DanhSachLoaiSP?page=1")
      .then((res) => {
        setDSLoaiSanPham(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect((res) => {
    GetDSLoaiSanPham();
  }, []);

  function GetUrlPic(file){
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  async function OnPreview(file){
    const src = file.url || (await GetUrlPic(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  function handleBeforeUpload(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      setAnh([{url: reader.result}]);
    }
    console.log(Anh)

    return false;
  }
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("file", Anh);
    formData.append("MSanPham", values.mSanPham);
    formData.append("TenSP", values.tenSp);
    formData.append("LoaiSanPham", values.loaiSanPham);

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
              <ImgCrop rotationSlider showReset>
                <Upload
                  name="picture"
                  listType="picture-card"
                  fileList={Anh}
                  accept="jpg, gif, png, jpeg "
                  onChange={({ fileList: newFileList }) => {
                    setAnh(newFileList);
                  }}
                  onPreview={(file)=>OnPreview(file)}
                  beforeUpload={(file)=>handleBeforeUpload(file)}
                >
                  {Anh.length < 1 && <UploadOutlined />}
                </Upload>
              </ImgCrop>
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
              <Select>
                {DSLoaiSanPham.map((item) => (
                  <option value={item.ID_LoaiSanPham} key={item.ID_LoaiSanPham}>
                    {item.TenLoaiSP}
                  </option>
                ))}
              </Select>
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
