import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState([]);
  const [developer, setDeveloperData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDevelopers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/apiDev/get-developers"
        );
        const result = await response.json();
        setDeveloperData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllDevelopers();
  }, []);

  const handleFetchAllDevelopers = () => {
    navigate("/developer");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/apiLead/get-team-leaders"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFetchAllTeamLeaders = () => {
    navigate("/team-leader");
  };

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
            {data.map((teamLeader) => (
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
