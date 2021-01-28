import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "./AuthAxios";
import "../../Assets/stylesheets/form.css";

const Login = (props) => {
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
    console.log("ERROR", state.error, state.isError);
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
      <div className="box" id="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="flex center col">
          <input
            placeholder="Email"
            className="center"
            type="text"
            id="username"
            name="username"
            value={state.username}
            onChange={handleChange}
          />
          <input
            placeholder="Password"
            id="password"
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />

          {/* show error message */}
          {errorMessage()}

          <input type="submit" value="Login" />
        </form>
        <p>
          Don't have account?
          <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
