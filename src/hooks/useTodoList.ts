import { useEffect, useState } from 'react';

import { Todo } from '../types/todo';

export const useTodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    // 로컬스토리지에서 Todo 리스트를 불러옴
    const localStorageTodoList = localStorage.getItem('todoList');
    // 배열로 변환하여 반환
    return JSON.parse(localStorageTodoList ?? '[]');
  });

  // todoList가 변경될 때마다 실행
  useEffect(() => {
    // 로컬스토리지에 저장
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // 대상 Todo 완료 상태 변경
  const changeCompleted = (id: number) => {
    // 변경전의 Todo 리스트를 인수로 호출함 
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        // 대상 ID라면 Completed 상태를 변경
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        // 변경하지 않은 Todo는 그대로 반환
        return todo;
      });
    });
  };

  // Todo추가 
  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      // 신규 Todo를 생성
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      // 변경전 Todo 내용 맞추기
      return [newTodo, ...prevTodoList];
    });
  };

  // 대상 Todo 삭제
  const deleteTodo = (id: number) => {
    setTodoList((prevTodoList) => {
      // 대상ID가 아닌 Todo만 반환
      return prevTodoList.filter((todo) => {
        return todo.id !== id;
      });
    });
  };

  // 완료된 Todo 모두 삭제
  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      // 완료되지 않은 Todo만 제외  
      return prevTodoList.filter((todo) => {
        return !todo.completed;
      });
    });
  };

  return {
    todoList,
    changeCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  };
};