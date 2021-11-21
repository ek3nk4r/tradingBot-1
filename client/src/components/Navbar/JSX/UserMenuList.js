import React from "react";

// material-ui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const UserMenuList = (props) => {
  const { anchorEl, handleClose, handleLogout, classes, Link } = props;

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
          to="/account"
          style={{ color: "#5b9ca0" }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={(handleClose, handleLogout)}
          color="inherit"
          className={classes.logout}
          component={Link}
          to="/login"
          style={{ color: "#5b9ca0" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenuList;
