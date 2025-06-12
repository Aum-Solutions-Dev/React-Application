import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from 'react';

const Developer = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/apiDev/get-developers"
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
