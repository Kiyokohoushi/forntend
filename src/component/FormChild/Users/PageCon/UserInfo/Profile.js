import { Avatar, Button, DatePicker, Form, Input, Radio, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import "../../../../../css/Users/PageCon/Profile.css";
import avatar from "../image/thenho.jpg";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";

function Profile(props) {
  const [form] = Form.useForm();
  const [Picture, setPicture] = useState();
  const [value_radio, setValue_Radio] = useState(null);
  const DateFormat = "DD/MM/YYYY";
  function handle_Radio(e) {
    setValue_Radio(e.target.value);
  }
  return (
    <div>
      <Content
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "max-content",
          padding: "0px",
          margin: "5px",
          borderRadius: "20px",
        }}
      >
        <div className="Title_HSUser">
          <div>
            <h2>Hồ sơ của tôi</h2>
            <p>Quản lý thông tin hồ sơ</p>
          </div>
        </div>
        <div className="Form_NhapHS">
          <div className="FormNhap_Left">
            <Form form={form} layout="horizontal" style={{ float: "right" }}>
              <Form.Item label="Họ và tên">
                <Input className="Input_NHAPHS" />
              </Form.Item>
              <Form.Item label="Địa chỉ">
                <Input className="Input_NHAPHS" />
              </Form.Item>
              <Form.Item label="Email">
                <Input className="Input_NHAPHS" />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input className="Input_NHAPHS" />
              </Form.Item>
              <Form.Item label="Giới tính">
                <Radio.Group
                  onChange={handle_Radio}
                  value={value_radio}
                  className="Input_NHAPHS"
                >
                  <Radio value={1}>Nam</Radio>
                  <Radio value={2}>Nữ</Radio>
                  <Radio value={3}>Khác</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Ngày sinh">
                <DatePicker className="Input_NHAPHS" format={DateFormat} />
              </Form.Item>
              <div className="Button_NHAPHS">
                <Button style={{ marginRight: "20px" }}>Hủy</Button>

                <Button
                  style={{
                    backgroundColor: "blueviolet",
                    color: "white",
                  }}
                >
                  Lưu
                </Button>
              </div>
            </Form>
          </div>
          <div className="FormNhap_Right">
            <div className="Avatar_FormNhapRight">
              <div className="avatar_NhapRight">
                <Avatar
                  size={{
                    xs: 104,
                    sm: 112,
                    md: 120,
                    lg: 144,
                    xl: 162,
                    xxl: 170,
                  }}
                  src={Picture}
                />
              </div>
              <div className="Button_NhapRight">
                <Upload
                  name="picture"
                  listType="picture"
                  multiple={false}
                  maxCount={1}
                  showUploadList={false}
                  accept="jpg, gif, png, jpeg "
                  beforeUpload={(file) => {
                    console.log(file);
                    setPicture(URL.createObjectURL(file));
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default Profile;
