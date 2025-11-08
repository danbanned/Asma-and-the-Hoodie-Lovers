# Weather App

A clean, responsive weather application that provides current conditions and 5-day forecasts for any city worldwide.

## The Problem

People need quick, reliable access to weather information for planning their day and week ahead. Most weather apps are either cluttered with unnecessary features or don't provide a good user experience with clear, easy-to-read weather data.

## The Solution

I built a streamlined weather app that focuses on what matters most:
- **Current weather conditions** with temperature, feels-like, humidity, wind, and more
- **5-day forecast** with daily highs, lows, and weather descriptions
- **Clean, responsive design** that works on all devices
- **Real-time data** from the trusted OpenWeatherMap API
- **Simple search** - just type a city name and get instant results

## Why This Solution Works

### **User-Focused Design**
- Two-card layout keeps today's weather and forecast visually separated but accessible
- Large, readable temperature displays and intuitive weather icons
- Mobile-first responsive design that scales beautifully across devices

### **Fast Performance**
- Built with React + Vite for lightning-fast development and loading
- Parallel API calls fetch current weather and forecast data simultaneously
- Smart state management with React Context prevents unnecessary re-renders

### **Clean Architecture**
- Modular component structure makes the code easy to maintain and extend
- Utility functions handle data transformation (converting 3-hour forecasts to daily summaries)
- Separation of concerns with dedicated context for state management

### **Reliable Data**
- OpenWeatherMap API provides accurate, up-to-date weather information
- Error handling for network issues, invalid cities, and missing API credentials
- Graceful fallbacks prevent crashes when data is incomplete

## Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jayisacoder/Asma-and-the-Hoodie-Lovers-jay.git
   cd Asma-and-the-Hoodie-Lovers-jay
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
   VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the app in action!

### Building for Production

```bash
npm run build
npm run preview
```

## Features

- Current temperature, feels-like temperature, and weather description
- Wind speed, humidity, pressure, and visibility data
- 5-day forecast with daily highs, lows, and conditions
- Simple city search with real-time results
- Fully responsive design for mobile, tablet, and desktop
- Clean, modern UI with subtle gradients and shadows
- Fast loading with optimized API calls

## Tech Stack

- **Frontend**: React 19 with modern hooks
- **Build Tool**: Vite for fast development and building
- **HTTP Client**: Axios for API requests
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API
- **API**: OpenWeatherMap for weather data

## API Usage

This app uses the OpenWeatherMap API to fetch:
- Current weather data for searched cities
- 5-day weather forecast with 3-hour intervals (processed into daily summaries)

All temperatures are displayed in Fahrenheit, and the app handles unit conversion automatically.
