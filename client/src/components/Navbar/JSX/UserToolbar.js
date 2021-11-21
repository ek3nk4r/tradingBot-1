import React from "react";

// components
import UserLogoTyp from "./UserLogoTyp";
import UsernameTyp from "./UsernameTyp";
import UserIdTyp from "./UserIdTyp";
import UserHamburgerMenu from "./UserHamburgerMenu";

// material-ui
import Toolbar from "@material-ui/core/Toolbar";

const UserToolbar = (props) => {
  const {
    anchorEl,
    handleClose,
    handleLogout,
    classes,
    Link,
    user,
    handleClick,
  } = props;

  return (
    <>
      <Toolbar>
        <UserLogoTyp classes={classes} Link={Link} />
        <UsernameTyp classes={classes} user={user} />
        <UserIdTyp classes={classes} user={user} />
        <div>
          <UserHamburgerMenu
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
            handleLogout={handleLogout}
            classes={classes}
            Link={Link}
          />
        </div>
      </Toolbar>
    </>
  );
};

export default UserToolbar;
