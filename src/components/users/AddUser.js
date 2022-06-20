// fetches input

import React, { useState } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  // input state management
  const [enteredUserame, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error, setError] = useState();

  // executes when form sent
  const addUserHandler = (e) => {
    e.preventDefault();

    // validation
    if (
      enteredUserame.trim().length === 0 ||
      enteredPassword.trim().length === 0
    ) {
      // set error state
      setError({
        errorTitle: "Invalid input",
        errorMessage: "Please try again with non-empty values.",
      });

      return;
    }

    // add password regex check

    // add new user
    props.onAddingNewUser(enteredUserame);

    // reset
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

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {/* conditionally handling error modal */}
      {error && (
        <ErrorModal
          errorTitle="An Error Occured"
          errorMessage="Something went wrong."
          onHandlingError={errorHandler}
        />
      )}

      <Card classFromOutside={classes.input}>
        <header>
          <h1>Add a new user</h1>
        </header>

        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            // renders user input
            value={enteredUserame}
            onChange={usernameChangeHandler}
          />

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
          />

          <button type="submit">ADD</button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
