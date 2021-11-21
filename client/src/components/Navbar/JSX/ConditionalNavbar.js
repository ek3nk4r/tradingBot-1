import React from "react";

// components
import User from "./User";
import NoUser from "./NoUser";

const ConditionalNavbar = (props) => {
  const { classes, user, handleClick, handleClose, handleLogout, anchorEl } =
    props;

  return (
    <>
      {user ? (
        <>
          <User
            classes={classes}
            user={user}
            handleClick={handleClick}
            handleClose={handleClose}
            handleLogout={handleLogout}
            anchorEl={anchorEl}
          />
        </>
      ) : (
        <>
          <NoUser
            classes={classes}
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
          />
        </>
      )}
    </>
  );
};

export default ConditionalNavbar;
