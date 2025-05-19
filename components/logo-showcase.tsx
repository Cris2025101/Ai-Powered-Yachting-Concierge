"use client"

import { useState } from "react"
import { YagaAiLogo } from "./yaga-logo"
import { motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { HexColorPicker } from "react-colorful"

export function LogoShowcase() {
  const [size, setSize] = useState(80)
  const [color, setColor] = useState("#FFD700")
  const [showText, setShowText] = useState(true)
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">YagaAiLogo Component</h2>
          <p className="mt-4 text-lg text-white/70">
            A customizable AI-powered logo component with dynamic neural network visualization
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Examples Column */}
          <div className="space-y-12">
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Basic Usage</h3>
                <div className="flex items-center justify-center py-8">
                  <YagaAiLogo />
                </div>
                <div className="mt-4 bg-black/30 rounded-md p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<YagaAiLogo />`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4">Customized Example</h3>
                <div className="flex items-center justify-center py-8">
                  <YagaAiLogo size={120} color="#00BFFF" showText={false} className="my-8" />
                </div>
                <div className="mt-4 bg-black/30 rounded-md p-4">
                  <pre className="text-sm overflow-x-auto">
                    <code>{`<YagaAiLogo 
  size={120} 
  color="#00BFFF" 
  showText={false} 
  className="my-8" 
/>`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Playground Column */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Interactive Playground</h3>

              <div className="flex flex-col items-center justify-center py-8">
                <YagaAiLogo size={size} color={color} showText={showText} />
              </div>

              <div className="space-y-6 mt-8">
                {/* Size Control */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="logo-size">Size: {size}px</Label>
                  </div>
                  <Slider
                    id="logo-size"
                    min={20}
                    max={200}
                    step={1}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                  />
                </div>

                {/* Color Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="logo-color">Color</Label>
                    <div
                      className="w-8 h-8 rounded-full border border-white/20 cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => setShowColorPicker(!showColorPicker)}
                    />
                  </div>

                  {showColorPicker && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-2"
                    >
                      <HexColorPicker color={color} onChange={setColor} />
                    </motion.div>
                  )}
                </div>

                {/* Show Text Control */}
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-text">Show Text</Label>
                  <Switch id="show-text" checked={showText} onCheckedChange={setShowText} />
                </div>
              </div>

              <div className="mt-8 bg-black/30 rounded-md p-4">
                <pre className="text-sm overflow-x-auto">
                  <code>{`<YagaAiLogo 
  size={${size}} 
  color="${color}" 
  showText={${showText}} 
/>`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
