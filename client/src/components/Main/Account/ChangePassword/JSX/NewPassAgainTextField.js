import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const NewPassAgainTextField = (props) => {
  const { newPasswordAgain, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="newPasswordRepeat"
        name="newPasswordAgain"
        type="password"
        label="Re-Type New Password"
        variant="outlined"
        value={newPasswordAgain || ""}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default NewPassAgainTextField;
