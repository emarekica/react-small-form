import React, { useState } from "react";

import Card from "../UI/Card";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // input state management
  const [enteredUserame, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  // executes when form sent
  const addUserHandler = (e) => {
    e.preventDefault();

    //reset
    setEnteredUsername("");
    setEnteredPassword("");
  };

  // triggered on user input keystroke
  // handle data collected from inpt
  const usernameChangeHandler = (e) => {
    // set to what user curently entered
    setEnteredUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  return (
    <div>
      <Card classFromOutside={classes.input}>
        <header>
          <h1>Add a new user</h1>
        </header>

        <form onFormSubmit={addUserHandler}>
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" />

          <label htmlFor="password">Password:</label>
          <input id="password" type="password" />

          <button type="submit">ADD</button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
