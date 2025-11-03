import { useContext } from "react";
import { WeatherProvider, WeatherContext } from "./context/WeatherContext";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <h1>Weather App</h1>
        <SearchBar />
        <WeatherDisplay />
      </div>
    </WeatherProvider>
  );
}

function WeatherDisplay() {
  const { weatherData } = useContext(WeatherContext);

  return (
    <div>
      {weatherData ? <WeatherCard data={weatherData} /> : <p>Enter a city</p>}
    </div>
  );
}

export default App;
