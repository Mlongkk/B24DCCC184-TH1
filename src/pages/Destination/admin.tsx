import { Input, Button, Upload, message } from 'antd';
import { useState } from 'react';
import { useModel } from 'umi';
import { validateDestination } from '@/utils/validate';
import { Select } from 'antd';
import { useEffect } from 'react';

export default () => {
    const { data, add, remove, getDataDestination } = useModel('destination');
    const [form, setForm] = useState<any>({});

    useEffect(() => { getDataDestination(); }, []);

    const handleAdd = () => {
        const err = validateDestination(form);
        if (err) {
            message.error(err);
            return;
        }

        add({ ...form, id: Date.now().toString() });
        message.success('Added!');
    };

    return (
        <div>
            <Input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />

            <Select
                placeholder="Select type"
                style={{ width: "100%" }}
                onChange={(value) => setForm({ ...form, type: value })}
            >
                <Select.Option value="beach">Beach</Select.Option>
                <Select.Option value="mountain">Mountain</Select.Option>
                <Select.Option value="city">City</Select.Option>
            </Select>

            <Input placeholder="Price" type="number" onChange={e => setForm({ ...form, price: Number(e.target.value) })} />

            <Upload beforeUpload={(file) => {
                const reader = new FileReader();
                reader.onload = () => setForm((f: any) => ({ ...f, image: reader.result }));
                reader.readAsDataURL(file);
                return false;
            }}>
                <Button>Upload</Button>
            </Upload>

            <Button style={{ marginTop: 10, float: "right" }} type="primary" onClick={handleAdd}>Add</Button>
            <br />
            <br />

            <h3>List các điểm đến:</h3>
            {data.map(d => (
                <div key={d.id}>
                    - {d.name} &nbsp; <img src={d.image} style={{ width: 50, maxHeight: 50 }} />
                    &nbsp; <span style={{ color: 'gray' }}>{d.type}</span>
                    &nbsp; <span style={{ color: 'green' }}>💰 {d.price}</span>
                    &nbsp; <span style={{ color: 'orange' }}>⭐ {d.rating}</span>
                    &nbsp;
                    <Button danger onClick={() => remove(d.id)}>Delete</Button>
                </div>
            ))}
        </div>
    );
};