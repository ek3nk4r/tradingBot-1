import React from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../Auth/AuthAxios";

// components
import UseStyles from "./UseStyles";

// material-ui
// import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Navbar = (props) => {
  const classes = UseStyles();
  const { user, updateUser } = props;

  const handleLogout = () => {
    logout();
    updateUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <div className={classes.root}>
            <AppBar position="static" color="transparent">
              <Toolbar>
                <Typography
                  variant="h6"
                  className={classes.title}
                  component={NavLink}
                  to="/"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  pineTrader
                </Typography>
                <Button
                  color="inherit"
                  className={classes.logout}
                  onClick={handleLogout}
                  component={NavLink}
                  to="/login"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </>
      ) : (
        <>
          <div className={classes.root}>
            <AppBar position="static" color="transparent">
              <Toolbar>
                <Typography
                  variant="h6"
                  className={classes.title}
                  component={NavLink}
                  to="/login"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  pineTrader
                </Typography>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/signup"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  Signup
                </Button>
              </Toolbar>
            </AppBar>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
