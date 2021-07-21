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
    console.log("index.js *** response ***", response);
    const user = response.data;

    ReactDOM.render(
      // <React.StrictMode>
      <Router>
        <App user={user} />
      </Router>,
      //</React.StrictMode>,
      document.getElementById("root")
    );
  })
  .catch((err) => {
    console.log("*** ERROR ***", err);
    return err.response.data;
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
