import React from "react";

// material-ui
import TextField from "@material-ui/core/TextField";

const KeyTextField = (props) => {
  const { apiKey, handleChange } = props;

  return (
    <>
      <TextField
        required
        id="apiKey"
        name="apiKey"
        type="text"
        label="API Key"
        variant="outlined"
        value={apiKey || ""}
        onChange={handleChange}
        style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
      />
    </>
  );
};

export default KeyTextField;
