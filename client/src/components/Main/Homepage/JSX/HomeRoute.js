import React from "react";

// components
import ExchangeAccountTabs from "../JSX/ExchangeAccountTabs";
import HomeTabPanel from "../JSX/HomeTabPanel";

const HomeRoute = (props) => {
  const {
    value,
    marketNames,
    user,
    handleChange,
    classes,
    exchangeIdentifiers,
  } = props;
  return (
    <>
      <div className={classes.root}>
        <div className="tabs-container">
          <ExchangeAccountTabs
            value={value}
            handleChange={handleChange}
            classes={classes}
            exchangeIdentifiers={exchangeIdentifiers}
            {...props}
          />
        </div>
        <HomeTabPanel value={value} marketNames={marketNames} user={user} />
      </div>
    </>
  );
};

export default HomeRoute;
