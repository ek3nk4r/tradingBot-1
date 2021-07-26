import React from "react";

// material-ui
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";

const HamburgerMenuIcon = (props) => {
  const { handleClick } = props;

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "#5b9ca0" }}
      >
        <MenuIcon />
      </Button>
    </>
  );
};

export default HamburgerMenuIcon;
