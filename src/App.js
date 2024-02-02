import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import AuthLayout from "./auth/AuthToken";
import Register from "./component/FormMain/Account/Register/register";
import Login from "./component/FormMain/Account/Login/login";
import Repass1 from "./component/FormMain/Account/Repass/repass";

//Admin routes
import Home1 from "./component/FormChild/Admin/Home/home";
import SanPham from "./component/FormChild/Admin/Sp/QLSP/SanPham";
import LoaiSP from "./component/FormChild/Admin/Sp/LoaiSP/LoaiSP";
import ThemSP from "./component/FormChild/Admin/ThemMoi/ThemSP";
import User from "./component/FormChild/Admin/QuanTri/Users/TaiKhoan";
import ChucNang from "./component/FormChild/Admin/QuanTri/ChucNang/ChucNang";
import QLKho from "./component/FormChild/Admin/Kho/QLKho/QLKho";
import PhieuKho from "./component/FormChild/Admin/Kho/PhieuKho/PhieuKho";
import QLGiaBan from "./component/FormChild/Admin/GiaBan/QLGiaBan"
import AuthLayout from "./auth/AuthToken";

//Users routes
import Home2 from "./component/FormChild/Users/PageCha/Home";
import Trangchu from "./component/FormChild/Users/PageCon/Trangchu/trangchu";
import GioHang from "./component/FormChild/Users/PageCon/GioHang/GioHang";
import User2 from  "./component/FormChild/Users/PageCon/UserInfo/Menu";
import Account from "./component/FormChild/Users/PageCon/UserInfo/Profile";
import Address from "./component/FormChild/Users/PageCon/UserInfo/Address";
import Repass2 from "./component/FormChild/Users/PageCon/UserInfo/Repass";
import Respone from "./component/FormChild/Users/PageCon/ThanhToan/Respone";
import XacNhan from "./component/FormChild/Users/PageCon/GioHang/XacNhan";
import Waitting from "./component/FormChild/Users/PageCon/ThanhToan/Waitting";
import Search from "./component/FormChild/Users/PageCon/Search/Search";
import Chitiiet from "./component/FormChild/Users/PageCon/ChitietSP/Chitiiet";

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
            <Route path="/admin/giaban" element={<QLGiaBan/>} />
          </Route>
          <Route path="/" element={<Home2 />}>
            <Route path="/" element={<Trangchu />} />
            <Route path="/giohang" element={<GioHang />} />
            <Route path="/user" element={<User2 />}>
            <Route path="/user/account" element={<Account />}/>
            <Route path="/user/repass" element={<Repass2 />}/>
            <Route path="/user/address" element={<Address/>} />
            </Route>
            <Route path="/search" element={<Search/>} />
            <Route path="/respone" element={<Respone/>} />
            <Route path="/XacNhan" element={<XacNhan />} />
            <Route path="/chitiet" element={<Chitiiet/>} />
          </Route>
        </Route>
        <Route path="/waitting" element={<Waitting/>} />
        <Route path="login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/repass" element={<Repass1 />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
