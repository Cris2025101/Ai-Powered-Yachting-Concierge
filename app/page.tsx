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

        {/* Footer area with glass effect */}
        <motion.div
          className="mt-16 py-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="absolute inset-0 backdrop-blur-md bg-white/5 border-t border-white/10 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold mb-2">Exclusive Loyalty Member Club</h3>
                <p className="text-white/70">Only 250 spots available - join the elite</p>

                {/* Progress bar */}
                <div className="mt-4 w-full max-w-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">72 members</span>
                    <span className="text-white/80">250 spots</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-trend-yellow to-trend-yellow/70 rounded-full"
                      style={{ width: "28.8%" }} // 72/250 = 28.8%
                    ></div>
                  </div>
                </div>
              </div>

              <motion.button
                className="px-6 py-3 rounded-full bg-trend-yellow/20 backdrop-blur-sm border border-trend-yellow/30 text-white font-medium"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 215, 0, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Join Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
