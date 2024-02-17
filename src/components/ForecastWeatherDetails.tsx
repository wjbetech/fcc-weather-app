import React from 'react'
import { LuEye, LuGauge, LuSunrise, LuSunset, LuWaves, LuWind } from "react-icons/lu";

export default function ForecastWeatherDetails() {
  return (
    <>
        <SingleWeatherDetails 
            icon={<LuEye />}
            information="Visibility"
            value=""
        />
        <SingleWeatherDetails 
            icon={<LuWaves/>}
            information="Humidity"
            value=""
        />
        <SingleWeatherDetails 
            icon={<LuWind />}
            information="Wind Speed"
            value=""
        />
        <SingleWeatherDetails 
            icon={<LuGauge/>}
            information="Air Pressure"
            value=""
        />
        <SingleWeatherDetails 
            icon={<LuSunrise/>}
            information="Sunrise"
            value=""
        />
        <SingleWeatherDetails 
            icon={<LuSunset/>}
            information="Sunset"
            value=""
        />
    </>
  )
}

export interface SingleWeatherDetailsProps {
    information?: string,
    icon?: React.ReactNode;
    value?: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-[16px] font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}