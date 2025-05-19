"use client"

import { motion } from "framer-motion"

export function WhyChooseSection() {
  const features = [
    {
      title: "Personalized Service",
      description: "Tailored recommendations and services based on your preferences and needs.",
    },
    {
      title: "24/7 Assistance",
      description: "Round-the-clock support for all your yachting requirements.",
    },
    {
      title: "AI-Powered",
      description: "Leveraging advanced AI to provide smarter, faster, and more efficient service.",
    },
  ]

  return (
    <section className="pt-2 pb-12 md:pb-24 lg:pb-32 relative flex justify-center">
      {/* Section-specific background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-1/4 right-1/3 w-72 h-72 bg-trend-yellow/5 rounded-full blur-[90px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
      </div>

      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="space-y-2 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Simple text heading without card frame */}
            <h2 className="text-xl font-medium tracking-tight sm:text-2xl md:text-3xl text-white/70 relative">
              Why Choose
              <motion.div
                className="absolute bottom-[-6px] left-1/2 h-px bg-trend-yellow/40 w-0"
                style={{ transform: "translateX(-50%)" }}
                initial={{ width: 0 }}
                whileInView={{ width: 40 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              ></motion.div>
            </h2>
          </motion.div>

          {/* Video Container */}
          <motion.div
            className="w-full max-w-4xl mt-12 rounded-xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5 relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Video gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-xl z-0"></div>

            {/* YouTube video embed */}
            <div className="aspect-video relative z-10">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/UDQJ2SHOxCI?start=13&autoplay=1&mute=1&loop=1&playlist=UDQJ2SHOxCI"
                title="Yacht Gatherings Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Feature card gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <h3 className="text-lg font-medium mb-2 relative z-10">{feature.title}</h3>
                <p className="text-white/70 relative z-10">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
