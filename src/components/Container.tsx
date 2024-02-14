import React from 'react'

// library dependencies
import { cn } from "@/utils/cn"

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div {...props} className={cn("w-full bg-white border rounded-xl flex py-4 px-3 shadow-sm", props.className)}
        
    />
  )
}