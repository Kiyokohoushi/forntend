import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import "../../../../../css/LoaiSp.css";

function Modal_LoaiSP(props) {
  const [form] = Form.useForm();
  const Data = props.Data;
  const [Values, setValues] = useState();

  useEffect(() => {
    // Kiểm tra xem Data có giá trị không
    if (Data) {
      setValues(Data.TrangThai);
    }
  }, [Data]);
  function handleOptions(value) {
    setValues(value);
  }
  const handleSave = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    if (props.action === "Edit") {
      const values = {
        ID_LoaiSanPham: Data.ID_LoaiSanPham,
        TenLoaiSP: Data.TenLoaiSP,
        MoTaLoaiSP: Data.MoTaLoaiSP,
        TrangThai: Values,
      };
      props.Save(values);
    }

    if (props.action === "Add") {
      const value = {
        TenLoaiSP: values.TenLoaiSP,
        MoTaLoaiSP: values.MoTaLoaiSP,
        TrangThai: Values,
      };
      props.Save(value);
    }
  };

  return (
    <div>
      <Modal
        title={props.action === "Add" ? "Thêm mới" : "Cập nhật"}
        open={props.show}
        onCancel={props.hidden}
        footer={[
          <Button type="primary" onClick={handleSave}>
            Cập nhật
          </Button>,
          <Button onClick={props.hidden}>Hủy</Button>,
        ]}
      >
        {props.action === "Add" ? (
          <Form
            form={form}
            layout="horizontal"
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item
              name={"TenLoaiSP"}
              label={"Loại sản phẩm :"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Input name="TenLoaiSP" className="costumInput" />
            </Form.Item>
            <Form.Item
              name={"MoTaLoaiSP"}
              label={"Mô tả :"}
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Input name="MoTaLoaiSP" className="costumInput" />
            </Form.Item>
            <Form.Item label={"Loại trạng thái :"}>
              <Select
                style={{ width: "340px", float: "right" }}
                defaultValue={true}
                onChange={(value) => handleOptions(value)}
                options={[
                  {
                    value: true,
                    label: "Đang kinh doanh",
                  },
                  {
                    value: false,
                    label: "Ngừng khinh doanh",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        ) : (
          <Form form={form} layout="horizontal" autoComplete="off" onFinish={onFinish}>
            <Form.Item label={"Loại trạng thái :"}>
              <Select
                onChange={(value) => handleOptions(value)}
                value={Values}
                options={[
                  {
                    value: true,
                    label: "Đang kinh doanh",
                  },
                  {
                    value: false,
                    label: "Ngừng khinh doanh",
                  },
                ]}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default Modal_LoaiSP;
