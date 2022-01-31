import React from "react";

// material-ui
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const ExchangeFormControl = (props) => {
  const { exchange, handleChange, classes } = props;

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="exchange-input">Exchange *</InputLabel>
        <Select
          native
          value={exchange}
          onChange={handleChange}
          label="Exchange"
          inputProps={{
            name: "exchange",
            id: "exchange-input",
          }}
          style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
        >
          <option aria-label="None" value="" />
          <option value={"Bybit"}>Bybit</option>
          {/* <option value={"Bitmex"}>Bitmex</option>
            <option value={"Phemex"}>Phemex</option> */}
          {/* <option value={"Kraken"}>Kraken</option> */}
        </Select>
      </FormControl>
    </>
  );
};

export default ExchangeFormControl;
