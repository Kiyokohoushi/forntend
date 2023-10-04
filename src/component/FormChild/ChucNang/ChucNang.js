import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Table from "../Table/table_cn";
import SettingCN from "./settingCN";

function ChucNang(props) {
  const [show, setShow] = useState(false);
  function ShowSetting() {
    setShow(true);
  }
  function HiddentShow() {
    setShow(false);
  }
  return (
    <div>
      <Content>
        {show ? <SettingCN HiddentShow={HiddentShow} /> : null}
        <Table ShowSetting={ShowSetting} />
      </Content>
    </div>
  );
}

export default ChucNang;
