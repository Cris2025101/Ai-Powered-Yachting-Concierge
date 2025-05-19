"use client"

import { motion } from "framer-motion"
import { LoyaltyHero } from "@/components/loyalty/loyalty-hero"
import { LoyaltyFeatures } from "@/components/loyalty/loyalty-features"
import { LoyaltyRedemption } from "@/components/loyalty/loyalty-redemption"
import { LoyaltyTiers } from "@/components/loyalty/loyalty-tiers"
import { LoyaltyFAQ } from "@/components/loyalty/loyalty-faq"

export default function LoyaltyClubPage() {
  return (
    <motion.div
      className="min-h-screen bg-[#010A1E] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Global background elements */}
      <div className="fixed inset-0 z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-trend-yellow/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2 }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-trend-yellow/10 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.3 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/4 left-1/3 w-64 h-64 bg-trend-yellow/5 rounded-full blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 0.6 }}
        ></motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        <LoyaltyHero />
        <LoyaltyFeatures />
        <LoyaltyRedemption />
        <LoyaltyTiers />
        <LoyaltyFAQ />
      </div>
    </motion.div>
  )
}
