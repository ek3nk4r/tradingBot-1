import React from "react";

// material-ui
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const NetFormControl = (props) => {
  const { net, handleChange, classes } = props;

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="outlined-age-native-simple">Net *</InputLabel>
        <Select
          native
          value={net}
          onChange={handleChange}
          label="Net"
          inputProps={{
            name: "net",
            id: "outlined-age-native-simple",
          }}
          style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
        >
          <option aria-label="None" value="" />
          <option value={"Api"}>Api</option>
          <option value={"Test"}>Test</option>
        </Select>
      </FormControl>
    </>
  );
};

export default NetFormControl;
