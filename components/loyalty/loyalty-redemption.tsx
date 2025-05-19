"use client"

import { motion } from "framer-motion"
import { GraduationCap, Gift, ChevronRight } from "lucide-react"

export function LoyaltyRedemption() {
  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Rewards: Choose Your Experience</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Redeem your SeaMiles for valuable training or discounts on your next adventure
            </p>
            <p className="text-trend-yellow/90 text-sm mt-4 max-w-2xl mx-auto">
              As soon as you qualify (after 1 booking), you get immediate and unlimited access to all modules, or the training boat when is the case, or you can redeem discounts—you choose.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option A: Training */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                    <GraduationCap className="w-6 h-6 text-trend-yellow" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Option A: Boat Club Training Access</h3>
                </div>

                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-trend-yellow font-bold text-xl mr-2">50</span>
                        <span className="text-white">SeaMiles</span>
                        <span className="text-white/60 mx-2">=</span>
                        <span className="text-white font-semibold">Full Access to Learning Modules</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm mb-1">
                      Free access to all online learning modules: Sailing Theory, Docking Techniques, Navigation Basics, RYA Exam Prep, Safety at Sea, and more. Learn at your pace and prepare for your next trip.
                    </p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-trend-yellow font-bold text-xl mr-2">100</span>
                        <span className="text-white">SeaMiles</span>
                        <span className="text-white/60 mx-2">=</span>
                        <span className="text-white font-semibold">Club Training Boat + RYA Instructor (7 days)</span>
                      </div>
                    </div>
                    <p className="text-white/80 text-sm">
                      Access our Club Training Boat for 7 days free of charge, plus a certified RYA instructor for 7 days focused on sailing skills, navigation, or boat handling—tailored to your experience level.
                    </p>
                  </div>
                </div>

                <motion.button
                  className="mt-6 w-full py-3 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center"
                  whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.3)" }}
                >
                  Learn More
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>

            {/* Option B: Discounts */}
            <motion.div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                    <Gift className="w-6 h-6 text-trend-yellow" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Option B: Discounts on Future Charters</h3>
                </div>

                <div className="space-y-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-trend-yellow font-bold text-xl mr-2">50</span>
                        <span className="text-white">SeaMiles</span>
                      </div>
                      <span className="text-white/60">=</span>
                      <span className="text-white font-medium">€150 Discount</span>
                    </div>
                    <p className="text-white/70 text-sm">Receive a €150 discount on your next charter booking.</p>
                  </div>

                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <span className="text-trend-yellow font-bold text-xl mr-2">100</span>
                        <span className="text-white">SeaMiles</span>
                      </div>
                      <span className="text-white/60">=</span>
                      <span className="text-white font-medium">€400 Discount</span>
                    </div>
                    <p className="text-white/70 text-sm">Receive a €400 discount on your next charter booking.</p>
                    <p className="text-white/70 text-sm mt-2">
                      Discounts apply to selected boats and dates, including priority access to our upcoming in-house
                      fleet.
                    </p>
                  </div>
                </div>

                <motion.button
                  className="mt-6 w-full py-3 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium flex items-center justify-center"
                  whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.3)" }}
                >
                  View Eligible Charters
                  <ChevronRight className="w-4 h-4 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* How to Track & Redeem */}
          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4 text-center">How to Track & Redeem Your SeaMiles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-trend-yellow/20 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                    <span className="text-trend-yellow font-bold">1</span>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-white font-medium mb-2">Automatic Tracking</h3>
                    <p className="text-white/70 text-sm">
                      After each booking, you'll receive an email summary: "You earned 30 SeaMiles on your last
                      charter!"
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-trend-yellow/20 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                    <span className="text-trend-yellow font-bold">2</span>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-white font-medium mb-2">Reach Threshold</h3>
                    <p className="text-white/70 text-sm">
                      Once you hit 50 SeaMiles, you'll be invited to redeem them for your chosen reward.
                    </p>
                  </div>
                </div>

                <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-4 relative">
                  <div className="absolute top-0 left-0 w-8 h-8 bg-trend-yellow/20 rounded-tl-lg rounded-br-lg flex items-center justify-center">
                    <span className="text-trend-yellow font-bold">3</span>
                  </div>
                  <div className="pt-6">
                    <h3 className="text-white font-medium mb-2">Choose & Redeem</h3>
                    <p className="text-white/70 text-sm">
                      Choose between a training session or charter discount, depending on your goals.
                    </p>
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
