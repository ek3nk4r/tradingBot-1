import React, { useState, useEffect } from "react";
import { getExchanges } from "../components/ExchangeRouteAxios";
import "./App.css";

// Components
import User from "./JSX/User";
import NoUser from "./JSX/NoUser";

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
          <User
            {...props}
            exchangeIdentifiers={exchangeIdentifiers}
            exchangeNames={exchangeNames}
            setUser={setUser}
            user={user}
          />
        </>
      ) : (
        <>
          <NoUser {...props} setUser={setUser} user={user} />
        </>
      )}
    </div>
  );
};

export default App;
