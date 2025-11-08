// This component shows the weather - current conditions plus the weekly forecast
// Built to handle OpenWeather API data, with safety checks so it won't crash
import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { useEffect, useState } from "react";
import "../weather.css"


// The main weather display - shows today's weather and the 5-day forecast
export default function WeatherCard({ data }) {
  // grab the forecast data from my weather storage
  const { forecastData } = useContext(WeatherContext);
  // make sure I have weather data before trying to show it
  const [video,setvideo] = useState("../public/main.mp4")

  // prevents those nasty "can't read property" crashes
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    return <div>Enter a city name and click Search to see weather data</div>;
  }

  // help me debug when temperatures look weird
  console.log("Weather data in WeatherCard:", data); 
  console.log("Raw temperature:", data.main.temp);
  console.log("City name:", data.name);
  console.log("City name:", data);

const timestamp = data.dt

const date = new Date(timestamp * 1000);
//new Date() → gets right now (year, month, day, hour, minute, second).
//Date is an object or data type used to work with times and calendar dates.



  // clean up the numbers so they look nice on screen
  // nobody wants to see "47.382 degrees" - just give me "47"
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const windSpeed = Math.round(data.wind?.speed || 0); // the ?. keeps it from crashing if wind data is missing
  const windGusts = Math.round(data.wind?.gust || 0);
  const humidity = Math.round(data.main.humidity);
  const pressure = data.main.pressure;
  const visibility = data.visibility ? Math.round(data.visibility / 1609) : 'N/A'; // turn meters into miles because America
  const cloudiness = data.clouds?.all || 0; // how cloudy it is as a percentage
  const time = date.toLocaleTimeString("end-US", {
    weekday:"long",
     month:"long",
      day:"numeric",
       year:"numeric",
  },
    "en-US",{ 
      hour: "2-digit", 
      minute: "2-digit" 
    }); // "3:42 PM"

  console.log("Processed temperature:", temp);
  console.log("Processed city:", data.name);



  return (
    <>
    <video autoPlay loop muted className="background-video">
        <source src={(video || "../cloudy.mp4")} type="video/mp4" />
      </video>
    <div className="MainPage">
      {/* left side shows today's weather */}
      <div>
        <div className="weather-nav">Today's Weather</div>
        <div className="weather-nav-text" >current time
          
          {/* the main weather info - city name, temperature, and what it's like outside */}
          <div className="weather-app-panel">
            <div className="box">{data.name}</div>
            <div className="boxnum">{temp}°F</div> {/* the big temperature number */}
            <div className="box">{data.weather[0].description}</div> {/* like "partly cloudy" or "sunny" */}
          </div>
          
          {/* extra weather info in a neat table */}
          {/* might switch this to CSS grid someday to make it work better on phones */}
          <div className="weather-app-status">
            <table>

              <thead>
                <th className="dates">
                <th> {time}</th>
                </th>
              </thead>
              <tbody>
                <tr>
                  <td className="status">Feels Like:</td>
                  <td className="status">{feelsLike}°F</td>
                </tr>
                <tr>
                  <td className="status">Wind:</td>
                  <td className="status">{windSpeed} mph</td>
                </tr>
                <tr>
                  <td className="status">Humidity:</td>
                  <td className="status">{humidity}%</td>
                </tr>
                <tr>
                  <td className="status">Clouds:</td>
                  <td className="status">{cloudiness}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
        </div>
      </div>

      {/* right side shows the 5-day forecast */}
      <div>
        <div className="Firstpage-Nav">{data.name} • 5-Day Forecast</div>
        <div className="page-nav-text forecast-pane">
          <div className="forecast-grid">
            {forecastData.length === 0 && (
              <div className="forecast-empty">Search a city to load its forecast...</div>
            )}
            {forecastData.map((day) => (
              <div key={day.date} className="forecast-item">
                <div className="forecast-date">
                  {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
                <img
                  className="forecast-icon"
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt={day.description}
                  loading="lazy"
                />
                <div className="forecast-temps">
                  <span className="temp-high">{day.max}°</span>
                  <span className="temp-low">{day.min}°</span>
                </div>
                <div className="forecast-desc">{day.description}</div>
              </div>
            ))}
          </div>
          {/* some extra current weather details at the bottom */}
          <div className="current-extra">
            <div><strong>Humidity:</strong> {humidity}%</div>
            <div><strong>Feels:</strong> {feelsLike}°F</div>
            <div><strong>Pressure:</strong> {pressure} hPa</div>
            <div><strong>Visibility:</strong> {visibility} mi</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
