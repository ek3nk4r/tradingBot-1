import React from "react";

// components
import Navbar from "../../components/Navbar/Navbar";
import NoUserRoutes from "./NoUserRoutes";

const NoUser = (props) => {
  const { user, setUser } = props;

  return (
    <>
      <Navbar updateUser={setUser} user={user} />
      <NoUserRoutes {...props} setUser={setUser} user={user} />
    </>
  );
};

export default NoUser;
