import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav>
      <ul>
        {/* <li>
          <Link to="/">Home</Link>
        </li> */}
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
