import React from "react";

// material-ui
import Typography from "@material-ui/core/Typography";

const NoUserLogoTyp = (props) => {
  const { classes, Link } = props;

  return (
    <>
      <Typography
        variant="h6"
        className={classes.title}
        component={Link}
        to="/login"
        style={{ textDecoration: "none", color: "#5b9ca0" }}
      >
        pineTrader
      </Typography>
    </>
  );
};

export default NoUserLogoTyp;
