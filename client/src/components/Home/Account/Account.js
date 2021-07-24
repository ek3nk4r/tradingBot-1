import React, { useState } from "react";

// components
import UseStyles from "../../VerticalTabs/UseStyles";
import A11yProps from "../../VerticalTabs/A11yProps";
import AccountTabs from "./JSX/AccountTabs";
import AccountTabPanel from "./JSX/AccountTabPanel";

A11yProps();

const Account = (props) => {
  const { user, history } = props;
  const classes = UseStyles();
  const [value, setValue] = useState(false);
  const [exchangeAccounts, setExchangeAccounts] = useState([]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
        <div className="tabs-container">
          <AccountTabs
            value={value}
            handleChange={handleChange}
            classes={classes}
            history={history}
          />
        </div>
        <AccountTabPanel
          {...props}
          value={value}
          user={user}
          exchangeAccounts={exchangeAccounts}
          setExchangeAccounts={setExchangeAccounts}
        />
      </div>
    </>
  );
};

export default Account;
