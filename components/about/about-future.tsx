"use client"

import { motion } from "framer-motion"
import { Compass } from "lucide-react"

export function AboutFuture() {
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
              Where We're Headed: The Future of Conscious Yachting
            </h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <p className="text-white/90 leading-relaxed">
                As we chart our course forward, YAGA continues to redefine what yachting can be. We're expanding our
                technological capabilities while deepening our commitment to communities and environments that welcome
                us.
              </p>

              <p className="text-white/90 leading-relaxed">
                The future of yachting isn't just about luxury—it's about meaningful connection, discovery, and giving
                back. It's about transforming "vacation" into "purpose." And it's about recognizing that the most
                powerful journeys happen when we sail together.
              </p>

              <p className="text-white/90 leading-relaxed">
                Join us as we navigate this exciting new horizon. With YAGA, you're not just finding the perfect yacht
                experience—you're becoming part of a movement that believes in the transformative power of the sea.
              </p>

              <p className="text-white/90 leading-relaxed font-medium text-center mt-8">That's the YAGA way.</p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <motion.button
              className="px-8 py-3 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium inline-flex items-center justify-center"
              whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.3)", y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Our Community
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
