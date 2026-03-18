import { Button, Form, Input, Select, List } from "antd";
import { useModel } from "umi";
import MyDatePicker from '@/components/MyDatePicker';

export default function DecisionPage() {
  const { yearBooks, decisions, addDecision } = useModel("SoVanBang");
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    addDecision(values);
    form.resetFields();
  };

  return (
    <div>
      <h2>Quyết định</h2>

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="soQD" label="Số quyết định" required>
          <Input />
        </Form.Item>

        <Form.Item name="ngayBanHanh" label="Ngày ban hành">
          <MyDatePicker placeholder="Ngày Ban Hành" />
        </Form.Item>

        <Form.Item name="bookId" label="Sổ">
          <Select>
            {yearBooks.map((b) => (
              <Select.Option key={b.id} value={b.id}>
                {b.year} - Sổ {b.currentNumber}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button htmlType="submit">Thêm</Button>
      </Form>

      <List
        dataSource={decisions}
        renderItem={(d) => (
          <List.Item>
            {d.soQD} - {d.ngayBanHanh} - Lượt xem: {d.viewCount} - Sổ: {yearBooks.find((b) => b.id === d.bookId)?.year} - Số: {yearBooks.find((b) => b.id === d.bookId)?.currentNumber}
          </List.Item>
        )}
      />
      <hr />
    </div>
  );
}