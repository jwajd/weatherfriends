/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "//api.openweathermap.org/data/2.5/",
    jsonkey: process.env.REACT_APP_JSON_KEY
}

var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = new Date();
  date = date.toLocaleDateString("en-US", options);

function App(){
    const[query, setQuery] = useState('');
    const[weather, setWeather] = useState({});
    const[loading, setLoading] = useState(false);
    const search = evt => {
        if (evt.key === "Enter") {
            setLoading(true);
            fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
                setLoading(false);
            });
        }
      }


    return(
        <div className="app">
            <main>
                <div className="search-box">
                    <input 
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                    />
                </div>
                {(typeof weather.main != "undefined") ? (

                <div className="info">
                    <div className="info-box">

                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{date}</div>
                    </div>

                    <div className="weather-box">
                        <div className="temp">
                            {weather.main.temp}°F
                        </div>
                        <div className="weather">{weather.weather[0].main}</div>
                    </div>
                </div>
                ) : ('')}

                
            </main>
        </div>
    )

}

export default App;

