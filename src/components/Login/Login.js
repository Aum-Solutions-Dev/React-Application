import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import api  from "../../axiosInstance";


const Login = ({ onLoginSuccess, mode }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Reset fields when mode changes or after navigation to /login from signup
  useEffect(() => {
    setUsername("");
    setPassword("");
    setError(""); // Optionally clear error as well
  }, [mode, location.pathname]); // Trigger on mode or pathname change

  const isLoginMode = mode === "sign in";
  const title = isLoginMode ? "Sign in" : "Sign up";
  const buttonText = isLoginMode ? "Sign in" : "Sign up";
  const endpoint = isLoginMode
    ? "/login"
    : "/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let response;
      if (mode === "sign in") {
        const credentials = `${username}:${password}`; // Encode username and password as Base64 for Basic Auth
        const encodedCredentials = btoa(credentials); // btoa() encodes the string as base64
        console.log(credentials);
        console.log(encodedCredentials);
        console.log(endpoint);

        const response = await api.post(
          endpoint,
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
        console.log("Response: ", response);

        const token = response.data.accessToken;
        console.log("token:", token);
        localStorage.setItem("authToken", token); // Set authentication token in local storage.
        const refreshToken = response.data.refreshToken;
        console.log("refreshToken:", refreshToken);
        localStorage.setItem("refreshToken", refreshToken); // Set refreshToken token in local storage.
        onLoginSuccess();
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        // For signup: send only JSON body, no Basic Authentication
        response = await api.post(
          endpoint,
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // Redirect to login on success
        console.log("Signup successful, redirecting to login");
        navigate("/signin", { replace: true });
        console.log("Username:", username);
        console.log("Password:", password);
        console.log("Response: ", response);
        console.log("Response Data:", response.data);
      }
    } catch (err) {
      console.error(`${isLoginMode ? "sign in" : "Sign up"} error:`, err);
      if (err.response) {
        setError(
          err.response.data?.message ||
            `Invalid ${isLoginMode ? "sign in" : "sign up"} credentials`
        );
      } else if (err.request) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError(
          err.message ||
            `Failed to ${isLoginMode ? "sign in" : "sign up"}. Please try again.`
        );
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{title}</h2>
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
        <button type="submit">{buttonText}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="auth-link">
        {isLoginMode ? (
          <>
            Create an account? <Link to="/signup">sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="/signin">Sign in</Link>
          </>
        )}
      </p>
    </div>
  );
};

Login.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["sign in", "sign up"]).isRequired,
};

Login.defaultProps = {
  mode: "sign in",
};

export default Login;
