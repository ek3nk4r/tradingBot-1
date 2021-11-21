import React from "react";
import { Link } from "react-router-dom";

// material-ui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const NoUserMenuList = (props) => {
  const { anchorEl, handleClose } = props;

  return (
    <>
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
          component={Link}
          to="/login"
          style={{ color: "#5b9ca0" }}
        >
          Login
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          color="inherit"
          component={Link}
          to="/signup"
          style={{ color: "#5b9ca0" }}
        >
          Signup
        </MenuItem>
      </Menu>
    </>
  );
};

export default NoUserMenuList;
