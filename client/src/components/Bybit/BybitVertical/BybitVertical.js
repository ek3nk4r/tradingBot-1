import React, { useState, memo } from "react";

//  Components
import UseStyles from "../../VerticalTabs/UseStyles";
import TabPanel from "../../VerticalTabs/TabPanel";
import A11yProps from "../../VerticalTabs/A11yProps";
import BybitMarketTabs from "./JSX/BybitMarketTabs";
import BybitTabPanel from "./JSX/BybitTabPanel";

// material-ui
import PropTypes from "prop-types";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

A11yProps();

const BybitVertical = memo((props) => {
  const classes = UseStyles();
  const { marketNames, user } = props;

  const [state, setState] = useState({
    value: false,
    symbol: "",
  });
  const { symbol, value } = state;

  const handleChange = (event, newValue) => {
    event.preventDefault();
    const { innerHTML } = event.target;
    if (innerHTML !== symbol) {
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
