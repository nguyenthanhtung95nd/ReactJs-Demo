import { useState, useCallback, useEffect } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { v4 } from "uuid";

function App() {
  const STORAGE_KEY = "TODO_APP";
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState("");

  // Component did mount
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(STORAGE_KEY);
    if (storagedTodoList) {
      setTodoList(JSON.parse(storagedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // Methods
  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const onAddBtnClick = useCallback(
    (e) => {
      setTodoList([
        { id: v4(), name: textInput, iscompleted: false },
        ...todoList,
      ]);

      setTextInput("");
    },
    [textInput, todoList]
  );

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, iscompleted: true } : todo
      )
    );
  }, []);

  return (
    <>
      <h3>Todo List</h3>
      <TextField
        name="add"
        placeholder="Add new todo ..."
        elemAfterInput={
          <Button isDisabled={!textInput} appearance="primary" onClick={onAddBtnClick}>
            Add new
          </Button>
        }
        css={{ padding: "2px 4px 2px" }}
        value={textInput}
        onChange={onTextInputChange}
      ></TextField>
      <ToDoList todoList={todoList} onCheckBtnClick={onCheckBtnClick} />
    </>
  );
}

export default App;
