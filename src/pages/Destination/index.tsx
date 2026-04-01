import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { Row, Col, Select, Card } from 'antd';

export default () => {
    const { data, getData } = useModel('destination');
    const [type, setType] = useState('');

    useEffect(() => { getData(); }, []);

    const filtered = data.filter(i => !type || i.type === type);

    return (
        <Row gutter={16}>
            <Select onChange={setType} style={{ width: 200 }}>
                <Select.Option value="">All</Select.Option>
                <Select.Option value="beach">Beach</Select.Option>
                <Select.Option value="mountain">Mountain</Select.Option>
                <Select.Option value="city">City</Select.Option>
            </Select>

            {filtered.map(item => (
                <Col xs={24} sm={12} md={8} key={item.id}>
                    <Card cover={<img src={item.image} style={{"padding": "10px 15px"}}/>}>
                        <h3>{item.name}</h3>
                        <p>{item.type}</p>
                        <p>💰 {item.price}$</p>
                        <p>⭐ {item.rating}</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};