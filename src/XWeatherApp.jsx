import React, { useState } from "react";
import "./XWeatherApp.css";

function XWeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=68bd715541194b4fa16132524242805&q=${city}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data.current);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="search-area">
        <input
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button className="search-button" onClick={fetchWeather}>Search</button>
      </div>
      {loading && <p>Loading data...</p>}
      {weatherData && !loading && (
        <div className="weather-cards">
          <div className="weather-card">{`Temperature: ${weatherData.temp_c}C`}</div>
          <div className="weather-card">{`Humidity: ${weatherData.humidity}%`}</div>
          <div className="weather-card">{`Condition: ${weatherData.condition.text}`}</div>
          <div className="weather-card">{`Wind Speed: ${weatherData.wind_kph} kph`}</div>
        </div>
      )}
      {error && <p>Failed to fetch weather data</p>}
    </div>
  );
}

export default XWeatherApp;
