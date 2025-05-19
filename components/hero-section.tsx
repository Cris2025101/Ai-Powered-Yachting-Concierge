"use client"
import { CircleIcon } from "lucide-react"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { useState } from "react"
import { NavigationModal } from "./navigation-modal"

export function HeroSection() {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="pt-20 sm:pt-24 md:pt-28 pb-4 flex items-start justify-center relative">
      {/* Navigation Modal */}
      <NavigationModal isOpen={isNavigationOpen} onClose={() => setIsNavigationOpen(false)} />

      {/* Background elements specific to hero */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 bg-trend-yellow/10 rounded-full blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/3 left-1/3 w-64 h-64 bg-trend-yellow/10 rounded-full blur-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 0.3 }}
        ></motion.div>
      </div>

      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div className="flex flex-col space-y-8" variants={container} initial="hidden" animate="show">
          <motion.div className="w-full" variants={item}>
            <div className="relative rounded-xl border border-white/10 bg-transparent p-8 md:p-12 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white">
                Your AI-Powered
                <br />
                <span
                  className="text-trend-yellow relative"
                  style={{
                    textShadow: "0 4px 8px rgba(255, 215, 0, 0.25)",
                    filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                  }}
                >
                  Yachting Concierge
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-trend-yellow/30 blur-sm"></span>
                </span>
              </h1>
            </div>
          </motion.div>

          <motion.div className="w-full max-w-2xl space-y-4 mt-6" variants={item}>
            <div className="relative z-10">
              <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 text-left">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
                <TypeAnimation
                  sequence={[
                    "Hello, I am YAGA AI, your yachting concierge.\nI'm here to help you navigate. You can engage with me directly or use manual options to find your ideal yacht, or experience.",
                    2000,
                    "I can recommend the perfect yacht based on your preferences, group size, and budget.",
                    1500,
                    "Not sure where to sail? I'll suggest the best destinations based on your experience level.",
                    1500,
                    "From beginner-friendly routes to advanced sailing challenges, I'll guide you through every step.",
                    1500,
                  ]}
                  wrapper="p"
                  speed={70}
                  className="text-base md:text-lg lg:text-xl text-foreground/80 whitespace-pre-line relative z-10 leading-relaxed"
                  repeat={Number.POSITIVE_INFINITY}
                  cursor={true}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigator button - now opens the navigation modal */}
        <div className="flex justify-center w-full mt-8 mb-2">
          <motion.button
            className="inline-flex items-center justify-center rounded-full bg-background/50 px-6 py-2.5 text-foreground hover:bg-background/70 border border-white/10 text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => setIsNavigationOpen(true)}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <CircleIcon className="mr-2 h-4 w-4 md:h-5 md:w-5 text-primary" />
            </motion.div>
            Navigator
          </motion.button>
        </div>
      </div>
    </section>
  )
}
