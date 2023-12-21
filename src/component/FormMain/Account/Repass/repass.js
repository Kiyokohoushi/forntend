import React from "react";
// import { Link } from "react-router-dom";


import "../../../../css/main.css";

const repass = () => {
  return (
    <div className="Main-app">
      <form className="form" style={{height:'560px'}}>
        <div className="logo">
        </div>
        <h1 className="text">Đặt lại mật khẩu</h1>
        <input type="number" name="sdt" placeholder="Số điện thoại" id="sdt" />
        <button type="submit" className="Login">
          TIẾP TỤC
        </button>
      </form>
     
    </div>
  );
};

export default repass;