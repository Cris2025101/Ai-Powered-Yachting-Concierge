"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function AboutImpact() {
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
              <Heart className="w-6 h-6 text-trend-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Tomorrow: Conscious Yachting, Amplified</h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Every Wave Lifts Another: Our Purpose Beyond Pleasure
              </h3>

              <p className="text-white/90 leading-relaxed">
                Perhaps our most significant evolution is our commitment to creating impact through our non-profit
                initiative: Every Wave Lifts Another. We don't organize escapes—we craft turning points.
              </p>

              <p className="text-white/90 leading-relaxed">
                When you sail with YAGA, you're powering healing and leadership journeys for vulnerable youth and
                adults. Your yacht experience directly funds life-changing programs for people who've hit rock bottom.
                Youth discover leadership possibilities at sea, while adults in recovery rebuild purpose through
                connection with the water.
              </p>

              <p className="text-white/90 leading-relaxed">
                This isn't about joining a trend. It's about becoming part of a global wave of impact and empathy where
                every sail lifts someone who had lost direction.
              </p>

              <div className="mt-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <h4 className="text-trend-yellow font-bold text-xl mb-2">Impact by Numbers</h4>
                      <p className="text-white/70">Our community's contribution to positive change</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-trend-yellow">250+</div>
                        <div className="text-white/70 text-sm">Youth Participants</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-trend-yellow">120+</div>
                        <div className="text-white/70 text-sm">Adult Recovery Journeys</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-trend-yellow">15</div>
                        <div className="text-white/70 text-sm">Partner Organizations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
