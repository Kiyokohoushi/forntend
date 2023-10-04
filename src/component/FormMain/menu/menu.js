import React, { useState } from "react";
import {
  ShopOutlined,
  SettingOutlined,
  PercentageOutlined,
  FormOutlined,
  CommentOutlined,
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
  getItem("Khuyến Mãi", "2", <PercentageOutlined />),
  getItem(<Link to="/themSP">Thêm mới</Link>, "3", <FormOutlined />),
  getItem("Trợ Giúp", "4", <CommentOutlined />),
  getItem("Quản Trị Hệ Thống", "sub2", <SettingOutlined />, [
    getItem(<Link to="/users">Quản Lý Người Dùng</Link>, "5"),
    getItem(<Link to="/ChucNang">Quản Lý Chức Năng</Link>, "6"),
  ]),
  getItem(<Link to="/QlKho">Quản Lý Kho</Link>),
  getItem(<Link to="/PhieuKho">Phiếu Nhập Kho</Link>),

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
