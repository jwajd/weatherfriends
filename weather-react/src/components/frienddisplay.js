import React from 'react'

var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = new Date();
  date = date.toLocaleDateString("en-US", options);

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: "http://pro.openweathermap.org/data/2.5/",
    jsonkey: process.env.REACT_APP_JSON_KEY
}

const SFW = async ({data}) => {
    const data2 = await fetch(`${api.base}weather?q=${data}&units=imperial&APPID=${api.key}`)
    .then(res => res.json())
    return <Display weatherData={data2}/>
}

const Display = (props) => {
        return(
            <div className="info">
                <div className="info-box">

                    <div className="location">{props.weatherData.name}, {props.weatherData.sys.country}</div>
                    <div className="date">{date}</div>
                </div>

                <div className="weather-box">
                    <div className="temp">
                        {props.weatherData.main.temp}°F
                    </div>
                    <div className="weather">{props.weatherData.weather[0].main}</div>
                </div>
            </div>
        )
    }

    

       
    





export default SFW;
