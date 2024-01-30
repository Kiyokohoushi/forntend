import { Button, Result } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Respone(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state && location.state.data;

  // Kiểm tra giá trị của data để quyết định hiển thị thành công hay lỗi
  const isSuccess = data === 200;
  function handleButtonTT(){
    navigate("/")
  }
  function handleButtonBack(){
    navigate("/")
  }
  return (
    <div>
      <Content style={{ backgroundColor: "white", marginTop: "10px" }}>
        {isSuccess ? (
          <Result
            status="success"
            title="Thanh toán thành công"
            subTitle="Cảm ơn vì đã mua hàng !!!"
            extra={[
              <Button type="primary" key="console" onClick={()=>handleButtonTT()}>
                Tiếp tục mua sắm
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title="Lỗi thanh toán"
            subTitle="Something wrong "
            extra={[<Button key="console" onClick={()=>handleButtonBack()}>Quay lại</Button>]}
          />
        )}
      </Content>
    </div>
  );
}

export default Respone;
