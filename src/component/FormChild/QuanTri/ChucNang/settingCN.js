import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Select, Space } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
function SettingCN(props) {
  const dataCN = props.data
  const token = localStorage.getItem("Token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const [dataUser, setDataUser]= useState([]);
  console.log(dataCN)

  useEffect(()=>{
    axios.get("https://localhost:7177/api/TK/admin/DanhSachTK?page=1")
    .then((res)=>{
      setDataUser(res.data.data);
    }).catch((errors) => {
      console.log(errors);
    });
  })
  return (
    <div>
      <Space direction="vertical" size={20} style={{ margin: "10px" }}>
        <Button onClick={props.HiddentShow}>Đóng</Button>
        <Space direction="horizontal" size={20}>
          <Card
            title="THÊM NGƯỜI DÙNG"
            style={{ width: "637px", minHeight: "230px" }}
          >
            <Space direction="vertical" size={20}>
              <Select
                placeholder={"Chọn thêm người dùng"}
                style={{ width: "580px" }}
              >
              {dataUser.map((DataUser)=>(
                <option>{DataUser.username}</option>
              ))}
              </Select>
            </Space>
          </Card>
          <Card title="THÊM CHỨC NĂNG" style={{ width: "637px" }}>
            <Space direction="vertical" size={20}>
              <Button type="primary">
                <PlusOutlined />
                Thêm chức năng
              </Button>
              <Select
                placeholder={"Chọn hoặc thêm chức năng"}
                style={{ width: "580px" }}
              >
              {dataCN.map((datacn) =>(
                <option key={datacn.chucNangid} value={datacn.chucNangid}>{datacn.tenChucNang}</option>
              ) )}
              </Select>
              <Space direction="horizontal" size={70}>
                <Checkbox>Xem</Checkbox>
                <Checkbox>Sửa</Checkbox>
                <Checkbox>Xóa</Checkbox>
                <Checkbox>Thêm</Checkbox>
              </Space>
            </Space>
          </Card>
        </Space>
      </Space>
    </div>
  );
}

export default SettingCN;
