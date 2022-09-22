import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const registerPost = {
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      registerPost.image = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/auth/register", registerPost);
      console.log(registerPost);
      res.data && navigation("/login");
    } catch (error) {
      setEmail(true);
    }
  };
  return (
    <div className="register__container">
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register_smallContainer">
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            name="username"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="file"
            name="file"
            className="register__file"
            placeholder="Upload"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="register__button" type="submit">
            Register
          </button>
          <Link to="/login">
            <button className="register__button">Login</button>
          </Link>
          {error && <span>wrong credentials</span>}
        </div>
      </form>
    </div>
  );
};

export default Register;
