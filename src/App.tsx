import React, { useState } from "react";
import { items } from "./data/data";
import { IProps } from "./types/types";

const App = () => {
  const [todoLists, setTodoLists] = useState<IProps[]>(items);
  const [editTodo, setEditTodo] = useState<string>("");
  const [userInfo, setUserInfo] = useState({
    user: "",
    title: "",
    completed: false,
    show: false,
  });

  const { user, title, completed, show } = userInfo;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const editOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  const checkOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.checked });
  };

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();

    const newItems = { id: todoLists.length + 1, user, title, completed, show };
    setTodoLists([...todoLists, newItems]);
    setUserInfo({
      user: "",
      title: "",
      completed: false,
      show: false,
    });
  };

  const handleDeleteTodo = (itemId: number) => {
    const newItems = todoLists.filter((todo) => todo.id !== itemId);
    setTodoLists(newItems);
  };

  const handleUpdateTodo = (
    e: React.FormEvent,
    itemId: number,
    editTitle: string
  ) => {
    e.preventDefault();
    const updateItem = todoLists.map((item) => {
      if (item.id === itemId) return { ...item, title: editTitle, show: false };
      return { ...item };
    });
    setTodoLists(updateItem);
  };

  const handleEditTodo = (itemId: number, show: boolean) => {
    const editItem = todoLists.map((item: IProps) => {
      if (item.id === itemId) return { ...item, show: !show };
      return { ...item };
    });
    setTodoLists(editItem);
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
      {todoLists.map((item: IProps) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
          <h3>{item.user}</h3>
          {item.show ? (
            <form onSubmit={(e) => handleUpdateTodo(e, item.id, editTodo)}>
              <input
                type="text"
                onChange={editOnchange}
                defaultValue={item.title}
              />
              <button type="submit" hidden />
            </form>
          ) : (
            <h3>{item.title}</h3>
          )}
          <h3>{item.completed ? "완료" : "진행중"}</h3>
          <button
            onClick={() => {
              handleEditTodo(item.id, item.show);
            }}
          >
            {item.show ? "닫기" : "수정"}
          </button>
          <button onClick={() => handleDeleteTodo(item.id)}>삭제</button>
        </div>
      ))}
    </section>
  );
};

export default App;
