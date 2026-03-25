import { useState } from 'react';

export interface Apply {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    skill: string;
    club: string;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    note?: string;
}

export default () => {
    const [data, setData] = useState<Apply[]>([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const APPLY_KEY = 'apply_data';
    const HISTORY_KEY = 'apply_history';

    const getData = () => {
        const raw = localStorage.getItem(APPLY_KEY);
        setData(raw ? JSON.parse(raw) : []);
    };

    const saveData = (newData: Apply[]) => {
        localStorage.setItem(APPLY_KEY, JSON.stringify(newData));
        setData(newData);
    };

    const updateStatus = (ids: string[], status: Apply['status'], note?: string) => {
        const newData = data.map((item) =>
            ids.includes(item.id)
                ? { ...item, status, note }
                : item
        );

        // lưu history
        const history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

        ids.forEach((id) => {
            history.push({
                id,
                status,
                note,
                time: new Date().toISOString(),
            });
        });

        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

        saveData(newData);
    };

    return {
        data,
        setData,
        getData,
        saveData,
        selectedRowKeys,
        setSelectedRowKeys,
        updateStatus,
    };
};