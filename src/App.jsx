import React, { useEffect, useState } from "react";

//improt styles
import "./App.css";

//import images
import sunnyBg from "./images/sunny2.jpg";
import cloudyBg from "./images/cloudy2.jpg";
import foggyBg from "./images/foggy.jpg";
import rainBg from "./images/rain.jpg";
import drizzleBg from "./images/drizzle.jpg";
import hazeBg from "./images/haze.jpg";
import snowBg from "./images/snow.jpg";
import chevronTop from "./images/chevron-top.png";

//import Components
import Data from "./Components/Data.jsx";
import Menu from "./Components/Menu.jsx";

//import windows size track
import { useWindowSize } from "react-use";

const App = () => {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);
  const [query, setQuery] = useState("London");
  const [error, setError] = useState(false);
  const [bg, setBg] = useState();
  const [menuActive, setMenuActive] = useState(false);

  const { width } = useWindowSize();
  const breakpoint = 768;

  useEffect(() => {
    const getWeather = async () => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setError(false);
        setWeather(data);
        if (recentSearch.length < 4) {
          if (recentSearch.length === 0) {
            setRecentSearch([]);
          }
          setRecentSearch((oldArray) => [...oldArray, query]);
        } else {
          recentSearch.reverse();
          recentSearch.unshift(query);
          recentSearch.pop();
          recentSearch.reverse();
        }
      } else {
        setError(true);
      }
    };
    getWeather();
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    const setBackground = () => {
      if (!weather.weather) return;
      const weatherType = weather.weather[0].main;

      switch (weatherType) {
        case "Clouds":
          return bgStyles(cloudyBg);

        case "Clear":
          return bgStyles(sunnyBg);

        case "Mist":
          return bgStyles(foggyBg);

        case "Rain":
          return bgStyles(rainBg);

        case "Drizzle":
          return bgStyles(drizzleBg);

        case "Haze":
          return bgStyles(hazeBg);

        case "Snow":
          return bgStyles(snowBg);

        default:
          return bgStyles(cloudyBg);
      }
    };

    const bgStyles = (bg) => {
      return {
        backgroundImage: `url(${bg})`,
      };
    };
    setBg(setBackground());
  }, [weather]);

  const updateSearch = (e) => setSearch(e.target.value);

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    setMenuActive(false);
  };

  const matchData = (e) => {
    setQuery(e.target.innerText);
    setMenuActive(false);
  };

  const toggleMenu = () => setMenuActive(!menuActive);

  const chevronStyles = () => {
    const styles = {
      ChevronUp: {
        transform: "rotate(0)",
      },
      ChevronDown: {
        transform: "rotate(180deg)",
      },
    };
    return menuActive ? styles.ChevronDown : styles.ChevronUp;
  };

  if (!weather.weather) {
    return <p>Loading</p>;
  }

  return (
    <div className="App" style={bg}>
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
        matchData={matchData}
        recentSearch={recentSearch}
        menuActive={menuActive}
        error={error}
      />
      {width > breakpoint ? (
        ""
      ) : (
        <button className="arrow" onClick={toggleMenu}>
          <img src={chevronTop} style={chevronStyles()} alt="chevron top" />
        </button>
      )}
    </div>
  );
};

export default App;
