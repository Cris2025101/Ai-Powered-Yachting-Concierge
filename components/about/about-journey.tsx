"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"
import { FluidWaterCard } from "@/components/fluid-water-card"

const timeline = [
  {
    year: "2019",
    title: "First Sailing Trip",
    desc: "The first sailing trip brings together 32 passionate sailors, laying the foundation for a community built on exploration, connection, and love for the sea.",
  },
  {
    year: "2020",
    title: "First Official Yacht Gathering",
    desc: "YAGA hosts its first official yacht gathering, marking the beginning of a new era for intimate music festivals sailing experiences.",
  },
  {
    year: "2023",
    title: "Retreats & Wellness",
    desc: "The journey evolves with the introduction of the retreats, bringing deeper meaning to our voyages and transforming them into wellness and personal growth experiences.",
  },
  {
    year: "2024",
    title: "Technology Integration",
    desc: "YAGA begins developing AI-powered matching technology for yacht experiences. Integration of AI-powered technology, reshaping the way travelers find their perfect yacht experiences.",
  },
  {
    year: "2025",
    title: "Global Expansion",
    desc: "YAGA expands globally, bringing its unique blend of sailing, impact, and cutting-edge concierge services to a worldwide audience.",
  },
]

export function AboutJourney() {
  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-4">
              <Compass className="w-6 h-6 text-trend-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Our <span className="text-trend-yellow">Journey</span>: From Intimate Gatherings to Global Innovation
            </h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <p className="text-white/90 leading-relaxed">
                What began as an exclusive gathering of sea enthusiasts has evolved into something truly transformative.
                YAGA—named for Yacht Gatherings—started with a simple belief: that the most meaningful experiences
                happen in intimate settings, where the horizon stretches endlessly and "with sea view" isn't a luxury,
                but simply the way life should be.
              </p>

              <p className="text-white/90 leading-relaxed">
                We began by bringing together those who shared our passion for exploring hidden Mediterranean coves and
                Caribbean bays that conventional travel could never reach. Those early floating festivals, holistic
                retreats, and pop-up events weren't just gatherings—they were the building blocks of a community bound
                by saltwater and possibility.
              </p>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row gap-6 justify-center w-full max-w-6xl mt-4">
            {timeline.map((item) => (
              <FluidWaterCard
                key={item.year}
                variant="glass"
                colorScheme="blue"
                className="flex-1 min-w-[220px]"
              >
                <div className="text-yellow-400 font-bold text-lg mb-1">{item.year}</div>
                <div className="font-semibold text-white text-lg mb-1">{item.title}</div>
                <div className="text-white/80 text-base">{item.desc}</div>
              </FluidWaterCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
