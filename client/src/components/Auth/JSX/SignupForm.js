import React from "react";

// components
import UsernameTextField from "./UsernameTextfield";
import PasswordTextfield from "./PasswordTextfield";
import AuthButton from "./AuthButton";

const SignupForm = (props) => {
  const {
    handleSubmit,
    username,
    classes,
    handleChange,
    password,
    errorMessage,
    buttonText,
  } = props;

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <UsernameTextField username={username} handleChange={handleChange} />
        <PasswordTextfield password={password} handleChange={handleChange} />

        {/* show error message */}
        {errorMessage}

        <AuthButton buttonText={buttonText} />
      </form>
    </>
  );
};

export default SignupForm;
