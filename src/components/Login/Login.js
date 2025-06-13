import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const credentials = `${username}:${password}`; // Encode username and password as Base64 for Basic Auth
      const encodedCredentials = btoa(credentials); // btoa() encodes the string as base64

      const response = await axios.post(
        "http://localhost:8080/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encodedCredentials}`, // Set the Authorization header
          },
        }
      );

      console.log("Username:", username);
      console.log("Password:", password);
      console.log("Response: ", response);
      console.log("Response Data:", response.data);

      const token = response.data;
      console.log("token:", token);
      localStorage.setItem("authToken", token); // Set authentication token in local storage.
      onLoginSuccess();
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      // Handle Axios-specific errors
      if (err.response) {
        // Server responded with a status other than 2xx
        setError(err.response.data?.message || "Invalid username or password");
      } else if (err.request) {
        // No response received
        setError("Server is not responding. Please try again later.");
      } else {
        // Other errors (e.g., parsing or setup issues)
        setError(err.message || "Failed to log in. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
