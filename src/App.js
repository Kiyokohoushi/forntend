import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthLayout from "./auth/AuthToken";
import Register from "./component/FormMain/Account/Register/register";
import Login from "./component/FormMain/Account/Login/login";
import Repass from "./component/FormMain/Account/Repass/repass";

//Admin routes
import Home1 from "./component/FormChild/Admin/Home/home";
import SanPham from "./component/FormChild/Admin/Sp/QLSP/SanPham";
import LoaiSP from "./component/FormChild/Admin/Sp/LoaiSP/LoaiSP";
import ThemSP from "./component/FormChild/Admin/ThemMoi/ThemSP";
import User from "./component/FormChild/Admin/QuanTri/Users/TaiKhoan";
import ChucNang from "./component/FormChild/Admin/QuanTri/ChucNang/ChucNang";
import QLKho from "./component/FormChild/Admin/Kho/QLKho/QLKho";
import PhieuKho from "./component/FormChild/Admin/Kho/PhieuKho/PhieuKho";
import AuthLayout from "./auth/AuthToken";

//Users routes
import Home2 from "./component/FormChild/Users/PageCha/Home";
import Trangchu from "./component/FormChild/Users/PageCon/Trangchu/trangchu";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/admin" element={<Home1 />}>
            <Route path="/admin/sanpham" element={<SanPham />} />
            <Route path="/admin/loaiSP" element={<LoaiSP />} />
            <Route path="/admin/themSP" element={<ThemSP />} />
            <Route path="/admin/users" element={<User />} />
            <Route path="/admin/chucnang" element={<ChucNang />} />
            <Route path="/admin/qlkho" element={<QLKho />} />
            <Route path="/admin/phieukho" element={<PhieuKho />} />
          </Route>
        </Route>
        <Route path="/" element={<Home2 />}>
          <Route path="/" element={<Trangchu/>} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/repass" element={<Repass />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
