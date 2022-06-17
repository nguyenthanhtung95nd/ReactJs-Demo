import React from "react";
import ToDo from "./ToDo";

const ToDoList = ({ todoList, onCheckBtnClick }) => {
  return (
    <div>
      {todoList.map((todo) => (
        <ToDo key={todo.id} todo={todo} onCheckBtnClick={onCheckBtnClick} />
      ))}
    </div>
  );
};

export default ToDoList;
