import { Card, Rate } from 'antd';

export default ({ item }: any) => {
    return (
        <Card cover={<img src={item.image} />}>
            <h3>{item.name}</h3>
            <p>{item.type}</p>
            <Rate disabled defaultValue={item.rating} />
        </Card>
    );
};