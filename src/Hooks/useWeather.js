import React, { useEffect, useState } from 'react'

const useWeather = (query) => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState("false");
    const API_KEY = 'bd4fde425735192346803102941804ec';

  
    useEffect(() => {
      async function fetchWeather() {
        try {
          setLoading("true");
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
          const json = await response.json();
          console.log(json);
          setResult(
            json.items.map(item => {
              console.log(item);
              return item
            })
          );
        } catch (error) {
          setLoading("null");
        }
      }
  
      if (query !== "") {
        fetchWeather();
      }
    }, [query]);
  
    return [result, loading];
  }

  export default useWeather