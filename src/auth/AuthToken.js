import { message } from "antd";
import axios from "axios";
import { decodeJwt } from "jose";
import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function AuthLayout() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Token = localStorage.getItem("Token");
    const PhoneNumber = localStorage.getItem("PhoneNumber");
    const RefreshToken = localStorage.getItem("RefreshToken");

    if (Token === null) {
      HandleLogout();
    } else {
      HandelCheckToken(Token, PhoneNumber, RefreshToken);

      // Thiết lập thời gian chờ không hoạt động (ví dụ, đăng xuất sau 5 phút không hoạt động)
      const inactivityTimeout = setTimeout(() => {
        HandleLogout();
      }, 5 * 60 * 1000);

      // Dọn dẹp hẹn giờ khi component bị hủy
      return () => {
        clearTimeout(inactivityTimeout);
      };
    }
  }, []);

  function HandelCheckToken(Token, PhoneNumber, RefreshToken) {
    const DecodeToken = decodeJwt(Token);
    const CurrentTime = Math.floor(Date.now() / 1000);
    const TimeToRefreshToken = DecodeToken.exp - CurrentTime;

    if (TimeToRefreshToken > 30) {
      console.log(DecodeToken);
      console.log(CurrentTime);
    }
    if (TimeToRefreshToken <= 0) {
      console.log(DecodeToken);
      console.log(CurrentTime);
      HandleLogout();
    }
    if (TimeToRefreshToken <= 30) {
      const Data = {
        PhoneNumber: PhoneNumber,
        RefreshToken: RefreshToken,
        AccessToken: Token,
      };
      axios
        .post("https://localhost:7177/api/auth/refresh", Data)
        .then((res) => {
          if (res.data.Status === 1) {
            console.log(res.data);
            const Token = res.data.Token;
            const DecodeToken = decodeJwt(Token);
            localStorage.setItem("Token", Token);
            localStorage.setItem("PhoneNumber", DecodeToken.PhoneNumber);
            localStorage.setItem("RefreshToken", res.data.RefreshToken);
            setToken(res.data.Token);
            message.success(res.data.Message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function HandleLogout() {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    localStorage.removeItem("PhoneNumber");
    localStorage.removeItem("RefreshToken");
    navigate("/login");
    setToken(null);
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default AuthLayout;
