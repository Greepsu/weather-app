import React from "react";

//import styles
import "./style/menu.css";

//import images
import searchIcon from "../images/search-icon.png";

import { v4 as uuid_v4 } from "uuid";

//import windows size track
import {useWindowSize} from 'react-use';




const Menu = ({
  search,
  matchData,
  getSearch,
  updateSearch,
  recentSearch,
  menuActive,
  error,
  weather,
  winds,
  humidity,
  clouds,
}) => {
  const {width} = useWindowSize();
const breakpoint = 768;

  const setButtonColor = () => {
    if (weather === "Clouds") {
      return {
        backgroundColor: "#D66C05",
      };
    } else if (weather === "Clear") {
      return {
        backgroundColor: "#fbc72a",
      };
    } else if (weather === "Mist") {
      return {
        backgroundColor: "#91969C",
      };
    } else if (weather === "Rain") {
      return {
        backgroundColor: "#586760",
      };
    } else if (weather === "Drizzle") {
      return {
        backgroundColor: "white",
      };
    } else if (weather === "Haze") {
      return {
        backgroundColor: "#c8c4bd",
      };
    }
  };

  const inputColor = () => {
    if (weather === "Clear" || weather === "Haze") {
      return { color: "black" };
    }
  };

  const checkError = () => {
    if (error === true) {
      return {
        display: "inline",
      };
    } else if (error === false) {
      return {
        display: "none",
      };
    }
  };


  

  const menuStyles = () => {
    const styles = {
      Active: {
        transform: "translateY(100%)",
      },
      Inactive: {
        transform: "translateY(0)",
      },
    };
    if(width < breakpoint) {
      return menuActive ? styles.Inactive : styles.Active
    }
  }

  return (
    <div className="menu" style={menuStyles()}>
      <form onSubmit={getSearch}>
        <input
          type="text"
          placeholder="Another location..."
          value={search}
          onChange={updateSearch}
          style={inputColor()}
        />
        <p className="error" style={checkError()}>
          Enter a valid city.
        </p>
        <button type="submit" style={setButtonColor()}>
          <i>
            <img src={searchIcon} alt="search icon" />
          </i>
        </button>
      </form>
      <div className="previous-result">
        <ul>
          {recentSearch
            .map((item) => (
              <li key={uuid_v4()} onClick={matchData}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </li>
            ))
            .reverse()}
        </ul>
      </div>
      <hr />
      <div className="weather-detail">
        <h2>Weather Detail</h2>
        <div className="more-info">
          <p>
            Cloudy<span>{clouds}%</span>
          </p>
          <p>
            Humidity<span>{humidity}%</span>
          </p>
          <p>
            Wind<span>{winds}km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
