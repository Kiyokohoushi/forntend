import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Lỗi khi truy xuất dữ liệu:", error);
    message.error("Có lỗi xảy ra khi truy xuất dữ liệu.");
    return Promise.reject(error);
  }
);

function Modal_sp(props) {
  const [form] = Form.useForm();
  const id = props.dataEdit?.MSanPham;
  const [data, setData] = useState();
  const [DSLoaiSanPham, setDSLoaiSanPham] = useState([]);
  const [fileList, setFileList] = useState([]);

  const updateFileList = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7177/api/SP/ChiTietSP ${id}`
      );

      const Data = response.data;
      const imageData = response.data.Picture;

      const imageBlob = new Blob([imageData], { type: "image/png" });
      const imageFile = new File([imageBlob], "image.png", {
        type: "image/png",
      });

      const imageUrl = imageData;

      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: imageUrl,
          thumbUrl: imageUrl,
          originFileObj: imageFile,
        },
      ]);

      form.setFieldsValue({
        Picture: imageFile,
        MSanPham: Data.MSanPham,
        TenSP: Data.TenSP,
        LoaiSanPham: Data.LoaiSanPham,
      });

      setData(Data);
    } catch (error) {
      console.error("Lỗi khi truy xuất chi tiết sản phẩm:", error);
    }
  };
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

  useEffect(() => {
    GetDSLoaiSanPham();
  },[]);
  const handleSave = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    try {
      if (props.action === "Edit") {
        const formData = new FormData();
        formData.append("file", fileList[0]?.originFileObj);
        formData.append("MSanPham", values.MSanPham);
        formData.append("TenSP", values.TenSP);
        formData.append("LoaiSanPham", values.loaiSanPham);

        await props.save(formData);
      }
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (props.action === "Edit" || props.action === "ChiTiet") {
      updateFileList();
    } else {
      form.resetFields();
    }
  }, [form, id, props.action]);
  return (
    <div>
      {props.action === "Edit" && (
        <Modal
          open={props.visible}
          title={"Cập nhập thông tin sản phẩm"}
          onCancel={props.hiddenModal}
          footer={[
            <Button key="back" onClick={props.hiddenModal}>
              Thoát
            </Button>,
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              onClick={handleSave}
            >
              Lưu
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              name="Picture"
              label="Hình ảnh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng tải lên một hình ảnh cho sản phẩm",
                },
              ]}
            >
              <Upload
                name="Picture"
                multiple={false}
                listType="picture"
                accept=".png, .jpg, .gif, .jpeg"
                maxCount={1}
                fileList={fileList}
                beforeUpload={() => false}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Tải Lên</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="MSanPham"
              label="Mã Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Mã sản phẩm không được để trống.",
                },
              ]}
            >
              <Input name="MSanPham" disabled />
            </Form.Item>
            <Form.Item
              name="TenSP"
              label="Tên Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm.",
                },
              ]}
            >
              <Input name="TenSP" />
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
          </Form>
        </Modal>
      )}
      {props.action === "ChiTiet" && (
        <Modal
          title="Thông Tin Sản Phẩm"
          open={props.visible}
          onCancel={props.hiddenModal}
          footer={[
            <Button key="back" onClick={props.hiddenModal}>
              Thoát
            </Button>,
          ]}
        >
          <table>
            <tbody>
              <tr>
                <td rowspan="6" width="200" height="205">
                  {data && data.Picture && (
                    <img
                      height="205"
                      width="200"
                      src={data.Picture}
                      alt="Ảnh sản phẩm"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Mã sản phẩm: {data && data.MSanPham} </td>
              </tr>
              <tr>
                <td>Tên sản phẩm: {data && data.TenSP} </td>
              </tr>
              <tr>
                <td>Loại sản phẩm: {data && data.LoaiSanPham} </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      )}
    </div>
  );
}

export default Modal_sp;
