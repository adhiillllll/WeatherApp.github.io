import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search-icon.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from '../assets/wind.png'
import Favorite from "./Favorite";
import ErrorMsg from "./ErrorMsg";
import { useNavigate } from "react-router-dom";


const Weather = () => {

  const inputRef = useRef()

  const [weatherData , setWeatherData] = useState(false)

  const [errorMsg, setErrorMsg] = useState(""); //from ErrorMsg

  const navigate = useNavigate();

  // save in favorite without repeating 
  const saveToFavorites = () => {
    if (!weatherData) return;

   const city = weatherData.location;

   const cityLower = city.trim().toLowerCase();

   const existing = JSON.parse(localStorage.getItem("favorites")) || [];

   const alreadyExists = existing
      .map(c => c.toLowerCase())
      .includes(cityLower);

   if (!alreadyExists) {
      existing.push(city);
     localStorage.setItem("favorites", JSON.stringify(existing));
   }
   navigate("/favorites");
  };

  const allIcons = {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon,
  }

  const search = async (city) => {
    if(city === ""){
      alert("Location parayu suhurthe");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url)
      const data = await response.json()

      if (!response.ok) {
      setErrorMsg("City not found");   // error msg (UI)
      setWeatherData(false);
      return;
      }
      setErrorMsg("");  //for UI update (react do not update setState)

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data")
    }
  }

  useEffect(() => {
    search("kochi")
  },[])

  return (
    <div className='weather'>

       <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='search' />
        <img src={search_icon} alt="search" className='search-icon' onClick={() => search(inputRef.current.value)}/>
       </div>

       <ErrorMsg message={errorMsg} />

       <Favorite onClick={saveToFavorites} />

       {weatherData?<>
       <img src={weatherData.icon} alt="sun" className='clear-weather'/>
       <p className='temperature'>{weatherData.temperature}°C</p>
       <p className='location'>{weatherData.location}</p>
       <div className="weather-data">
        <div className='col'>
          <img src={humidity_icon} alt="humidity-level" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind_icon} alt="wind-speed" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind speed</span>
          </div>
        </div>
       </div>
       </> : <></>}
    </div>
  )
}

export default Weather