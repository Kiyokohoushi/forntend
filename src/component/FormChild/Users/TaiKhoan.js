import React from "react";
import Table from "../Table/table-user.js";
import { Layout } from "antd";
const { Content } = Layout;

function TaiKhoan(props) {
  return (
    <>
      <Content>
        <Table />
      </Content>
    </>
  );
}

export default TaiKhoan;
