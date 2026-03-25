import type { IColumn } from '@/components/Table/typing';
import { Button, Input, Modal, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import FormClub from './Form';
import { history } from 'umi';

const Club = () => {
    const { data, setRow, isEdit, setVisible, setIsEdit, visible, getDataClub } = useModel('club');

    useEffect(() => {
        getDataClub();
    }, []);

    const [keyword, setKeyword] = useState('');

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
    );

    const columns: IColumn<Club.Record>[] = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 100,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 100,
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            width: 100,
        },
        {
            title: 'Leader',
            dataIndex: 'leader',
            key: 'leader',
            width: 100,
        },
        {
            title: 'Available',
            dataIndex: 'available',
            key: 'available',
            width: 100,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
        },
        {
            title: 'Action',
            width: 200,
            align: 'center',
            render: (record) => {
                return (
                    <div>
                        <Button
                            onClick={() => {
                                history.push(`/club/${record.name}`);
                            }}
                        >
                            Members
                        </Button>
                        
                        <Button
                            onClick={() => {
                                setVisible(true);
                                setRow(record);
                                setIsEdit(true);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            onClick={() => {
                                const dataLocal: any = JSON.parse(localStorage.getItem('data_club') as any);
                                const newData = dataLocal.filter((item: any) => item.name !== record.name);
                                localStorage.setItem('data_club', JSON.stringify(newData));
                                getDataClub();
                            }}
                            type='primary'
                        >
                            Delete
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <Button
                style={{ marginBottom: 16 }}
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                    setRow(undefined);
                }}
                type='primary'
            >
                Add Club
            </Button>
            <Input
                placeholder="Search club name..."
                style={{ width: 300, marginBottom: 16 }}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Table columns={columns} dataSource={filteredData} />

            <Modal
                title={isEdit ? 'Edit Club' : 'Add Club'}
                visible={visible}
                footer={false}
                onCancel={() =>
                    setVisible(false)
                }>

                <FormClub />
            </Modal>
        </div>
    );
}

export default Club;