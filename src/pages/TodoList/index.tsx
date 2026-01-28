import React, { useEffect, useState } from 'react';

interface Todo {
  id: number;
  title: string;
}

const STORAGE_KEY = 'todo_list';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load từ localStorage
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  // Lưu vào localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleAddOrEdit = () => {
    if (!input.trim()) return;

    if (editingId !== null) {
      setTodos(
        todos.map(todo =>
          todo.id === editingId ? { ...todo, title: input } : todo
        )
      );
      setEditingId(null);
    } else {
      setTodos([
        ...todos,
        { id: Date.now(), title: input }
      ]);
    }

    setInput('');
  };

  const handleEdit = (todo: Todo) => {
    setInput(todo.title);
    setEditingId(todo.id);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Todo List</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập công việc..."
      />

      <button onClick={handleAddOrEdit}>
        {editingId !== null ? 'Cập nhật' : 'Thêm'}
      </button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => handleEdit(todo)}>Sửa</button>
            <button onClick={() => handleDelete(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
