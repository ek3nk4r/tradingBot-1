import React, { useState } from "react";
import { sendPass } from "./NewPassAxios";

// material-ui
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      justifyContent: "center",
    },
  },
}));

const ChangePassword = (props) => {
  const { _id } = props.user;
  const classes = useStyles();

  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
    isError: false,
    error: "",
  });

  const { currentPassword, newPassword, newPasswordAgain } = state;

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

    if (newPasswordAgain === newPassword) {
      sendPass(_id, currentPassword, newPassword)
        .then((res) => {
          if (res.status === 401) {
            // handle errors
            setState({
              error: res.message,
              isError: true,
            });
          } else if (res.status === 200) {
            props.history.push("/home");
          }
        })
        .catch((err) => {
          console.log("Error is: ", err);
        });
    }
  };

  return (
    <div className="flex flex-container center col">
      <div className="box">
        <form
          variant="outlined"
          onSubmit={handleSubmit}
          className={classes.root}
        >
          <TextField
            required
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Password"
            variant="outlined"
            value={state.currentPassword}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="newPassword"
            name="newPassword"
            type="password"
            label="New Password"
            variant="outlined"
            value={state.newPassword}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="newPasswordRepeat"
            name="newPasswordAgain"
            type="password"
            label="Re-Type New Password"
            variant="outlined"
            value={state.newPasswordAgain}
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
        <div>You will be redirected on a successful password update.</div>
      </div>
    </div>
  );
};

export default ChangePassword;
