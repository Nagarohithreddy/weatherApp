import React, { useState } from 'react'
import axios from "axios";

const Weather = () => {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState();

    const handleCityChange = (e) => {
        setCity(e.target.value);
    };

    const fetchWeather = async () => {
        try{
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'b32754fca036ebb32906c9713b12794e'}`);
            setWeather(response);
            console.log(response);
        }
        catch (error){
            console.log('error fetching the data:',error);
        }
    }

    const handleClick = () => {
        fetchWeather();
    };

    const kelvinToCelsius = (kelvin) => {
        return (kelvin - 273.15).toFixed(2); 
    };

  return (
    <>
        <h1>Weather App</h1>
        <div className='weather-container'>
            <input type="text" placeholder='Enter your city name' value={city} onChange={handleCityChange} />
            <button onClick={handleClick}>Search</button>

            {weather && (
          <>
            <div>
              <h3>{weather.data.name}</h3>
              <p>Temperature is: {kelvinToCelsius(weather.data.main.temp)} °C</p>
              <p>Desciption : {weather.data.weather[0].description}</p>
              <p>Wind Speed: {weather.data.wind.speed}</p>
              <p>Humidity: {weather.data.main.humidity} %</p>
            </div>
          </>
        )}

        </div>
    </>
  )
}

export default Weather