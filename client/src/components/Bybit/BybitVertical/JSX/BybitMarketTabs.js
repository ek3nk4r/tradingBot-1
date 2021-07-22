import React from "react";

//  Components
import A11yProps from "../../../VerticalTabs/A11yProps";

// material-ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const BybitMarketTabs = (props) => {
  const { handleChange, marketNames, value, classes } = props;

  return (
    <>
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
    </>
  );
};

export default BybitMarketTabs;
