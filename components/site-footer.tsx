import { YachtSysBacklink } from "./yacht-sys-backlink"

export function SiteFooter() {
  return (
    <footer className="relative mt-16 py-12">
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

          {/* Join Now Button */}
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/auth" 
              className="px-6 py-3 rounded-full bg-trend-yellow/20 backdrop-blur-sm border border-trend-yellow/30 text-white font-medium hover:bg-trend-yellow/30 transition-all duration-200 hover:scale-105"
            >
              Join Now
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <a href="/about" className="text-white/70 hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="text-white/70 hover:text-white transition-colors">
                Contact
              </a>
              <a href="/privacy" className="text-white/70 hover:text-white transition-colors">
                Privacy
              </a>
            </div>
            
            {/* YachtSys Backlink */}
            <YachtSysBacklink />
            
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} Yaga Concierge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 