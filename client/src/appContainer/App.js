import React, { useState } from "react";
// import axios from "axios";
import { Switch, Route } from "react-router-dom";
import "./App.css";

// components
import Navbar from "../components/Navbar/Navbar";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Home from "../components/Home/Home";

const App = (props) => {
  const [user, setUser] = useState(props.user);

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
          <Home {...props} setUser={setUser} user={user} />
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
