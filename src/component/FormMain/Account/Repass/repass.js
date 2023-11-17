import React from "react";
// import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import nhatot from "../Images/pty-orange-logo.png";
import xetot from "../Images/veh-orange-logo.png";
import viectot from "../Images/job-green-logo.png";

import "../../../../css/main.css";

const repass = () => {
  return (
    <div className="Main-app">
      <form className="form" style={{height:'560px'}}>
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đặt lại mật khẩu</h1>
        <input type="number" name="sdt" placeholder="Số điện thoại" id="sdt" />
        <button type="submit" className="Login">
          TIẾP TỤC
        </button>
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

export default repass;