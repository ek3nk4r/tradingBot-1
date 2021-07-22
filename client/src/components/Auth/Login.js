import React, { useState, useEffect } from "react";
import { login } from "./AuthAxios";
import { LoginUseStyles } from "./Material-ui/UseStyles";
import "../../Assets/stylesheets/form.css";

// components
import LoginForm from "./JSX/LoginForm";

const Login = (props) => {
  console.log("*** LOGIN PROPS ***", props);
  const classes = LoginUseStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
    isError: false,
    error: "",
  });

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login(state.username, state.password)
      .then((data) => {
        if (data.message) {
          // handle errors
          setState({
            username: "",
            password: "",
            error: data.message,
            isError: true,
          });
        } else {
          // no error
          // lift the data up to the App state
          props.setUser(data);
          // redirect to "/"
          props.history.push("/home");
        }
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  useEffect(() => {
    if (props.user) {
      props.history.push("/home");
    }
  });

  const errorMessage = () => {
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };

  return (
    <>
      <LoginForm
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
