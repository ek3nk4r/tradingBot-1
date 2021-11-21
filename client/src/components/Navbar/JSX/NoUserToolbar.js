import React from "react";

// components
import NoUserLogoTyp from "./NoUserLogoTyp";
import NoUserHamburgerMenu from "./NoUserHamburgerMenu";

// material-ui
import Toolbar from "@material-ui/core/Toolbar";

const NoUserToolbar = (props) => {
  const { anchorEl, handleClose, classes, Link, handleClick } = props;

  return (
    <>
      <Toolbar>
        <NoUserLogoTyp classes={classes} Link={Link} />
        <div>
          <NoUserHamburgerMenu
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            Link={Link}
          />
        </div>
      </Toolbar>
    </>
  );
};

export default NoUserToolbar;
