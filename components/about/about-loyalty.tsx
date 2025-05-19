"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

export function AboutLoyalty() {
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
              <Award className="w-6 h-6 text-trend-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">A Tribe That Keeps Returning—And Why</h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Rewarding Loyalty: Growing Together at Sea</h3>

              <p className="text-white/90 leading-relaxed">
                At YAGA, we believe in building lasting relationships with our guests. We're deeply committed to
                rewarding your loyalty and supporting your growth as a sailor. Our returning guests enjoy exclusive
                benefits including access to our private Club yacht for specialized training sessions with certified
                instructors, comprehensive online learning modules, and substantial discounts on future charters.
              </p>

              <p className="text-white/90 leading-relaxed">
                We've designed our loyalty approach to ensure your journey with sailing never stops evolving—whether
                you're advancing your skills through hands-on training with our RYA instructors or expanding your
                knowledge through our curated educational resources. Because at YAGA, we don't just want to provide you
                with amazing experiences—we want to be your lifetime companion in maritime discovery and growth.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-trend-yellow font-bold text-xl mb-2">Exclusive Training</h3>
                    <p className="text-white/70">
                      Access to our private Club yacht for specialized training sessions with certified RYA instructors
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10">
                    <h3 className="text-trend-yellow font-bold text-xl mb-2">Charter Discounts</h3>
                    <p className="text-white/70">
                      Substantial savings on future bookings for our loyal community members
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
