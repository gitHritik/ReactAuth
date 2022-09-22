import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { Context } from "../context/Context";

const Login = () => {
  // const userRef = useRef();
  // const passwordRef = useRef();
  const [useref, setUseref] = useState("");
  const [passref, setPassref] = useState("");
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setError(false);
      const res = await axios.post("/auth/login", {
        // username: userRef.current.value,
        // password: passwordRef.current.value,
        username: useref,
        password: passref,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };

  return (
    <div className="login__container">
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login_smallContainer">
          <h1>Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setUseref(e.target.value)}
            // ref={userRef}
          />
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassref(e.target.value)}
            // ref={passwordRef}
          />

          <button className="login__button" type="submit">
            Login
          </button>
          <Link to="/register">
            <button className="login__button">Register</button>
          </Link>
          {error && <span>Wrong credentials </span>}
        </div>
      </form>
    </div>
  );
};

export default Login;
