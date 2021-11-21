import React from "react";

// components
import HamburgerMenuIcon from "./HamburgerMenuIcon";
import NoUserMenuList from "./NoUserMenuList";

const NoUserHamburgerMenu = (props) => {
  const { handleClick, anchorEl, handleClose, Link } = props;

  return (
    <>
      <HamburgerMenuIcon handleClick={handleClick} />
      <NoUserMenuList
        anchorEl={anchorEl}
        handleClose={handleClose}
        Link={Link}
      />
    </>
  );
};

export default NoUserHamburgerMenu;
