import React, { useState } from "react";

// components
import UseStyles from "../../VerticalTabs/UseStyles";
import TabPanel from "../../VerticalTabs/TabPanel";
import A11yProps from "../../VerticalTabs/A11yProps";
import AddApiKeys from "../Account/AddApiKeys";
import ChangePassword from "../Account/ChangePassword";

// material_ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

A11yProps();

const Account = (props) => {
  const { user, history } = props;
  const classes = UseStyles();
  const [value, setValue] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <div className="tabs-container">
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
        </div>
        <TabPanel value={value} index={0}></TabPanel>
        {value === 0 && <ChangePassword {...props} user={user} />}
        {value === 1 && <AddApiKeys {...props} user={user} />}
      </div>
    </>
  );
};

export default Account;
