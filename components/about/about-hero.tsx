"use client"

import { motion } from "framer-motion"
import { Anchor } from "lucide-react"

export function AboutHero() {
  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.div
              className="w-16 h-16 rounded-full bg-trend-yellow/20 flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Anchor className="w-8 h-8 text-trend-yellow" />
            </motion.div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white text-center">
            About YAGA:
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mt-2 mb-6">
            The First AI-Powered Yachting Concierge
          </h2>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto text-center">
                Join us as we navigate this exciting new horizon. With YAGA, you're not just finding the perfect yacht
                experience—you're becoming part of a movement that believes in the transformative power of the sea.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
