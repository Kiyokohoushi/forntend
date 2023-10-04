import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./component/FormMain/Account/Register/register";
import Login from "./component/FormMain/Account/Login/login";
import Repass from "./component/FormMain/Account/Repass/repass";
import Home from "./component/FormMain/Home/home";
import SanPham from "./component/FormChild/Sp/QLSP/SanPham";
import ThemSP from "./component/FormChild/ThemMoi/ThemSP";
import User from "./component/FormChild/QuanTri/Users/TaiKhoan"
import ChucNang from "./component/FormChild/QuanTri/ChucNang/ChucNang";
import QLKho from "./component/FormChild/Kho/QLKho/QLKho";
import PhieuKho from "./component/FormChild/Kho/PhieuKho/PhieuKho";

const App = () => {
  const CheckLogin = () => {
    const { thisLocation } = useLocation();
    const [IsLogin, setIsLogin] = useState();

    useEffect(() => {
      let loginCheck = localStorage.getItem("Token");
        setIsLogin(loginCheck);
      
    }, [thisLocation]);
    if (IsLogin === undefined) {
      return null;
    }
    return IsLogin ? <Outlet /> : <Navigate to="/login" replace />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<CheckLogin />}>
          <Route path="/" element={<Home />}>
            <Route path="sanpham" element={<SanPham />} />
            <Route path="themSP" element={<ThemSP />}/>
            <Route path="users" element={<User />}/>
            <Route path="chucnang" element={<ChucNang />}/>
            <Route path="qlkho" element={<QLKho />}/>
            <Route path="phieukho" element={<PhieuKho />}/>
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
