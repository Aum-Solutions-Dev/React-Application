import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   // Simulate an authentication check (e.g., checking localStorage or making an API call)
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);   

   // If still loading, render a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

   // Provide the authentication context to child components
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {};

AuthProvider.defaultProps = {};

export default AuthProvider;
/**
 * The useEffect hook checks if an authentication token exists in localStorage when the component mounts.
 * If the token is found, the isAuthenticated state is set to true, rendering the Dashboard component.
 * If not, the Login component is rendered, and upon successful login, it updates the state to true, allowing access to the dashboard.
 */
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   if (!isAuthenticated) {
//     return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
//   }

//   return <Home />;
