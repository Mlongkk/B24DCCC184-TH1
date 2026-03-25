import { Button, Form, Input, Select } from 'antd';
import { useModel } from 'umi';

const FormApply = ({ onClose }: any) => {
    const [form] = Form.useForm();
    const { data, saveData } = useModel('apply');
    const { data: clubs } = useModel('club');

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
                const newItem = {
                    ...values,
                    id: Date.now().toString(),
                    status: 'Pending',
                };

                saveData([newItem, ...data]);
                onClose();
            }}
        >
            <Form.Item name="name" label="Name" required><Input /></Form.Item>
            <Form.Item name="email" label="Email" required><Input /></Form.Item>
            <Form.Item name="phone" label="Phone" required><Input /></Form.Item>

            <Form.Item name="gender" label="Gender">
                <Select options={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' }
                ]}/>
            </Form.Item>

            <Form.Item name="club" label="Club">
                <Select
                    options={clubs.map((c) => ({
                        label: c.name,
                        value: c.name,
                    }))}
                />
            </Form.Item>

            <Form.Item name="reason" label="Reason">
                <Input.TextArea />
            </Form.Item>

            <Button htmlType="submit" type="primary">Submit</Button>
        </Form>
    );
};

export default FormApply;