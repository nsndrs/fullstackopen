import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country, onBack }) => {
  const [weather, setWeather] = useState(null)
  
  useEffect(() => {
    // Only try to fetch weather if we have a capital
    if (country.capital && country.capital.length > 0) {
      const api_key = import.meta.env.VITE_WEATHER_API_KEY
      
      if (!api_key) {
        console.error('No weather API key found. Set VITE_WEATHER_API_KEY environment variable')
        return
      }
      
      const capital = country.capital[0]
      
      // Using WeatherAPI.com instead of OpenWeatherMap
      axios
        .get(`https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
        .then(response => {
          console.log('Weather data:', response.data)
          setWeather(response.data)
        })
        .catch(error => {
          console.error('Error fetching weather data:', error)
        })
    }
  }, [country])
  
  // Get an array of language names from the languages object
  const languages = country.languages 
    ? Object.values(country.languages) 
    : []
  
  return (
    <div>
      {onBack && <button onClick={onBack} style={{ marginBottom: "20px" }}>Back to list</button>}
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital && country.capital[0]}</div>
      <div>Area {country.area}</div>
      
      <h3>Languages</h3>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        className="flag"
      />
      
      {weather && (
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          <p>Temperature {weather.current.temp_c} Celsius</p>
          <img 
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="weather-icon"
          />
          <p>Wind {(weather.current.wind_kph * 0.277778).toFixed(1)} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetails 