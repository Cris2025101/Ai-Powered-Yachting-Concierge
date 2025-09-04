"use client"
import { HeroSection } from "@/components/hero-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Home() {
  // Development check for React DevTools
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const devToolsInstalled = !!(window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!devToolsInstalled) {
        console.log(
          '%cReact DevTools not detected. Install for better development experience: https://react.dev/learn/react-developer-tools',
          'color: yellow; font-weight: bold;'
        );
      }
    }
  }, []);

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
      <div className="relative z-10">
        <HeroSection />

        {/* Divider with gradient - subtle spacing */}
        <div className="relative h-px w-full max-w-2xl mx-auto my-4">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        <WhyChooseSection />


      </div>
    </motion.div>
  )
}
