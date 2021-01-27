import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// components
import BybitVertical from "../components/Bybit/BybitVertical/BybitVertical";
// import Kraken from "./components/Kraken";
import Navbar from "../components/Navbar";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import TabPanel from "./TabPanel";
import UseStyles from "./UseStyles";

// material_ui
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const App = (props) => {
  console.log(props);
  const classes = UseStyles();
  const [value, setValue] = React.useState(false);
  const [marketNames, setMarketNames] = React.useState([]);
  const [user, setUser] = React.useState(props.loggedInUser);

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

  React.useEffect(() => {
    getTickers();
  }, []);

  return (
    <div>
      <Navbar updateUser={setUser} user={user} />
      <Switch>
        <Route
          path="/auth"
          render={(props) => (
            <SignUp {...props} setUser={setUser} user={user} />
          )}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} user={user} setUser={setUser} />}
        />
        <Route
          path="/"
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
                  <Tab label="Bybit" />
                  {/* <Tab label="Kraken" /> */}
                </Tabs>
              </div>
              <TabPanel value={value} index={0}></TabPanel>
              {/* <TabPanel value={value} index={1}></TabPanel> */}
              {value === 0 && <BybitVertical marketNames={marketNames} />}
              {/* {value === 1 && <Kraken />} */}
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
