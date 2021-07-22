import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { getTickers } from "../../components/ExchangeRouteAxios";

// components
import BybitVertical from "../Bybit/BybitVertical/BybitVertical";
import TabPanel from "./TabPanel";
import UseStyles from "./UseStyles";
import Account from "./Account/Account";

// material_ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Home = (props) => {
  const classes = UseStyles();
  const { setUser, user, exchangeIdentifiers, exchangeNames } = props;
  const userId = user._id;

  const [value, setValue] = useState(false);
  const [marketNames, setMarketNames] = useState([]);
  const [identifier, setIdentifier] = useState("");
  const [exchangeName, setExchangeName] = useState("");

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setIdentifier(event.target.innerHTML);
    setExchangeName(exchangeNames[newValue]);
    setValue(newValue);
  };

  useEffect(() => {
    if (identifier) {
      getTickers(exchangeName, identifier, userId)
        .then((res) => {
          const markets = res[1];
          const marketNames = Object.keys(markets)
            .map((key) => {
              return markets[key];
            })
            .map((market) => {
              return market.symbol;
            });

          setMarketNames(marketNames);
        })
        .catch((err) => {
          console.log("***ERROR***", err);
          return err.res.data;
        });
    }
  }, [identifier]);

  return (
    <>
      <Switch>
        <Route
          path="/account"
          render={(props) => (
            <Account {...props} setUser={setUser} user={user} />
          )}
        />
        <Route
          path="/home"
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
                  {exchangeIdentifiers.map((identifier, i) => {
                    return (
                      <Tab
                        key={i}
                        onClick={() =>
                          props.history.push(`/home/${identifier}`)
                        }
                        label={`${identifier}`}
                        style={{ color: "#5b9ca0" }}
                      />
                    );
                  })}
                </Tabs>
              </div>
              <TabPanel value={value} index={value}></TabPanel>
              {value === value && (
                <BybitVertical marketNames={marketNames} user={user} />
              )}
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default Home;
