import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function Modal_sp(props) {
  const [form] = Form.useForm();
  const id = props.dataEdit && props.dataEdit.mSanPham;
  const [Data, setData] = useState();
  const [fileList, setFileList] = useState([]); // Thêm trạng thái fileList
  const [Anh, setAnh] = useState();
  const [MaSP, setMaSP] = useState();
  const [TenSP, setTenSP] = useState();
  const [LoaiSP, setLoaiSP] = useState();
  const [SoLuong, setSoLuong] = useState();
  const [DonGia, setDonGia] = useState();

  useEffect(() => {
    if (props.action === "Edit" || props.action === "ChiTiet") {
      axios
        .post("https://localhost:7177/api/SP/ChiTietSp?msp=" + id)
        .then(async (res) => {
          console.log(res);
          const { mSanPham, tenSP, loaiSanPham, soLuong, donGia, picture } =
            res.data;

          const response = await axios.get(
            "https://localhost:7177/" + picture,
            {
              responseType: "arraybuffer",
            }
          );

          const blob = new Blob([response.data], { type: "image/png" });
          const imageFile = new File([blob], "image.png", {
            type: "image/png",
          });

          const data = res.data;
          const urlAnh = URL.createObjectURL(blob);

          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: urlAnh,
              thumbUrl: urlAnh,
              originFileObj: imageFile, // Đặt đối tượng tệp tin ở đây
            },
          ]);

          // Đặt giá trị cho các trường khác trong biểu mẫu
          form.setFieldsValue({
            picture: imageFile, // Đặt đối tượng tệp tin ở đây
            mSanPham,
            tenSP,
            loaiSanPham,
            donGia,
            soLuong,
          });
          setData(data);
        })
        .catch((error) => {
          message.error("lỗi", error);
        });
    } else {
      form.resetFields();
    }
  }, [props.dataEdit]);

  const fileListMoi = ({fileList}) => {
    setFileList(fileList);
  };

  async function onSave() {
    if (props.action === "Add") {
      const formData = new FormData();
      formData.append("file", Anh);
      formData.append("MSanPham", MaSP);
      formData.append("TenSP", TenSP);
      formData.append("LoaiSanPham", LoaiSP);
      formData.append("SoLuong", SoLuong);
      formData.append("DonGia", DonGia);
      await props.save(formData);
      form.resetFields();
    }

    if (props.action === "Edit") {
      const dataEdit = await form.validateFields();
      const formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      formData.append("MSanPham", dataEdit.mSanPham);
      formData.append("TenSP", dataEdit.tenSP);
      formData.append("LoaiSanPham", dataEdit.loaiSanPham);
      formData.append("SoLuong", dataEdit.soLuong);
      formData.append("DonGia", dataEdit.donGia);
      await props.save(formData);
    }
  }
  if (props.action === "Add" || props.action === "Edit") {
    return (
      <>
        <Modal
          open={props.visible}
          title={
            props.action === "Add"
              ? "Thêm mới sản phẩm"
              : "Cập nhập thông tin sản phẩm"
          }
          onCancel={props.hiddenModal}
          footer={[
            <Button key="back" onClick={props.hiddenModal}>
              Thoát
            </Button>,
            <Button key="submit" type="primary" onClick={onSave}>
              Lưu
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" autoComplete="off">
            {props.action === "Edit" && (
              <Form.Item name="picture" label="Hình ảnh">
                <Upload
                multiple
                  listType="picture"
                  accept=".png, .jpg, .gif, jpeg"
                  fileList={fileList} // Sử dụng fileList trong trạng thái ở đây
                  beforeUpload={(file) => {
                    console.log({ file });
                    return false;
                  }}
                  onChange={fileListMoi}
                >
                  <Button icon={<UploadOutlined />}>Tải Lên</Button>
                </Upload>
              </Form.Item>
            )}
            {props.action === "Add" && (
              <Form.Item
                name="picture"
                label="Hình ảnh"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm ảnh",
                  },
                ]}
                onChange={(e) => {
                  setAnh(e.target.files[0]);
                }}
              >
                <Upload
                  listType="picture"
                  accept=".png, .jpg, .gif, jpeg"
                  beforeUpload={(file) => {
                    console.log({ file });
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Tải Lên</Button>
                </Upload>
              </Form.Item>
            )}

            <Form.Item
              name="mSanPham"
              label="Mã Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã sản phẩm",
                },
              ]}
              onChange={(e) => {
                setMaSP(e.target.value);
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tenSP"
              label="Tên Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sản phẩm",
                },
              ]}
              onChange={(e) => {
                setTenSP(e.target.value);
              }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="loaiSanPham"
              label="Loại Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại sản phấm",
                },
              ]}
              onChange={(e) => {
                setLoaiSP(e.target.value);
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="donGia"
              label="Giá"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập đơn giá",
                },
              ]}
              onChange={(e) => {
                setDonGia(e.target.value);
              }}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="soLuong"
              label="Số Lượng"
              required
              messageVariables={"Vui lòng nhập số lượng"}
              onChange={(e) => {
                setSoLuong(e.target.value);
              }}
            >
              <InputNumber />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  } else {
    return (
      <>
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
                  {Data && Data.picture && (
                    <img
                      height="205"
                      width="200"
                      src={"https://localhost:7177/" + Data.picture}
                      alt="Ảnh sản phẩm"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Mã sản phẩm: {Data && Data.mSanPham} </td>
              </tr>
              <tr>
                <td>Tên sản phẩm: {Data && Data.tenSP} </td>
              </tr>
              <tr>
                <td>Loại sản phẩm: {Data && Data.loaiSanPham} </td>
              </tr>
              <tr>
                <td>Giá: {Data && Data.donGia} </td>
              </tr>
              <tr>
                <td>Số lượng: {Data && Data.soLuong} </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </>
    );
  }
}

export default Modal_sp;
