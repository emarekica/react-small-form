import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button}
      // type set where button is used + fallback
      type={props.type || "button"}
      // event listener
      onClick={props.customOnClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
