import { Table } from 'antd';
import { useParams } from 'umi';
import { useModel } from 'umi';

export default () => {
    const params = useParams<{ name: string }>();
    const name = params.name || '';
    const { data } = useModel('apply');

    const members = data.filter(
        (item) => item.club === name && item.status === 'Approved'
    );

    return (
        <Table
            dataSource={members}
            columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'Email', dataIndex: 'email' },
                { title: 'Phone', dataIndex: 'phone' },
            ]}
        />
    );
};