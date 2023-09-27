import { Button, Switch, Table } from "antd";
import React, { useEffect, useState } from "react";
import ModalUser from "../Users/modal_user";
import axios from "axios";

function Table_user(props) {
    const [visible, setVisibleModal] = useState(false);
    const [action, setAction] = useState();
    const [DSTaiKhoan, setDSTaiKhoan] = useState([]);

    

    async function getDSTaiKhoan() {
      await axios.get("https://localhost:7177/api/TK/DanhSachTK?page=1")
      .then((res)=>{
        setDSTaiKhoan(res.data.data);
        console.log(res.data.data);
      }).catch((error)=>{
        console.log(error);
      })
    }

    useEffect(()=>{
      getDSTaiKhoan();
    },[]);

    const switchChange = (check)=>{
      if(DSTaiKhoan.isActive === 1){
      }
    }

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
            title: "Trạng thái",
            dataIndex:"isActive",
            key: "isActive",
            render: Active
        },
        {
            title:"Thao tác",
            render: thaotac
        },
    ]
    function thaotac(){

    }
    function Active(data){
      
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
      <Table columns={columns} dataSource={DSTaiKhoan} bordered/>
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
