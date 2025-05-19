"use client"

import { motion } from "framer-motion"

interface TrendBackgroundProps {
  className?: string
}

export function TrendBackground({ className }: TrendBackgroundProps) {
  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
      ></motion.div>
    </div>
  )
}
