import React, { useState, useEffect } from "react";
// import { signup } from "./AuthAxios";
import { SignupUseStyles } from "./Material-ui/UseStyles";
import "../../Assets/stylesheets/form.css";

//  components
import SignupFormContainer from "./JSX/SignupFormContainer";
import ErrorMessage from "../ErrorMessage";
import SendSignup from "./SignUpFunctions/SendSignup";

const Signup = (props) => {
  const { user, setUser, history } = props;
  const classes = SignupUseStyles();

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
    SendSignup(username, password, setState, setUser, history);
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  });

  const errorMessage = ErrorMessage(isError, error);

  return (
    <>
      <SignupFormContainer
        state={state}
        classes={classes}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Signup;
