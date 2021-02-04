import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

// components
import Navbar from "../components/Navbar/Navbar";
import SignUp from "../components/Auth/Signup";
import Login from "../components/Auth/Login";
import Home from "../components/Home/Home";
import Confirm from "../components/Auth/Confirm";

const App = (props) => {
  const [user, setUser] = useState(props.user);

  const content = () => {
    return (
      <>
        <Navbar />
        <>
          <BrowserRouter>
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
          </BrowserRouter>
        </>
      </>
    );
  };

  return (
    <div>
      {user ? (
        <>
          <Navbar updateUser={setUser} user={user} />
          <Home {...props} setUser={setUser} user={user} />
        </>
      ) : (
        <>
          <div>{content()}</div>
        </>
      )}
    </div>
  );
};

export default App;
