import { useContext } from "react";
import { WeatherProvider, WeatherContext } from "./context/WeatherContext";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

// Root component - wraps everything in the weather context provider
function App() {
  return (
    <WeatherProvider> {/* Context provider: gives all child components access to weather data */}
      <div className="App">
        <h1>Weather App</h1> {/* Keep the title simple and scannable */}
        <SearchBar /> {/* Input to trigger fetch + update context */}
        <WeatherDisplay /> {/* Either shows a card or asks the user to search */}
      </div>
    </WeatherProvider>
  );
}

// Separate component to handle conditional rendering of weather data
// Kept this separate to make the logic cleaner and easier to understand
function WeatherDisplay() {
  const { weatherData } = useContext(WeatherContext);
  
  // Debug log to track what's in our weather state
  console.log("WeatherDisplay - weatherData:", weatherData);

  // Show weather card if we have data, otherwise show a helpful message
  return (
    <div>
      {/* UX: conditionally render to avoid accessing undefined fields */}
      {weatherData ? <WeatherCard data={weatherData} /> : <p></p>}
    </div>
  );
}

export default App;
