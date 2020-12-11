import React from "react";

// material-ui
import { makeStyles } from "@material-ui/core/styles";

const AppUseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default AppUseStyles;
