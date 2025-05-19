"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export function AboutCommunity() {
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
              <Users className="w-6 h-6 text-trend-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Creating a Community of Passionate Sailors</h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <p className="text-white/90 leading-relaxed">
                We aim to create sailing addiction, a vacation-driven culture, and a continuous and passionate search
                for travel experiences. YAGA isn't just about individual journeys—it's about regrouping at the shore in
                vibrant pop-up events and keeping our community engaged in our ecosystem. We believe that the most
                beautiful part of sailing is the community it builds and the stories we create together, whether at sea
                or celebrating on land. By fostering these connections, we ensure that the YAGA experience extends far
                beyond your time on the water.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  {
                    title: "Vibrant Events",
                    description: "Pop-up gatherings that bring our sailing community together on shore",
                  },
                  {
                    title: "Shared Stories",
                    description: "Creating and sharing experiences that last a lifetime",
                  },
                  {
                    title: "Lasting Connections",
                    description: "Building relationships that extend beyond your time at sea",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                    <div className="relative z-10">
                      <h3 className="text-trend-yellow font-bold text-xl mb-2">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
