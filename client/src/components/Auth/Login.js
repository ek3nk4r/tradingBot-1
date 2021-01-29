import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "./AuthAxios";
import GoogleButtonSignUp from "./GoogleButtonSignup";
import "../../Assets/stylesheets/form.css";

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

const Login = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    username: "",
    password: "",
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

    login(state.username, state.password).then((data) => {
      console.log(data);
      if (data.message) {
        // handle errors
        setState({
          error: data.message,
          isError: true,
        });
      } else {
        // no error
        // lift the data up to the App state
        props.setUser(data);
        // redirect to "/"
        props.history.push("/");
      }
    });
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
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className={classes.root}>
          <TextField
            required
            id="username"
            name="username"
            type="text"
            label="Email"
            variant="outlined"
            value={state.username}
            onChange={handleChange}
            style={{ width: "30vw", marginBottom: "5px" }}
          />
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Password"
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
            }}
          >
            Login
          </Button>
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
        <GoogleButtonSignUp />
      </div>
    </div>
  );
};

export default Login;
