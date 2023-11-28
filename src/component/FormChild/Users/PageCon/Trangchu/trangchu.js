import React from "react";
import "../../../../../css/Users/PageCon/Trangchu.css";
import Banner from "../image/BlackFriday.png";
import { Layout, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import IconFashion from "../IconWeb/dress.png";
import IconTechnology from "../IconWeb/Laptop.png";
import IconBeauti from "../IconWeb/Mypham.png";
import IconFood from "../IconWeb/thucpham.png";
import IconDoGiaDung from "../IconWeb/DoGiaDung.png";
import IconVanPhong from "../IconWeb/VanPhongPham.png";
import IconDoChoi from "../IconWeb/toys.png";
import IconThuCung from "../IconWeb/petStuff.png";
import IconPhuTung from "../IconWeb/PhuTung.png";
import IconTheThao from "../IconWeb/sport.png";

function trangchu(props) {
  const items = [
    {
      key: "1",
      Icon: IconFashion,
      Name: "Thời trang",
    },
    {
      key: "2",
      Icon: IconTechnology,
      Name: "Đồ công nghệ",
    },
    {
      key: "3",
      Icon: IconDoGiaDung,
      Name: "Đồ gia dụng",
    },
    {
      key: "4",
      Icon: IconFood,
      Name: "Thực phẩm",
    },
    {
      key: "5",
      Icon: IconBeauti,
      Name: "Mỹ phẩm",
    },
    {
      key: "6",
      Icon: IconTheThao,
      Name: "Thể thao",
    },
    {
      key: "7",
      Icon: IconDoChoi,
      Name: "Đồ chơi",
    },
    {
      key: "8",
      Icon: IconVanPhong,
      Name: "Văn phòng phẩm",
    },
    {
      key: "9",
      Icon: IconPhuTung,
      Name: "Phụ tùng",
    },
    {
      key: "10",
      Icon: IconThuCung,
      Name: "Thú cưng ",
    },
  ];
  return (
    <div>
      <Layout style={{ backgroundColor: "white", margin: 0, padding: 0 }}>
        <Space direction="vertical" size={10}>
          <Header
            style={{
              backgroundColor: "white",
              minHeight: "700px",
              marginTop: "70px",
              padding: 0,
            }}
          >
            <div className="Banner">
              <img src={Banner} alt="Banner" width={1528} height={500} />
            </div>

            <div className="SlideMenu">
              <div className="scroll-container">
                {items.map((item) => (
                  <div key={item.key} className="item">
                    <img
                      src={item.Icon}
                      alt={item.Name}
                      width={100}
                      height={100}
                    />
                    <p>{item.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </Header>
          <Content>
            <div className="Content">
              <div className="RecomendStuff">
                <div className="Fashion">
                  <div className="Top">
                    <h2>Thời trang và quần áo</h2>
                    <h5>
                      Xem thêm <RightOutlined />
                    </h5>
                  </div>
                  <div className="Content"></div>
                </div>

                <div className="BeautyAndHealth">
                  <div className="Top">
                    <h2>Sức khỏe và làm đẹp</h2>
                    <h5>
                      Xem thêm <RightOutlined />
                    </h5>
                  </div>
                  <div className="Content"></div>
                </div>
              </div>
            </div>
          </Content>
        </Space>
      </Layout>
    </div>
  );
}

export default trangchu;
