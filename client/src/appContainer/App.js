import React, { useState, useEffect } from "react";
import "./App.css";

// Components
import User from "./JSX/User";
import NoUser from "./JSX/NoUser";
import GetExchanges from "./AppFunctions/GetExchanges";

const App = (props) => {
  const [user, setUser] = useState(props.user);
  const [exchangeIdentifiers, setExchangeIdentifiers] = useState([]);
  const [exchangeNames, setExchangeNames] = useState([]);

  let userId;
  if (user) {
    userId = user._id;
  }

  useEffect(() => {
    GetExchanges(user, userId, setExchangeNames, setExchangeIdentifiers);
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
