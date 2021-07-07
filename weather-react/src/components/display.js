import React from 'react'

var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = new Date();
  date = date.toLocaleDateString("en-US", options);

const Display = (props) => {
    if(props.loading === false){
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
    else{
        return null;
    }
}

    

       
    





export default Display;
