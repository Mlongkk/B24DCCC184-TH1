import { Button, Form, Input, Select, List } from "antd";
import { useModel } from "umi";

export default function FieldConfigPage() {
  const { fields, addField, deleteField } = useModel("SoVanBang");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addField(values);
    form.resetFields();
  };

  return (
    <div>
      <h2>Cấu hình biểu mẫu</h2>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Tên field">
          <Input />
        </Form.Item>

        <Form.Item name="type" label="Kiểu dữ liệu">
          <Select>
            <Select.Option value="string">String</Select.Option>
            <Select.Option value="number">Number</Select.Option>
            <Select.Option value="date">Date</Select.Option>
          </Select>
        </Form.Item>

        <Button htmlType="submit">Thêm</Button>
      </Form>

      <List
        dataSource={fields}
        renderItem={(f) => (
          <List.Item
            actions={[
              <Button danger onClick={() => deleteField(f.id)}>
                Xóa
              </Button>,
            ]}
          >
            {f.name} ({f.type})
          </List.Item>
        )}
      />
      <hr />
    </div>
  );
}