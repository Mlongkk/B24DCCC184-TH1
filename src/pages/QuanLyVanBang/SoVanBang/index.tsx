import { Button, List } from "antd";
import { useModel } from "umi";

export default function SoVanBangPage() {
  const { yearBooks, addBook } = useModel("SoVanBang");

  return (
    <div>
      <h2>Sổ văn bằng</h2>

      <Button onClick={() => addBook(new Date().getFullYear())}>
        Thêm sổ năm nay
      </Button>

      <List
        dataSource={yearBooks}
        renderItem={(item) => (
          <List.Item>
            Năm: {item.year} | Số hiện tại: {item.currentNumber}
          </List.Item>
        )}
      />
      <hr />
    </div>
  );
}