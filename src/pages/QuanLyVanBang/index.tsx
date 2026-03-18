
import CertificatePage from './Certificate';
import FieldConfigPage from './FieldConfig';

import SearchPage from './Search';
import SoVanBangPage from './SoVanBang';
import DecisionPage from './Decision';

export default function Layout() {
    return (
        <div style={{ padding: 20 }}>
            <h1>Quản lý văn bằng</h1>
            <SoVanBangPage />
            <DecisionPage />
            <FieldConfigPage />
            <CertificatePage />
            <SearchPage />
        </div>
    );
}