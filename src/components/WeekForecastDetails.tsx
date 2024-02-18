import React from 'react'

// import components
import Container from "./Container"
import WeatherIcon from "./WeatherIcon"
import { WeatherIconProps } from "./WeatherIcon"

import WeatherColor from "@/utils/DailyWeatherIconColor"

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
      <section className="flex gap-4 items-center px-4">

        {/* left side forecast & date */}
        <div className="">
          <span style={{ color: weatherColor }}>
            <WeatherIcon iconName={props.weatherIcon} />
          </span>
          <p className="text-[16px] font-bold">{props.date}</p>
          <p className="text-[16px] font-bold">{props.day}</p>
        </div>
        {/* right side weather data */}
        <div className="flex flex-col px-4">
          
        </div>
      </section>

      {/* conditions */}
      <section>

      </section>
    </Container>
  )
}
