import React from 'react'

// className util
import { cn } from "@/utils/cn";

// icons
import { FaMagnifyingGlass } from "react-icons/fa6";

// typing (conditional className incase we don't use a class)
type Props = {
    value: string,
    className?: string,
    // grab the typing from the element!
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
}

// function to render a random global city
import searchBarCity from "@/utils/cityGenerator";

export default function SearchBar(props: Props) {
  return (
    <form onSubmit={props.onSubmit} className={cn("flex relative items-center justify-center h-10", props.className)}>
        <input 
            type="text" 
            placeholder={searchBarCity()} 
            value={props.value}
            className={cn("p-2 w-[230px] border border-gray-300 rounded-l-lg focus:outline-none font-medium focus:border-myTeal h-full placeholder:text-sm text-gray-700 bg-gray-50", props.className)} 
            onChange={props.onChange}  
        />
        <button 
            type="submit" 
            className={cn("px-3 py-2 bg-myTeal bg-opacity-80 text-white rounded-r-lg focus:outline-none hover:bg-opacity-100 whitespace-nowrap h-full border-myTeal", props.className)}
        >
            <FaMagnifyingGlass />
        </button>
    </form>
  )
}