import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

// components
import UseStyles from "./Material-ui/UseStyles";
import Account from "../Account/Account";
import GetTickers from "./HomeFunctions/GetTickers";
import HomeRoute from "./JSX/HomeRoute";

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
    GetTickers(exchangeName, identifier, userId, setMarketNames);
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
            <>
              <HomeRoute
                value={value}
                handleChange={handleChange}
                classes={classes}
                exchangeIdentifiers={exchangeIdentifiers}
                marketNames={marketNames}
                user={user}
                {...props}
              />
            </>
          )}
        />
      </Switch>
    </>
  );
};

export default Home;
