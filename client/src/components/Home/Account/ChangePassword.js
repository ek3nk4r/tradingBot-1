import React, { useState, useEffect } from "react";
import { sendPass } from "./NewPassAxios";
import { logout } from "../../Auth/AuthAxios";

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
  margin: {
    margin: theme.spacing(0),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

const ChangePassword = (props) => {
  console.log(props.user);
  const { _id } = props.user;
  const classes = useStyles();

  const [state, setState] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
    isError: false,
    error: "",
    showPassword: false,
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
    console.log("CLIENT: CHANGE PASSWORD", newPasswordAgain, newPassword);
    event.preventDefault();

    if (newPasswordAgain === newPassword) {
      sendPass(_id, currentPassword, newPassword).then((data) => {
        console.log("CLIENT RESPONSE", data);
        if (data.message) {
          // handle errors
          setState({
            error: data.message,
            isError: true,
          });
        } else {
          // no error
          // logs the user out so that they login with the new password
          // logout();
          // props.history.push("/login")
        }
      });
    }
  };

  // useEffect(() => {
  //   if (props.user) {
  //     props.history.push("/");
  //   }
  // });

  return (
    <div className="flex flex-container center col">
      <div className="box">
        <form
          // className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          onSubmit={handleSubmit}
          className={classes.root}
        >
          {/* <InputLabel htmlFor="outlined-adornment-password">
            Password *
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={state.showPassword ? "text" : "password"}
            value={state.password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          /> */}
          <TextField
            required
            id="password"
            name="currentPassword"
            type="text"
            label="Current Password"
            variant="outlined"
            value={state.currentPassword}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="password"
            name="newPassword"
            type="text"
            label="New Password"
            variant="outlined"
            value={state.newPassword}
            onChange={handleChange}
            style={{ width: "30vw", marginTop: "5px", marginBottom: "5px" }}
          />
          <TextField
            required
            id="password"
            name="newPasswordAgain"
            type="text"
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
      </div>
    </div>
  );
};

export default ChangePassword;
