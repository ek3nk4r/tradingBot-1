import React, { useState } from "react";
import { getKeys, sendKeys } from "./ApiKeyAxios";
import ApiKeyList from "./ApiKeyList";

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
    identifier: "",
    isError: false,
    error: "",
  });

  const { key, secret, exchange, identifier } = state;

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

    if (key && secret && exchange && identifier) {
      sendKeys(_id, exchange, identifier, key, secret)
        .then((res) => {
          if (res.status === 401) {
            // handle errors
            setState({
              exchange: "",
              identifier: "",
              key: "",
              secret: "",
              error: res.message,
              isError: true,
            });
          } else if (res.status === 200) {
            // setState({
            //   exchange: "",
            //   identifier: "",
            //   key: "",
            //   secret: "",
            //   error: res.data.msg,
            //   isError: true,
            // });

            getKeys()
              .then((response) => {
                console.log("XXXXXXXXXXXXXXX", response);
              })
              .catch((err) => {
                console.log("Error is: ", err);
              });
          }
        })
        .catch((err) => {
          console.log("Error is: ", err);
        });
    }
  };

  return (
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
        <InputLabel htmlFor="outlined-age-native-simple">Exchange *</InputLabel>
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
          {/* <option value={"Kraken"}>Kraken</option> */}
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
      <ApiKeyList></ApiKeyList>
    </form>
  );
};

export default AddKeys;
