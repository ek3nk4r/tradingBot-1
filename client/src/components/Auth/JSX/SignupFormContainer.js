import React from "react";
import { Route } from "react-router-dom";

// components
import GoogleButtonSignUp from "./GoogleButtonSignup";
import HasAnAccount from "./HasAnAccount";
import SignupForm from "./SignupForm";

const SignupFormContainer = (props) => {
  const { state, classes, handleChange, handleSubmit, errorMessage } = props;
  const { username, password } = state;

  const buttonText = () => {
    return <span>Signup</span>;
  };

  return (
    <>
      <Route
        path="/signup"
        render={() => (
          <div className="flex flex-container center col">
            <div className="box">
              <h1>Signup</h1>
              <SignupForm
                handleSubmit={handleSubmit}
                classes={classes}
                username={username}
                handleChange={handleChange}
                password={password}
                errorMessage={errorMessage}
                buttonText={buttonText}
              />
              <GoogleButtonSignUp />
              <HasAnAccount />
            </div>
          </div>
        )}
      />
    </>
  );
};

export default SignupFormContainer;
