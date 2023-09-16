import { React, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../Images/logo.png";
import facebook from "../Images/logo-facebook.png";
import google from "../Images/Google__G__Logo.svg.webp";
import apple from "../Images/apple.png";
import nhatot from "../Images/pty-orange-logo.png";
import xetot from "../Images/veh-orange-logo.png";
import viectot from "../Images/job-green-logo.png";

import "../../../../css/main.css";
import { Checkbox, Form, message } from "antd";
import axios from "axios";

function Register() {
  const frmemail = useRef(null);
  const frmName = useRef(null);
  const frmNumber = useRef(null);
  const frmPassword = useRef(null);

  async function onFinish() {
    const values = {
      email: frmemail.current.value,
      Name: frmName.current.value,
      PhoneNumber: frmNumber.current.value,
      Password: frmPassword.current.value,
    };
    axios
      .post("https://localhost:7177/api/TK/Register", values)
      .then((res) => {
        if (res.data.status === 1) {
          console.log(res);
          message.success(res.data.messeage);
        } else {
          message.error(res.data.messeage);
        }
      })
      .catch((error) => {
        message.error("Lỗi hệ thông vui lòng liện hệ hỗ trợ khách hàng", error);
      });
  }

  return (
    <div className="Main-app">
      <Form className="form" onFinish={onFinish}>
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đăng ký tài khoản</h1>
        <input type="email" ref={frmemail} name="email" placeholder="Nhập email" required/>
        <input type="text" ref={frmName} name="name" placeholder="Họ và tên" required/>
        <input
          type="number"
          ref={frmNumber}
          name="phoneNumber"
          placeholder="Số điện thoại"
          required
        />
        <input type="password" ref={frmPassword} name="password" required messageVariables={"Mật khẩu không được để trống"}/>
        <Checkbox>
          Bằng việc Đăng ký, bạn đã đọc và đồng ý với{" "}
          <Link to="/trogiup">Điều khoản sử dụng</Link> và{" "}
          <Link to="/trogiup">Chính sách bảo mật</Link> của Chợ Tốt
        </Checkbox>
        <button type="submit" className="Login">
          ĐĂNG KÝ
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
          Đã có tài khoản?{" "}
          <Link to="/" className="link">
            Đăng nhập ngay
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

export default Register;
