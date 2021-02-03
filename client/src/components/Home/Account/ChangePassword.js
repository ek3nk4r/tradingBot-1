import React, { useState, useEffect } from "react";

// material-ui
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "25ch",
      justifyContent: "center",
    },
  },
}));

const ChangePassword = (props) => {
  const classes = useStyles();

  const [state, setState] = useState({
    password: "",
    isError: false,
    error: "",
  });

  const errorMessage = () => {
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };

  const handleChange = (event) => {
    event.persist();

    let re = /^(([^<>()[\].,;:s@"]+(\.[^<>()[\].,;:s@"]+)*)|(".+"))@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

    if (re.test(event.target.value)) {
      setState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      errorMessage();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // changePassword(state.password).then((data) => {
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

  return (
    <div className="flex flex-container center col">
      <div className="box">
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Current Password"
            variant="outlined"
            value={state.password}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="New Password"
            variant="outlined"
            value={state.password}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Please Re-Type Your New Password"
            variant="outlined"
            value={state.password}
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
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
