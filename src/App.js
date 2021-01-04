import React, { useEffect, useState } from 'react'
import './App.css';
//import images
import sunnyBg from './images/sunny2.jpg'
import cloudyBg from './images/cloudy2.jpg'
import foggyBg from './images/foggy.jpg'
import rainBg from './images/rain.jpg'
import drizzleBg from './images/drizzle.jpg'
import hazeBg from './images/haze.jpg'
import snowBg from './images/snow.jpg'
//import Components
import Data from './Components/Data'
import Menu from './Components/Menu'
//import Hooks
import useWeather from "../src/Hooks/useWeather"
// import useGeoLocation from "../src/Hooks/useGeoLocation";

const App = () => {

  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);
  const [query, setQuery] = useState("London");
  const [error, setError] = useState(false);
  const [bg, setBg] = useState()
  const [loading, setLoading] = useState(true)
  // const [result, loading] = useWeather(query)
  const API_KEY = 'bd4fde425735192346803102941804ec';

  useEffect(() => {
    const getWeather = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setError(false)
        setWeather(data);
      }else{
        setLoading(false)
        setError(true)
        console.log(error);
      }
    }
    getWeather();
  }, [query])

  useEffect(() => {
    const setBackground = () => {
      if(!weather.weather) return;
      const weatherType = weather.weather[0].main;
      if(weatherType === 'Clouds'){
        return {
          backgroundImage: `url(${cloudyBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Clear'){
        return {
          backgroundImage: `url(${sunnyBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Mist'){
        return {
          backgroundImage: `url(${foggyBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Rain'){
        return {
          backgroundImage: `url(${rainBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Drizzle'){
        return {
          backgroundImage: `url(${drizzleBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Haze'){
        return {
          backgroundImage: `url(${hazeBg})`,
          transition: "1s ease-in-out"
        }
      }else if(weatherType === 'Snow'){
        return {
          backgroundImage: `url(${snowBg})`,
          transition: "1s ease-in-out"
        }
      }
    }
    setBg(setBackground())
  }, [weather])  

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.name);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  const getRecentSearch = () => {
    if (recentSearch.length < 4) {
        setRecentSearch(oldArray => [...oldArray, search]);
    }else{
        recentSearch.reverse();
        recentSearch.unshift(search);
        recentSearch.pop();
        recentSearch.reverse();
    }
  }

  const matchData = (e) => {
    setQuery(e.target.innerText)
  }

  if(!weather.weather){
    return <p>Loading</p>
  }
  
  
  
  const errorCheck = () => {
    
    if(error === true){
      return error
    }
  }

  return(
    <div className="App"  style={bg}>
      <p className="logo">weather</p>

      <Data 
        city={weather.name} 
        weather={weather.weather[0].main}
        temp={weather.main.temp}
        icon={weather.weather[0].icon}
      />

      <Menu
        clouds={weather.clouds.all}
        humidity={weather.main.humidity}
        winds={weather.wind.speed}
        weather={weather.weather[0].main}
        search={search}
        getSearch={getSearch}
        updateSearch={updateSearch}
        getRecentSearch={getRecentSearch}
        matchData={matchData}
        recentSearch={recentSearch}
        error={error}
       />

      </div>
  );
}

export default App;
