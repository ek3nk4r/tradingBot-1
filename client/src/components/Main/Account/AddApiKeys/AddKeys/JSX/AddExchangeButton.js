import React from "react";

// material-ui
import Button from "@material-ui/core/Button";

const AddExchangeButton = () => {
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
        Add Exchange Account
      </Button>
    </>
  );
};

export default AddExchangeButton;
