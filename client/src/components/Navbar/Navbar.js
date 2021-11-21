import React, { useState } from "react";
import { logout } from "../Auth/AuthAxios";

// components
import UseStyles from "./Material-ui/UseStyles";
import ConditionalNavbar from "./JSX/ConditionalNavbar";

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
    setAnchorEl(null);
  };

  return (
    <div>
      <ConditionalNavbar
        classes={classes}
        user={user}
        handleClick={handleClick}
        handleClose={handleClose}
        handleLogout={handleLogout}
        anchorEl={anchorEl}
      />
    </div>
  );
};

export default Navbar;
