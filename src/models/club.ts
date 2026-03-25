import { useState } from 'react';

export default () => {
    const fakeData: Club.Record[] = [
        {
            avatar: 'https://joeschmoe.io/api/v1/random',
            name: 'Club A',
            created: '2023-01-01',
            description: 'This is Club A',
            leader: 'John Doe',
            available: "true",
        },
        {
            avatar: 'https://joeschmoe.io/api/v1/random',
            name: 'Club B',
            created: '2023-02-01',
            description: 'This is Club B',
            leader: 'Jane Doe',
            available: "false",
        },
    ];

    const [data, setData] = useState<Club.Record[]>(fakeData);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<Club.Record>();

    const getDataClub = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('data_club') as any);
        if (!dataLocal?.length) {
            const res = { data: fakeData };
            localStorage.setItem('data_club', JSON.stringify(res?.data ?? []));
            setData(res?.data ?? []);
            return;
        }
        setData(dataLocal);
    };

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getDataClub,
    };
}