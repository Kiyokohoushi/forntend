import React from 'react';
import Table from "../../Admin/Table/table_GiaBan"
import Table2 from "../../Admin/Table/table_GiaBan2"
import { Tabs } from 'antd';

function QLGiaBan(props) {
    const items=[
        {
            key:"1",
            label:"Danh sách sản phẩm áp giá",
            children:<Table/>,
        },
        {
            key:"2",
            label:"Danh sách sản phẩm chưa áp giá",
            children:<Table2/>,
        }
    ];
    return (
        <div>
        <Tabs defaultActiveKey='1' items={items}/>
        </div>
    );
}

export default QLGiaBan;