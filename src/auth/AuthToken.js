import { message } from "antd";
import axios from "axios";
import { decodeJwt } from "jose";
import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const storedToken = localStorage.getItem("Token");
      const phoneNumber = localStorage.getItem("PhoneNumber");
      const refreshToken = localStorage.getItem("RefreshToken");

      if (!storedToken) {
        handleLogout();
      } else {
        await handleCheckToken(storedToken, phoneNumber, refreshToken);
        startUserInactivityTimer(); // Bắt đầu hẹn giờ đăng xuất khi không hoạt động
      }
    };

    const startUserInactivityTimer = () => {
      const inactivityTimeout = 5 * 60 * 1000; // 5 phút
      let inactivityTimer;

      const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          handleLogout();
        }, inactivityTimeout);
      };

      // Gọi hàm resetTimer mỗi khi có sự kiện hoạt động của người dùng
      const activityEvents = [
        "mousemove",
        "keydown",
        "mousedown",
        "touchstart",
      ];
      activityEvents.forEach((event) => {
        document.addEventListener(event, resetTimer);
      });

      // Đặt hẹn giờ khi ban đầu và mỗi khi làm mới mã thông báo
      resetTimer();
    };

    checkToken();
  }, []); // Bao gồm các phụ thuộc nếu cần

  const handleCheckToken = async (token, phoneNumber, refreshToken) => {
    try {
      const decodedToken = decodeJwt(token);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeToRefreshToken = decodedToken.exp - currentTime;
      const refreshThreshold = 30;

      if (timeToRefreshToken <= refreshThreshold) {
        const data = {
          PhoneNumber: phoneNumber,
          RefreshToken: refreshToken,
          AccessToken: token,
        };

        const response = await axios.post(
          "https://localhost:7177/api/auth/refresh",
          data
        );

        if (response.data.Status === 1) {
          const newToken = response.data.Token;
          const newDecodedToken = decodeJwt(newToken);

          localStorage.setItem("Token", newToken);
          localStorage.setItem("PhoneNumber", newDecodedToken.PhoneNumber);
          localStorage.setItem("RefreshToken", response.data.RefreshToken);
          setToken(newToken);
          message.success(response.data.Message);
        }
      }
    } catch (error) {
      console.error("Lỗi khi giải mã hoặc làm mới mã thông báo:", error);
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setToken(null);
  };

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
