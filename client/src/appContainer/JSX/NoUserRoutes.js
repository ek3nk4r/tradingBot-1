import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// components
import SignUp from "../../components/Auth/Signup";
import Login from "../../components/Auth/Login";
import Confirm from "../../components/Auth/Confirm";

const NoUserRoutes = (props) => {
  const { user, setUser } = props;

  return (
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
          render={(props) => <Login {...props} user={user} setUser={setUser} />}
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
  );
};

export default NoUserRoutes;
