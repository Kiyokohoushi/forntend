import React, { useState } from "react";
import {
  ShopOutlined,
  SettingOutlined,
  PercentageOutlined,
  FormOutlined,
  CommentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(<Link to={"/TrangChu"}>Trang chủ</Link>,"1", <HomeOutlined />),
  getItem("Sản Phẩm", "sub1", <ShopOutlined />, [
    getItem(<Link to="/sanpham">Tất Cả Sản Phẩm</Link>, "2"),
    getItem(<Link to="/loaiSP">Loại Sản Phẩm</Link>, "3"),
  ]),
  getItem("Khuyến Mãi", "4", <PercentageOutlined />),
  getItem(<Link to="/themSP">Thêm mới</Link>, "5", <FormOutlined />),
  getItem("Trợ Giúp", "6", <CommentOutlined />),
  getItem("Quản Trị Hệ Thống", "sub2", <SettingOutlined />, [
    getItem(<Link to="/users">Quản Lý Người Dùng</Link>, "7"),
    getItem(<Link to="/ChucNang">Quản Lý Chức Năng</Link>, "8"),
  ]),
  getItem(<Link to="/QlKho">Quản Lý Kho</Link>,"9"),
  getItem(<Link to="/PhieuKho">Phiếu Nhập Kho</Link>, "10"),

];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2"];
const App = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 200,
      }}
      items={items}
    />
  );
};
export default App;
