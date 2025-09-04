"use client"
import { TrendBackground } from "@/components/trend-background"
import { AboutHero } from "@/components/about/about-hero"
import { AboutJourney } from "@/components/about/about-journey"
import { AboutTechnology } from "@/components/about/about-technology"
import { AboutCommunity } from "@/components/about/about-community"
import { AboutLoyalty } from "@/components/about/about-loyalty"
import { AboutImpact } from "@/components/about/about-impact"
import { AboutFuture } from "@/components/about/about-future"

// Add keyframe animations for light reflections
const lightReflectionKeyframes = `
@keyframes moveLight1 {
  0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
  25% { opacity: 0.5; }
  50% { transform: translate(-30%, -30%) rotate(180deg); opacity: 0; }
  100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
}

@keyframes moveLight2 {
  0% { transform: translate(100%, 100%); opacity: 0; }
  50% { transform: translate(80%, 80%); opacity: 0.3; }
  100% { transform: translate(100%, 100%); opacity: 0; }
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

@keyframes breathe {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(1); }
}
`

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#010A1E] relative overflow-hidden">
      {/* Background with blurred elements */}
      <TrendBackground />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-16">
        <div className="backdrop-blur-2xl bg-[#0a0c19]/40 border border-white/15 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
          {/* Light reflection elements */}
          <style jsx>{lightReflectionKeyframes}</style>
          <div
            className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] rounded-full bg-gradient-radial from-white/10 to-transparent opacity-0 pointer-events-none"
            style={{ animation: "moveLight1 15s infinite ease-in-out" }}
          ></div>
          <div
            className="absolute -bottom-[100px] -right-[100px] w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/5 to-transparent opacity-0 pointer-events-none"
            style={{ animation: "moveLight2 12s infinite ease-in-out" }}
          ></div>
          <div
            className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none"
            style={{ animation: "shimmer 8s infinite linear" }}
          ></div>
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 pointer-events-none"
            style={{ animation: "shimmer 8s infinite linear reverse" }}
          ></div>

          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-trend-yellow/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
          <div
            className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
            style={{ animation: "breathe 8s infinite ease-in-out" }}
          ></div>
          <div
            className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"
            style={{ animation: "breathe 12s infinite ease-in-out reverse" }}
          ></div>

          {/* Content wrapper */}
          <div className="relative z-10">
            <AboutHero />
            <AboutJourney />
            <AboutTechnology />
            <AboutCommunity />
            <AboutLoyalty />
            <AboutImpact />
            <AboutFuture />
          </div>
        </div>
      </div>
    </div>
  )
}