import { Content } from 'antd/es/layout/layout';
import "../../../../../css/Users/PageCon/Address.css"
import React from 'react';

function Address(props) {
    return (
        <div>
            <Content
            style={{
          backgroundColor: "white",
          width: "100%",
          height: "max-content",
          padding: "0px",
          margin: "5px",
          borderRadius: "20px",
        }}
        >
        <div className="Title_HSUser">
          <div>
            <h2>Địa chỉ cá nhân</h2>
          </div>
        </div>
        <div className='Address_Main'>
            
        </div>
            </Content>
        </div>
    );
}

export default Address;