"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { YagaAiLogo } from "./yaga-logo"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolled down from top
      setIsScrolled(currentScrollY > 50)

      // Determine scroll direction for hide/show
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-200",
        isScrolled ? "bg-background/95 border-white/10 backdrop-blur" : "bg-transparent border-transparent",
        isVisible ? "animate-slide-down" : "animate-slide-up",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <YagaAiLogo />
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
                isScrolled ? "border-white/10 bg-background/50" : "border-white/10 bg-black/20",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle menu</span>
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>YAGA Concierge</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              {["Home", "Services", "About", "Contact"].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-foreground transition-colors hover:text-primary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ x: 5 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
