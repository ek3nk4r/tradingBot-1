import React, { useState, useEffect } from "react";
import { LoginUseStyles } from "./Material-ui/UseStyles";
import "../../Assets/stylesheets/form.css";

// components
import LoginFormContainer from "./JSX/LoginFormContainer";
import ErrorMessage from "../ErrorMessage";
import SendLogin from "./LoginFunctions/SendLogin";

const Login = (props) => {
  console.log("*** LOGIN PROPS ***", props);
  const { user, setUser, history } = props;
  const classes = LoginUseStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
    isError: false,
    error: "",
  });
  const { username, password, isError, error } = state;

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SendLogin(username, password, setState, setUser, history);
  };

  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  });

  const errorMessage = ErrorMessage(isError, error);

  return (
    <>
      <LoginFormContainer
        state={state}
        handleChange={handleChange}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        classes={classes}
      />
    </>
  );
};

export default Login;
