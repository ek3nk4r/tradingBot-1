import React from "react";

// material_ui
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const AccountTabs = (props) => {
  const { value, handleChange, classes, history } = props;

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
        <Tab
          onClick={() => history.push("/account/password")}
          label="Password"
          style={{ color: "#5b9ca0" }}
        />
        <Tab
          onClick={() => history.push("/account/apiKeys")}
          label="API Keys"
          style={{ color: "#5b9ca0" }}
        />
      </Tabs>
    </>
  );
};

export default AccountTabs;
