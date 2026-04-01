import { useModel } from 'umi';
import { Button, Card } from 'antd';
import { Alert } from 'antd';
import { useEffect } from 'react';

export default () => {
    const { data, getDataDestination } = useModel('destination');
    const { plan, addDay, addToDay, removeItem, getData } = useModel('planner');
    const { total } = useModel('budget');

    useEffect(() => {
        getDataDestination();
        getData();
    }, []);

    return (
        <div>
            <Button onClick={addDay}>Add Day</Button>

            {plan.map(day => (
                <Card key={day.day} title={`Day ${day.day}`}>
                    {data.map(d => (
                        <Button key={d.id} onClick={() => addToDay(day.day, d)}>
                            Add {d.name}
                        </Button>
                    ))}

                    {day.items.map(i => (
                        <div key={i.id}>
                            - {i.name} &nbsp; <img src={i.image} style={{ width: 50, maxHeight: 50 }} />
                            &nbsp; <span style={{ color: 'gray' }}>{i.type}</span>
                            &nbsp; <span style={{ color: 'green' }}>💰 {i.price}</span>
                            &nbsp; <span style={{ color: 'orange' }}>⭐ {i.rating}</span>
                            &nbsp;
                            <Button onClick={() => removeItem(day.day, i.id)}>Remove</Button>
                        </div>
                    ))}
                </Card>  
            ))}
            {total > 1000 ? <Alert message="Over budget" type="error" /> : <Alert message="Within budget" type="success" />}
        </div>
    );
};