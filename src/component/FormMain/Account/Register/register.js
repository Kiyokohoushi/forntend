import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import facebook from "../Images/logo-facebook.png";
import google from "../Images/Google__G__Logo.svg.webp";
import apple from "../Images/apple.png";
import nhatot from "../Images/pty-orange-logo.png";
import xetot from "../Images/veh-orange-logo.png";
import viectot from "../Images/job-green-logo.png";

import "../../../../css/main.css";
import { Checkbox } from "antd";

const register = () => {
  return (
    <div className="Main-app">
      <form className="form">
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đăng ký tài khoản</h1>
        <input type="text" name="name" placeholder="Họ và tên" id="name" />
        <input type="number" name="sdt" placeholder="Số điện thoại" id="sdt" />
        <input type="password" name="password" id="password" />
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
      </form>
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
};

export default register;
