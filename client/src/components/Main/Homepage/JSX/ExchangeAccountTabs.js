import React from "react";

// material_ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const ExchangeAccountTabs = (props) => {
  const { value, handleChange, classes, exchangeIdentifiers } = props;

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
        {exchangeIdentifiers.map((identifier, i) => {
          return (
            <Tab
              key={i}
              onClick={() => props.history.push(`/home/${identifier}`)}
              label={`${identifier}`}
              style={{ color: "#5b9ca0" }}
            />
          );
        })}
      </Tabs>
    </>
  );
};

export default ExchangeAccountTabs;
