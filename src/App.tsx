import React, { useState } from "react";
import { items } from "./data/data";
import { IProps } from "./types/types";

const App = () => {
  const [todoLists, setTodoLists] = useState<IProps[]>(items);
  const [userInfo, setUserInfo] = useState({
    user: "",
    title: "",
    completed: false,
  });

  const { user, title, completed } = userInfo;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const checkOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
  };

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();

    const newItems = { id: todoLists.length + 1, user, title, completed };
    setTodoLists([...todoLists, newItems]);
    setUserInfo({
      user: "",
      title: "",
      completed: false,
    });
  };

  const handleDeleteTodo = (itemId: number) => {
    const newItems = todoLists.filter((todo) => todo.id !== itemId);
    setTodoLists(newItems);
  };

  return (
    <section>
      <form onSubmit={handleCreateList}>
        <div>
          <label>유저 이름</label>
          <input
            type="text"
            value={user}
            name="user"
            onChange={onChange}
            placeholder="유저 이름을 작성해주세요"
          />
          <label>할 일 목록</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={onChange}
            placeholder="목록을 작성해주세요"
          />
          <input
            type="checkbox"
            checked={completed}
            name="completed"
            onChange={checkOnchange}
          />
        </div>
        <button type="submit">제출하기</button>
      </form>
      {todoLists.length === 0 && <h1>목록을 추가해주세요!</h1>}
      {todoLists.map((items: IProps) => (
        <div key={items.id}>
          <h1>{items.id}</h1>
          <h3>{items.user}</h3>
          <h3>{items.title}</h3>
          <h3>{items.completed ? "완료" : "진행중"}</h3>
          <button>수정</button>
          <button onClick={() => handleDeleteTodo(items.id)}>삭제</button>
        </div>
      ))}
    </section>
  );
};

export default App;
