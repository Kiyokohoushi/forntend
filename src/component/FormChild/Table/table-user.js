import { Button, Table } from "antd";
import React, { useState } from "react";
import ModalUser from "../Users/modal_user";

function Table_user(props) {
    const [visible, setVisibleModal] = useState(false);
    const [action, setAction] = useState();



    function showAdd(){
        setVisibleModal(true);
        setAction("Add");
    }
    function hiddenModal(){
        setVisibleModal(false);
    }

    const columns = [
        {
            title:"STT",
            align:"center",
            render: (_,data,index)=>index+1,
        },
        {
            title:"Tên hiển thị",
            align : "center",
            dataIndex: "username",
            key: "username",
        },
        {
            title:"Số điện thoại",
            align : "center",
            dataIndex: "phoneNumber",
            key : "phoneNumber",
        },
        {
            title:"Email",
            align : "center",
            dataIndex: "email",
            key: "email",
        },
        {
            title:"Vai trò",
            align: "center",

        },
        {
            title: "Trạng thái",
            dataIndex:""
        },
        {
            title:"Thao tác",
            render: thaotac
        },
    ]
    function thaotac(){

    }
  return (
    <div>
      <Button
        style={{
          backgroundColor: "#169bd4",
          color: "white",
          marginBottom: "10px",
          float: "right",
        }}
        onClick={showAdd}
      >
        Tạo mới người dùng
      </Button>
      <Table columns={columns}/>
      <ModalUser
      visible={visible}
      showAdd={showAdd}
      hiddenModal={hiddenModal}
      action={action}
      >
      </ModalUser>
    </div>
  );
}

export default Table_user;
