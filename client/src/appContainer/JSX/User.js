import React from "react";

// Components
import Navbar from "../../components/Navbar/Navbar";
import Home from "../../components/Home/Home";

const User = (props) => {
  const { setUser, user, exchangeIdentifiers, exchangeNames } = props;

  return (
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
  );
};

export default User;
