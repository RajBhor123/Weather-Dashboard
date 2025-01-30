import React, { useState, useEffect } from 'react';
import './App.css';

// Weather Component
function Weather() {
  const [city, setCity] = useState('New York'); // Default city
  const [weatherData, setWeatherData] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  const API_KEY = 'a8d045cadd35488894475bc31fc6b5d0'; // Replace with your Weatherbit API key

  // Function to fetch weather data
  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null); // Clear any previous error
  
    const cityToSearch = city.trim() || 'New York'; // Default city if input is empty
  
    try {
      const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${cityToSearch}&key=${API_KEY}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.data && data.data.length > 0) {
        setWeatherData(data.data[0]); // Set the weather data if valid
      } else {
        throw new Error('No weather data available for this city');
      }
    } catch (error) {
      setError(error.message); // Display the error message in the UI
    } finally {
      setLoading(false); // Stop loading once the fetch is complete
    }
  };
  
  

  // useEffect to fetch data when the city changes
  useEffect(() => {
    fetchWeather(city);
  }, [city]); // Dependency array - fetch again when city changes

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>Weather Dashboard</h1>
      
      <div className="city-input">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {weatherData && (
        <div className="weather-details">
          <h2>Weather in {weatherData.city_name}</h2>
          <p>Temperature: {weatherData.temp}°C</p>
          <p>Weather: {weatherData.weather.description}</p>
          <p>Humidity: {weatherData.rh}%</p>
          <p>Wind Speed: {weatherData.wind_spd} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
