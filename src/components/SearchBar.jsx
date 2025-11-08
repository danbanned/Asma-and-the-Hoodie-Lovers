import { useState, useContext } from "react";
import axios from "axios"; // makes it easy to call the weather API
import { summarizeForecast } from "../utils/forecast"; // turns messy 3-hour forecasts into clean daily ones
import { WeatherContext } from "../context/WeatherContext";
import "../searchbar.css"

export default function SearchBar() {
  // keeps track of what city name the user typed
  const [city, setCity] = useState("");
  const [video,setvideo] = useState("../public/cloudy.mp4")
  const [visibleVideo, setVideoVisible] = useState(true);


  
  // get the functions to update weather data in my app
  const { setWeatherData, setForecastData } = useContext(WeatherContext);

  // grab my API key and URL from environment variables so they stay secret
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;

  // this is the main function that gets weather data from OpenWeather
  const fetchWeather = async () => {
    // help me debug if things go wrong
    console.log("fetchWeather called with city:", city);
    console.log("API Key:", apiKey ? "Present" : "Missing");
    console.log("API URL:", apiUrl);

    // make sure I have my API credentials before trying anything
    if (!apiKey || !apiUrl) {
      console.error("API key or URL is missing. Please check your .env file.");
      alert("API configuration is missing. Please add your weather API key.");
      return;
    }

    // don't bother if they didn't type a city name (trim removes extra spaces)
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      // build the URLs for current weather and 5-day forecast
      const currentUrl = `${apiUrl}?q=${city}&appid=${apiKey}&units=imperial`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

      console.log("Making API calls to:", currentUrl, forecastUrl);

      // call both APIs at the same time to make it faster
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(currentUrl),
        axios.get(forecastUrl)
      ]);

      console.log("Current response:", currentRes.data);
      console.log("Forecast response (count):", forecastRes.data?.cnt);

      // update the current weather display
      setWeatherData(currentRes.data);

      // turn the messy forecast data into clean daily summaries
      const daily = summarizeForecast(forecastRes.data?.list || []);
      setForecastData(daily);
      console.log("Forecast data set:", daily);
    } catch (error) {
      // something went wrong - bad city name, internet issues, API problems, etc.
      console.error("Error fetching weather:", error);
      console.error("Error details:", error.response?.data);
      alert(`Failed to fetch weather data: ${error.response?.data?.message || error.message}`);
  setWeatherData(null); // wipe out any old weather data
  setForecastData([]); // clear the old forecast too
    }
  };

  // handles when someone clicks search or hits enter
  const handleSubmit = (e) => {
    e.preventDefault(); // stop the page from refreshing
    fetchWeather();
  };

  return (
    <>
    <div className="search-container">
    <form onSubmit={handleSubmit} aria-label="Search city weather">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)} // keeps the input box and my city variable in sync
      />
      <button type="submit">Search</button> {/* enter key works because this is inside a form */}
    </form>

    {visibleVideo && (
        <video autoPlay loop muted className="background-video">
          <source src={video} type="video/mp4" />
        </video>
      )}
      </div>
    </>
  );
}
