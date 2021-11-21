import React, { useState } from "react";

// components
import ErrorMessage from "../../../ErrorMessage";
import UseStyles from "./Material-ui/ChangePassUseStyles";
import SendPass from "./ChangePassFunctions/SendPass";
import ChangePassForm from "./JSX/ChangePassForm";

const ChangePassword = (props) => {
  const { history } = props;
  const { _id } = props.user;
  const classes = UseStyles();

  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
    isError: false,
    error: "",
  });
  const { currentPassword, newPassword, newPasswordAgain, isError, error } =
    state;

  const errorMessage = ErrorMessage(isError, error);

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SendPass(
      _id,
      currentPassword,
      newPassword,
      newPasswordAgain,
      setState,
      history
    );
  };

  return (
    <>
      <ChangePassForm
        handleSubmit={handleSubmit}
        classes={classes}
        currentPassword={currentPassword}
        handleChange={handleChange}
        newPassword={newPassword}
        newPasswordAgain={newPasswordAgain}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default ChangePassword;
