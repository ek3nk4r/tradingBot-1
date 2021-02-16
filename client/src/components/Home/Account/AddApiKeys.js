import React, { useState, useEffect } from "react";

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

const AddApiKeys = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    key: "",
    secret: "",
    exchange: "",
    isError: false,
    error: "",
  });

  const handleChange = (event) => {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // AddApiKeys(state.password).then((data) => {
    //   console.log(data);
    //   if (data.message) {
    //     // handle errors
    //     setState({
    //       error: data.message,
    //       isError: true,
    //     });
    //   } else {
    //     // no error
    //     // lift the data up to the App state
    //     props.setUser(data);
    //     // redirect to "/"
    //     props.history.push("/");
    //   }
    // });
  };

  useEffect(() => {
    if (props.user) {
      props.history.push("/");
    }
  });

  const errorMessage = () => {
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };

  return (
    <div className="flex flex-container center col">
      <div className="box">
        <form onSubmit={handleSubmit} className={classes.root}>
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
              {/* <option value={"Kraken"}>Kraken</option> */}
            </Select>
          </FormControl>
          <TextField
            required
            id="api key"
            name="api key"
            type="text"
            label="API Key"
            variant="outlined"
            value={state.key}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="api secret"
            name="api secret"
            type="password"
            label="API Secret"
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
      </div>
    </div>
  );
};

export default AddApiKeys;