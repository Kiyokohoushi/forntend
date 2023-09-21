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

function Login(props) {
  const { pathname } = useLocation();
  const [IsLogin, setIsLogin] = useState();
  const navigate = useNavigate();
  const frmsdt = useRef(null);
  const frmpass = useRef(null);
  
  useEffect(()=> {
    let loginCheck = localStorage.getItem("LoginCT");
    setIsLogin(loginCheck);
  },[pathname]);

  async function onFinish() {
    const values = {
      PhoneNumber:frmsdt.current.value,
      Password: frmpass.current.value,
    }
    axios
      .post("https://localhost:7177/api/TK/Login", values)
      .then((res) => {
        console.log(res)
        if(res.data.status===1) {
          let loginCheckData ={
            status: res.data.data.status,
            data: res.data.data.data,
          };
          localStorage.setItem("LoginCT", JSON.stringify(loginCheckData));
          navigate("/");
          console.log(res); 
          message.success(res.data.messeage);
      }
         else {
         message.error(res.data.messeage);
        }
      })
      .catch((error) => {
        message.error("Lỗi hệ thông vui lòng liện hệ hỗ trợ khách hàng",error);
      });
  }

  return IsLogin? (
    <Navigate to={"/"} replace/>
  ):(
    <div className="Main-app">
      <Form className="form" onFinish={onFinish}>
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đăng Nhập</h1>
       
        <input type="number" ref={frmsdt} name="phoneNumber" placeholder="Số điện thoại" />
        <input
          type="password"
          name="password"
          ref={frmpass}
          placeholder="Mật khẩu"
        />
       
        <Link to="/repass" className="link1">
          Quên mật khẩu
        </Link>
        <button type="submit" className="Login" >
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
