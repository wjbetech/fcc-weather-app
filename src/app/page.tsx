"use client"

import React from "react"

// components
import { NavBar } from "@/components/NavBar"
import Container from "@/components/Container";

// libraries
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";

// icons
import { FaCloud } from "react-icons/fa6";

// utilities
import { convertTemp } from "@/utils/convertTemp";

// types from data in chatgpt
interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherInfo[];
  city: CityInfo;
}

interface WeatherInfo {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}


export default function Page() {
  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`);
    return data;
  });

  console.log(data);

  const oneDayData = data?.list[0];

  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <h1 className="text-3xl">Loading...</h1>
    </div>
  )
  if (error) return `An error has occurred:  + ${error}`

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <NavBar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-6">

        {/* today data */}
        <section className="px-10 space-y-4">
          <div className="space-y-2">

            {/* parse today's day and date */}
            <h2 className="flex gap-4 text-3xl items-baseline font-medium">
              {format(parseISO(oneDayData?.dt_txt ?? ""), "EEEE")}
              <span className="text-[18px]">
                {format(parseISO(oneDayData?.dt_txt ?? ""), "dd/MM/yyyy")}
              </span>
            </h2>

            {/* parse the temp info for today */}
            <Container className="gap-10 px-6 items-center">
              <div className="flex flex-col px-4 justify-center text-center py-8">
                <span className="text-5xl m-auto mb-4 text-gray-400">{oneDayData?.weather[0].main === "Clouds" && <FaCloud />}</span>
                <h1 className="text-5xl pb-4">{convertTemp(oneDayData?.main?.temp ?? 0)}°</h1>
                <p className="text-md space-x-1 whitespace-nowrap">
                  Feels Like: {convertTemp(oneDayData?.main?.feels_like ?? 0)}°
                </p>
                <p className="text-md space-x-1 whitespace-nowrap">
                  <span>↓{convertTemp(oneDayData?.main?.temp_min ?? 0)}°</span>
                  {"  "}
                  <span>{convertTemp(oneDayData?.main?.temp_max ?? 0)}°↑</span>
                </p>
              </div>

              {/* 3-hr updates */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between">
                {data?.list.map((data, i) => (

                  // each time slot
                  <div key={i} className="flex flex-col justify-between gap-2 items-center text-[14px] font-semibold">

                    {/* time */}
                    <p className="whitespace-nowrap">
                      {format(parseISO(data.dt_txt), "h:mm a")}
                    </p>

                    {/* weather icon */}
                    <p>
                      
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>

        {/* one-week data */}
        <section className="px-10 space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-3xl items-end font-medium">One Week Outlook</h2>
          </div>
          <Container />
        </section>
      </main>
    </div>
  )
}