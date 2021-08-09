export const emojiEnums = {
  Thunderstorm: "🌩️",
  Rain: "🌧️",
  Clouds: "☁️",
  Haze: "🌫️",
  Fog: "🌫️",
  Clear: "🌞"
};

export const getWeatherEmoji = (weatherString) => emojiEnums[weatherString] || "🤔";
