import React from "react";
import { Route, Link } from "react-router-dom";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// components
import GoogleButtonSignUp from "../GoogleButtonSignup";

const LoginForm = (props) => {
  const { state, classes, handleChange, errorMessage, handleSubmit } = props;

  return (
    <>
      <Route
        path="/login"
        render={(props) => (
          <div className="flex flex-container center col">
            <div className="box">
              <h1>Login</h1>
              <form onSubmit={handleSubmit} className={classes.root}>
                <TextField
                  required
                  id="username"
                  name="username"
                  type="email"
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
                  style={{
                    width: "30vw",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
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
                  Login
                </Button>
              </form>
              <GoogleButtonSignUp />
              <div>
                <div>
                  Don't have account?
                  <Link
                    to={"/signup"}
                    style={{
                      textDecoration: "none",
                      color: "#7D237C",
                    }}
                  >
                    {" "}
                    Signup
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default LoginForm;
