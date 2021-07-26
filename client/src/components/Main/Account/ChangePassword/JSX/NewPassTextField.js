import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const NewPassTextField = (props) => {
  const { newPassword, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="newPassword"
        name="newPassword"
        type="password"
        label="New Password"
        variant="outlined"
        value={newPassword || ""}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default NewPassTextField;
