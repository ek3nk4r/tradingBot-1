import React from "react";

// material-ui
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TabPanel = React.memo((props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
});

export default TabPanel;
