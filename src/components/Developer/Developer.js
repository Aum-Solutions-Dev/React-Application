import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const Developer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get("http://localhost:8080/apiDev/get-developers",
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch developers"
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <div className="table-column">
        <table className="table">
          <caption className="table-title">Developers</caption>
          <thead className="thead">
            {/* <tr>
              <th>Team Leaders</th>
            </tr> */}
          </thead>
          <tbody>
            {data.map((developer) => (
              <tr key={developer.devId}>
                <td>{developer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Developer.propTypes = {};

Developer.defaultProps = {};

export default Developer;
