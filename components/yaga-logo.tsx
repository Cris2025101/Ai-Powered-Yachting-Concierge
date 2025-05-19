"use client"
import { useState, useRef, useEffect } from "react"
import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface YagaAiLogoProps {
  size?: number
  className?: string
  color?: string
  showText?: boolean
}

export function YagaAiLogo({ size = 40, className, color = "#FFD700", showText = true }: YagaAiLogoProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [tiltX, setTiltX] = useState(0)
  const [tiltY, setTiltY] = useState(0)
  const [circuitPhase, setCircuitPhase] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Use useEffect to handle client-side mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update circuit phase for continuous animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCircuitPhase((prev) => (prev + 1) % 100)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setTiltX((y / rect.height) * 20)
    setTiltY((x / rect.width) * -20)
  }

  // Reset tilt when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    setTiltX(0)
    setTiltY(0)
  }

  // Convert hex color to rgba
  const getColorWithOpacity = (opacity: number) => {
    // If color is already rgba, return it with modified opacity
    if (color.startsWith("rgba")) {
      return color.replace(/[\d.]+\)$/g, `${opacity})`)
    }

    // Convert hex to rgb components
    let r = 255,
      g = 215,
      b = 0 // Default to gold

    if (color.startsWith("#")) {
      const hex = color.slice(1)
      if (hex.length === 3) {
        r = Number.parseInt(hex[0] + hex[0], 16)
        g = Number.parseInt(hex[1] + hex[1], 16)
        b = Number.parseInt(hex[2] + hex[2], 16)
      } else if (hex.length === 6) {
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
      }
    }

    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  // Don't render anything until mounted on client
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Add the keyframes to the document */}
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.9; }
          100% { opacity: 0.5; }
        }
      `}</style>

      <motion.div
        ref={containerRef}
        className={cn("relative overflow-hidden rounded-full bg-[#010A1E] cursor-pointer", className)}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          perspective: "1000px",
          transform: isHovered ? `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` : "none",
          transition: "transform 0.2s ease-out",
          boxShadow: isHovered
            ? `0 0 ${size / 3}px ${getColorWithOpacity(0.3)}`
            : `0 0 ${size / 8}px ${getColorWithOpacity(0.1)}`,
          border: `1px solid ${getColorWithOpacity(0.3)}`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric circles */}
            <motion.circle
              cx="20"
              cy="20"
              r="8"
              fill="none"
              stroke={getColorWithOpacity(0.3)}
              strokeWidth="0.5"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: isHovered ? [0.8, 1.1, 0.9] : [0.8, 1, 0.8],
                opacity: isHovered ? [0.3, 0.6, 0.3] : [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
            <motion.circle
              cx="20"
              cy="20"
              r="12"
              fill="none"
              stroke={getColorWithOpacity(0.2)}
              strokeWidth="0.3"
              strokeDasharray="1,2"
              initial={{ rotate: 0 }}
              animate={{ rotate: 3.6 * circuitPhase }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
            <motion.circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={getColorWithOpacity(0.1)}
              strokeWidth="0.2"
              strokeDasharray="0.5,3"
              initial={{ rotate: 0 }}
              animate={{ rotate: -3.6 * circuitPhase }}
              transition={{ duration: 0.7, ease: "linear" }}
            />

            {/* Neural nodes - outer layer */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.circle
                key={`node-outer-${i}`}
                cx={20 + 10 * Math.cos((angle * Math.PI) / 180)}
                cy={20 + 10 * Math.sin((angle * Math.PI) / 180)}
                r="1"
                fill={getColorWithOpacity(0.6)}
                initial={{ scale: 0.5, opacity: 0.3 }}
                animate={{
                  scale: isHovered ? [0.5, 1.2, 0.5] : [0.5, 0.8, 0.5],
                  opacity: isHovered ? [0.3, 0.8, 0.3] : [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              />
            ))}

            {/* Neural nodes - inner layer */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <motion.circle
                key={`node-inner-${i}`}
                cx={20 + 5 * Math.cos((angle * Math.PI) / 180)}
                cy={20 + 5 * Math.sin((angle * Math.PI) / 180)}
                r="0.8"
                fill={getColorWithOpacity(0.5)}
                initial={{ scale: 0.5, opacity: 0.3 }}
                animate={{
                  scale: isHovered ? [0.5, 1, 0.5] : [0.5, 0.7, 0.5],
                  opacity: isHovered ? [0.3, 0.7, 0.3] : [0.3, 0.4, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}

            {/* Central node */}
            <motion.circle
              cx="20"
              cy="20"
              r="1.5"
              fill={getColorWithOpacity(0.8)}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: isHovered ? [0.8, 1.3, 0.8] : [0.8, 1, 0.8],
                opacity: isHovered ? [0.5, 0.9, 0.5] : [0.5, 0.7, 0.5],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            {/* Connection lines - outer to inner */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => {
              const outerX = 20 + 10 * Math.cos((angle * Math.PI) / 180)
              const outerY = 20 + 10 * Math.sin((angle * Math.PI) / 180)
              const innerX = 20 + 5 * Math.cos(((angle + 30) * Math.PI) / 180)
              const innerY = 20 + 5 * Math.sin(((angle + 30) * Math.PI) / 180)

              return (
                <motion.line
                  key={`line-outer-inner-${i}`}
                  x1={outerX}
                  y1={outerY}
                  x2={innerX}
                  y2={innerY}
                  stroke={getColorWithOpacity(0.2)}
                  strokeWidth="0.2"
                  strokeDasharray="0.5,1"
                  initial={{ opacity: 0.1 }}
                  animate={{
                    opacity: isHovered ? [0.1, 0.4, 0.1] : [0.1, 0.2, 0.1],
                    strokeDashoffset: [0, -5],
                  }}
                  transition={{
                    opacity: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    strokeDashoffset: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  }}
                />
              )
            })}

            {/* Connection lines - inner to center */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => {
              const innerX = 20 + 5 * Math.cos((angle * Math.PI) / 180)
              const innerY = 20 + 5 * Math.sin((angle * Math.PI) / 180)

              return (
                <motion.line
                  key={`line-inner-center-${i}`}
                  x1={innerX}
                  y1={innerY}
                  x2="20"
                  y2="20"
                  stroke={getColorWithOpacity(0.3)}
                  strokeWidth="0.2"
                  initial={{ opacity: 0.1 }}
                  animate={{
                    opacity: isHovered ? [0.1, 0.5, 0.1] : [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              )
            })}

            {/* Wave patterns */}
            <motion.path
              d="M10,20 Q15,15 20,20 Q25,25 30,20"
              fill="none"
              stroke={getColorWithOpacity(0.4)}
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{
                pathLength: 1,
                opacity: isHovered ? 0.6 : 0.4,
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <motion.path
              d="M12,24 Q16,22 20,24 Q24,26 28,24"
              fill="none"
              stroke={getColorWithOpacity(0.3)}
              strokeWidth="0.3"
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{
                pathLength: 1,
                opacity: isHovered ? 0.5 : 0.3,
              }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Information particles */}
            <motion.circle
              cx="10"
              cy="20"
              r="0.8"
              fill={getColorWithOpacity(0.8)}
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: 20,
                y: [0, -5, 0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.2, 1],
              }}
            />

            <motion.circle
              cx="12"
              cy="24"
              r="0.6"
              fill={getColorWithOpacity(0.7)}
              initial={{ opacity: 0, x: 0 }}
              animate={{
                opacity: [0, 1, 0],
                x: 16,
                y: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                times: [0, 0.2, 1],
                delay: 1.2,
              }}
            />

            {/* Data flow pulse along connections - appears when hovered */}
            {isHovered && (
              <>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const outerX = 20 + 10 * Math.cos((angle * Math.PI) / 180)
                  const outerY = 20 + 10 * Math.sin((angle * Math.PI) / 180)
                  const innerX = 20 + 5 * Math.cos(((angle + 30) * Math.PI) / 180)
                  const innerY = 20 + 5 * Math.sin(((angle + 30) * Math.PI) / 180)

                  return (
                    <motion.circle
                      key={`pulse-${i}`}
                      cx={outerX}
                      cy={outerY}
                      r="0.5"
                      fill={getColorWithOpacity(0.9)}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        x: innerX - outerX,
                        y: innerY - outerY,
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />
                  )
                })}
              </>
            )}
          </svg>
        </div>

        {/* YAGA AI Text */}
        {showText && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center font-bold"
            style={{
              color: color,
              fontSize: `${size * 0.3}px`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0.9,
              scale: isHovered ? 1.1 : 1,
              textShadow: isHovered
                ? `0 0 ${size / 8}px ${getColorWithOpacity(0.8)}`
                : `0 0 ${size / 20}px ${getColorWithOpacity(0.3)}`,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            YAGA
            <span style={{ fontSize: `${size * 0.2}px`, verticalAlign: "top", marginLeft: `${size * 0.025}px` }}>
              i
            </span>
          </motion.div>
        )}

        {/* Enhanced glow overlay with neural network and circuit elements */}
        <motion.div
          className="absolute inset-0 rounded-full transition-all duration-800 ease-in-out overflow-hidden"
          style={{
            animation: "pulse 2s infinite ease-in-out",
          }}
        >
          {/* Base gradient glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: `linear-gradient(${45 + 3.6 * circuitPhase}deg, ${getColorWithOpacity(0.05)}, transparent)`,
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />

          {/* Circuit paths overlay */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circuit rings */}
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke={getColorWithOpacity(0.2)}
              strokeWidth="0.5"
              strokeDasharray="1,6"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Circuit paths */}
            <motion.path
              d="M25,50 C25,25 75,25 75,50 C75,75 25,75 25,50"
              fill="none"
              stroke={getColorWithOpacity(0.3)}
              strokeWidth="0.5"
              strokeDasharray="1,3"
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />

            <motion.path
              d="M15,50 C15,15 85,15 85,50 C85,85 15,85 15,50"
              fill="none"
              stroke={getColorWithOpacity(0.2)}
              strokeWidth="0.3"
              strokeDasharray="1,5"
              initial={{ pathLength: 0, opacity: 0.1 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            />

            {/* Data flow points */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.circle
                key={`flow-point-${i}`}
                cx={50 + 40 * Math.cos((angle * Math.PI) / 180)}
                cy={50 + 40 * Math.sin((angle * Math.PI) / 180)}
                r="1"
                fill={getColorWithOpacity(0.6)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </svg>

          {/* Enhanced radial pulse effect - represents AI processing */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, 
      ${getColorWithOpacity(0.15)} 0%, 
      ${getColorWithOpacity(0.08)} 40%, 
      ${getColorWithOpacity(0.03)} 60%, 
      transparent 80%)`,
              mixBlendMode: "screen",
            }}
            animate={{
              scale: isHovered ? [0.85, 1.15, 0.85] : [0.9, 1.1, 0.9],
              opacity: isHovered ? [0.2, 0.35, 0.2] : [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: isHovered ? 3 : 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Secondary pulse layer - creates depth */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at ${45 + Math.sin(circuitPhase / 10) * 10}% ${50 + Math.cos(circuitPhase / 10) * 10}%, 
      ${getColorWithOpacity(0.12)} 0%, 
      transparent 50%)`,
              mixBlendMode: "screen",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: isHovered ? [0.1, 0.25, 0.1] : [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  )
}

// For backward compatibility
export const YagaLogo = YagaAiLogo
