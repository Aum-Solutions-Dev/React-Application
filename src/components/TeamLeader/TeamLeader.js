import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const TeamLeader = () => {
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [teamLeaderError, setTeamLeaderError] = useState("");

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
          <caption className="table-title">Team Leaders</caption>
          <thead className="thead">
            {/* <tr>
              <th>Team Leaders</th>
            </tr> */}
          </thead>
          <tbody>
            {teamLeaders.map((teamLeader) => (
              <tr key={teamLeader.teamLeadId}>
                <td>{teamLeader.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

TeamLeader.propTypes = {};

TeamLeader.defaultProps = {};

export default TeamLeader;
