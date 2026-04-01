import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import { useEffect } from 'react';
import MyDatePicker from '@/components/MyDatePicker';

const FormClub = () => {
    const { data, row, isEdit, setVisible, getDataClub } = useModel('club');
    const [form] = Form.useForm();

    useEffect(() => {
        if (row) {
            form.setFieldsValue(row);
        } 
        else {
            form.resetFields();
        }
    }, [row]);

    return (
        <Form
            form={form}
            onFinish={(values) => {
                const index = data.findIndex((item: any) => item.name === row?.name);
                const dataTemp: Club.Record[] = [...data];

                if (isEdit && index !== -1) {
                    dataTemp.splice(index, 1, values);
                }
                else {
                    dataTemp.unshift(values);
                }

                const dataLocal = isEdit ? dataTemp : [values, ...data];
                localStorage.setItem('data_club', JSON.stringify(dataLocal));
                setVisible(false);
                getDataClub();
            }}
        >
            <Form.Item
                initialValue={row?.avatar}
                label='avatar'
                name='avatar'
                rules={[{ required: true, message: 'Please input your avatar!' }]}
            >
                <Input />
            </Form.Item>
            
            <Form.Item
                initialValue={row?.name}
                label='name'
                name='name'
                rules={[{ required: true, message: 'Please input your name!' }]}
                
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.created}
                label='created'
                name='created'
                rules={[{ required: true}]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.leader}
                label='leader'
                name='leader'
                rules={[{ required: true, message: 'Please input your leader!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.available}
                label='available'
                name='available'
                rules={[{ required: true, message: 'Please input your available!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                initialValue={row?.description}
                label='description'
                name='description'
                rules={[{ required: true, message: 'Please input your description!' }]}
            >
                <Input />
            </Form.Item>


            <div className='form-footer'>
                <Button htmlType='submit' type='primary'>
                    {isEdit ? 'Save' : 'Add'}
                </Button>
                <Button onClick={() => setVisible(false)}>Cancel</Button>
            </div>
        </Form>
    );
};

export default FormClub;
