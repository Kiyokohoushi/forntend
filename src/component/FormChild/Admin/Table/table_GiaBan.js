import { Table } from 'antd';
import React from 'react';

function table_GiaBan(props) {
    const column = [
        {
            title:"STT",
            render: (_,data,index)=> index+1
        },
        {
            title:"Tên sản phẩm",
            
        },
        {
            title:""
        },
    ]
    return (
        <div> 
            <Table columns={column}/>
        </div>
    );
}

export default table_GiaBan;