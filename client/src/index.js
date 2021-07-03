import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./appContainer/App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";

axios
  .get("/api/loggedin")
  .then((response) => {
    console.log("*** RESPONSE ***", response);

    let user;
    if (response.data) {
      user = response.data[0];
    } else {
      user = response.data;
    }

    const exchangeIdentifiers = [];
    const exchange = response.data[1].map((el) => {
      return exchangeIdentifiers.push(el.identifier);
    });

    const exchangeNames = [];
    const exchangeName = response.data[1].map((el) => {
      return exchangeNames.push(el.exchangeName);
    });

    console.log(
      "*** INDEX USER DATA ***",
      user,
      exchangeIdentifiers,
      exchangeNames
    );

    ReactDOM.render(
      // <React.StrictMode>
      <Router>
        <div>
          {user ? (
            <>
              <App
                user={user}
                exchangeIdentifiers={exchangeIdentifiers}
                exchangeNames={exchangeNames}
              />
            </>
          ) : (
            <>
              <App user={user} />
            </>
          )}
        </div>
      </Router>,
      //</React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((err) => {
    return err.response.data;
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
