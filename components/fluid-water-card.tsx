"use client"

import type React from "react"
import { useState } from "react"
import { TypeAnimation } from "react-type-animation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export type ColorScheme = "blue" | "purple" | "teal" | "amber" | "green" | "yellow"

export interface FluidWaterCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid"
  colorScheme?: ColorScheme
  showConnector?: boolean
  interactive?: boolean
  glowOnHover?: boolean
  privateCharterOnly?: boolean
  showAiTyping?: boolean
  typingMessages?: string[]
  children?: React.ReactNode
}

export function FluidWaterCard({
  variant = "glass",
  colorScheme = "blue",
  showConnector = false,
  interactive = true,
  glowOnHover = false,
  privateCharterOnly = false,
  showAiTyping = false,
  typingMessages = ["Hello", "I'm your AI assistant", "How can I help you today?"],
  className,
  children,
  ...props
}: FluidWaterCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Color scheme configurations
  const colorSchemeConfig = {
    blue: {
      borderColor: "border-blue-500/20",
      glowColor: "shadow-[0_0_15px_rgba(59,130,246,0.15)]", // Blue glow
      textColor: "text-blue-300",
    },
    purple: {
      borderColor: "border-purple-500/20",
      glowColor: "shadow-[0_0_15px_rgba(168,85,247,0.15)]", // Purple glow
      textColor: "text-purple-300",
    },
    teal: {
      borderColor: "border-teal-500/20",
      glowColor: "shadow-[0_0_15px_rgba(20,184,166,0.15)]", // Teal glow
      textColor: "text-teal-300",
    },
    amber: {
      borderColor: "border-amber-500/20",
      glowColor: "shadow-[0_0_15px_rgba(245,158,11,0.15)]", // Amber glow
      textColor: "text-amber-300",
    },
    green: {
      borderColor: "border-green-500/20",
      glowColor: "shadow-[0_0_15px_rgba(34,197,94,0.15)]", // Green glow
      textColor: "text-green-300",
    },
    yellow: {
      borderColor: "border-yellow-500/20",
      glowColor: "shadow-[0_0_15px_rgba(234,179,8,0.15)]", // Yellow glow
      textColor: "text-yellow-300",
    },
  }

  const { borderColor, glowColor, textColor } = colorSchemeConfig[colorScheme]

  return (
    <div className="relative">
      {/* Connector line with exact styling provided */}
      {showConnector && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-white/20"></div>
      )}

      <motion.div
        className={cn(
          "relative overflow-hidden p-6",
          variant === "glass"
            ? "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl"
            : `bg-${colorScheme}-900/80 border ${borderColor} rounded-xl`,
          interactive && "transition-all duration-300",
          interactive && isHovered && "transform scale-[1.02]",
          glowOnHover && isHovered ? glowColor : "",
          className,
        )}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

        {/* Private charter badge */}
        {privateCharterOnly && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
              <span className={cn("mr-1 h-2 w-2 rounded-full bg-current", textColor)}></span>
              Private Charter
            </span>
          </div>
        )}

        {/* Content container */}
        <div className="relative z-10">
          {children}

          {/* AI Typing animation */}
          {showAiTyping && (
            <div className="mt-4 min-h-[3rem]">
              <div className={cn("text-sm font-medium", textColor)}>
                <TypeAnimation
                  sequence={[
                    ...typingMessages.flatMap((message) => [message, 1000]),
                    () => {
                      // Animation complete callback
                    },
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                  cursor={true}
                />
              </div>
            </div>
          )}
        </div>

        {/* Water-like animation effect */}
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5"></div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/10 to-transparent"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: "easeInOut",
            }}
          ></motion.div>
        </div>
      </motion.div>
    </div>
  )
}
