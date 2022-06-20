import React from "react";

import AddUser from "./components/users/AddUser";
import UserList from "./components/users/UserList";

function App() {
  return (
    <div>
      <AddUser />
      <UserList usersFromInput={[]} />
    </div>
  );
}

export default App;
