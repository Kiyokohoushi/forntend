import React from "react";
import logo from "../Images/Logo.png";
import "../../../../css/main.css";
import Pic1 from "../Images/beautiful-asian-girl-holding-shopping-bag-posing-purple-background_466494-2152.jpg";
import { Header } from "antd/es/layout/layout";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Repass(props) {
  const [form]= Form.useForm();
  const navigate = useNavigate();

  function hanldeChange() {
    form.submit();
  }

  const onFinish = async (values) => {
    const Data = {
      PhoneNumber: values.PhoneNumber,
      Password: values.Password,
      RePassword:values.Repassword
    };

    try {
      const res = await axios.post(
        "https://localhost:7177/api/TK/DoiMK",
        Data
      );

      if (res.data.Status === 1) {
        navigate("/");
        console.log(res);
        message.success(res.data.Message);
      } else {
        message.error(res.data.Message);
      }
    } catch (error) {
      message.error("Lỗi hệ thống vui lòng liên hệ hỗ trợ khách hàng", error);
    }
  };

  return (
    <div className="Main-app3">
      <Header
        style={{
          backgroundColor: "white",
          margin: "0px",
          padding: "0px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="left">
          <div className="BoxLogo">
            <img src={logo} alt="Logo" width={44} height={44} />
            <p className="Logo">Moon Rabbit</p>
          </div>
        </div>
        <div className="right">
          <p>
            <Link to="/login">Quay lại</Link>
          </p>
        </div>
      </Header>
      <div className="LoginContent">
        <div className="LoginBox">
          <div className="LeftBox">
            <div className="LeftBoxTitle">
              <h1>Đặt lại mật khẩu</h1>
            </div>
            <div className="LeftBoxContent">
              <Form
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                style={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="InputLogin">
                  <p>Số điện thoại</p>
                  <Form.Item
                    name={"PhoneNumber"}
                    rules={[
                      {
                        required: true,
                        validator: (rule, value) => {
                          if (!value) {
                            return Promise.reject(
                              "Vui lòng nhập số điện thoại."
                            );
                          }
                          if (!/^\d+$/.test(value)) {
                            return Promise.reject(
                              "Số điện thoại không hợp lệ. Vui lòng kiểm tra lại."
                            );
                          }
                          if (value.length < 10 || value.length > 12) {
                            return Promise.reject(
                              "Số điện thoại cần có ít nhất 10 ký tự và không vượt quá 12 ký tự."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="PhoneNumber"
                      placeholder="Input phone number"
                      style={{
                        border: "0",
                        backgroundColor: "#f3f4f6",
                        width: "100%",
                        height: "22px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    />
                  </Form.Item>
                </div>
                <div className="InputLogin">
                  <p>Mật khẩu</p>
                  <Form.Item
                    name="Password"
                    rules={[
                      {
                        required: true,
                        validator: (rule, value) => {
                          if (!value) {
                            return Promise.reject("Vui lòng nhập mật khẩu.");
                          }

                          if (
                            !/(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])/.test(value)
                          ) {
                            return Promise.reject(
                              "Mật khẩu không hợp lệ. Vui lòng kiểm tra lại."
                            );
                          }

                          if (value.length < 8 || value.length > 10) {
                            return Promise.reject(
                              "Mật khẩu cần có ít nhất 8 ký tự và không vượt quá 10 ký tự."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input.Password
                      name="Password"
                      placeholder="Enter at least 8 characters"
                      style={{
                        border: "0",
                        backgroundColor: "#f3f4f6",
                        width: "100%",
                        height: "22px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      className="Input_Password"
                    />
                  </Form.Item>
                </div>
                <div className="InputLogin">
                  <p>Nhập lại mật khẩu</p>
                  <Form.Item
                    name="Repassword"
                    rules={[
                      {
                        required: true,
                        validator: (rule, value) => {
                          if (!value) {
                            return Promise.reject("Vui lòng nhập mật khẩu.");
                          }

                          if (
                            !/(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])/.test(value)
                          ) {
                            return Promise.reject(
                              "Mật khẩu không hợp lệ. Vui lòng kiểm tra lại."
                            );
                          }

                          if (value.length < 8 || value.length > 10) {
                            return Promise.reject(
                              "Mật khẩu cần có ít nhất 8 ký tự và không vượt quá 10 ký tự."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input.Password
                      name="Repassword"
                      placeholder="Enter at least 8 characters"
                      className="Input_Password"
                      style={{
                        border: "0",
                        backgroundColor: "#f3f4f6",
                        width: "100%",
                        height: "22px",
                        margin: "0px",
                        padding: "0px",
                      }}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
            <div className="LeftBoxBottom">
              <Button
                style={{
                  width: "72%",
                  borderRadius: "9px",
                  backgroundColor: "#8658d2",
                  height: "40px",
                  color: "#fff",
                  marginBottom: "25px",
                }}
                onClick={hanldeChange}
              >
                Đặt lại mật khẩu
              </Button>
            </div>
          </div>
          <div className="RightBox">
            <img src={Pic1} alt="Picture"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Repass;
