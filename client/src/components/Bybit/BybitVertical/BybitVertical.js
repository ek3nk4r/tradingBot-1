import React, { useState, memo } from "react";

//  Components
import UseStyles from "./Material-ui/UseStyles";
import TabPanel from "./Material-ui/TabPanel";
import A11yProps from "./Material-ui/A11yProps";
import BybitMarketTabs from "./JSX/BybitMarketTabs";
import BybitTabPanel from "./JSX/BybitTabPanel";
import SetSymbol from "./SetSymbol";

// material-ui
import PropTypes from "prop-types";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

A11yProps();

const BybitVertical = memo((props) => {
  const { marketNames, user } = props;
  const classes = UseStyles();

  const [state, setState] = useState({
    value: false,
    symbol: "",
  });
  const { symbol, value } = state;

  const handleChange = (event, newValue) => {
    event.preventDefault();
    const { innerHTML } = event.target;
    SetSymbol(newValue, symbol, innerHTML, setState);
  };

  return (
    <div className={classes.root}>
      <BybitMarketTabs
        marketNames={marketNames}
        handleChange={handleChange}
        value={value}
        classes={classes}
      />
      <BybitTabPanel value={value} symbol={symbol} user={user} />
    </div>
  );
});

export default BybitVertical;
