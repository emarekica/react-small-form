import React from "react";

import Card from "../UI/Card";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  return (
    <div>
      <Card classFromOutside={classes.input}>
        <header>
          <h1>Add a new user</h1>
        </header>

        <form>
          <label>Username:</label>
          <input />

          <label>Password:</label>
          <input />

          <button>ADD</button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
