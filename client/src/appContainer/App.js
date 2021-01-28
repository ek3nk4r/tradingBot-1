import React from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// components
import Navbar from "../components/Navbar";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Home from "./Home";

const App = (props) => {
  console.log(props);
  const [value, setValue] = React.useState(false);
  const [marketNames, setMarketNames] = React.useState([]);
  const [user, setUser] = React.useState(props.user);

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
      {user ? (
        <>
          <Navbar updateUser={setUser} user={user} />
          <>
            <Switch>
              <Route
                path="/signup"
                render={(props) => (
                  <SignUp {...props} setUser={setUser} user={user} />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} user={user} setUser={setUser} />
                )}
              />
            </Switch>
          </>
          <Home
            {...props}
            setUser={setUser}
            user={user}
            value={value}
            onChange={handleChange}
            marketNames={marketNames}
          />
        </>
      ) : (
        <>
          <Navbar />
          <>
            <Switch>
              <Route
                path="/signup"
                render={(props) => (
                  <SignUp {...props} setUser={setUser} user={user} />
                )}
              />
              <Route
                path="/login"
                render={(props) => (
                  <Login {...props} user={user} setUser={setUser} />
                )}
              />
            </Switch>
          </>
        </>
      )}
    </div>
  );
};

export default App;
