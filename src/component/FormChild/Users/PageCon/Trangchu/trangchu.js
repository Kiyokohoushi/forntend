import React, { useEffect, useState } from "react";
import "../../../../../css/Users/PageCon/Trangchu.css";
import Banner from "../image/BlackFriday.png";
import {Layout, Space } from "antd";
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
import CardSP from "../CardSP";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Trangchu(props) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [DSSanPham, setDSSanPham] = useState([]);
  const [DSThoiTrang, setDSThoiTrang] = useState([]);
  const [DSSucKhoe, setDSSucKhoe] = useState([]);

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
  async function getDSSanPham() {
    let allData = [];
    let page = 1;

    while (true) {
      try {
        const response = await axios.get(
          `https://localhost:7177/api/TrangChuDSSP/DanhSachSP?page=${page}`
        );
        const data = response.data.Data;

        if (data.length === 0) {
          // Không còn dữ liệu trang nào, thoát vòng lặp
          break;
        }

        allData = allData.concat(data);
        page++;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ trang", page, ":", error);
        break;
      }
    }
    const LocTT = allData.filter((items) => items.ID_LoaiSanPham === 1);
    const LocSK = allData.filter((items) => items.ID_LoaiSanPham === 5);
    setDSSanPham(allData);
    setDSThoiTrang(LocTT);
    setDSSucKhoe(LocSK);
    console.log(allData);
  }
  function handle_Items(SanPham) {
    navigate("/chitiet", { state: { SanPham } });
  }
  function scrollHandler(direction, containerId) {
    const scrollContainer = document.getElementById(containerId);
    const scrollAmount = 230 * direction; // Adjust the value as needed
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  useEffect(() => {
    getDSSanPham();
  }, []);
  return (
    <div>
      <Layout style={{ backgroundColor: "white", margin: 0, padding: 0 }}>
        <Space
          direction="vertical"
          size={0}
          style={{ margin: "0px", padding: "0px" }}
        >
          <Header
            style={{
              backgroundColor: "white",
              minHeight: "700px",
              padding: 0,
            }}
          >
            <div className="Banner">
              <img src={Banner} alt="Banner" width={1528} height={500} />
            </div>

            <div className="SlideMenu">
              <div className="scroll-containerMenu">
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
                    <h1>Thời trang và quần áo</h1>
                    <h5>
                      Xem thêm <RightOutlined />
                    </h5>
                  </div>
                  <div className="Content-Inner">
                    <button
                      className="scroll-button"
                      onClick={() =>
                        scrollHandler(-1, "scrollContainerFashion")
                      }
                    >
                      &lt;
                    </button>
                    <div
                      className="scroll-container"
                      id="scrollContainerFashion"
                    >
                      {DSThoiTrang.map((items) => (
                        <CardSP items={items} handle_Items={handle_Items} />
                      ))}
                    </div>
                    <button
                      className="scroll-button"
                      onClick={() => scrollHandler(1, "scrollContainerFashion")}
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="BeautyAndHealth">
                  <div className="Top">
                    <h1>Sức khỏe và làm đẹp</h1>
                    <h5>
                      Xem thêm <RightOutlined />
                    </h5>
                  </div>
                  <div className="Content-Inner">
                    <button
                      className="scroll-button"
                      onClick={() => scrollHandler(-1, "scrollContainerHealth")}
                    >
                      &lt;
                    </button>
                    <div
                      className="scroll-container"
                      id="scrollContainerHealth"
                    >
                      {DSSucKhoe.map((items) => (
                        <CardSP items={items} handle_Items={handle_Items} />
                      ))}
                    </div>
                    <button
                      className="scroll-button"
                      onClick={() => scrollHandler(1, "scrollContainerHealth")}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
              <div className="AllItems">
                <div className="AllItem_title">
                  <h1>Gợi ý ngày hôm nay</h1>
                </div>
                <div className="AllItem_content">
                  <div className="AllItem_block">
                    {DSSanPham.slice(0, 18).map((items) => (
                      <CardSP
                        style={{ margin: "5px" }}
                        items={items}
                        handle_Items={handle_Items}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Space>
      </Layout>
    </div>
  );
}

export default Trangchu;
