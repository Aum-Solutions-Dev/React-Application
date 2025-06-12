import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Encode the username and password as Base64
      const credentials = `${username}:${password}`;
      const encodedCredentials = btoa(credentials); // btoa() encodes the string as base64

      // Set the Authorization header with the Basic <encodedCredentials>
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${encodedCredentials}`, // Set the Authorization header
        },
        body: JSON.stringify({ username, password }), // You can still send the username and password as JSON if needed
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const jwtToken = await response.json();
      localStorage.setItem("authToken", jwtToken.token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
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
      {error && <p>{error}</p>}
    </div>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
