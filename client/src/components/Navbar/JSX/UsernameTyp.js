import React from "react";

// material-ui
import Typography from "@material-ui/core/Typography";

const UsernameTyp = (props) => {
  const { classes, user } = props;

  return (
    <>
      <Typography
        variant="h6"
        className={classes.title}
        style={{ textDecoration: "none", color: "#5b9ca0" }}
      >
        username: {user.username}
      </Typography>
    </>
  );
};

export default UsernameTyp;
