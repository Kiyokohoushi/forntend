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
        startUserInactivityTimer();
        startTokenRefreshTimer(storedToken, phoneNumber, refreshToken);
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

      const activityEvents = [
        "mousemove",
        "keydown",
        "mousedown",
        "touchstart",
      ];

      activityEvents.forEach((event) => {
        document.addEventListener(event, resetTimer);
      });

      resetTimer();
    };

    const startTokenRefreshTimer = (StoredToken, PhoneNumber, RefreshToken) => {
      let refreshTimer;

      const refreshToken = async () => {
        try {
          const response = await axios.post(
            "https://localhost:7177/api/auth/refresh",
            {
              PhoneNumber: PhoneNumber,
              RefreshToken: RefreshToken,
              AccessToken: StoredToken,
            }
          );

          if (response.data.Status === 1) {
            const newToken = response.data.Token;
            const newDecodedToken = decodeJwt(newToken);

            localStorage.setItem("Token", newToken);
            localStorage.setItem("PhoneNumber", newDecodedToken.PhoneNumber);
            localStorage.setItem("RefreshToken", response.data.RefreshToken);
            setToken(newToken);
            message.success(response.data.Message);
            startTokenRefreshTimer(
              newToken,
              PhoneNumber,
              response.data.RefreshToken
            );
          }
        } catch (error) {
          console.error("Lỗi khi làm mới token:", error);
          handleLogout();
        }
      };

      const resetRefreshTimer = () => {
        clearTimeout(refreshTimer);

        // Lấy thời điểm hiện tại
        const currentTime = new Date().getTime();

        // Lấy thời điểm hết hạn của token
        const expirationTime = decodeJwt(StoredToken).exp * 1000;

        // Tính toán thời gian còn lại đến khi token hết hạn
        const timeToExpiration = expirationTime - currentTime;

        // Thiết lập hẹn giờ làm mới token khi còn 1 phút
        refreshTimer = setTimeout(() => {
          refreshToken();
        }, timeToExpiration - 60 * 1000); // 1 phút trước khi token hết hạn
      };

      // Đặt hẹn giờ khi ban đầu và mỗi khi làm mới mã thông báo
      resetRefreshTimer();
    };

    const handleCheckToken = async (token, phoneNumber, refreshToken) => {
      try {
        const decodedToken = decodeJwt(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToRefreshToken = decodedToken.exp - currentTime;
        const refreshThreshold = 60; // 1 phút

        if (timeToRefreshToken <= 0) {
          // Token đã hết hạn
          console.log("Token has expired. Logging out...");
          handleLogout();
        } else if (timeToRefreshToken <= refreshThreshold) {
          // Token sắp hết hạn, cần làm mới
          console.log("Refreshing token...");
          await refreshToken(phoneNumber, refreshToken, token);
        } else {
          // Token vẫn còn hiệu lực
          console.log("Token is still valid.");
        }
      } catch (error) {
        console.error("Error decoding or refreshing token:", error);
        handleLogout();
      }
    };

    const handleLogout = () => {
      localStorage.clear();
      navigate("/login");
      setToken(null);
    };

    checkToken();
  }, []); // Bao gồm các phụ thuộc nếu cần

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
