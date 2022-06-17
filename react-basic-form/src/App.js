import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";
function App() {
  const [usersList, setUsersList] = useState([]);
  const handleAddUser = (userName, age) => {
    setUsersList((preState) => {
      return [
        ...preState,
        { name: userName, age: age, id: Math.random().toString() },
      ];
    });
  };
  return (
    <div>
      <AddUser handleAddUser={handleAddUser} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
