import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './weather.css' // my custom styling
import App from './App.jsx'


// StrictMode helps me catch bugs by running extra checks while I'm developing
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
