import React, { useState } from "react";
import { Route } from "react-router-dom";

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
  const { user } = props;
  console.log(props);
  const classes = UseStyles();
  const [value, setValue] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <Route
        path="/account"
        render={(props) => (
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
                <Tab label="Change Password" style={{ color: "#5b9ca0" }} />
                <Tab label="Add API Keys" style={{ color: "#5b9ca0" }} />
              </Tabs>
            </div>
            <TabPanel value={value} index={0}></TabPanel>
            {/* <TabPanel value={value} index={1}></TabPanel> */}
            {value === 0 && <ChangePassword {...props} user={user} />}
            {value === 1 && <AddApiKeys {...props} user={user} />}
          </div>
        )}
      />
    </>
  );
};

export default Account;
