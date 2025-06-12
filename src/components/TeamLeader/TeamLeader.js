import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const TeamLeader = () => {
  const [data, setData] = useState([]);

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
            {data.map((teamLeader) => (
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
