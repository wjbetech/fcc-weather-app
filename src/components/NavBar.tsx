import React from "react";

// components
import SearchBar from "./SearchBar";

// icons
import { FaSun } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

export function NavBar() {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white px-10">
        <div className="h-[80px] w-full flex justify-between items-center px-3">

            {/* left side title and icon */}
            <div className="flex items-center justify-center gap-5">
                <h2 className="text-gray-700 text-3xl font-semibold">Weather App</h2>
                <FaSun className="text-3xl text-yellow-400" />
            </div>

            {/* right side search bar */}
            <section className="gap-5 items-center hidden lg:flex">
                <FaLocationCrosshairs className="text-2xl text-gray-700 cursor-pointer hover:opacity-80" />
                <FaLocationDot className="text-2xl text-gray-700 cursor-pointer hover:opacity-80" />

                {/* search bar component */}
                <div className="text-slate-700/80 text-md font-medium">
                    S. Korea
                </div>
                <SearchBar />
            </section>
        </div>
    </nav>
  )
}