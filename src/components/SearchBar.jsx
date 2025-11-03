import { useState, useContext } from "react";
import axios from "axios";
import { WeatherContext } from "../context/WeatherContext";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const { setWeatherData } = useContext(WeatherContext);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>
    </div>
  );
}
