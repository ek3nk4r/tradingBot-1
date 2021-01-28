import React from "react";
import { NavLink } from "react-router-dom";
// import "../assets/stylesheets/navbar.css";
import { logout } from "./Auth/AuthAxios";
// import { logo } from "../assets/javascript/images";

const Navbar = (props) => {
  console.log(props);
  const { user, updateUser } = props;
  // const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    logout();
    updateUser(null);
  };

  return (
    <div>
      {user ? (
        <>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogout} to="/">
                Logout
              </NavLink>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Navbar;
