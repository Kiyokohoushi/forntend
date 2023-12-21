import { Table } from 'antd';
import React from 'react';

function Table_GiaBan2(props) {
    const column = [
        {
            title:"STT",
            render: (_,data,index)=> index+1
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

export default Table_GiaBan2;