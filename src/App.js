import React, { useState } from "react";

import AddUser from "./components/users/AddUser";
import UserList from "./components/users/UserList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addNewUserHandler = (newUserName) => {
    setUsersList((previousUserListSnapshot) => {
      return [
        ...previousUserListSnapshot,
        {
          name: newUserName,
          id: Math.random().toString(),
        },
      ];
    });
  };

  return (
    <div>
      <AddUser onAddingNewUser={addNewUserHandler} />
      <UserList usersFromInput={usersList} />
    </div>
  );
}

export default App;
