"use client"

import { FluidWaterCard } from "@/components/fluid-water-card"
import { TrendBackground } from "@/components/trend-background"
import { useState } from "react"

export default function CardsPage() {
  const [selectedColorScheme, setSelectedColorScheme] = useState<
    "blue" | "purple" | "teal" | "amber" | "green" | "yellow"
  >("yellow")

  const colorSchemes = ["blue", "purple", "teal", "amber", "green", "yellow"]

  return (
    <>
      {/* Background with blurred elements */}
      <TrendBackground />

      <div className="py-12 md:py-24 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">FluidWaterCard Examples</h2>
            <p className="mt-4 text-lg text-white/70">
              A showcase of the glass-morphism FluidWaterCard component with various configurations
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {colorSchemes.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedColorScheme === color
                      ? `bg-${color}-500/30 text-white`
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                  onClick={() => setSelectedColorScheme(color as any)}
                >
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Basic Card */}
            <FluidWaterCard colorScheme={selectedColorScheme} className="h-full">
              <h3 className="text-xl font-bold mb-2">Basic Card</h3>
              <p className="text-white/70">A simple glass-morphism card with the {selectedColorScheme} color scheme.</p>
            </FluidWaterCard>

            {/* Interactive Card with Glow */}
            <FluidWaterCard colorScheme={selectedColorScheme} glowOnHover={true} className="h-full">
              <h3 className="text-xl font-bold mb-2">Interactive with Glow</h3>
              <p className="text-white/70">This card has a glow effect on hover and subtle scaling animation.</p>
            </FluidWaterCard>

            {/* Private Charter Card */}
            <FluidWaterCard colorScheme={selectedColorScheme} privateCharterOnly={true} className="h-full">
              <h3 className="text-xl font-bold mb-2">Private Charter</h3>
              <p className="text-white/70">This card displays a private charter badge in the top right corner.</p>
            </FluidWaterCard>

            {/* AI Typing Card */}
            <FluidWaterCard
              colorScheme={selectedColorScheme}
              showAiTyping={true}
              typingMessages={[
                "Hello, I'm your yacht concierge",
                "I can help you find the perfect yacht",
                "Would you like to explore options?",
              ]}
              className="h-full"
            >
              <h3 className="text-xl font-bold mb-2">AI Typing Animation</h3>
              <p className="text-white/70">This card demonstrates the AI typing animation feature.</p>
            </FluidWaterCard>

            {/* Connected Cards */}
            <div className="space-y-8 md:col-span-2 lg:col-span-1">
              <FluidWaterCard colorScheme={selectedColorScheme} className="h-full">
                <h3 className="text-xl font-bold mb-2">Connected Cards</h3>
                <p className="text-white/70">These cards are connected with a visual line element.</p>
              </FluidWaterCard>

              <FluidWaterCard colorScheme={selectedColorScheme} showConnector={true} className="h-full">
                <h3 className="text-xl font-bold mb-2">Child Card</h3>
                <p className="text-white/70">This card is connected to the parent card above.</p>
              </FluidWaterCard>
            </div>

            {/* Solid Variant */}
            <FluidWaterCard variant="solid" colorScheme={selectedColorScheme} className="h-full">
              <h3 className="text-xl font-bold mb-2">Solid Variant</h3>
              <p className="text-white/70">This card uses the solid variant instead of the glass effect.</p>
            </FluidWaterCard>
          </div>
        </div>
      </div>
    </>
  )
}
