import React from "react";
import { Link } from "react-router-dom";

// components
import UserToolbar from "./UserToolbar";

// material-ui
import AppBar from "@material-ui/core/AppBar";

const User = (props) => {
  const { classes, user, handleClick, handleClose, handleLogout, anchorEl } =
    props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <UserToolbar
          classes={classes}
          Link={Link}
          user={user}
          handleClick={handleClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
        />
      </AppBar>
    </div>
  );
};

export default User;
