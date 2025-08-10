"use client"

import { ParalaxText } from "@/components/ParalaxText"

export default function ParallaxDemoPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black dark:text-white">
          Parallax Text Demo
        </h1>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Default Parallax Text
            </h2>
            <ParalaxText />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Custom Text
            </h2>
            <ParalaxText text="Amazing Parallax Effect  " />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Faster Speed
            </h2>
            <ParalaxText 
              text="Fast Scrolling Text  " 
              default_velocity={10}
            />
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Custom Styling
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg">
              <ParalaxText 
                text="Styled Text  " 
                className="font-bold text-2xl text-blue-600 dark:text-blue-400 md:text-5xl"
              />
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Slower Speed
            </h2>
            <ParalaxText 
              text="Slow and Steady  " 
              default_velocity={2}
            />
          </section>
        </div>
      </div>
    </div>
  )
}
