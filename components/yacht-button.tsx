"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export function YachtButton() {
  const router = useRouter()

  return (
    <motion.button
      className="group flex items-center justify-center p-3 rounded-xl border border-amber-400/20 bg-[#0D1117]/80 text-amber-400 hover:bg-opacity-100 transition-all relative overflow-hidden"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => router.push("/yacht-results")}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Icon */}
      <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center mr-3 relative z-10">
        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
      </div>

      {/* Text */}
      <span className="font-medium relative z-10">Explore Yachts</span>
    </motion.button>
  )
} 