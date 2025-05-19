"use client"

import { motion } from "framer-motion"
import { Crown, Star, Check, Anchor } from "lucide-react"

export function LoyaltyTiers() {
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
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Crown className="w-6 h-6 text-trend-yellow" />
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Captain's Circle</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Exclusive tier for our most loyal clients who earn over 200 SeaMiles in a year
            </p>
          </div>

          <motion.div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

            <div className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                      <Star className="w-5 h-5 text-trend-yellow" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Exclusive Benefits</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Invitation-Only Events</h4>
                        <p className="text-white/70 text-sm">
                          Access to exclusive yacht gatherings and networking events with fellow enthusiasts.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Priority Booking Access</h4>
                        <p className="text-white/70 text-sm">
                          Book prime dates and popular yachts before they're available to the general public.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Special Pricing</h4>
                        <p className="text-white/70 text-sm">
                          Special rates and exclusive offers available only to Captain's Circle members.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                      <Anchor className="w-5 h-5 text-trend-yellow" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Additional Perks</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">First Access to New Boats</h4>
                        <p className="text-white/70 text-sm">
                          Be the first to charter our newest additions to the fleet, including our own boats.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Exclusive Events & Sea Trials</h4>
                        <p className="text-white/70 text-sm">
                          Participate in special events and test new yachts before they join our charter fleet.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <Check className="w-5 h-5 text-trend-yellow" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">Complimentary Upgrades</h4>
                        <p className="text-white/70 text-sm">Free seasonal gear or charter upgrades when available.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  className="px-8 py-3 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium inline-flex items-center justify-center"
                  whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.3)" }}
                >
                  Learn How to Join Captain's Circle
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
