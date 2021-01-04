import React from 'react';
import './style/menu.css'

const Menu = ({search, matchData, getSearch, updateSearch, getRecentSearch, recentSearch, error, weather, winds, humidity, clouds}) => {

    const setButtonColor = () => {
        if(weather === 'Clouds'){
          return {
            backgroundColor: '#D66C05'
          };
        }else if(weather === 'Clear'){
          return {
            backgroundColor: '#fbc72a',
          };
        }else if(weather === 'Mist'){
          return {
            backgroundColor: '#91969C'
          };
        }else if(weather === 'Rain'){
          return {
            backgroundColor: '#586760'
          };
        }else if(weather === 'Drizzle'){
          return {
            backgroundColor: 'white'
          };
        }else if(weather === 'Haze'){
          return{
            backgroundColor : '#c8c4bd'
          }
        }
      }

      const inputColor = () => {
        if(weather === 'Clear' || weather === 'Haze'){
          return { color: 'black' }
        }
      }

      const checkError = () => {
        console.log(error);
        if(error === true){
          return {
            display: 'inline'
          }
        }else if(error === false){
          return {
            display: 'none'
          }
        }
      }

    return(
        <div className="menu">
            <form onSubmit={getSearch}>
                <input type="text" placeholder="Another location..." value={search} onChange={updateSearch} style={inputColor()} />
                <p className="error" style={checkError()} >Enter a valid city.</p>
                <button type="submit" onClick={getRecentSearch} style={setButtonColor()} ><i className="fas fa-search"></i></button>
            </form>
            <div className="previous-result">
                <ul>
                    {
                        recentSearch.map(item => (
                            <li onClick={matchData} >{item.charAt(0).toUpperCase() + item.slice(1)}</li>
                        )).reverse()
                        
                    }
                </ul>
            </div>
            <hr/>
            <div className="weather-detail">
                <h1>Weather Detail</h1>
                <div className="more-info">
                    <p>Cloudy<span>{clouds}%</span></p>
                    <p>Humidity<span>{humidity}%</span></p>
                    <p>Wind<span>{winds}km/h</span></p>
                </div>
            </div>
        </div>
    )
}

export default Menu;