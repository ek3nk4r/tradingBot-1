import React from "react";

// material-ui
import Button from "@material-ui/core/Button";

const UpdatePasswordButton = () => {
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
        Update Password
      </Button>
    </>
  );
};

export default UpdatePasswordButton;
