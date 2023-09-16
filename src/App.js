import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/FormMain/Account/Register/register";
import Login from "./component/FormMain/Account/Login/login";
import Repass from "./component/FormMain/Account/Repass/repass";
import Home from "./component/FormMain/Home/home";
import SanPham from "./component/FormChild/Sp/SanPham";
import XeCo from "./component/FormChild/LoaiSp/XeCo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/repass" element={<Repass />} />
        <Route path="/login" element={<Login />}/>
          <Route path="/" element={<Home />}>
            <Route path="sanpham" element={<SanPham />} />
            <Route path="xeco" element={<XeCo />} />
          </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
