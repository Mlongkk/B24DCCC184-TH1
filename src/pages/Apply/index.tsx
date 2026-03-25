import { Button, Modal, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormApply from './Form';

export default () => {
    const { data, getData, selectedRowKeys, setSelectedRowKeys, updateStatus } = useModel('apply');
    const [visible, setVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const rowSelection = {
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    };

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Add Apply</Button>

            <Button onClick={() => updateStatus(selectedRowKeys as string[], 'Approved')}>
                Approve ({selectedRowKeys.length})
            </Button>

            <Button onClick={() => setVisible(true)}>
                Reject ({selectedRowKeys.length})
            </Button>

            <Table
                rowSelection={rowSelection}
                rowKey="id"
                dataSource={data}
                columns={[
                    { title: 'Name', dataIndex: 'name' },
                    { title: 'Club', dataIndex: 'club' },
                    { title: 'Status', dataIndex: 'status' },
                ]}
            />

            <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                <FormApply onClose={() => setVisible(false)} />
            </Modal>
        </div>
    );
};