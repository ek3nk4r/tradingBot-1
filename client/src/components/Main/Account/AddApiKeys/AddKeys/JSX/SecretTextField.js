import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const SecretTextField = (props) => {
  const { secret, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="secret"
        name="secret"
        type="password"
        label="Secret"
        variant="outlined"
        value={secret}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default SecretTextField;
