import { Button, Modal, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormApply from './Form';
import type { IColumn } from '@/components/Table/typing';
import type { Apply } from '@/models/apply';


export default () => {
    const { data, getData, selectedRowKeys, setSelectedRowKeys, updateStatus } = useModel('apply');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

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
            <Button onClick={() => setVisible(true)}>Add Apply</Button>

            <Button onClick={() => updateStatus(selectedRowKeys as string[], 'Approved')}>
                Approve
            </Button>

            <Button onClick={() => updateStatus(selectedRowKeys as string[], 'Rejected')}>
                Reject
            </Button>

            <Table
                rowSelection={rowSelection}
                rowKey="id"
                dataSource={data}
                columns={columns}
            />

            <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                <FormApply onClose={() => setVisible(false)} />
            </Modal>
        </div>
    );
};