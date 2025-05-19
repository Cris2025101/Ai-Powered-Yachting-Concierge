"use client"

import { motion } from "framer-motion"
import { Cpu, Search, Anchor } from "lucide-react"

export function AboutTechnology() {
  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-4">
              <Cpu className="w-6 h-6 text-trend-yellow" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Today: Technology That Keeps the Romance Alive
            </h2>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10 space-y-6">
              <p className="text-white/90 leading-relaxed">
                Where We Are Now: Reimagining Yachting Through Technology Today,{" "}
                <span className="text-trend-yellow font-medium">We've</span> grown into the world's first AI-powered
                yachting concierge, pairing old-school wanderlust with a search engine that knows 20,000 vessels by
                heart. Tell us your dream—family catamaran, regatta-ready racer, or ultra-luxury playground—and our AI
                matches you with your perfect yacht, itinerary, and crew.
              </p>

              <p className="text-white/90 leading-relaxed">
                YAGA has evolved into the first AI-powered yachting concierge, bridging the timeless allure of sailing
                with cutting-edge innovation. At the heart of our platform is our powerful search engine, connecting you
                to over 20,000 yachts worldwide. This revolutionary tool helps match sailors with their perfect
                vessel—whether you're seeking a catamaran for a family adventure or a luxury yacht for an exclusive
                gathering.
              </p>

              <p className="text-white/90 leading-relaxed">
                Our technology doesn't replace the human element of sailing—it enhances it, making the extraordinary
                accessible to more passionate explorers.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              We've transformed how people discover and experience life at sea through:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Search className="w-5 h-5 text-trend-yellow" />,
                  title: "Advanced search capabilities",
                  description:
                    "Find your perfect yacht from our database of 20,000 vessels worldwide with precision matching that feels like magic",
                },
                {
                  icon: <Anchor className="w-5 h-5 text-trend-yellow" />,
                  title: "Precision-matched yacht discoveries",
                  description: "Based on your unique preferences",
                },
                {
                  icon: <Cpu className="w-5 h-5 text-trend-yellow" />,
                  title: "Curated yacht gatherings",
                  description: "For both leisure enthusiasts and training seekers",
                },
                {
                  icon: <Search className="w-5 h-5 text-trend-yellow" />,
                  title: "Private charter experiences",
                  description: "To locations conventional travel can't reach",
                },
                {
                  icon: <Cpu className="w-5 h-5 text-trend-yellow" />,
                  title: "Interactive learning modules",
                  description: "For those beginning their sailing journey or advanced",
                },
                {
                  icon: <Anchor className="w-5 h-5 text-trend-yellow" />,
                  title: "Provision generator & crew briefings",
                  description: "Specialized tools of AI Powered Yachting concierge to demystify the yachting world",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-trend-yellow/20 flex items-center justify-center mr-3">
                        {feature.icon}
                      </div>
                      <h4 className="text-white font-bold text-lg">{feature.title}</h4>
                    </div>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
