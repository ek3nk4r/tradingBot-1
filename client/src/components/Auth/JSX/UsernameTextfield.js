import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const UsernameTextfield = (props) => {
  const { username, handleChange } = props;
  return (
    <>
      <TextField
        required
        id="username"
        name="username"
        type="email"
        label="Email"
        variant="outlined"
        value={username}
        onChange={handleChange}
        style={{ width: "30vw", marginBottom: "5px" }}
      />
    </>
  );
};

export default UsernameTextfield;
