import React, { useState } from "react";
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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = (props) => {
  const classes = UseStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, updateUser } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    updateUser(null);
  };

  let loggedinUser;
  user
    ? (loggedinUser = (
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
                <div>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ color: "#5b9ca0" }}
                  >
                    <MenuIcon />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      color="inherit"
                      component={NavLink}
                      to="/account"
                      style={{ color: "#5b9ca0" }}
                    >
                      Account
                    </MenuItem>
                    <MenuItem
                      onClick={(handleClose, handleLogout)}
                      color="inherit"
                      className={classes.logout}
                      component={NavLink}
                      to="/login"
                      style={{ color: "#5b9ca0" }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
                {/* <Button
                  color="inherit"
                  className={classes.logout}
                  onClick={handleLogout}
                  component={NavLink}
                  to="/login"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  Logout
                </Button> */}
              </Toolbar>
            </AppBar>
          </div>
        </>
      ))
    : (loggedinUser = (
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
                <div>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{ color: "#5b9ca0" }}
                  >
                    <MenuIcon />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={handleClose}
                      color="inherit"
                      component={NavLink}
                      to="/login"
                      style={{ color: "#5b9ca0" }}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      onClick={handleClose}
                      color="inherit"
                      component={NavLink}
                      to="/signup"
                      style={{ color: "#5b9ca0" }}
                    >
                      Signup
                    </MenuItem>
                  </Menu>
                </div>
                {/* <Button
                  color="inherit"
                  component={NavLink}
                  to="/login"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  Login
                </Button>
                <Typography>or</Typography>
                <Button
                  color="inherit"
                  component={NavLink}
                  to="/signup"
                  style={{ textDecoration: "none", color: "#5b9ca0" }}
                >
                  Signup
                </Button> */}
              </Toolbar>
            </AppBar>
          </div>
        </>
      ));

  return <div>{loggedinUser}</div>;
};

export default Navbar;
