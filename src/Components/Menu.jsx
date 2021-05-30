import React from "react";

//import styles
import "./style/menu.css";

//import images
import searchIcon from "../images/search-icon.png";

//import keys id
import { v4 as uuid_v4 } from "uuid";

//import windows size track
import { useWindowSize } from "react-use";

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
  const { width } = useWindowSize();
  const breakpoint = 768;

  const setButtonColor = () => {
    switch (weather) {
      case "Clouds":
        return colorStyles("#D66C05");

      case "Clear":
        return colorStyles("#fbc72a");

      case "Mist":
        return colorStyles("#91969C");

      case "Rain":
        return colorStyles("#586760");

      case "Drizzle":
        return colorStyles("#FFF");

      case "Haze":
        return colorStyles("#c8c4bd");

      case "Snow":
        return colorStyles("#91969C");

      default:
        return colorStyles("#D66C05");
    }
  };

  const colorStyles = (color) => {
    return {
      backgroundColor: color,
    };
  };

  const inputColor = () => {
    if (weather === "Clear" || weather === "Haze") {
      return { color: "black" };
    }
  };

  const checkError = () => {
    return error ? { display: "inline" } : { display: "none" };
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
    if (width < breakpoint) {
      return menuActive ? styles.Inactive : styles.Active;
    }
  };

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
