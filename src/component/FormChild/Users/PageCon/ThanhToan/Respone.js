import { Button, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

function Respone(props) {
  return (
    <div>
      <Content style={{backgroundColor:"white", marginTop:"10px"}}>
        {/* <Result
          status="success"
          title="Thanh toán thành công"
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button type="primary" key="console">
              Tiếp tục mua sắm
            </Button>,
          ]}
        /> */}
        <Result
          status="error"
          title="Lỗi thanh toán"
          subTitle="Something wrong "
          extra={[
            <Button key="console">
              Quay lại
            </Button>,
          ]}
        />
      </Content>
    </div>
  );
}

export default Respone;
