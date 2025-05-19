"use client"

import { motion } from "framer-motion"
import { Check, Users } from "lucide-react"
import { useState } from "react"

export function LoyaltyFeatures() {
  const [charterCost, setCharterCost] = useState(0)
  const minCost = 0;
  const maxCost = 40000;
  const seaMiles = Math.floor(charterCost / 1000) * 10
  const maxMiles = 200
  const progress = Math.min(seaMiles / maxMiles, 1) * 100
  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Eligibility Card */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-trend-yellow" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white relative z-10">Who's Eligible?</h2>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-white/80">
                  Any client who has completed at least one yacht charter this year is enrolled automatically.
                </p>
                <p className="text-white/80">
                  No registration, no hidden terms — just perks for returning to sea with us.
                </p>
                <div className="flex items-center text-trend-yellow">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Automatic enrollment with your first charter</span>
                </div>
              </div>
            </motion.div>

            {/* How SeaMiles Work Card */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-trend-yellow"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white relative z-10">How SeaMiles Work</h2>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-white/80">For every €1,000 spent on a booking, you earn 10 SeaMiles.</p>
                <p className="text-white/80">
                  SeaMiles are tracked from your booking history and redeemable once you reach 50 SeaMiles.
                </p>
                <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                  <p className="text-white font-medium">Example: A €5,000 charter = 50 SeaMiles</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SeaMiles Calculator */}
          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 text-center">SeaMiles Calculator</h2>
              <div className="max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Charter Cost (€)</label>
                    <div className="relative mb-3">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
                      <input
                        type="number"
                        className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-8 py-2 text-white focus:outline-none focus:ring-1 focus:ring-trend-yellow"
                        placeholder="0"
                        value={charterCost === 0 ? '' : charterCost}
                        min={minCost}
                        max={maxCost}
                        onChange={e => setCharterCost(Number(e.target.value) || 0)}
                      />
                    </div>
                    <input
                      type="range"
                      min={minCost}
                      max={maxCost}
                      step={100}
                      value={charterCost}
                      onChange={e => setCharterCost(Number(e.target.value))}
                      className="w-full accent-trend-yellow"
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-1">
                      <span>€0</span>
                      <span>€40,000</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-center">
                      <p className="text-white/60 text-sm">You'll earn</p>
                      <div className="flex items-center justify-center">
                        <span className="text-3xl font-bold text-trend-yellow">{seaMiles}</span>
                        <span className="ml-2 text-white">SeaMiles</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-white/10 rounded-full h-2 mb-2">
                    <div className="bg-trend-yellow h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/60">
                    <span>0 SeaMiles</span>
                    <span>50 SeaMiles (Reward Threshold)</span>
                    <span>100 SeaMiles</span>
                    <span>200 SeaMiles (Captain's Circle)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
