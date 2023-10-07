import { decodeJwt } from "jose";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const { pathname } = useLocation();
  const [IsLogin, setIsLogin] = useState(true); // Giả sử mặc định là đã đăng nhập
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      let loginCheck = localStorage.getItem("Token");
      setIsLogin(!!loginCheck); // Đã đăng nhập nếu có token

      if (loginCheck) {
        try {
          const decodedToken = decodeJwt(loginCheck);
          console.log(decodedToken);
          const tokenExp = decodedToken.exp * 1000;
          const currentTime = Date.now();

          if (tokenExp < currentTime) {
            // Token đã hết hạn, đăng xuất người dùng và xóa token
            localStorage.removeItem("Token");
            setIsLogin(false);
            navigate("/login"); // Chuyển hướng đến trang đăng nhập
          }
        } catch (error) {
          console.error("Lỗi giải mã token:", error);
          // Xảy ra lỗi khi giải mã token, xử lý đăng xuất người dùng và xóa token
          localStorage.removeItem("Token");
          setIsLogin(false);
          navigate("/login"); // Chuyển hướng đến trang đăng nhập
        }
      }
    };

    // Kiểm tra trạng thái đăng nhập ban đầu
    checkLoginStatus();

    // Thiết lập một khoảng thời gian cố định để kiểm tra lại trạng thái đăng nhập
    const intervalId = setInterval(checkLoginStatus, 60 * 1000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!IsLogin && pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
