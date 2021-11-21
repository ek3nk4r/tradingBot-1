import React from "react";
import { Link } from "react-router-dom";

// components
import NoUserToolbar from "./NoUserToolbar";

// material-ui
import AppBar from "@material-ui/core/AppBar";

const NoUser = (props) => {
  const { classes, handleClick, handleClose, anchorEl } = props;

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
          <NoUserToolbar
            classes={classes}
            Link={Link}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </AppBar>
      </div>
    </>
  );
};

export default NoUser;
