import React, { useState, useRef, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import facebook from "../Images/logo-facebook.png";
import google from "../Images/Google__G__Logo.svg.webp";
import apple from "../Images/apple.png";
import nhatot from "../Images/pty-orange-logo.png";
import xetot from "../Images/veh-orange-logo.png";
import viectot from "../Images/job-green-logo.png";

import "../../../../css/main.css";
import axios from "axios";
import { Form, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { decodeJwt } from "jose";

function Login(props) {
  const { pathname } = useLocation();
  const [isLogin, setIsLogin] = useState();
  const navigate = useNavigate();
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let loginCheck = localStorage.getItem("Token");
    setIsLogin(loginCheck);
  }, [pathname]);

  function CheckRole(token) {
    const decodedToken = decodeJwt(token);

    if (decodedToken.NhomNguoiDung === "Admin") {
      navigate("/");
    } else {
      navigate("/TrangChu");
    }
  }

  async function onFinish() {
    const phoneNumber = phoneInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (!phoneNumber || !password) {
      message.error("Vui lòng nhập Số điện thoại và Mật khẩu.");
      return;
    }

    const values = {
      PhoneNumber: phoneNumber,
      Password: password,
    };

    try {
      const res = await axios.post("https://localhost:7177/api/auth/login", values);

      if (res.data.Status === 1) {
        localStorage.setItem("Token", res.data.Token);
        localStorage.setItem("User", res.data.Username);
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
    <Navigate to={"/"} replace />
  ) : (
    <div className="Main-app">
      <Form className="form" onFinish={onFinish}>
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đăng Nhập</h1>

        <input ref={phoneInputRef} name="phoneNumber" placeholder="Số điện thoại" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          ref={passwordInputRef}
          placeholder="Mật khẩu"
        />
        <div className="eye-icon" onClick={toggleShowPassword}>
          <EyeOutlined />
        </div>

        <Link to="/repass" className="link1">
          Quên mật khẩu
        </Link>
        <button type="submit" className="Login">
          ĐĂNG NHẬP
        </button>
        <div className="content">
          <hr />
          <p>Hoặc đăng nhập bằng</p>
          <hr />
        </div>
        <div className="mainbottom">
          <button className="bottom">
            <img
              src={facebook}
              alt="logo"
              style={{ marginRight: "10px" }}
              height="21px"
              width="21px"
            />{" "}
            Facebook
          </button>
          <button className="bottom">
            <img src={google} alt="logo" className="small" /> Google
          </button>
          <button className="bottom">
            <img src={apple} alt="logo" className="small" /> Apple ID
          </button>
        </div>
        <p className="footage">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="link">
            Đăng ký tài khoản mới
          </Link>
        </p>
      </Form>
      <footer>
        <div className="phattrien">
          <div className="footer">
            <p>Được phát triển bởi</p>
            <img src={logo} alt="anh" className="footer-logo" />
            <img src={nhatot} alt="anh" className="footer-logo" />
            <img src={viectot} alt="anh" className="footer-logo" />
            <img src={xetot} alt="anh" className="footer-logo" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
