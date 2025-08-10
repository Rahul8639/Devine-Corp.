"use client"
 
import { TextScroll } from "./ui/text-scroll"

interface ParalaxTextProps {
  text?: string
  default_velocity?: number
  className?: string
}

export function ParalaxText({ 
  text = "Free Shipping · Free Returns · Secure Checkout · ", 
  default_velocity = -3, 
  className = "font-display text-center text-4xl font-semibold tracking-tighter text-black dark:text-white md:text-8xl md:leading-[10rem]"
}: ParalaxTextProps) {
  return (
    <div className="flex justify-center w-full h-50 py-8 overflow-visible">
      <TextScroll
        className={className}
        text={text}
        default_velocity={default_velocity}
      />
    </div>
  )
}
