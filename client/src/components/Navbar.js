import React, { useContext } from "react";
import logo from "../image/fron.png";
import "./navbar.css";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  console.log(user);
  const PF = "http://localhost:5000/images/";

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar__container">
      <ul className="navbar__elements">
        <li>Home</li>
        <li>About</li>
        <li>Section</li>
        <li>Contact</li>
      </ul>
      <div className="navbar__img">
        <img
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          src={PF + user.image}
          alt=""
        />
      </div>

      {!user ? (
        <div className="navbar__buttons">
          <Link to="/login">
            <button className="navbar__login">Login</button>
          </Link>
          <Link to="/register">
            <button className="navbar__register">Register</button>
          </Link>
        </div>
      ) : (
        <div
          className="navbar__logout"
          style={{
            display: "flex",
          }}
        >
          <div
            className="name"
            style={{
              marginRight: "23px",
              marginTop: "13px",
            }}
          >
            {user.username}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
