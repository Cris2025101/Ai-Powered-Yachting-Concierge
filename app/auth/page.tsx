"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TrendBackground } from "@/components/trend-background"
import { AuthCard } from "@/components/auth/auth-card"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin")

  return (
    <motion.div
      className="min-h-screen bg-[#010A1E] relative overflow-hidden flex items-center justify-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background with blurred elements */}
      <TrendBackground />

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AuthCard activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
      </div>
    </motion.div>
  )
}
