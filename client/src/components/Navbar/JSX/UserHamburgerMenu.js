import React from "react";

// components
import HamburgerMenuIcon from "./HamburgerMenuIcon";
import UserMenuList from "./UserMenuList";

const HamburgerMenu = (props) => {
  const { handleClick, anchorEl, handleClose, handleLogout, classes, Link } =
    props;

  return (
    <>
      <HamburgerMenuIcon handleClick={handleClick} />
      <UserMenuList
        anchorEl={anchorEl}
        handleClose={handleClose}
        handleLogout={handleLogout}
        classes={classes}
        Link={Link}
      />
    </>
  );
};

export default HamburgerMenu;
