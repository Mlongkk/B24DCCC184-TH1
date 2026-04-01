import { useModel } from 'umi';
import { Pie } from '@ant-design/plots';
import { Alert } from 'antd';
import { useEffect } from 'react';

export default () => {
    const { data, total } = useModel('budget');
    const { getData } = useModel('planner');

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Pie data={data} angleField="value" colorField="type" />
            {total > 1000 ? <Alert message="Over budget" type="error" /> : <Alert message="Within budget" type="success" />}
        </div>
    );
};