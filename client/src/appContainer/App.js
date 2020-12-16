import React from "react";

// components
import BybitVertical from "../components/Bybit/BybitVertical";
// import Kraken from "./components/Kraken";
import TabPanel from "./AppTabPanel";
import UseStyles from "./AppUseStyles";

// material_ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const App = (props) => {
  const classes = UseStyles();
  const [value, setValue] = React.useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        <Tab label="Bybit" />
        {/* <Tab label="Kraken" /> */}
      </Tabs>
      <TabPanel value={value} index={0}></TabPanel>
      {/* <TabPanel value={value} index={1}></TabPanel> */}
      {value === 0 && <BybitVertical />}
      {/* {value === 1 && <Kraken />} */}
    </div>
  );
};

export default App;
