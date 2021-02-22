import React from "react";

//  Components
import Instrument from "./Instrument";
import UseStyles from "../VerticalTabs/UseStyles";
import TabPanel from "../VerticalTabs/TabPanel";
import A11yProps from "../VerticalTabs/A11yProps";

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
  const { marketNames } = props;
  console.log(marketNames);

  const [state, setState] = React.useState({
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
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs"
        className={classes.tabs}
      >
        {marketNames.length
          ? marketNames.map((market, index) => {
              return (
                <Tab
                  key={index}
                  label={market}
                  {...A11yProps(index)}
                  style={{ color: "#5b9ca0" }}
                />
              );
            })
          : 0}
      </Tabs>
      <TabPanel value={value} index={value}>
        {" "}
        {symbol ? <Instrument symbol={symbol} /> : <></>}
      </TabPanel>
    </div>
  );
});

export default BybitVertical;
