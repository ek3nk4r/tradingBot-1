import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signup } from "./AuthAxios";
// import GoogleButtonSignUp from "../GoogleButtonSignup";
import "../../Assets/stylesheets/form.css";

const Signup = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
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
    event.preventDefault(event);

    signup(state.email, state.password).then((data) => {
      if (data.message) {
        // handle errors
        setState({
          error: data.message,
        });
      } else {
        console.log("no error", data);
        // no error
        // lift the data up to the App state
        props.setUser(data);
        // redirect to "/projects"
        props.history.push("/");
      }
    });
  };

  useEffect(() => {
    if (props.user) {
      props.history.push("/");
    }
  });

  return (
    <div className="flex flex-container center col">
      <div className="box" id="signup">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={state.email}
            onChange={(e) => handleChange(e)}
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            value={state.password}
            onChange={(e) => handleChange(e)}
          />

          <input type="submit" value="Signup" />
        </form>
        {/* <GoogleButtonSignUp /> */}
        <p>
          Already have account?
          <Link to={"/"}> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
