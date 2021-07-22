import React from "react";
import { Link, Route } from "react-router-dom";
import GoogleButtonSignUp from "../GoogleButtonSignup";

// material-ui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignupForm = (props) => {
  const { state, classes, handleChange, handleSubmit, errorMessage } = props;

  return (
    <>
      <Route
        path="/signup"
        render={(props) => (
          <div className="flex flex-container center col">
            <div className="box">
              <h1>Signup</h1>
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
                  Signup
                </Button>
              </form>
              <GoogleButtonSignUp />
              <div>
                Already have account?
                <Link
                  to={"/login"}
                  style={{
                    textDecoration: "none",
                    color: "#7D237C",
                  }}
                >
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
};

export default SignupForm;
