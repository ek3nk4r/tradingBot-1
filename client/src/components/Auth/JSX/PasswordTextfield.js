import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const PasswordTextfield = (props) => {
  const { password, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="password"
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={handleChange}
        style={{
          width: "30vw",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      />
    </>
  );
};

export default PasswordTextfield;
