import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { getExchanges } from "../components/ExchangeRouteAxios";

// components
import Navbar from "../components/Navbar/Navbar";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Home from "../components/Home/Home";
import Confirm from "../components/Auth/Confirm";

const App = (props) => {
  const [user, setUser] = useState(props.user);
  const [exchangeIdentifiers, setExchangeIdentifiers] = useState([]);
  const [exchangeNames, setExchangeNames] = useState([]);

  let userId;
  if (user) {
    userId = user._id;
  }

  useEffect(() => {
    if (user) {
      getExchanges(userId)
        .then((res) => {
          const exchangeIdentifiers = res[0]
            .map((el) => {
              return el.identifier;
            })
            .sort((a, b) => a.localeCompare(b));

          const exchangeNames = res[0].map((el) => {
            return el.exchangeName;
          });

          setExchangeNames(exchangeNames);
          setExchangeIdentifiers(exchangeIdentifiers);
        })
        .catch((err) => {
          return err.response.data;
        });
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <>
          <Navbar updateUser={setUser} user={user} />
          <Home
            {...props}
            exchangeIdentifiers={exchangeIdentifiers}
            exchangeNames={exchangeNames}
            setUser={setUser}
            user={user}
          />
        </>
      ) : (
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
              <Route
                path="/confirm/:id"
                render={(props) => (
                  <Confirm {...props} setUser={setUser} user={user} />
                )}
              />
              <Redirect from="*" to="/" />
            </Switch>
          </>
        </>
      )}
    </div>
  );
};

export default App;
