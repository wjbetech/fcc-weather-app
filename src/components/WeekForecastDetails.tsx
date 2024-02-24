import React from 'react'

// import components
import Container from "./Container"
import WeatherIcon from "./WeatherIcon"
import { WeatherIconProps } from "./WeatherIcon"

// import utils
import { convertTemp } from "@/utils/temperateConverter"
import WeatherColor from "@/utils/dailyWeatherIconColor"
import ForecastWeatherDetails from "./ForecastWeatherDetails"

export interface ForecastWeatherDetailsProps extends WeatherIconProps {
  visibility?: string,
  humidity?: string,
  windSpeed?: string,
  airPressure?: string,
  sunrise?: string | number,
  sunset?: string | number,
  date?: string,
  day?: string,
  temp?: number,
  feels_like?: number,
  temp_min?: number,
  temp_max?: number,
  description?: string,
  weatherIcon?: string,
}

export default function WeekForecastDetails(
  props: ForecastWeatherDetailsProps
) {
  const {
    visibility,
    humidity,
    windSpeed,
    airPressure,
    sunrise,
    sunset,
  } = props;
  const weatherColor = WeatherColor(props.weatherIcon)
  return (
    <Container className="gap-4 flex w-full h-[200px]">
      
      {/* container left side: day info */}
      <section className="flex gap-4 items-center">

        {/* left side forecast & date */}
        <div className="flex flex-col items-center min-w-[150px] h-[70%] pl-6">
          <p className="font-semibold text-[18px]">{props.day}</p>
          <p className=" text-[14px]">{props.date}</p>
          <div style={{ color: weatherColor }} className="scale-[1.5] mt-2">
            <WeatherIcon iconName={props.weatherIcon} />
          </div>
        </div>
        {/* right side weather data */}
        <div className="flex flex-col space-y-4 items-center min-w-[150px]">
          <span className="text-3xl">{props.temp ?? 0}°</span>
          <p className="text-md space-x-1 whitespace-nowrap font-bold">
            Feels Like: {props.feels_like}°
          </p>
          <p className="text-md space-x-1 whitespace-nowrap font-bold text-gray-400">
            <span>↓{props.temp_min}°</span>
            {"  "}
            <span>{props.temp_max}°↑</span>
          </p>
        </div>
      </section>

      {/* conditions */}
      <section className="flex items-center">
        <div className="flex gap-[3.7rem] h-40">
            <ForecastWeatherDetails {...props}  />
        </div>
      </section>
    </Container>
  )
}
