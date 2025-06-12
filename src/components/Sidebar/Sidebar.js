import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [showNumber, setShowNumber] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowNumber(location.pathname !== "/covid-data");
  }, [location.pathname]);

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await response.json();
      navigate("/joke", { state: { joke: data.joke } });
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  const fetchCovidData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/all/", {
        headers: { Accept: "application/json" },
      });
      const covidData = await response.json();
      navigate("/covid-data", {
        state: {
          covidData: covidData,
        },
      });
    } catch (error) {
      console.error("Error fetching COVID data:", error);
    }
  };

  // Define the toggleSidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className={`sidebar ${isSidebarOpen ? "active" : ""}`}>
        <div className="sidebar-content-button">
          <ul>
            <li>
              <button onClick={fetchJoke}>
                Dad Joke
              </button>
            </li>
            <li>
              <button onClick={fetchCovidData}>
                Covid-19 Data {showNumber && <span>(3)</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
