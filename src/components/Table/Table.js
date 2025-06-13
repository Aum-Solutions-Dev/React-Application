import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Table = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [developerError, setDeveloperError] = useState("");
  const [teamLeaderError, setTeamLeaderError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDevelopers = async () => {
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
        setDevelopers(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setDeveloperError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch developers"
        );
      }
    };
    
    fetchAllDevelopers();
  }, []);

  const handleFetchAllDevelopers = () => {
    navigate("/developer");
  };
  
  const handleFetchAllTeamLeaders = () => {
    navigate("/team-leader");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/apiLead/get-team-leaders",
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
        );
        setTeamLeaders(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setTeamLeaderError(
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
          <thead className="thead">
            <tr>
              <th>Team Leader</th>
              <th>Developers</th>
            </tr>
          </thead>
          <tbody>
            {teamLeaders.map((teamLeader) => (
              <tr key={teamLeader.teamLeadId}>
                <td>{teamLeader.name}</td>
                <td>
                  {teamLeader.developers.length > 0 ? (
                    <ul>
                      {teamLeader.developers.map((developer) => (
                        <li key={developer.devId}>{developer.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: 'red' }}><strong>No Developers</strong></p>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <button
                  onClick={handleFetchAllTeamLeaders}
                  className="fetch-all-team-leaders-button"
                >
                  Team Leaders
                </button>
              </td>
              <td>
                <button
                  onClick={handleFetchAllDevelopers}
                  className="fetch-all-developers-button"
                >
                  Developers
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {};

Table.defaultProps = {};

export default Table;
