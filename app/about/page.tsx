"use client"
import { TrendBackground } from "@/components/trend-background"
import { AboutHero } from "@/components/about/about-hero"
import { AboutJourney } from "@/components/about/about-journey"
import { AboutTechnology } from "@/components/about/about-technology"
import { AboutCommunity } from "@/components/about/about-community"
import { AboutLoyalty } from "@/components/about/about-loyalty"
import { AboutImpact } from "@/components/about/about-impact"
import { AboutFuture } from "@/components/about/about-future"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#010A1E] relative overflow-hidden">
      {/* Background with blurred elements */}
      <TrendBackground />

      {/* Content */}
      <div className="relative z-10 pt-20 pb-16">
        <AboutHero />
        <AboutJourney />
        <AboutTechnology />
        <AboutCommunity />
        <AboutLoyalty />
        <AboutImpact />
        <AboutFuture />
      </div>
    </div>
  )
}