import { useEffect, useState } from "react";

const useWeather = (query) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("false");
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading("true");
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
        );
        const json = await response.json();
        console.log(json);
        setResult(
          json.items.map((item) => {
            console.log(item);
            return item;
          })
        );
      } catch (error) {
        setLoading("null");
      }
    }

    if (query !== "") {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return [result, loading];
};

export default useWeather;
