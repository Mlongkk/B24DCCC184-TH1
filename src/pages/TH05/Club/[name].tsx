import { Button, Table } from 'antd';
import { useParams, useModel } from 'umi';
import { useEffect } from 'react';
import { history } from 'umi';
import type { IColumn } from '@/components/Table/typing';
import type { Apply } from '@/models/apply';

export default () => {
    const params = useParams<{ name: string }>();
    const name = decodeURIComponent(params.name);

    const { data, getData } = useModel('apply');

    useEffect(() => {
        getData();
    }, []);

    //muốn xóa 1 thành viên thì chỉ cần update status của nó bên page Quản lý đơn thành 'Rejected' là được, không cần làm thêm nút xóa
    const members = data.filter(
        (item) => item.club === name && item.status === 'Approved'
    );


    const columns: IColumn<Apply>[] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 100,
            align: 'center'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: 100,
            align: 'center'
        },
        {
            title: 'Club',
            dataIndex: 'club',
            key: 'club',
            align: 'center',
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            align: 'center'
        },
    ];

    return (
        <div>
            <h2>
                <Button
                    onClick={() => {
                        history.push(`/club`);
                    }}
                >
                    Back
                </Button> &nbsp;
                Members of {name}</h2>

            <Table
                rowKey="id"
                dataSource={members}
                columns={columns}
            />
        </div>
    );
};