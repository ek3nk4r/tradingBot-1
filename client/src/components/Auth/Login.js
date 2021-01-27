import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { login } from "./AuthAxios";
import "../../Assets/stylesheets/form.css";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    isError: false,
    error: "",
  });

  const handleChange = (event) => {
    setState(
      {
        [event.target.name]: event.target.value,
      },
      () => console.log(state)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    login(state.email, state.password).then((data) => {
      console.log(props);
      if (data.message) {
        // handle errors
        setState({
          error: data.message,
          isError: true,
        });
      } else {
        console.log(props);
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
    console.log(state.error);
    if (state.isError) {
      return <span id="warning">{state.error}</span>;
    }
  };

  return (
    <div className="flex flex-container center col">
      <div className="box" id="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="flex center col">
          {/* <label>email:</label> */}
          <input
            placeholder="Email"
            className="center"
            type="text"
            name="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
          />
          {/* <label>Password:</label> */}
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => handleChange(e)}
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
