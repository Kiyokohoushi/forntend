import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import facebook from "../Images/logo-facebook.png";
import google from "../Images/Google__G__Logo.svg.webp";
import apple from "../Images/apple.png";
import nhatot from "../Images/pty-orange-logo.png";
import xetot from "../Images/veh-orange-logo.png";
import viectot from "../Images/job-green-logo.png";

import "../../../../css/main.css";
import { Checkbox, Form, Input, message} from "antd";
import axios from "axios";

function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const Data = {
      Email: values.email,
      Name: values.name,
      PhoneNumber: values.phoneNumber,
      Password: values.password,
    };

    try {
      const res = await axios.post(
        "https://localhost:7177/api/TK/Register",
        Data
      );

      if (res.data.Status === 1) {
        navigate("/");
        console.log(res);
        message.success(res.data.Message);
      } else {
        message.error(res.data.Message);
      }
    } catch (error) {
      message.error("Lỗi hệ thống vui lòng liên hệ hỗ trợ khách hàng", error);
    }
  };

  return (
    <div className="Main-app">
      <Form form={form} className="form" onFinish={onFinish}>
        <div className="logo">
          <img src={logo} alt="Logo" width="121px" height="44px" />
        </div>
        <h1 className="text">Đăng ký tài khoản</h1>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              validator: (rule, value) => {
                if (value && !value.endsWith("@gmail.com")) {
                  return Promise.reject(
                    "Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại."
                  );
                }
                return Promise.resolve();
              },
            },
            {
              required: true,
              message: "Vui lòng nhập địa chỉ email.",
            },
          ]}
        >
          <Input
            name="email"
            placeholder="Nhập email"
            style={{
              width: "100%",
              height: " 48px",
              position: "relative",
              borderRadius: "4px",
              border: "1px solid silver",
              backgroundColor: "#fff",
              marginTop: "14px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              // required: true,
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject("Vui lòng nhập tên đăng ký.");
                }

                if (value.length < 10 || value.length > 30) {
                  return Promise.reject(
                    "Tên đăng ký cần có ít nhất 10 ký tự và không vượt quá 30 ký tự."
                  );
                }

                const specialCharacterRegex = /[*&^%$#@!]/;
                if (specialCharacterRegex.test(value)) {
                  return Promise.reject(
                    "Tên đăng ký không hợp lệ. Vui lòng kiểm tra lại"
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="name"
            placeholder="Họ và tên"
            style={{
              width: "100%",
              height: " 48px",
              position: "relative",
              borderRadius: "4px",
              border: "1px solid silver",
              backgroundColor: "#fff",
              marginTop: "5px",
              marginBottom: "5px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject("Vui lòng nhập số điện thoại.");
                }
                if (!/^\d+$/.test(value)) {
                  return Promise.reject(
                    "Số điện thoại không hợp lệ. Vui lòng kiểm tra lại."
                  );
                }
                if (value.length < 10 || value.length > 12) {
                  return Promise.reject(
                    "Số điện thoại cần có ít nhất 10 ký tự và không vượt quá 12 ký tự."
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="phoneNumber"
            placeholder="Số điện thoại"
            style={{
              width: "100%",
              height: " 48px",
              position: "relative",
              borderRadius: "4px",
              border: "1px solid silver",
              backgroundColor: "#fff",
              marginBottom: "5px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject("Vui lòng nhập mật khẩu.");
                }

                if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])/.test(value)) {
                  return Promise.reject(
                    "Mật khẩu không hợp lệ. Vui lòng kiểm tra lại."
                  );
                }

                if (value.length < 8 || value.length > 10) {
                  return Promise.reject(
                    "Mật khẩu cần có ít nhất 8 ký tự và không vượt quá 10 ký tự."
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            name="password"
            style={{
              width: "100%",
              height: " 48px",
              position: "relative",
              borderRadius: "4px",
              border: "1px solid silver",
              backgroundColor: "#fff",
              marginBottom: "5px",
            }}
          />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (rule, value) => {
                if (!value) {
                  return Promise.reject(
                    "Bạn cần đồng ý với Điều khoản sử dụng và Chính sách bảo mật."
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Checkbox>
            Bằng việc Đăng ký, bạn đã đọc và đồng ý với{" "}
            <Link to="/trogiup">Điều khoản sử dụng</Link> và{" "}
            <Link to="/trogiup">Chính sách bảo mật</Link> của Chợ Tốt
          </Checkbox>
        </Form.Item>
        <button type="primary" htmlType="submit" className="Login">
          ĐĂNG KÝ
        </button>
        <div className="content">
          <hr />
          <p>Hoặc đăng nhập bằng</p>
          <hr />
        </div>
        <div className="mainbottom">
          <button className="bottom">
            <img
              src={facebook}
              alt="logo"
              style={{ marginRight: "10px" }}
              height="21px"
              width="21px"
            />{" "}
            Facebook
          </button>
          <button className="bottom">
            <img src={google} alt="logo" className="small" /> Google
          </button>
          <button className="bottom">
            <img src={apple} alt="logo" className="small" /> Apple ID
          </button>
        </div>
        <p className="footage">
          Đã có tài khoản?{" "}
          <Link to="/" className="link">
            Đăng nhập ngay
          </Link>
        </p>
      </Form>
      <footer>
        <div className="phattrien">
          <div className="footer">
            <p>Được phát triển bởi</p>
            <img src={logo} alt="anh" className="footer-logo" />
            <img src={nhatot} alt="anh" className="footer-logo" />
            <img src={viectot} alt="anh" className="footer-logo" />
            <img src={xetot} alt="anh" className="footer-logo" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Register;
