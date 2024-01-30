import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../../css/main.css";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { Header } from "antd/es/layout/layout";
import { Apple, Facebook, Google } from "@mui/icons-material";
import logo from "../Images/Logo.png";
import Pic1 from "../Images/BF_shopping.jpg";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const styleButton = {
    margin: "10px",
    padding: "5px",
    width: "65px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
  };

  function hanldeLogin() {
    form.submit();
  }

  const onFinish = async (values) => {
    const Data = {
      Email: values.Email,
      Name: values.Name,
      PhoneNumber: values.PhoneNumber,
      Password: values.Password,
    };

    try {
      const res = await axios.post(
        "https://localhost:7177/api/TK/Register",
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
    <div className="Main-app2">
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
            Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </Header>
      <div className="LoginContent">
        <div className="LoginBox">
          <div className="LeftBox">
            <div className="LeftBoxTitle">
              <h1>Đăng ký</h1>
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
                  <p>Họ và tên</p>
                  <Form.Item
                    name={"Name"}
                    rules={[
                      {
                        // required: true,
                        validator: (rule, value) => {
                          if (!value) {
                            return Promise.reject("Vui lòng nhập tên đăng ký.");
                          }

                          if (value.length < 3 || value.length > 30) {
                            return Promise.reject(
                              "Tên đăng ký cần có ít nhất 10 ký tự và không vượt quá 30 ký tự."
                            );
                          }

                          const specialCharacterRegex = /[*&^%$#@!]/;
                          if (specialCharacterRegex.test(value)) {
                            return Promise.reject(
                              "Tên đăng ký không hợp lệ. Vui lòng kiểm tra lại"
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      name="Name"
                      placeholder="John David"
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
                  <p>Email</p>
                  <Form.Item
                    name={"Email"}
                    rules={[
                      {
                        type: "email",
                        validator: (rule, value) => {
                          if (value && !value.endsWith("@gmail.com")) {
                            return Promise.reject(
                              "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ email.",
                      },
                    ]}
                  >
                    <Input
                      name="Email"
                      placeholder="example@example.com"
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
                    <Input
                      name="Password"
                      placeholder="Enter at least 8 characters"
                      type="password"
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
                onClick={hanldeLogin}
              >
                Đăng ký
              </Button>

              <div className="LeftBoxFooter">
                <p
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Hoặc đăng nhập bằng
                </p>
                <div className="IconButton">
                  <Button style={styleButton}>
                    <Google fontSize="small" />
                  </Button>
                  <Button style={styleButton}>
                    {/* <img
                        src={facebook}
                        alt="FaceBook"
                        height={"20px"}
                        width={"20px"} */}
                    <Facebook fontSize="small" color="#4060a4" />
                  </Button>
                  <Button style={styleButton}>
                    <Apple fontSize="small" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="RightBox">
            <img src={Pic1} alt="Picture" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
