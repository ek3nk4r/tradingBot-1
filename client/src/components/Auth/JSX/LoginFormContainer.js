import React from "react";
import { Route } from "react-router-dom";

// components
import GoogleButtonSignUp from "./GoogleButtonSignup";
import NoAccount from "./NoAccount";
import LoginForm from "./LoginForm";

const LoginFormContainer = (props) => {
  const { state, classes, handleChange, errorMessage, handleSubmit } = props;
  const { username, password } = state;

  const buttonText = () => {
    return <span>Login</span>;
  };

  return (
    <>
      <Route
        path="/login"
        render={() => (
          <div className="flex flex-container center col">
            <div className="box">
              <h1>Login</h1>
              <LoginForm
                handleSubmit={handleSubmit}
                classes={classes}
                username={username}
                handleChange={handleChange}
                password={password}
                errorMessage={errorMessage}
                buttonText={buttonText}
              />
              <GoogleButtonSignUp />
              <NoAccount />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default LoginFormContainer;
