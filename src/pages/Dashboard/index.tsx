import { useModel } from 'umi';
import { Column } from '@ant-design/plots';
import * as XLSX from 'xlsx';

export default () => {
    const exportExcel = (data: any[]) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'export.xlsx');
    };

    const { data: apply } = useModel('apply');

    const chartData = apply.map((item) => ({
        club: item.club,
        status: item.status,
    }));

    return (
        <Column
            data={chartData}
            xField="club"
            yField="status"
            seriesField="status"
            isGroup
        />
    );
};


