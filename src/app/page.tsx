"use client"

import React from "react"

// components
import { NavBar } from "@/components/NavBar"
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";

// libraries
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns/format";
import { parseISO } from "date-fns";

// utilities
import { convertTemp } from "@/utils/convertTemp";
import WeatherColor from "@/utils/DailyWeatherIconColor";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";

// types from data in chatgpt
// try moving these types into a util file
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
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=12`);
    return data;
  });

  console.log(data);

  const oneDayData = data?.list[0];

  const weatherColor = WeatherColor(oneDayData?.weather[0]?.main);

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
            <Container className="gap-12 px-12 items-center">
              <div className="flex flex-col px-4 justify-center text-center space-y-2 py-4">
                <span className="m-auto mb-4 scale-[2]" style={{ color: weatherColor }}>
                  <WeatherIcon iconName={oneDayData?.weather[0]?.main} />
                </span>
                <h1 className="text-5xl pb-4">{convertTemp(oneDayData?.main?.temp ?? 0)}°</h1>
                <p className="text-md space-x-1 whitespace-nowrap font-bold">
                  Feels Like: {convertTemp(oneDayData?.main?.feels_like ?? 0)}°
                </p>
                <p className="text-md space-x-1 whitespace-nowrap font-bold text-gray-400">
                  <span>↓{convertTemp(oneDayData?.main?.temp_min ?? 0)}°</span>
                  {"  "}
                  <span>{convertTemp(oneDayData?.main?.temp_max ?? 0)}°↑</span>
                </p>
              </div>

              {/* 3-hr updates */}
              <div className="hr-scrollbar flex gap-2 sm:gap-4 overflow-x-auto w-full justify-between py-2">
                {data?.list.map((data, i) => {
                  return (

                    // each time slot
                    <div key={data.dt} className="flex flex-col items-center text-[14px] py-8 mb-1 px-12 w-96 font-semibold bg-gray-100 rounded-md">

                      {/* time */}
                      <p className="whitespace-nowrap text-lg">
                        {format(parseISO(data.dt_txt), "h:mm a")}
                      </p>

                      {/* temp & weather icon */}
                      <p className="text-xl text-center">
                        <WeatherIcon iconName={data?.weather[0]?.main} />
                        {convertTemp(data?.main.temp ?? 0)}°
                      </p>
                    </div>
                  );
                })}
              </div>
            </Container>
            <div className="flex gap-4">
              {/* left section */}
              <Container className="h-[200px] w-[150px] p-10">
                <h1 className="text-2xl font-bold capitalize items-center justify-center m-auto">{oneDayData?.weather[0]?.description}</h1>
              </Container>
              {/* right section */}
              <Container className="h-[200px] p-10 font-semibold text-[18px]" style={{ backgroundColor: `${weatherColor}40` }}>
                <ForecastWeatherDetails />
              </Container>
            </div>
          </div>
        </section>

        {/* one-week data */}
        <section className="flex w-full flex-col px-10 space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-3xl items-end font-medium">One Week Outlook</h2>
          </div>
          <div className="space-y-2">
            <Container>
              
            </Container>
          </div>
        </section>
      </main>
    </div>
  )
}