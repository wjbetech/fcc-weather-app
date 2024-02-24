import React from 'react'
import { LuEye, LuGauge, LuSunrise, LuSunset, LuWaves, LuWind } from "react-icons/lu";

export interface ForecastWeatherDetailsProps {
    visibility?: string,
    humidity?: string,
    windSpeed?: string,
    airPressure?: string,
    sunrise?: string | number,
    sunset?: string | number
    min_temp?: string,
    max_temp?: string
}

export default function ForecastWeatherDetails(props: ForecastWeatherDetailsProps) {
  return (
    <>
        <SingleWeatherDetails 
            icon={<LuEye />}
            information="Visibility"
            value={props.visibility}
        />
        <SingleWeatherDetails 
            icon={<LuWaves/>}
            information="Humidity"
            value={props.humidity}
        />
        <SingleWeatherDetails 
            icon={<LuWind />}
            information="Wind Speed"
            value={props.windSpeed}
        />
        <SingleWeatherDetails 
            icon={<LuGauge/>}
            information="Air Pressure"
            value={props.airPressure}
        />
        <SingleWeatherDetails 
            icon={<LuSunrise/>}
            information="Sunrise"
            value={props.sunrise}
        />
        <SingleWeatherDetails 
            icon={<LuSunset/>}
            information="Sunset"
            value={props.sunset}
        />
    </>
  )
}

export interface SingleWeatherDetailsProps {
    information?: string,
    icon?: React.ReactNode;
    value?: string | number;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between items-center font-bold w-[15%] py-4 text-black/70">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}