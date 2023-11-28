import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function Modal_sp(props) {
  const [form] = Form.useForm();
  const id = props.dataEdit && props.dataEdit.MSanPham;
  const [Data, setData] = useState();
  const [fileList, setFileList] = useState([]); // Thêm trạng thái fileList

  useEffect(() => {
    if (props.action === "Edit" || props.action === "ChiTiet") {
      axios
        .post("https://localhost:7177/api/SP/ChiTietSP " + id)
        .then(async (res) => {
          console.log(res);
          const { MSanPham, TenSP, LoaiSanPham, Picture } = res.data;

          const response = await axios.get("https://localhost:7177" + Picture, {
            responseType: "arraybuffer",
          });

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
            Picture: imageFile, // Đặt đối tượng tệp tin ở đây
            MSanPham,
            TenSP,
            LoaiSanPham,
          });
          setData(data);
        })
        .catch((error) => {
          message.error("lỗi", error);
        });
    } else {
      form.resetFields();
    }
  }, [form, id, props.action]);

  const fileListMoi = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSave = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      if (props.action === "Edit") {
        const formData = new FormData();
        formData.append("file", fileList[0].originFileObj);
        formData.append("MSanPham", values.MSanPham);
        formData.append("TenSP", values.TenSP);
        formData.append("LoaiSanPham", values.LoaiSanPham);
        await props.save(formData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (props.action === "Edit") {
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
                multiple
                listType="picture"
                accept=".png, .jpg, .gif, jpeg"
                maxCount={1}
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
              name="LoaiSanPham"
              label="Loại Sản Phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập loại sản phẩm.",
                },
              ]}
            >
              <Input name="LoaiSanPham" />
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
                  {Data && Data.Picture && (
                    <img
                      height="205"
                      width="200"
                      src={"https://localhost:7177/" + Data.Picture}
                      alt="Ảnh sản phẩm"
                    />
                  )}
                </td>
              </tr>
              <tr>
                <td>Mã sản phẩm: {Data && Data.MSanPham} </td>
              </tr>
              <tr>
                <td>Tên sản phẩm: {Data && Data.TenSP} </td>
              </tr>
              <tr>
                <td>Loại sản phẩm: {Data && Data.LoaiSanPham} </td>
              </tr>
            </tbody>
          </table>
        </Modal>
      </>
    );
  }
}

export default Modal_sp;
