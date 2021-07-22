import React, { useState, useEffect } from "react";
import { signup } from "./AuthAxios";
import { SignupUseStyles } from "./Material-ui/UseStyles";
import "../../Assets/stylesheets/form.css";

//  components
import SignupForm from "./JSX/SignupForm";

const Signup = (props) => {
  const classes = SignupUseStyles();
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

    signup(state.username, state.password)
      .then((data) => {
        if (data.message) {
          // handle errors
          setState({
            error: data.message,
            isError: true,
          });
        } else {
          console.log("no error", data);
          // no error
          // lift the data up to the App state
          props.setUser(data);

          props.history.push("/");
        }
      })
      .catch((err) => {
        return err.response.data;
      });
  };

  useEffect(() => {
    if (props.user) {
      props.history.push("/");
    }
  });

  const errorMessage = () => {
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };
  return (
    <>
      <SignupForm
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
