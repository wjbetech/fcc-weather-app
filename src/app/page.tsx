"use client"

import React from "react"

// components
import { NavBar } from "@/components/NavBar"
import Container from "@/components/Container";
import WeatherIcon from "@/components/WeatherIcon";
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails";
import WeekForecastDetails from "@/components/WeekForecastDetails";

// libraries
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns/format";
import { fromUnixTime, parseISO } from "date-fns";

// utilities
import { convertTemp } from "@/utils/temperateConverter";
import WeatherColor from "@/utils/dailyWeatherIconColor";
import { metersToKilometers, humidityPercent, windSpeedInKms, airPressureBar } from "@/utils/weatherDataFormatter";
import { TWeatherData } from "@/utils/weatherDataTypes";

export default function Page() {
  
  // our API call
  const { isLoading, error, data } = useQuery<TWeatherData>("repoData", async () => {
      try {
          const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`);
        
          // Perform nullish check using optional chaining
          if (data?.city?.sunrise) {
              return data;
          }
      } catch (error) {
          throw new Error("Failed to fetch weather data");
      }
  });

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); // Start from tomorrow

  const uniqueDayData = [];
  for (let i = 0; i < 6; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + i);
      uniqueDayData.push(nextDate.toISOString().split("T")[0]);
  }

  const dailyData = uniqueDayData.map(date => {
      return data?.list?.find(entry => {
          const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
          const entryTime = new Date(entry.dt * 1000).getHours();
          return entryDate === date && entryTime >= 6;
      });
  }).filter(day => day !== undefined);
      
  const oneDayData = data?.list[0]; 
  console.log(dailyData);

  // dynamic logic for colors and loading state  
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
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-6 space-y-2">

        {/* today data */}
        <section className="px-10">
          <div className="space-y-4">

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
                {data?.list.slice(0, 12).map((data, i) => {
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
              {/* right section */}
              <Container className="h-[200px] font-semibold text-[18px] justify-between" style={{ backgroundColor: `${weatherColor}30` }}>
                <ForecastWeatherDetails 
                  visibility={metersToKilometers(oneDayData?.visibility ?? 10000)} 
                  humidity={humidityPercent(oneDayData?.main?.humidity ?? 50)} 
                  windSpeed={windSpeedInKms(oneDayData?.wind?.speed ?? 1.5)} 
                  airPressure={airPressureBar(oneDayData?.main?.pressure ?? 1000)}
                  sunrise={format(fromUnixTime(parseInt((data?.city?.sunrise ?? 0).toString(), 10)), "HH:mm")}
                  sunset={format(fromUnixTime(parseInt((data?.city?.sunset ?? 0).toString(), 10)), "HH:mm")}
                />
              </Container>
            </div>
          </div>
        </section>

        {/* one-week data */}
        <section className="flex w-full flex-col px-10 space-y-4">
          <div className="space-y-2">
            <h2 className="flex text-3xl items-end font-medium">5 Day Outlook</h2>
          </div>
          <div className="space-y-2">
            {dailyData?.map((day, i) => {
              return (
                <WeekForecastDetails 
                  key={day?.dt}
                  weatherIcon={day?.weather[0].main}
                  day={format(parseISO(day?.dt_txt ?? ""), "EEEE")}
                  date={format(parseISO(day?.dt_txt?? ""), "MM/yyyy")}
                  temp={convertTemp(day?.main?.temp ?? 0)}
                  visibility={metersToKilometers(day?.visibility ?? 10000)} 
                  humidity={humidityPercent(day?.main?.humidity ?? 50)} 
                  windSpeed={windSpeedInKms(day?.wind?.speed ?? 1.5)} 
                  airPressure={airPressureBar(day?.main?.pressure ?? 1000)}
                  temp_min={convertTemp(day?.main?.temp_min ?? 0)}
                  temp_max={convertTemp(day?.main?.temp_max ?? 0)}
                  feels_like={convertTemp(day?.main?.feels_like ?? 0)}
                  sunrise={format(fromUnixTime(parseInt((data?.city?.sunrise ?? 0).toString(), 10)), "HH:mm")}
                  sunset={format(fromUnixTime(parseInt((data?.city?.sunset ?? 0).toString(), 10)), "HH:mm")}
                />
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}