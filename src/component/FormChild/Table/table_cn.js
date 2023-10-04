import { PlusOutlined } from "@ant-design/icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button, Table } from "antd";
import React, { useState } from "react";

function Table_cn(props) {
  // const [DSChucNang, setDSChucNang] = useState();
  const data = [
    {
      tenCN: "AAA",
      ghiChu: "BBB",
    },
  ];
  const columns = [
    {
      title: "STT",
      align: "center",
      render: (_, data, index) => index + 1,
    },
    {
      title: "Tên chức năng",
      align: "center",
      dataIndex: "tenCN",
      key: "tenCN",
    },
    {
      title: "Ghi chú",
      align: "center",
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: "Thao tác",
      align: "center",
      render: thaotac,
    },
  ];

  function thaotac(data) {
    return (
      <>
        <SettingsOutlinedIcon onClick={props.ShowSetting} />
        <EditOutlinedIcon style={{ marginLeft: "40px" }} />
        <DeleteOutlineOutlinedIcon style={{ marginLeft: "40px" }} />
      </>
    );
  }
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#1677ff",
          color: "white",
          marginBottom: "10px",
        }}
      >
        Thêm
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Table_cn;
