import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/Logo.png";
import Pic1 from "../Images/woman-shopping-with-credit-card.webp";

import "../../../../css/main.css";
import axios from "axios";
import { Button, Checkbox, Form, Input, message } from "antd";
// import { EyeOutlined } from "@ant-design/icons";
import { decodeJwt } from "jose";
import { Header } from "antd/es/layout/layout";
import { Apple, Facebook, Google, Password } from "@mui/icons-material";

function Login(props) {
  const { pathname } = useLocation();
  const [form] = Form.useForm();
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();
  // const [showPassword, setShowPassword] = useState(false);

  const styleButton = {
    margin: "10px",
    padding: "5px",
    width: "65px",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
  };

  // const toggleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  useEffect(() => {
    let loginCheck = localStorage.getItem("Token");
    setIsLogin(loginCheck);
  }, [pathname]);

  function CheckRole(token) {
    const decodedToken = decodeJwt(token);

    if (decodedToken.NhomNguoiDung === "Admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  function hanldeLogin() {
    form.submit();
  }

  async function onFinish(values) {
    const Data = {
      PhoneNumber: values.PhoneNumber,
      Password: values.Password,
    };

    try {
      console.log(Data);
      const res = await axios.post(
        "https://localhost:7177/api/auth/login",
        Data
      );

      if (res.data.Status === 1) {
        localStorage.setItem("Token", res.data.Token);
        localStorage.setItem("User", res.data.Username);
        localStorage.setItem("PhoneNumber", res.data.PhoneNumber);
        localStorage.setItem("RefreshToken", res.data.RefreshToken);
        localStorage.setItem("ID", res.data.ID);
        CheckRole(res.data.Token);
        console.log(res);
        message.success(res.data.Message);
      }
    } catch (error) {
      console.error(error);
      message.error(error.response.data.Message);
    }
  }

  return isLogin ? (
    <Navigate to={"/admin"} replace />
  ) : (
    <div className="Main-app">
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
            Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
          </p>
        </div>
      </Header>
      <div className="LoginContent">
        <div className="LoginBox">
          <div className="LeftBox">
            <div className="LeftBoxTitle">
              <h1>Đăng nhập</h1>
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
                  <Form.Item name={"PhoneNumber"}>
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
                <Form.Item name={"Password"}>
                  <Input.Password
                    name="Password"
                    placeholder="Enter at least 8 characters"
                    className="Input_Password"
                    // style={{
                    //   border: "0",
                    //   backgroundColor: "#f3f4f6",
                    //   width: "100%",
                    //   height: "22px",
                    //   margin: "0px",
                    //   padding: "0px",
                    // }}
                  />
                </Form.Item>
                </div>
              </Form>
              <div className="subTitle">
                <div className="Checkbox">
                  <Checkbox />
                  <p>Remember me</p>
                </div>
                <Link to={"/repass"}>Quên mật khẩu?</Link>
              </div>
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
                Đăng nhập
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

export default Login;
