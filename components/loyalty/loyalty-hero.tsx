"use client"

import { motion } from "framer-motion"
import { Anchor, Award, Coins } from "lucide-react"

export function LoyaltyHero() {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-8 flex items-start justify-center relative">
      {/* Background elements specific to hero */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-0 right-1/4 w-80 h-80 bg-trend-yellow/10 rounded-full blur-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8 }}
        ></motion.div>
      </div>

      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="w-16 h-16 rounded-full bg-trend-yellow/20 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Coins className="w-8 h-8 text-trend-yellow" />
              </motion.div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4">
              SeaMiles
              <span
                className="text-trend-yellow relative ml-2"
                style={{
                  textShadow: "0 4px 8px rgba(255, 215, 0, 0.25)",
                  filter: "drop-shadow(0 2px 4px rgba(255, 215, 0, 0.2))",
                }}
              >
                Loyalty Program
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-trend-yellow/30 blur-sm"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">Rewarding Your Adventures at Sea</p>
          </div>

          <motion.div
            className="w-full max-w-4xl mx-auto space-y-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 md:p-8 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Why SeaMiles?</h2>
              <p className="text-lg text-white/80 relative z-10 max-w-2xl mx-auto">
                You've chartered with us — now it's time you get rewarded. Every qualified renter automatically earns
                SeaMiles, which can be exchanged for training sessions or discounts on future charters.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <motion.div
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="flex items-center justify-center mb-3">
                    <Anchor className="w-8 h-8 text-trend-yellow" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Charter Rewards</h3>
                  <p className="text-white/70 text-sm relative z-10">
                    Earn 10 SeaMiles for every €1,000 spent on your yacht charter bookings.
                  </p>
                </motion.div>

                <motion.div
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="flex items-center justify-center mb-3">
                    <Award className="w-8 h-8 text-trend-yellow" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Exclusive Benefits</h3>
                  <p className="text-white/70 text-sm relative z-10">
                    Redeem your SeaMiles for training sessions or discounts on future charters.
                  </p>
                </motion.div>

                <motion.div
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 relative overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="flex items-center justify-center mb-3">
                    <Coins className="w-8 h-8 text-trend-yellow" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 relative z-10">Automatic Enrollment</h3>
                  <p className="text-white/70 text-sm relative z-10">
                    No registration needed — just book and start earning SeaMiles immediately.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
