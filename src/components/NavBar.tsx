"use client";

import React, { useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { cityAtom, loadingCityAtom } from "@/app/atom";

// components
import SearchBar from "./SearchBar";

// icons
import { FaSun } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

// API key
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export function NavBar({ location }: Props) {
  
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [_place, setPlace] = useAtom(cityAtom);
  const [_loading, setLoading] = useAtom(loadingCityAtom);

  // function to handle input and search for items to display
  async function handleInputChange(value: string) {
    setCity(value);

    // search for items and build suggestions
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${API_KEY}`)

        // build suggestions
        const suggestions = response.data.list.map((city: any) => city.name);
        setSuggestions(suggestions);
        setError("");
        setShowSuggestions(true);

      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      } 
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  // handle clicking suggested items
  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  // send an actual request
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();
    if (suggestions.length === 0) {
      setError("No results found.");
      setLoading(false);
    } else {
      setError("");
      setTimeout(() => {
        setShowSuggestions(false);
        setPlace(city);
        setLoading(false);
      }, 500);
    }
  }

  // function to use current location
  function handleUseCurrentLocation(e: React.FormEvent<HTML>): any {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position) => {
        const [lat, long] = [position.coords.latitude, position.coords.longitude];
        try {
          setLoading(true);
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`);
          setTimeout(() => {
            setLoading(false);
            setPlace(response.data.name);
          }, 500)
        } catch (error) {
          setLoading(false);
        }
      });
    }
  }

  return (
    <>
      <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white px-10">
          <div className="h-[80px] w-full flex justify-between items-center px-3 mx-auto">

              {/* left side title and icon */}
              <div className="flex items-center justify-center gap-5">
                  <h2 className="text-gray-700 text-3xl font-semibold">Weather App</h2>
                  <FaSun className="text-3xl text-yellow-400" />
              </div>

              {/* right side search bar */}
              <section className="gap-5 items-center hidden lg:flex">
                  <FaLocationCrosshairs 
                    className="text-2xl text-gray-700 cursor-pointer hover:opacity-80"
                    title="Your current location"
                    onClick={handleUseCurrentLocation}
                  />
                  <FaLocationDot 
                    className="text-2xl text-gray-700 cursor-pointer hover:opacity-80" 
                  />
                  <div className="text-slate-700/80 text-md font-medium w-[100px] truncate">
                      {location}
                  </div>

                  {/* search bar component */}
                  <SearchBar 
                    value={city}
                    onSubmit={handleSubmit}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                  <div className="relative">
                    <SuggestionsView 
                      {...{showSuggestions,
                        suggestions,
                        handleSuggestionClick,
                        error}}
                    />
                  </div>
              </section>
          </div>
      </nav>
      <section className="flex max-w-7xl pl-12 lg:hidden">
        <div className="relative">
          <SearchBar 
            value={city}
            onSubmit={handleSubmit}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <div className="relative bottom-5 left-5 z-50">
            <SuggestionsView 
              {...{showSuggestions,
                suggestions,
                handleSuggestionClick,
                error}}
            />
          </div>
        </div>
      </section>
    </>
  )
}

const SuggestionsView = ({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (suggestion: string) => void;
  error: string;
}) => {
  return (
    <>
    {((showSuggestions && suggestions.length > 1) || error) && 
      <ul className="mb-4 absolute top-[24px] right-[60px] bg-white border border-gray-300 rounded-md min-w-[230px] flex flex-col gap-1 py-2 px-2">
        {error && suggestions.length < 1 && <li className="font-semibold text-red-500 p-1">{error}</li>}
        {suggestions.map((suggestion) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <li 
            key={suggestion} 
            className="cursor-pointer p-1 rounded hover:bg-gray-200 border-gray-500"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </li>
        ))}
      </ul>
      }
    </>
  )
}