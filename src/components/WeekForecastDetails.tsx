import React from 'react'

// import components
import Container from "./Container"
import WeatherIcon from "./WeatherIcon"
import { WeatherIconProps } from "./WeatherIcon"

// import utils
import { convertTemp } from "@/utils/temperateConverter"
import WeatherColor from "@/utils/DailyWeatherIconColor"
import ForecastWeatherDetails from "./ForecastWeatherDetails"
import { metersToKilometers } from "@/utils/weatherDataFormatter"

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

export default function WeekForecastDetails(props: ForecastWeatherDetailsProps) {
  const weatherColor = WeatherColor(props.weatherIcon)
  return (
    <Container className="gap-4">
      
      {/* container left side: day info */}
      <section className="flex gap-4 items-center px-8">

        {/* left side forecast & date */}
        <div className="flex flex-col px-4 items-center h-[50%] justify-between">
          <p className="font-bold text-[18px]">{props.day} {props.date}</p>
          <div style={{ color: weatherColor }} className="scale-[1.75]">
            <WeatherIcon iconName={props.weatherIcon} />
          </div>
        </div>
        {/* right side weather data */}
        <div className="flex flex-col px-4 space-y-4 items-center">
          <span className="text-5xl">{convertTemp(props.temp ?? 0)}°</span>
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
      <section>
        <div className="flex flex-col px-4">

        </div>
      </section>
    </Container>
  )
}
