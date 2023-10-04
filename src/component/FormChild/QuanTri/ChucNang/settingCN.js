import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Select, Space } from "antd";
import React from "react";

function settingCN(props) {
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
              />
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
              ></Select>
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

export default settingCN;
