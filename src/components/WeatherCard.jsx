
// Main weather display component - shows current conditions and weekly forecast
export default function WeatherCard({ data }) {
  // Safety check - don't try to render if we don't have complete weather data yet
  // This prevents those annoying "cannot read property of undefined" errors
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    return <div>Enter a city name and click Search to see weather data</div>;
  }

  // Debug logs - helpful for troubleshooting when temps aren't showing up right
  console.log("Weather data in WeatherCard:", data); 
  console.log("Raw temperature:", data.main.temp);
  console.log("City name:", data.name);

  // Convert API data to display-friendly numbers
  // Using Math.round because nobody needs to see "47.3 degrees"
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const windSpeed = Math.round(data.wind?.speed || 0); // The ?. handles missing wind data gracefully
  const windGusts = Math.round(data.wind?.gust || 0);
  const humidity = Math.round(data.main.humidity);
  const pressure = data.main.pressure;
  const visibility = data.visibility ? Math.round(data.visibility / 1609) : 'N/A'; // Convert meters to miles
  const cloudiness = data.clouds?.all || 0; // Cloud coverage percentage

  console.log("Processed temperature:", temp);
  console.log("Processed city:", data.name);

  return (
    <div className="MainPage">
      {/* Left side - Current weather conditions */}
      <div>
        <div className="weather-nav">Today's Weather</div>
        <div className="weather-nav-text">
          {/* Main weather display - city, temp, conditions */}
          <div className="weather-app-panel">
            <div className="box">{data.name}</div>
            <div className="boxnum">{temp}°F</div> {/* Big temperature display */}
            <div className="box">{data.weather[0].description}</div> {/* "partly cloudy", etc. */}
          </div>
          
          {/* Additional weather details in a table format */}
          {/* TODO: Maybe replace this table with CSS grid later for better mobile responsiveness */}
          <div className="weather-app-status">
            <table>
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
      </div>

      {/* Right side - Weekly forecast (mock data for now) */}
      <div>
        <div className="Firstpage-Nav">{data.name} weather this week</div>
        <div className="page-nav-text">
          {/* 5-day temperature forecast - using variations of current temp since we don't have forecast API */}
          {/* In the future, we could get this from a different API endpoint */}
          <div className="date-slots">
            <div className="slot">{temp - 2}</div> {/* Today -2 */}
            <div className="slot">{temp}</div> {/* Current temp */}
            <div className="slot">{temp + 3}</div> {/* Today +3 */}
            <div className="slot">{temp + 5}</div> {/* Today +5 */}
            <div className="slot">{temp + 7}</div> {/* Today +7 */}
          </div>
          
          {/* Weather details using actual API data */}
          <div className="bottomslot">
            <div className="weather-details">
              <div className="weather-detail">
                <span>Humidity:</span>
                <span>{humidity}%</span>
              </div>
              <div className="weather-detail">
                <span>Feels like:</span>
                <span>{feelsLike}°F</span>
              </div>
              <div className="weather-detail">
                <span>Pressure:</span>
                <span>{data.main.pressure} hPa</span>
              </div>
              <div className="weather-detail">
                <span>Visibility:</span>
                <span>{Math.round(data.visibility / 1609)} mi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
