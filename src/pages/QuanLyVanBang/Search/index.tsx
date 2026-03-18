import { Button, Form, Input, List, message } from "antd";
import { useModel } from "umi";
import { useState } from "react";

export default function SearchPage() {
  const { searchCertificate } = useModel("SoVanBang");
  const [data, setData] = useState<any[]>([]);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const res = searchCertificate(values);

    if (res.error) {
      message.error(res.error);
    } else {
      setData(res.data);
    }
  };

  return (
    <div>
      <h2>Tra cứu</h2>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="soHieu" label="Số hiệu">
          <Input />
        </Form.Item>

        <Form.Item name="msv" label="MSV">
          <Input />
        </Form.Item>

        <Form.Item name="hoTen" label="Họ tên">
          <Input />
        </Form.Item>

        <Button htmlType="submit">Tìm</Button>
      </Form>

      <List
        dataSource={data}
        renderItem={(d) => (
          <List.Item>
            {d.hoTen} - {d.soHieu}
          </List.Item>
        )}
      />
      <hr />
    </div>
  );
}