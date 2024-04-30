import { useState } from 'react';
import { Plus } from 'lucide-react';

type Props = {
  addTodo: (title: string) => void;
};

export const AddTodoForm = ({ addTodo }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 페이지 변경 방지
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <form className="flex" onSubmit={onSubmit} >
      <input
        type="text"
        placeholder="신규 Todo를 입력해주세요."
        className="grow rounded-s bg-slate-200 p-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-e bg-blue-600 p-2 transition-colors hover:bg-blue-800 disabled:bg-gray-400"
        disabled={!inputValue}
      >
        <Plus className="text-white" />
      </button>
    </form>
  );
};