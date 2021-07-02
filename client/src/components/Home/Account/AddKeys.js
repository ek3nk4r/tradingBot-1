import React, { useState } from "react";
import { sendKeys } from "./ApiKeyAxios";

// material-ui
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "25ch",
      justifyContent: "center",
    },
  },
}));

const AddKeys = (props) => {
  const { _id } = props.user;
  const classes = useStyles();

  const [state, setState] = useState({
    key: "",
    secret: "",
    exchange: "",
    net: "",
    identifier: "",
    isError: false,
    error: "",
  });

  const { key, secret, exchange, identifier, net } = state;

  const errorMessage = () => {
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (key && secret && exchange && identifier && net) {
      sendKeys(_id, exchange, identifier, key, secret, net)
        .then((res) => {
          if (res.status === 401) {
            // handle errors
            setState({
              exchange: "",
              identifier: "",
              net: "",
              key: "",
              secret: "",
              error: res.message,
              isError: true,
            });
          } else if (res.status === 200) {
            setState({
              exchange: "",
              identifier: "",
              net: "",
              key: "",
              secret: "",
              error: res.data.msg,
              isError: true,
              newExchangeAccount: true,
            });
          }
        })
        .catch((err) => {
          console.log("Error is: ", err);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <TextField
          required
          id="identifier"
          name="identifier"
          type="text"
          label="Account Identifier"
          variant="outlined"
          value={state.identifier}
          onChange={handleChange}
          style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Exchange *
          </InputLabel>
          <Select
            native
            value={state.exchange}
            onChange={handleChange}
            label="Exchange"
            inputProps={{
              name: "exchange",
              id: "outlined-age-native-simple",
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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Net *</InputLabel>
          <Select
            native
            value={state.net}
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
        <TextField
          required
          id="key"
          name="key"
          type="text"
          label="API Key"
          variant="outlined"
          value={state.key}
          onChange={handleChange}
          style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
        />
        <TextField
          required
          id="secret"
          name="secret"
          type="password"
          label="Secret"
          variant="outlined"
          value={state.secret}
          onChange={handleChange}
          style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
        />

        {/* show error message */}
        {errorMessage()}

        <Button
          variant="outlined"
          type="submit"
          style={{
            width: "30vw",
            height: "55px",
            marginTop: "5px",
            marginBottom: "10px",
            color: "#5b9ca0",
          }}
        >
          Add Exchange Account
        </Button>
      </form>
    </>
  );
};

export default AddKeys;
