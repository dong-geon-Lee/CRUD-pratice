import React, { useState } from "react";
import { items } from "./data/data";
import { IProps } from "./types/types";

const App = () => {
  const [todoLists, setTodoLists] = useState(items);
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

  const handleTodoList = (e: React.FormEvent) => {
    e.preventDefault();

    const newItems = { id: todoLists.length + 1, user, title, completed };
    setTodoLists([...todoLists, newItems]);
    setUserInfo({
      user: "",
      title: "",
      completed: false,
    });
  };

  return (
    <section>
      <form onSubmit={handleTodoList}>
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

      {todoLists.map((items: IProps) => (
        <div key={items.id}>
          <h1>{items.id}</h1>
          <h3>{items.title}</h3>
          <h3>{items.user}</h3>
          <h3>{items.completed ? "완료" : "진행중"}</h3>
        </div>
      ))}
    </section>
  );
};

export default App;
