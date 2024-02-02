import { Button, Layout, Select } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import React from "react";
import "../../../../../css/Users/PageCon/Search.css";
import { useLocation } from "react-router-dom";

function Search(props) {
  const location = useLocation();
  const data = location.state && location.state.SearchKeyWord;
  return (
    <div>
      <Layout
        style={{ width: "100%", height: "1000px", backgroundColor: "white",margin:"0px", padding:"20px 70px 0px 70px"}}
      >
        <Sider width={"20%"} style={{ backgroundColor: "white" }}>
        <div className="Main_SearchSider">
            <div className="title_SearchSider">
            <h2>Bộ lọc tìm kiếm</h2>
            </div>
            <div className="content_SearchSider">
              <div className="Brand_Item"></div>
              <div className="Rates"></div>
              <div className="MaxMin_Cost"></div>
              <div className="Buttom"></div>
            </div>
        </div>
        </Sider>
        <Content>
          <div className="Main_search">
            <div className="top_SeacrhContent">
              <div className="Searching_Result">
                <h1>Kết quả tìm kiếm cho "{data }"</h1>
              </div>
              <div className="Arrange_Dispose">
                <p>Sắp xếp theo</p>
               <Button>Liên quan</Button>
               <Button>Mới nhất</Button>
               <Button>Bán chạy</Button>
               <Select style={{ width:"200px" }}>
                <option value={"1"} id="1">Thấp đến cao</option>
                <option value={"2"} id="2">Cao đến thấp</option>
               </Select>
              </div>
            </div>
            <div className="middle_SeacrhContent"></div>
            <div className="bottom_SeacrhContent"></div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Search;
