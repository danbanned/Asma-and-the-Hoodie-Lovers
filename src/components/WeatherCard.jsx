export default function WeatherCard({ data }) {
  return (
    <div className="weather-card">
        <h2>{data.name}</h2>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Weather: {data.weather[0].description}</p>
        </div>


    
  );
}
