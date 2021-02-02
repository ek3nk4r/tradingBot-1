import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

// components
import BybitVertical from "../Bybit/BybitVertical";
import TabPanel from "./TabPanel";
import UseStyles from "./UseStyles";
import Account from "./Account/Account";
// import Kraken from "../Kraken";

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
  const { setUser, user } = props;
  const classes = UseStyles();

  const [value, setValue] = useState(false);
  const [marketNames, setMarketNames] = useState([]);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const getTickers = () => {
    axios
      .get("/bybit/tickers")
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
    getTickers();
  }, []);

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
                  <Tab label="Bybit" style={{ color: "#5b9ca0" }} />
                  {/* <Tab label="Kraken" style={{ color: "#5b9ca0" }}/> */}
                </Tabs>
              </div>
              <TabPanel value={value} index={0}></TabPanel>
              {/* <TabPanel value={value} index={1}></TabPanel> */}
              {value === 0 && <BybitVertical marketNames={marketNames} />}
              {/* {value === 1 && <Kraken marketNames={marketNames}/>} */}
            </div>
          )}
        />
      </Switch>
    </>
  );
};

export default Home;
