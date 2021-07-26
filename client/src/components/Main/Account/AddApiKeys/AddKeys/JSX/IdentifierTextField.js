import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const IdentifierTextField = (props) => {
  const { identifier, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="identifier"
        name="identifier"
        type="text"
        label="Account Identifier"
        variant="outlined"
        value={identifier}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default IdentifierTextField;
