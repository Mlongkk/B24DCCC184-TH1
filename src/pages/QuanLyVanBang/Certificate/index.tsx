import { Button, Form, Input, Select, List, InputNumber, DatePicker } from "antd";
import { useModel } from "umi";
import MyDatePicker from '@/components/MyDatePicker';

export default function CertificatePage() {
  const { degrees, addCertificate, fields, decisions, yearBooks } =
    useModel("SoVanBang");

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const extra: any = {};

    fields.forEach((f) => {
      extra[f.name] = values[f.name];
    });

    addCertificate({
      ...values,
      extra,
    });

    form.resetFields();
  };

  return (
    <div>
      <h2>Văn bằng</h2>

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

        <Form.Item name="ngaySinh" label="Ngày sinh">
          <MyDatePicker placeholder="Ngày sinh" />
        </Form.Item>

        <Form.Item name="decisionId" label="Quyết định">
          <Select>
            {decisions.map((d) => (
              <Select.Option key={d.id} value={d.id}>
                {d.soQD}
              </Select.Option>
            ))}
          </Select>
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

        {/* dynamic fields */}
        {fields.map((f) => {
          if (f.type === "string")
            return (
              <Form.Item name={f.name} label={f.name} key={f.id}>
                <Input />
              </Form.Item>
            );

          if (f.type === "number")
            return (
              <Form.Item name={f.name} label={f.name} key={f.id}>
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            );

          if (f.type === "date")
            return (
              <Form.Item name={f.name} label={f.name} key={f.id}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            );
        })}

        <Button htmlType="submit">Thêm</Button>
      </Form>

      <List
        dataSource={degrees}
        renderItem={(d) => (
          <List.Item>
            {d.hoTen} - {d.msv} - Số vào sổ: {d.soVaoSo} - Số hiệu: {d.soHieu} - Quyết định: {decisions.find((dec) => dec.id === d.decisionId)?.soQD} - Sổ: {yearBooks.find((b) => b.id === d.extra.bookId)?.year} - Số: {yearBooks.find((b) => b.id === d.extra.bookId)?.currentNumber}
          </List.Item>
        )}
      />
      <hr />
    </div>
  );
}