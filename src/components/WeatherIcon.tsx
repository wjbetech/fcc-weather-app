import React from "react";
import { WiCloud, WiDaySunny, WiRain, WiThunderstorm, WiSnow, WiFog } from "react-icons/wi";

export interface WeatherIconProps {
    iconName?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconName }) => {
  // Map weather condition to the corresponding icon component
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "Clouds":
        return <WiCloud />;
      case "Clear":
        return <WiDaySunny />;
      case "Rain":
        return <WiRain />;
      case "Thunderstorm":
        return <WiThunderstorm />;
      case "Snow":
        return <WiSnow />;
      case "Mist":
        return <WiFog />;
      default:
        return null;
    }
  };

  // If iconName is undefined, return null
  if (!iconName) {
    return null;
  }

  return (
    <div className="mt-4 mb-4 text-5xl">
      {getIconComponent(iconName)}
    </div>
  );
};

export default WeatherIcon;