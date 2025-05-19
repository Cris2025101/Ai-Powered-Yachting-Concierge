import { LogoShowcase } from "@/components/logo-showcase"
import { TrendBackground } from "@/components/trend-background"

export default function LogoPage() {
  return (
    <>
      {/* Background with blurred elements */}
      <TrendBackground />

      <div className="relative z-10 pt-20">
        <LogoShowcase />
      </div>
    </>
  )
}
