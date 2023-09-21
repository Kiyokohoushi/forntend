import React, { useState } from "react";
import {
  AppstoreOutlined,
  ShopOutlined,
  SettingOutlined,
  PercentageOutlined,
  FormOutlined,
  CommentOutlined,
  UserOutlined,
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
  getItem("Sản Phẩm", "sub1", <ShopOutlined />, [
    getItem(<Link to="/sanpham">Tất Cả Sản Phẩm</Link>, "1"),
  ]),
  getItem("Loại Sản Phẩm", "sub2", <AppstoreOutlined />, [
    getItem(<Link to="/xeco">Xe Cộ</Link>, "5"),
    getItem("Đồ Điện Tử", "6"),
    getItem("Nước Hoa", "7"),
    getItem("Mỹ Phẩm", "8"),
  ]),
  getItem("Khuyến Mãi", "9", <PercentageOutlined />),
  getItem(<Link to="/themSP">Thêm mới</Link>, "10", <FormOutlined />),
  getItem("Trợ Giúp", "11", <CommentOutlined />),
  getItem("Quản Trị Hệ Thống", "sub3", <SettingOutlined />, [
    getItem(<Link to="/users">Quản Lý Tài Khoản</Link>, "12", <UserOutlined />),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub3"];
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
