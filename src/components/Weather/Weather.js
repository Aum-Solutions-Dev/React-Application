import React, { useState } from "react";

const myStyle = {
  border: "none",
  borderRadius: "100px 0px 0px 100px",
  textAlign: "center",
};

const buttonStyles = {
  padding: "10px 15px",
  marginLeft: "0px",
  backgroundColor: "#4CAF50", // Green background for button
  border: "none",
  color: "#fff",
  borderRadius: "0px 100px 100px 0px",
  cursor: "pointer",
  transition: "background-color 0.3s ease", // Smooth transition on hover
};

const buttonHoverStyles = {
  backgroundColor: "#45a049", // Darker green on hover
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const apiKey = "f6f63125996943ab9d184713252705";

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleButtonClick = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="scrollable-weather-container">
      <div className="weather-container">
        <h1>Weather App</h1>
        <input
          type="text"
          id="cityInput"
          value={city}
          style={myStyle}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button
          id="getWeatherBtn"
          style={buttonStyles}
          onClick={handleButtonClick}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyles.backgroundColor)
          } // Hover effect
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Go Weather
        </button>

        {error && <p>{error}</p>}

        {weatherData && (
          <div id="weatherResult" className="result-box">
            <h2>{weatherData.location.name}</h2>
            <img src={weatherData.current.condition.icon} alt="Weather icon" />
            <p>
              <strong>{weatherData.current.temp_c}°C</strong>
            </p>
            <p>
              {weatherData.location.country}, {weatherData.location.region}
            </p>
            <p>{weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
