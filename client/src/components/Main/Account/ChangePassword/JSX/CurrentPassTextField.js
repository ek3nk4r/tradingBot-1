import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const CurrentPassTextField = (props) => {
  const { currentPassword, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="currentPassword"
        name="currentPassword"
        type="password"
        label="Current Password"
        variant="outlined"
        value={currentPassword || ""}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default CurrentPassTextField;
