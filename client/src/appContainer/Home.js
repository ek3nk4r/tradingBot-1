import React from "react";
import { Switch, Route } from "react-router-dom";

// components
import BybitVertical from "../components/Bybit/BybitVertical/BybitVertical";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import TabPanel from "./TabPanel";
import UseStyles from "./UseStyles";
// import Kraken from "./components/Kraken";

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
  console.log(props);

  const { setUser, user, value, handleChange, marketNames } = props;
  const classes = UseStyles();
  return (
    <Switch>
      <Route
        path="/signup"
        render={(props) => <SignUp {...props} setUser={setUser} user={user} />}
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
  );
};

export default Home;
