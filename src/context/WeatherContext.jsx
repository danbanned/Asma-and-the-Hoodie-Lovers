// Makes weather data available everywhere in the app without having to pass it around
// Saves me from having to thread data through every single component
import { createContext, useState } from "react";

// Think of this as my weather data storage that any component can tap into
export const WeatherContext = createContext();

// This wraps my whole app and makes the weather data available to everything inside
// Any component can just ask for the weather data instead of me having to pass it down
export const WeatherProvider = ({ children }) => {
  // holds the current weather info (empty until someone searches)
  const [weatherData, setWeatherData] = useState(null);
  // holds the 5-day forecast (clean daily summaries)
  const [forecastData, setForecastData] = useState([]);

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData, forecastData, setForecastData }}>
      {children} {/* this is where all my app components live */}
    </WeatherContext.Provider>
  );
};
