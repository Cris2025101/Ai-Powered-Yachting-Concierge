"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { YagaAiLogo } from "./yaga-logo"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface MenuItem {
  title: string
  href: string
  icon?: React.ComponentType<any>
}

// Menu items for the dropdown
const publicMenuItems: MenuItem[] = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "How It Works",
    href: "/how-it-works",
  },
  {
    title: "Loyalty Club",
    href: "/loyalty-club",
  },
  {
    title: "WhatsApp Business",
    href: "/whatsapp-business",
  },
  {
    title: "Chat with AI",
    href: "#",
    onClick: () => {
      const event = new CustomEvent('open-chat')
      window.dispatchEvent(event)
    }
  },
]

export default function GlassHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuAnimationComplete, setMenuAnimationComplete] = useState(true)
  const [user, setUser] = useState<any>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    getUser()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      getUser()
    })
    return () => subscription.unsubscribe()
  }, [])

  async function getUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch (error) {
      console.error('Error loading user:', error)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }


  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  // Handle clicks outside the menu to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  // Handle menu toggle with animation safety
  const handleMenuToggle = () => {
    if (menuAnimationComplete) {
      setMenuAnimationComplete(false)
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  }

  // Get the exact background based on scroll state
  const getBackgroundStyle = () => {
    return isScrolled
      ? "bg-white/10 dark:bg-black/10 backdrop-blur-xl shadow-lg border-white/20"
      : "bg-white/5 dark:bg-black/5 backdrop-blur-md border-white/10"
  }

  const menuItems = [
    ...publicMenuItems,
    user ? {
      title: "Profile",
      href: "/profile",
      icon: User
    } : {
      title: "Sign In",
      href: "/auth",
      icon: User
    }
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[60] transition-all duration-500 flex flex-col items-center",
        isScrolled ? "animate-slide-down" : "animate-slide-up",
      )}
    >
      {/* Combined container for header and dropdown */}
      <div
        className={cn(
          "w-[85%] md:w-[75%] mx-auto transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "rounded-t-xl rounded-b-xl" : "rounded-xl",
          getBackgroundStyle(),
        )}
        ref={headerRef}
      >
        {/* Header content */}
        <div className="relative">
          {/* Enhanced animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0"
            animate={{
              background: [
                "linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)",
                "linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent)",
                "linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          ></motion.div>

          <div className="container mx-auto px-3 sm:px-4 md:px-6 w-full max-w-full sm:max-w-[1200px] py-2 md:py-3 lg:py-6">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center z-10">
                <YagaAiLogo />
              </Link>

              {/* Right side actions */}
              <div className="flex items-center space-x-4 z-10">
                {/* Menu Button (visible on all screen sizes) */}
                <div className="relative">
                  <button
                    ref={menuButtonRef}
                    onClick={handleMenuToggle}
                    className="p-2.5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 transition-colors relative overflow-hidden group"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                  >
                    {/* Button hover gradient */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

                    <span className="relative z-10 flex items-center gap-1">
                      {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                      <div className="flex flex-col gap-0.5 ml-1">
                        <div className={cn(
                          "w-1 h-1 rounded-full animate-pulse",
                          user ? "bg-emerald-500" : "bg-red-500"
                        )} />
                        <div className={cn(
                          "w-1 h-1 rounded-full animate-pulse delay-75",
                          user ? "bg-emerald-500" : "bg-red-500"
                        )} />
                        <div className={cn(
                          "w-1 h-1 rounded-full animate-pulse delay-150",
                          user ? "bg-emerald-500" : "bg-red-500"
                        )} />
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown Menu - part of the same container */}
        <AnimatePresence onExitComplete={() => setMenuAnimationComplete(true)}>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => setMenuAnimationComplete(true)}
              className="overflow-hidden relative border-t border-white/10"
              style={{
                maxHeight: "calc(100vh - 5rem)",
                overflowY: "auto",
              }}
            >
              {/* Menu gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-white/8 to-transparent z-0"
                animate={{
                  background: [
                    "linear-gradient(to top right, rgba(255,255,255,0.08), transparent)",
                    "linear-gradient(to top right, rgba(255,255,255,0.12), transparent)",
                    "linear-gradient(to top right, rgba(255,255,255,0.08), transparent)",
                  ],
                }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>

              <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 relative z-10 w-full max-w-full sm:max-w-[1200px] mx-auto">
                <nav className="space-y-4 sm:space-y-6">
                  {/* Menu Items */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">Menu</h3>
                    {menuItems.map((item, index) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors relative overflow-hidden group"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {/* Menu item hover gradient */}
                          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                          {item.icon && <item.icon className="h-5 w-5 mr-3 relative z-10" />}
                          <span className="font-medium relative z-10">{item.title}</span>
                        </Link>
                      </motion.div>
                    ))}
                    {user && (
                      <motion.div
                        key="sign-out"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + menuItems.length * 0.1 }}
                      >
                        <button
                          onClick={() => {
                            handleSignOut()
                            setIsMobileMenuOpen(false)
                          }}
                          className="flex items-center w-full p-3 rounded-lg hover:bg-white/10 transition-colors text-left relative overflow-hidden group"
                        >
                          {/* Sign out button hover gradient */}
                          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

                          <LogOut className="h-5 w-5 mr-3 relative z-10" />
                          <span className="font-medium relative z-10">Sign Out</span>
                        </button>
                      </motion.div>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
