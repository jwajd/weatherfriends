/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

    const search = evt => {
        if (evt.key === "Enter") {
          fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result);
              setQuery('');
              console.log(result);
            });
        }
      }

    const config = {
    headers: {
        "X-Master-Key": api.jsonkey
    }
    };
    const postInfo = async() => {
        const res = await axios.post('https://api.jsonbin.io/v3/b/', 
        {
            data: {
                number: 42
            },
        },
        { headers: { ...config.headers, "X-Bin-Private": false } })
        console.log(res);
    }
    
    const fetchInfo = async() => {
        const res = await axios.get('https://api.jsonbin.io/v3/b/60e11917fe016b59dd5b7183', {
            headers: { ...config.headers, "X-Bin-Meta": false } })

        console.log(res.data);
    }
    useEffect(() => {
        postInfo();
        fetchInfo();
    },);

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

