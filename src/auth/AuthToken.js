import { message } from "antd";
import axios from "axios";
import { decodeJwt } from "jose";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, useNavigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const { pathname } = useLocation();
  const [IsLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [tokenExpirationTimer, setTokenExpirationTimer] = useState(null);
  const token = localStorage.getItem("Token");
;

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập ban đầu
    checkLoginStatus();
  }, []);

  const refreshToken = async () => {
    const decodedToken = decodeJwt(token)
    try {
      let dataRefresh = {
        PhoneNumber: decodedToken.PhoneNumber,
        RefreshToken: decodedToken.RefreshToken,
        AccessToken: token,
      };
      axios
        .post("https://localhost:7177/api/auth/refresh", dataRefresh)
        .then((res) => {
          if (res.data.Status === 1) {
            console.log(res.data.Token);
            message.success(res.data.Message);
            localStorage.setItem("Token", res.data.Token);
            // Cập nhật hẹn giờ cho việc làm mới token
            setupTokenExpirationTimer();
          } else {
            message.error(res.data.Message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Lỗi làm mới token:", error);
      // Xử lý lỗi khi không thể làm mới token
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    setIsLogin(false);
    navigate("/login");
  };

  const setupTokenExpirationTimer = () => {
    if (token) {
      const decodedToken = decodeJwt(token)
      try {
        const tokenExp = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = tokenExp - currentTime;

        if (timeUntilExpiration > 0) {
          // Thiết lập hẹn giờ cho việc làm mới token trước khi hết hạn
          const tokenTimer = setTimeout(refreshToken, timeUntilExpiration);
          setTokenExpirationTimer(tokenTimer);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        handleLogout();
      }
    }
  };

  const userActivityTimeout = 5 * 60 * 1000; // 5 phút
  let activityTimer = null;

  const handleUserActivity = () => {
    if (activityTimer) {
      clearTimeout(activityTimer);
    }
    activityTimer = setTimeout(() => {
      // Đăng xuất người dùng sau khi dừng hoạt động trong 5 phút
      handleLogout();
    }, userActivityTimeout);
    resetTokenTimer();
  };

  const resetTokenTimer = () => {
    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
      setupTokenExpirationTimer();
    }
  };
  
  const checkLoginStatus = () => {
    let loginCheck = localStorage.getItem("Token");
    setIsLogin(!!loginCheck); // Đã đăng nhập nếu có token

    if (loginCheck) {
      setupTokenExpirationTimer();
      // Bắt đầu theo dõi hoạt động của người dùng
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
    }
  };

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
