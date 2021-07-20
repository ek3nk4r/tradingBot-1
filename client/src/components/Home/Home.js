import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// components
import BybitVertical from "../Bybit/BybitVertical";
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
  const { setUser, user, exchangeNames } = props;
  const exchangeIdentifiers = props.exchangeIdentifiers.sort((a, b) =>
    a.localeCompare(b)
  );
  const userId = user._id;
  const classes = UseStyles();

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

  const getTickers = (exchangeName, identifier, userId) => {
    axios
      .get(`/exchangeRoutes/tickers/${exchangeName}/${identifier}/${userId}`)
      .then((res) => {
        const markets = res.data[1];
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
        console.log("Error is: ", err);
      });
  };

  useEffect(() => {
    if (identifier) {
      getTickers(exchangeName, identifier, userId);
    }
  }, [identifier]);

  let exchangeIndex;

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
                    exchangeIndex = i;
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
              <TabPanel value={value} index={exchangeIndex}></TabPanel>
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
