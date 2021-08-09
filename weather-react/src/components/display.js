import React from "react";
import styled, { createGlobalStyle, css } from "styled-components";
import { getWeatherEmoji } from "../utils/displayHelper";

var options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
let date = new Date();
date = date.toLocaleDateString("en-US", options);

const InfoBox = styled.div({
  display: "flex",
  flexDirection: "column",
  border: '1px solid #EEEEEE',
  borderRadius: '10px',
  padding: '12px',
  boxShadow: '0px 4px 8px rgb(0, 0, 0, .15)',
  margin: '15px 0px',
});
const WeatherData = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const CityCountryLabel = styled.span({
  fontWeight: 300,
  color: "#3C3C3C",
  fontSize: "0.65em",
});
const FriendTitle = ({ title, city, country }) => {
  return (
    <h2 style={{marginBottom: 0}}>
      {title}{" "}
      <CityCountryLabel>
        {city}, {country}
      </CityCountryLabel>
    </h2>
  );
};
const Display = ({ weatherData, loading, title }) => {
  if (loading || !weatherData) {
    return null;
  }
  const {
    name,
    sys: { country },
    main: { temp },
  } = weatherData;
  const weatherName = weatherData.weather[0].main;
  const weatherEmoji = getWeatherEmoji(weatherName);
  return (
    <>
      <InfoBox>
      {title ? (
        <FriendTitle title={title} city={name} country={country} />
      ) : null}
        <WeatherData>
          <div style={{flexDirection: 'row'}}>
            <p style={{marginBottom: 0, fontSize: 30}}>{weatherEmoji}</p>
            <p style={{marginBottom: 0}}>{temp}°F</p>
          </div>
          <p style={{margin: 0}}>{weatherName}</p>
        </WeatherData>
      </InfoBox>
    </>
  );
};

export default Display;
