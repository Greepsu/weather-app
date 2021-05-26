import React from "react";

//import style
import "./style/data.css";

const Data = ({ city, weather, temp, icon }) => {
  const date = new Date();
  const dateLocale = date.toLocaleString("en-GB", {
    weekday: "long",
    month: "short",
    year: "2-digit",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
  });

  return (
    <div className="data">
      <span className="temperature">{Math.round(temp)}°</span>
      <div className="city-date">
        <p className="city">{city}</p>
        <p className="date">{dateLocale}</p>
      </div>
      <div className="weather">
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
        <span>{weather}</span>
      </div>
    </div>
  );
};

export default Data;
