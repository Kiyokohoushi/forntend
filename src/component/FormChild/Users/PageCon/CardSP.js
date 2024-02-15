import { Card, Rate } from "antd";
import React from "react";
import "../../../../css/Users/PageCon/Trangchu.css"

function CardSP(props) {
  return (
    <div>
      <Card
        id={props.items.MaSanPham}
        hoverable
        style={{
          border: "3px solid #f5f5f5",
          width: 220,
          height: 350,
          margin:"5px",
        }}
        cover={
          <img
            src={props.items.Picture}
            alt="Ảnh sản phẩm"
            height={"260px"}
            width={"38px"}
          />
        }
        onClick={() => props.handle_Items(props.items)}
      >
        <div className="Items_Infomation">
          <p>{props.items.TenSanPham}</p>
          <p>{props.items.Giaban}</p>
          <Rate disabled defaultValue={props.items.DiemDanhGia}/>
        </div>
      </Card>
    </div>
  );
}

export default CardSP;
