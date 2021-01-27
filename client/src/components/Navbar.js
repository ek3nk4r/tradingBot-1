import React from "react";
import { NavLink } from "react-router-dom";
// import "../assets/stylesheets/navbar.css";
import { logout } from "./Auth/AuthAxios";
// import { logo } from "../assets/javascript/images";

const Navbar = (props) => {
  const { user } = props;
  // const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogout = () => {
    logout();
    props.updateUser(null);
  };

  console.log(props);

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
              <NavLink to="/auth">Signup</NavLink>
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
