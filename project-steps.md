# Small form notes

<br>

## **INSTALL and RUN**

Install node_modules:

    npm install
    npm start

<br><br>

Add `node_modules`, `package.json`, `package-lock.json` to `.gitignore`.

<br><br>

Change this line in `package.json` to be able to run app properly.
<br>

    "start": "react-scripts start"

<br>

Change to:
<br>

    "start": "react-scripts --openssl-legacy-provider start"

<br><br>

To exit the terminal: `control + C`

<br><br>

---

<br>

`label`+ `input` in JSX
<br>

    <label htmlFor="username">Username</label>
    <input id="username" type="text" />

<br><br>

<hr />

<br>

`onSubmit` put on the <form> in JSX specifies a function that should be executed when form is submitted.
<br><br>

<hr />

<br>

## **BUTTON COMPONENT CONFIG**

<br>

import: `import classes from "./Button.module.css";`
<br>

CSS: `.button`
<br>

JSX: `className={classes.button}`

<br><br>

`type` is set from **outside = place where custom button component is used**

Fallback (alternative) is also provided.
<br>

    type={props.type || "button "}

<br><br>

add an event handler:
<br>

    onClick={props.customOnClick}

<br><br>

output content between button tags:
<br>

```
<button>
      {props.children}
</button>
```

<br><br>

It will show whatever is passed in in the place where the Button is used.
<br>

`AddUser.js`:
<br>

    <Button type="submit">Add User</Button>

<br><br>

`props.children` will render `Add User`.

<br><br>

Final code:
<br><br>

`Button.js`:
<br>

```js
const Button = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || "button "}
      onClick={props.customOnClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
```

<br><br>

`AddUser.js`:
<br>

```js
import Button from "../UI/Button";
...

const AddUser = (props) => {
 ...

  return (
    <Card outsideClass={classes.input}>
      <form onSubmit={addUserHandler}>
        ...

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
```

<br><br>

<hr />

<br>

## **MANAGING USER INPUT**

<br>

**Fetch user input >> render it as part of a list of users**
<br>

`AddUser.js` component + `addUserHandler()` triggered when form is submitted `<form onSubmit={addUserHandler}>`
<br><br>

1. Collect data from two entered values:
   <br>

```js
<input id="username" type="text" />
<input id="age" type="number" />
```

<br><br>

2. Use the collected data in `addUserHandler()`.
   <br>

**Collecting input values**
<br>

**Use state management**. Update state with every key stroke >> save user's input in that state variable.
<br>

1. Import `{ useState }` and initialize it.

2. Define the default/initial starting state.

Since we want initial state to be empty >> `("")`
<br>

    const [enteredUsername, setEnteredUsername] = useState("");
    const [enteredAge, setEnteredAge] = useState("");

<br><br>

3. make event listener triggered on input keystroke

It gets event object because we listen to default DOM event, with more info.
<br><br>

```js
// functions triggered on user input keystroke
const usernameChangeHandler = (event) => {
  // set it to what user curently entered
  setEnteredUsername(event.target.value);
};

const ageChangeHandler = (event) => {
  setEnteredAge(event.target.value);
};
```

<br><br>

4. Access the user input through event.target.value.
   <br>

`target` = input

`value` = currently entered value of the input
<br><br>

Final code:
<br><br>

`AddUser.js`:
<br><br>

```js
const AddUser = (props) => {
  // state handles collection and storage of user input
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  // function executed when form sent
  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(enteredUsername, enteredAge);
  };

  // functions triggered on user input keystroke
  const usernameChangeHandler = (event) => {
    // set it to what user curently entered
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card outsideClass={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameChangeHandler} />

        <label htmlFor="age">Age (number)</label>
        <input id="age" type="number" onChange={ageChangeHandler} />

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
```

<br><br>

<hr />

<br>

## **RESETTING & VALIDATION**

<br><br>

### **RESETTING the state**

<br>

`AddUser.js` >> in `addUserHandler()` event listener set entered username and age back to empty string.
<br><br>

    setEnteredUsername("");
    setEnteredAge("");

<br><br>

**Reflecting current state in the input**
<br><br>

Do it via `value` prop in the `input` element in JSX.
<br><br>

```js
<input
  id="username"
  type="text"
  value={enteredUsername}
  onChange={usernameChangeHandler}
/>

<input
  id="age"
  type="number"
  value={enteredAge}
  onChange={ageChangeHandler}
/>
```

<br><br>

This combined with state reset will change the value (in this case, clear it, because reset is set to empty string) **upon a form submission, not upon a keystroke**.

<br><br>

<hr />

### **VALIDATION**

<br>

`addUserHandler()` >> execute code only if inputs are valid
<br><br>

Valid if:

- name not empty

- age not empty

- age >= 1
  <br><br>

**Is the age input <1 ?**
<br>

    if(enteredAge <1) {
          return;
    }

<br><br>

**Everything entered as input is always a string.**
<br>

So, entered age is a string. If you are checking for a number, convert it.

JS will compare a string `enteredAge` to a number `1`, but to be super safe, convert the string to a number using **unary operator** `+`:
<br><br>

    if(+enteredAge <1) {
          return;
    }

<br><br>

**Is the string empty?**
<br>

if `enteredUsername.trim().length === 0` >> string is empty

(trim removes whitespace; length zero is empty string)
<br><br>

```js
// function executed when form sent
const addUserHandler = (event) => {
  event.preventDefault();

  // validation

  // if strings are empty
  if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
    return;
  }

  console.log(enteredUsername, enteredAge);

  // reset
  setEnteredUsername("");
  setEnteredAge("");
};
```

<br><br>

If strings are empty, `return` will finish function execution and the following code won't be executed.
<br><br>

<hr />

Final code:
<br>

```js
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  const addUserHandler = (event) => {
    event.preventDefault();

    // validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }

    if (+enteredAge < 1) {
      return;
    }

    console.log(enteredUsername, enteredAge);

    // reset
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card outsideClass={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          /* added to render input */
          value={enteredUsername}
          onChange={usernameChangeHandler}
        />

        <label htmlFor="age">Age (number)</label>
        <input
          id="age"
          type="number"
          /* added to render input */
          value={enteredAge}
          onChange={ageChangeHandler}
        />

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
```

<br><br>

<hr />

<br>

## **ADDING USERS LIST COMPONENT**

<br>

**Goal**: Take valid input, store different users in a list, render that list below input field.
<br><br>

**Where to output the list of users?**

**Where to manage the list of users?**
<br><br>

One way: add unordered list element in the JSX, manage the state by adding another state.

**Idea of React is to have a lot of small component which have a logic with its own responsibility**. Keep components small and focused on their task.
<br>

Split **outputting** and **fetching** into 2 components.

fetching --> `AddUser.js`

outputting --> `UsersList.js`

<br><br>

<hr />

<br>

### 1. **Where to output the list of users**

<br><br>

User data collected in `AddUser` component.

New component, `UsersList` will output user data.
<br><br>

In the `ul`, go through a list of users that you get from AddUser and output an `li` for every user.
<br><br>

Users as array of user data will come through `props`, through property with my arbitrary name (here `usersFromInput`).
<br><br>

```js
const UsersList = (props) => {
  return <ul>[props.usersFromInput]</ul>;
};
```

<br><br>

Use `map()` to map array of users to an array of JSX elements. It transforms user data to JSX elements which are then rendered to the DOM.
<br><br>

Inside of the JSX item, output user name and age.

We expect `usersFromInput` to be an object with name property `{user.name}` and age property `{user.age}`.

Render it as a text.
<br><br>

```js
<ul>
  {props.usersFromInput.map((user) => (
    <li>
      {user.name} ({user.age} years old)
    </li>
  ))}
</ul>
```

<br><br>

**Styling**
<br><br>

Wrap the `ul` in the `Card` component.

To the already existing Card style, add your own style.
<br><br>

    <Card className={classes.users}>

<br><br>

It can be done because in the Card component we enabled the outside classes to be used.
<br><br>

    <div className={`${classes.card} ${props.outsideClass}`}>

<br><br>

<hr />

The whole code for `UsersList`:
<br><br>

```js
import classes from "./UsersList.module.css";
import Card from "../UI/Card";

const UsersList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {/* use map to transform array of user data to JSX element for each user */}
        {props.usersFromInput.map((user) => (
          <li>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
```

<br><br>

<hr />

<br>

### 2. **Where to manage the list of users**

<br><br>

Where to use the `UsersList` component?
<br><br>

**It is your app, structure it how you want.**
It can be rendered in the `AddUser`, but it is better to leave it to just fetch the data.

Render it in the `App.js`.
<br><br>

Define `usersFromInput` in the `App.js` because we are sending them from there via props to the `UsersList` component.

**Set it to an array.**
<br><br>

    <UsersList usersFromInput={[]}/>

<br><br>

<hr />

<br>

Whole code for `App.js`:
<br><br>

```js
import AddUser from "./components/users/AddUser";
import UsersList from "./components/users/UsersList";

function App() {
  return (
    <div>
      <AddUser />
      <UsersList usersFromInput={[]} />
    </div>
  );
}

export default App;
```

<br><br>

<hr />

<br>

## **MANAGING USERS LIST via STATE**

<br><br>

**goal**: When Add User button is clicked (in the AddUser component), do the following:
<br><br>

1. create new user object containing that data

2. add it to an array of users object

3. output it to users list/log user data

<br><br>

<hr />

<br>

**Lifting the state up concept needed.**
<br><br>

Empty array we defined in `App.js` is static and doesn't output users list.
<br>

Conditions for lifting of state >> Manage list of users in a place where:
<br><br>

- there is access to `AddUser` component

- get notification when _Add User_ button is clicked

- there is access to `UsersList` component to feed `usersFromInput` array into it
  <br><br>

Lift the state management to `App.js`, **the nearest component which has access to both components**.
<br><br>

Import `useState`.
<br>

    import React, { useState } from "react";

<br><br>

Initialize it with an empty array.
<br>

    const [usersList, setUsersList] = useState([]);

<br><br>

In `App.js`, forward `usersList` to the `UsersList` component.
<br>
<UsersList usersFromInput={usersList} />
<br><br>

<hr />

<br>

### 1. **Handle state**

<br><br>

When we click the _Add User_ button and activate the event listener `addUserHandler` in the `AddUser` component, forward the `enteredUsername` and `enteredAge` to the `App.js` with props.
<br><br>

Pass an event handler with _on... + arbitrary name_ to the `AddUser` component in the `App.js`.

When _Add User button_ is clicked, a function `addNewUserHandler` passed to `onAddUserButtonClicked` should be triggered.
<br><br>

```js
const addNewUserHandler() {

}

return (
  ...
  <AddUser onAddUserButtonClicked={addNewUserHandler}/>
)
```

<br><br>

2 arguments expected in that function:

    1. user's name `uName`
    2. user's age `uAge`

That function creates new user with data from `AddUser.js`, adds it to `usersList` = **changes state**.
<br><br>

**Update the state by taking the old list and appending a new element to it.**
<br><br>

**When state update depends on the previous state, use alternative form of** `setUsersList()`: **pass a function**. It will automatically get latest previous state snapshot when React performs state update.
<br><br>

```js
const addNewUserHandler = (uName, uAge) => {
  setUsersList(() => {});
};
```

<br><br>

Pass in the previous state snapshot, rename it as you wish: `previousUserListStateSnapshot`
<br><br>

```js
const addNewUserHandler = (uName, uAge) => {
  setUsersList((previousUserListStateSnapshot) => {});
};
```

<br><br>

Then return new state snapshot in the body of that passed function. It will be an array with copy of previous user list state snapshot + new element, JS object with `uName` and `uAge` stored as `name` and `age`.
<br><br>

```js
const addNewUserHandler = (uName, uAge) => {
  setUsersList((previousUserListStateSnapshot) => {
    return [...previousUserListStateSnapshot, { name: uName, age: uAge }];
  });
};
```

<br><br>

Pass the `addNewUserHandler` to the `AddUser` component and its `onAddUserButtonClicked` prop.
<br><br>

    <AddUser onAddUserButtonClicked={addNewUserHandler} />

<br><br>

Utilize `onAddUserButtonClicked` prop in `AddUser` component >> `addUserHandler` event handler.

Instead of ...
<br>

    console.log(enteredUsername, enteredAge);

<br><br>

use this:
<br>

    props.onAddUserButtonClicked(enteredUsername, enteredAge);

<br><br>

_Explanation:_
<br>

What is passed in via props is a function `addNewUserHandler` from the `App.js` forwarded via `onAddUserButtonClicked` that is on the `AddUser` element in the `App.js`. Therefore it can be executed inside of AddUser` component.

It forwards the data entered by the user, and fetched by the `AddUser` component back to the `App.js` via props and via that `onAddUserButtonClicked()` function.

<br><br>

<hr />

<br>

### **2. Create new user object containing that data**

<br><br>

`App.js`
<br><br>

```js
const addNewUserHandler = (uName, uAge) => {
    setUsersList((previousUserListStateSnapshot) => {
      // creates new JS object for every user and ads it to usersList array
      return [...previousUserListStateSnapshot, { name: uName, age: uAge }];
    });
  };

return (
   ...
   <AddUser onAddUserButtonClicked={addNewUserHandler} />
)
```

<br><br>

`AddUser.js`
<br><br>

```js
const addUserHandler = (event) => {
    ...

    // console.log(enteredUsername, enteredAge);
    props.onAddUserButtonClicked(enteredUsername, enteredAge);

    ...
  };
```

<br><br>

<hr />

<br>

### **3. Output it to users list/log user data**

<br><br>

Add a `key` (id) prop with unique value to the li in `UsersList`. It should be dynamic, not hard-coded.
<br><br>

`App.js`
<br><br>

```js
id: Math.random().toString();

const addNewUserHandler = (uName, uAge) => {
  setUsersList((previousUserListStateSnapshot) => {
    return [
      ...previousUserListStateSnapshot,
      { name: uName, age: uAge, id: Math.random().toString() },
    ];
  });
};
```

<br><br>

`UsersList.js`
<br><br>

```js
<li key={user.id}>

<Card className={classes.users}>
    <ul>
        {props.usersFromInput.map((user) => (
            <li key={user.id}>
                {user.name} ({user.age} years old)
            </li>
        ))}
    </ul>
</Card>
```

<br><br>

<hr />

<br>

Final code:
<br><br>

`UsersList.js`
<br><br>

```js
const UsersList = (props) => {
  return (
    <Card outsideClass={classes.users}>
      <ul>
        {/* use map to transform array of user data to JSX element for each user */}
        {props.usersFromInput.map((user) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};
```

<br><br>

`AddUser.js`
<br><br>

```js
const AddUser = (props) => {
  // state handles collection and storage of user input
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  // function executed when form sent
  const addUserHandler = (event) => {
    event.preventDefault();

    // validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }

    if (+enteredAge < 1) {
      return;
    }

    // console.log(enteredUsername, enteredAge);
    props.onAddUserButtonClicked(enteredUsername, enteredAge);

    // reset
    setEnteredUsername("");
    setEnteredAge("");
  };

  // functions triggered on user input keystroke
  const usernameChangeHandler = (event) => {
    // set it to what user curently entered
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  return (
    <Card outsideClass={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          // added to render input
          value={enteredUsername}
          onChange={usernameChangeHandler}
        />

        <label htmlFor="age">Age (number)</label>
        <input
          id="age"
          type="number"
          value={enteredAge}
          onChange={ageChangeHandler}
        />

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};
```

<br><br>

`App.js`
<br><br>

```js
import AddUser from "./components/users/AddUser";
import UsersList from "./components/users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  // function triggered when new user added
  // creates new user with data from AddUser.js, adds it to usersList (changes state)

  const addNewUserHandler = (uName, uAge) => {
    setUsersList((previousUserListStateSnapshot) => {
      // creates new JS object for every user and ads it to usersList array
      return [
        ...previousUserListStateSnapshot,
        { name: uName, age: uAge, id: Math.random().toString() },
      ];
    });
  };

  return (
    <div>
      {/* reacts to click on a button, activates function for adding new user to the list */}
      <AddUser onAddUserButtonClicked={addNewUserHandler} />
      <UsersList usersFromInput={usersList} />
    </div>
  );
}
```

<br><br>

<hr />

<br>

## **MODAL COMPONENT**

<br>

**"error modal" reusable UI component**

<br><br>

Overlay box, UI element that can be used in different places in the app.
<br><br>

Modal appearance is totally arbitrary.

We will reuse `Card` and `Button` components. It will have few sections. Here is the structure.
<br><br>

```js
import React from "react";

import Button from "./Button";
import Card from "./Card";

const ErrorModal = (props) => {
  return (
    <Card>
      <header>
        <h2></h2>
      </header>

      <div>
        <p></p>
      </div>

      <footer>
        <Button>OK</Button>
      </footer>
    </Card>
  );
};

export default ErrorModal;
```

<br><br>

**Making modal reusable**
<br><br>

**It should be configurable from the outside**. No hard-coding. Make it reusable so you can show different error messages.
<br><br>

    <h2>{props.errorTitle}</h2>

    <p>{props.errorMessage}</p>

<br><br>

`errorTitle` and `errorMessage` (arbitrary names) prop should hold the text that should be output as the modal header and modal message.
<br><br>

<hr />

<br><br>

### **Rendering modal**

<br>
... as part of AddUser component
<br><br>

If you want to render it over the entire UI, it should be as high as possible in the component tree: in the `App.js`. It can be used also in different places.
<br>

If you use 2 components next to each other in JSX, make sure to wrap both of them in an extra <div>.
<br><br>

Code from the component where modal is rendered:
<br><br>

```js
...

import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  ...

  return (
    <div>
      <ErrorModal
        errorTitle="An ErrorOccured"
        errorMessage="Something went wrong."
      />
      <Card outsideClass={classes.input}>
        ...

      </Card>
    </div>
  );
};

export default AddUser;
```

<br><br>

<hr />

<br>

### **Adding backdrop**

<br><br>

Backdrop is an overlay between modal and the main page. Prevents us from interacting with the main page while the Modal is up.

Make an empty `div` in the `ErrorModal` component.
<br><br>

    <div className={classes.backdrop} />

<br><br>

Complete `ErrorModal.js` code:
<br><br>

```js
import React from "react";

import Button from "./Button";
import Card from "./Card";

import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} />
      <Card outsideClass={classes.modal}>
        <header className={classes.header}>
          <h2>{props.errorTitle}</h2>
        </header>

        <div className={classes.content}>
          <p>{props.errorMessage}</p>
        </div>

        <footer className={classes.actions}>
          <Button>OK</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
```

<br><br>

<hr />

<br>

## MANAGING MODAL STATE

<br>

**goal**: Show `ErrorModal` only if something invalid is entered.
<br><br>

**MODAL STATE MANAGEMENT**

<br>

- **a**: when there is an error >> modal is rendered

- **b**: when there is no error >> modal is not rendered
  <br><br>

Manage state where the `ErrorModal` component is used: `AddUser` component.
<br><br>

Conditionally update UI based on the question if you have an error or not (validation).

`AddUserHandler` >> **validation part**

It can be `string` with an error message; can be an `object` with error title and error message.
<br><br>

<hr />

<br>

### 1. **Add another state**

<br><br>

`AddUser.js`
<br>

Initial state is `undefined`, no need to pass initial value.
<br>

    const [error, setError] = useState();

<br><br>

<hr />

<br>

### 2. **Manage the error**

<br><br>

Choose how it looks like, a string or an object.

Here, it is an **object**.
<br>

in the validation part:
<br><br>

```js
const addUserHandler = (event) => {
    ...

    // validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {

      // setting error state
      setError({
        errorTitle: "Invalid input",
        errorMessage: "Please enter a valid name and age (non-empty values)."
      })

      return;
    }

    if (+enteredAge < 1) {
      setError({
        errorTitle: "Invalid input",
        errorMessage: "Please enter a valid age (>0)."
      })
      return;
    }
    ...
};

```

<br><br>

We set the error state to slightly different object, it holds different values in `errorMessage` key.

<br><br>

<hr />

<br>

### 3. **Conditionally render error modal in JSX**

<br>

```js
{
  error && (
    <ErrorModal
      errorTitle={error.errorTitle}
      errorMessage={error.errorMessage}
    />
  );
}
```

<br><br>

<hr />

<br>

### 4. **Close the modal**

<br><br>

... by clicking on the backdrop

... by clicking on the Button
<br><br>

`AddUser.js`
<br>

**Clear error state**
<br>

    const [error, setError] = useState();

<br><br>

Do it by creating an error hangler function which resets the error to `undfined`, `null` or any other falsy value.
<br><br>

```js
const errorHandler = () => {
  setError(null);
};
```

<br><br>

**Trigger error handler function**
<br>

`ErrorModal.js`
<br>

Register clicks and trigger error handler function on:

- `backdrop`

- `Button`
  <br><br>

**Register clicks** with `onClick` attribute.

**Trigger the error handler function** with `props.onHandlingErro`r.

    We can add it to the Button component because it registers it, there is onClick={props.customOnClick}  prop in the original component JSX.

<br><br>

```js
<div className={classes.backdrop} onClick={props.onHandlingError} />

<Button customOnClick={props.onHandlingError}>OK</Button>
```

<br><br>

`AddUser.js`
<br>

Go back to where the Modal is used and add the newly created prop to the JSX.

Pass in the pointer at the `errorHandler` function.
<br><br>

```js
{
  error && (
    <ErrorModal
      errorTitle={error.errorTitle}
      errorMessage={error.errorMessage}
      onHandlingError={errorHandler}
    />
  );
}
```

<br><br>

<hr />

<br>

Final code:
<br>

`ErrorModal.js`:
<br><br>

```js
import React from "react";

import Button from "./Button";
import Card from "./Card";

import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onHandlingError} />
      <Card outsideClass={classes.modal}>
        <header className={classes.header}>
          <h2>{props.errorTitle}</h2>
        </header>

        <div className={classes.content}>
          <p>{props.errorMessage}</p>
        </div>

        <footer className={classes.actions}>
          <Button customOnClick={props.onHandlingError}>OK</Button>
        </footer>
      </Card>
    </div>
  );
};

export default ErrorModal;
```

<br><br>

<hr />

<br><br>

`AddUser.js`:
<br><br>

```js
import React, { useState } from "react";

import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");

  // handles error modal
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    // validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      // setting error modal state
      setError({
        errorTitle: "Invalid input",
        errorMessage: "Please enter a valid name and age (non-empty values).",
      });

      return;
    }

    if (+enteredAge < 1) {
      setError({
        errorTitle: "Invalid age",
        errorMessage: "Please enter a valid age (>0).",
      });
      return;
    }

    props.onAddUserButtonClicked(enteredUsername, enteredAge);

    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  // handles error modal
  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          errorTitle={error.errorTitle}
          errorMessage={error.errorMessage}
          onHandlingError={errorHandler}
        />
      )}
      <Card outsideClass={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            // added to render input
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />

          <label htmlFor="age">Age (number)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
```
