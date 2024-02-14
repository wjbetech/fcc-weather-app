// cn is short for className, and a cn file exports bundled classNames 

// import tailwind-merge
import { twMerge } from "tailwind-merge"

// import clsx
import clsx, { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
    return (
        twMerge(
            clsx(...inputs)
        )
    )
}