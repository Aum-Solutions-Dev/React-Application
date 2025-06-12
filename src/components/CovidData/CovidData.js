import React from 'react';
import { useLocation } from 'react-router-dom';

const CovidData = () => {
  const location = useLocation();
  const covidData = location.state?.covidData || {};

  return (
    <div className="covid-data-content">
      <h1>COVID-19 Data</h1>
      <p>Cases: {covidData.cases}</p>
      <p>Deaths: {covidData.deaths}</p>
      <p>Recovered: {covidData.recovered}</p>
      {/* Add more properties as needed */}
    </div>
  );
};

export default CovidData;