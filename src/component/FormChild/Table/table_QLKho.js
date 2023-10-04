import React from "react";
import axios from "axios";
import '../../../css/phieukho.css';
import { Table, Input, Button } from "antd";
const {Search} = Input;


function table_QLKho(props) {
  const columns = [
    {
      title: "STT",
      render: (_, data, index) => index + 1,
    },
    {
        title:"Mã Nhập Kho",
        dataIndex: "maNhapKho",
        key: "maNhapKho",
    },
    {
        title:"Tên Hàng Hóa",
        dataIndex: "tenHangHoa",
        key: "tenHangHoa",
    },
    {
        title:"Mô Tả",
        dataIndex: "moTa",
        key: "moTa",
    },
  ];
  return (
    <div>
    <div className="headerQLKho">
      <div className="Search_QLKho">
      <Search placeholder="Tìm kiếm theo tên"/>
      </div>
      <div className="Filter_Kho">
        <Button style={{color:"red", width:"150px", borderRadius:"0px"}} >Tất Cả</Button>
        <Button style={{color:"orange", width:"150px", borderRadius:"0px"}}>Sắp Hết Hàng</Button>
        <Button style={{color:"Blue", width:"150px", borderRadius:"0px"}}>Đã Hết Hàng</Button>
      </div>
    </div>
      <Table columns={columns}/>
    </div>
  );
}

export default table_QLKho;
