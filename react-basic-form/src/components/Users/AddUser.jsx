import React, { useState } from "react";
import classes from "./AddUser.module.css";
import Card from "../Common/Card";
import Button from "../Common/Button";
import ErrorModal from "../Common/ErrorModal";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (userName.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a age greater 0.",
      });
      return;
    }
    props.handleAddUser(userName, age);
    setUserName("");
    setAge("");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleError = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={handleError}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={handleAddUser}>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
          />
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
