const WeatherColor = (weatherColor?: string) => {
  switch (weatherColor) {
    case "Clouds":
      return "#c3c4c7";
    case "Clear":
      return "#f2d675";
    case "Rain":
    case "Drizzle":
      return "#3582c4";
    case "Thunderstorm":
      return "#0a4b78";
    case "Snow":
      return "#dcdcde";
    case "Atmosphere":
      return "#c3c4c7";
    default:
      return "#2c3338";
  }
};

export default WeatherColor;