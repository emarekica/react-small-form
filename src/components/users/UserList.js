// outputs user data

import React from "react";

import Card from "../UI/Card";
import classes from "./UserList.module.css";

const UserList = (props) => {
  return (
    <Card classFromOutside={`${classes.card} ${props.classFromOutside}`}>
      <ul>
        {props.usersFromInput.map((user) => {
          return <li>{user.name}, welcome!</li>;
        })}
      </ul>
    </Card>
  );
};

export default UserList;
