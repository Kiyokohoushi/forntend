import { Button, Form, Input } from "antd";
import { Content } from "antd/es/layout/layout";
import "../../../../../css/Users/PageCon/Repass.css";
import React from "react";

function Repass(props) {
  const [form] = Form.useForm();
  return (
    <div>
      <Content
        style={{
          backgroundColor: "white",
          width: "100%",
          minHeight: "500px",
          padding: "0px",
          margin: "5px",
          borderRadius: "20px",
        }}
      >
        <div className="Title_HSUser">
          <h2>Đổi mật khẩu</h2>
        </div>
        <div className="Repass_Main">
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            style={{
              width: "60%",
              padding: "30px",
              margin: "0px",
              border: "1px solid #c7c7c7",
              borderRadius: "20px",
            }}
          >
            <Form.Item label={"Mật khẩu cũ"}>
              <Input.Password />
            </Form.Item>
            <Form.Item label={"Mật khẩu mới"}>
              <Input.Password />
            </Form.Item>
            <Form.Item label={"Nhập lại mật khẩu"}>
              <Input.Password  />
            </Form.Item>
            <div className="Button_NHAPHS">
              <Button style={{ marginRight: "20px" }}>Hủy</Button>
              <Button
                style={{
                  backgroundColor: "blueviolet",
                  color: "white",
                }}
              >
                Cập nhập
              </Button>
            </div>{" "}
          </Form>
        </div>
      </Content>
    </div>
  );
}

export default Repass;
