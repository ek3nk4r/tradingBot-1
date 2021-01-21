import React from "react";

//  Components
import Instrument from "../Instrument";
import UseStyles from "./UseStyles";
import TabPanel from "./TabPanel";
import A11yProps from "./A11yProps";

// material-ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

A11yProps();

const BybitVertical = React.memo((props) => {
  const classes = UseStyles();

  const [state, setState] = React.useState({
    value: false,
    symbol: "",
  });

  const handleChange = (event, newValue) => {
    event.preventDefault();
    const { innerHTML } = event.target;
    if (innerHTML !== state.symbol) {
      return setState({
        value: newValue,
        symbol: innerHTML,
      });
    } else {
      return null;
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={state.value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        {props.marketNames.length
          ? props.marketNames.map((market, index) => {
              return <Tab key={index} label={market} {...A11yProps(index)} />;
            })
          : 0}
      </Tabs>
      <TabPanel value={state.value} index={state.value}>
        {" "}
        {state.symbol ? <Instrument symbol={state.symbol} /> : <></>}
      </TabPanel>
    </div>
  );
});

export default BybitVertical;
