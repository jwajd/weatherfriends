export const emojiEnums = {
  Thunderstorm: "đŠī¸",
  Rain: "đ§ī¸",
  Clouds: "âī¸",
  Haze: "đĢī¸",
  Fog: "đĢī¸",
  Clear: "đ"
};

export const getWeatherEmoji = (weatherString) => emojiEnums[weatherString] || "đ¤";
