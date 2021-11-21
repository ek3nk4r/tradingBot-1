import React from "react";

// material-ui
import Button from "@material-ui/core/Button";

const AuthButton = (props) => {
  const { buttonText } = props;

  return (
    <>
      <Button
        variant="outlined"
        type="submit"
        style={{
          width: "30vw",
          height: "55px",
          marginTop: "5px",
          marginBottom: "10px",
          color: "#5b9ca0",
        }}
      >
        {buttonText()}
      </Button>
    </>
  );
};

export default AuthButton;
