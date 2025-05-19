"use client"
import { motion, AnimatePresence } from "framer-motion"
import { YagaAiLogo } from "@/components/yaga-logo"
import { SignInForm } from "./sign-in-form"
import { RegisterForm } from "./register-form"
import { cn } from "@/lib/utils"

interface AuthCardProps {
  activeTab: "signin" | "register"
  onTabChange: (tab: "signin" | "register") => void
}

export function AuthCard({ activeTab, onTabChange }: AuthCardProps) {
  return (
    <div className="backdrop-blur-2xl bg-[#0a0c19]/40 border border-white/15 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden">
      {/* Enhanced animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)",
            "linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent)",
            "linear-gradient(to bottom right, rgba(255,255,255,0.1), transparent)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      ></motion.div>

      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-trend-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <YagaAiLogo size={60} />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6">
          {activeTab === "signin" ? "Welcome Back" : "Create Account"}
        </h1>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={cn(
              "flex-1 py-2 text-center transition-all duration-300 border-b-2",
              activeTab === "signin"
                ? "text-trend-yellow border-trend-yellow"
                : "text-white/50 border-white/10 hover:text-white/70",
            )}
            onClick={() => onTabChange("signin")}
          >
            Sign In
          </button>
          <button
            className={cn(
              "flex-1 py-2 text-center transition-all duration-300 border-b-2",
              activeTab === "register"
                ? "text-trend-yellow border-trend-yellow"
                : "text-white/50 border-white/10 hover:text-white/70",
            )}
            onClick={() => onTabChange("register")}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <AnimatePresence mode="wait">
          {activeTab === "signin" ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <SignInForm onRegisterClick={() => onTabChange("register")} />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RegisterForm onSignInClick={() => onTabChange("signin")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
