import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import AuthLayout from "./auth/AuthToken";
import Register from "./component/FormMain/Account/Register/register";
import Login from "./component/FormMain/Account/Login/login";
import Repass from "./component/FormMain/Account/Repass/repass";
import Home from "./component/FormMain/Home/home";
import SanPham from "./component/FormChild/Sp/QLSP/SanPham";
import LoaiSP from "./component/FormChild/Sp/LoaiSP/LoaiSP";
import ThemSP from "./component/FormChild/ThemMoi/ThemSP";
import User from "./component/FormChild/QuanTri/Users/TaiKhoan";
import ChucNang from "./component/FormChild/QuanTri/ChucNang/ChucNang";
import QLKho from "./component/FormChild/Kho/QLKho/QLKho";
import PhieuKho from "./component/FormChild/Kho/PhieuKho/PhieuKho";
import AuthLayout from "./auth/AuthToken";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Home />}>
            <Route path="sanpham" element={<SanPham />} />
            <Route path="loaiSP" element={<LoaiSP />} />
            <Route path="themSP" element={<ThemSP />} />
            <Route path="users" element={<User />} />
            <Route path="chucnang" element={<ChucNang />} />
            <Route path="qlkho" element={<QLKho />} />
            <Route path="phieukho" element={<PhieuKho />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/repass" element={<Repass />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
