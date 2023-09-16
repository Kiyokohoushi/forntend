import React, { useEffect, useRef } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

function Modal_sp(props) {
  const [form] = Form.useForm();
  const frmSanPham = useRef();

  useEffect(() => {
    if (props.action === "Edit" && props.dataEdit.mSanPham) {
      frmSanPham.current?.setFieldsValue({
        ...props.dataEdit,
      });
    } else {
      frmSanPham.current?.resetFields();
    }
  }, [props.dataEdit]);
  
  async function onSave(){
    const dataSanPham = await frmSanPham.current?.validateFields();
    if (props.action==="Add" && dataSanPham != null){
      await axios.post('https://localhost:7177/api/SP/ThemSPBase64',dataSanPham)
      .then((res)=>{
        if (res.data.Status >=1){
          message.success('Thêm mới thành công')
          console.log(dataSanPham);
        }else{
          message.error('Lỗi thêm mới')
        }
      })
      .catch((error)=>{
        console.log(error);
      });
    }
  }

  return (
    <>
      <Modal
        open={props.visible}
        title={
          props.action === "Add" ? "Thêm mới sản phẩm" : "Cập nhập thông tin sản phẩm"
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
        <Form form={form} ref={frmSanPham} layout="vertical" autoComplete="off">
          <Form.Item name="picture" label="Hình ảnh" rules={[{
            required: true,
            message:"Vui lòng thêm ảnh"
          }]}>
            <Upload listType="picture"
            accept=".png, .jpg, .gif, jpeg"
            beforeUpload={(file)=>{
              console.log({file});
              return false;
            }}
            
            >
              <Button icon={<UploadOutlined />}>Tải Lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="mSanPham" label="Mã Sản Phẩm" rules={[{
            required: true,
            message:"Vui lòng nhập mã sản phẩm"
          }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tenSP" label="Tên Sản Phẩm" rules={[{
            required: true,
            message:"Vui lòng nhập tên sản phẩm"
          }]}>
            <Input />
          </Form.Item>
          <Form.Item name="loaiSanPham" label="Loại Sản Phẩm" rules={[{
            required: true,
            message:"Vui lòng nhập loại sản phấm"
          }]}>
            <Input />
          </Form.Item>

          <Form.Item name="donGia" label="Giá" rules={[{
            required: true,
            message:"Vui lòng nhập đơn giá"
          }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="soLuong" label="Số Lượng" required messageVariables={"Vui lòng nhập số lượng"}>
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Modal_sp;
