import React from "react";

import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop}></div>

      <Card classFromOutside={classes.modal}>
        <header className={classes.header}>
          <h2>{props.errorTitle}</h2>
        </header>

        <div className={classes.content}>
          <p>{props.errorMessage}</p>
        </div>
        <footer className={classes.actions}>
          <Button />
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
