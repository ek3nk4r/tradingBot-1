import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";

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

  const getExchanges = () => {
    return axios
      .get(`/exchangeRoutes/exchangeAccounts/${userId}`)
      .then((res) => {
        let exchangeIdentifiers = [];
        let exchangeNames = [];

        const identifiers = res.data[0].map((el) => {
          return exchangeIdentifiers.push(el.identifier);
        });

        const exchanges = res.data[0].map((el) => {
          return exchangeNames.push(el.exchangeName);
        });

        const sortIdentifiers = exchangeIdentifiers.sort((a, b) =>
          a.localeCompare(b)
        );
        setExchangeNames(exchangeNames);
        setExchangeIdentifiers(sortIdentifiers);
      })
      .catch((err) => {
        console.log("Error is", err);
        return err.res.data;
      });
  };

  useEffect(() => {
    if (user) {
      getExchanges();
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
