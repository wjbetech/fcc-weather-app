const WeatherColor = () => {
  // Map weather condition to the corresponding icon component
  const getWeatherColor = (weatherColor?: string) => {
    switch (weatherColor) {
      case "Clouds":
        return "#c3c4c7";
      case "Clear":
        return "#f2d675";
      case "Rain":
      case "Drizzle":
        return "#9ec2e6";
      case "Thunderstorm":
        return "#3582c4";
      case "Snow":
        return "#dcdcde";
      case "Atmosphere":
        return "#c3c4c7";
      default:
        return "#2c3338";
    }
  };
  return getWeatherColor;
}

export default WeatherColor;