"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MessageCircle, Phone, Send, Users } from "lucide-react"

interface PanPanModalProps {
  isOpen: boolean
  onClose: () => void
}

interface PanPanFormData {
  message: string
  phoneNumber: string
}

export function PanPanModal({ isOpen, onClose }: PanPanModalProps) {
  const [formData, setFormData] = useState<PanPanFormData>({
    message: "",
    phoneNumber: "",
  })

  const handleSubmit = () => {
    if (!formData.message.trim() || !formData.phoneNumber.trim()) {
      return
    }

    // Create WhatsApp URL with the message and phone number
    const whatsappMessage = encodeURIComponent(
      `🚨 PAN PAN 16CH - Emergency Support Request\n\n` +
      `Message: ${formData.message}\n` +
      `Contact: ${formData.phoneNumber}\n\n` +
      `This is an emergency support request from YAGA Concierge.`
    )
    
    const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank')
    
    // Reset form and close modal
    setFormData({ message: "", phoneNumber: "" })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md mx-4 my-auto rounded-2xl overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass container with red theme */}
            <div className="relative backdrop-blur-2xl bg-[#0a0c19]/30 border border-red-400/20 rounded-2xl shadow-[0_8px_32px_rgba(220,38,38,0.3),_inset_0_1px_2px_rgba(255,255,255,0.1)] overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl"></div>
              
              {/* Content container */}
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-medium text-white">PanPan 16CH</h2>
                      <p className="text-sm text-red-400">Emergency Support</p>
                    </div>
                  </div>
                  <motion.button
                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Description */}
                <div className="mb-6 p-4 backdrop-blur-md bg-red-500/10 border border-red-400/20 rounded-xl">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium mb-2">Professional Skipper Support</h3>
                      <p className="text-white/70 text-sm">
                        Connect with our live WhatsApp chat group of professional skippers ready to help with emergency support and guidance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Your Message
                    </label>
                    <textarea
                      className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-400 min-h-[100px] resize-none"
                      placeholder="Describe your emergency or support need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="tel"
                        className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-red-400"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  className="w-full mt-6 py-3 rounded-md bg-gradient-to-r from-red-500 to-red-400 text-white font-medium hover:opacity-90 transition-all duration-300 relative overflow-hidden shadow-[0_5px_15px_rgba(220,38,38,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                  disabled={!formData.message.trim() || !formData.phoneNumber.trim()}
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(220,38,38,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center">
                    <Send className="w-4 h-4 mr-2" />
                    Send to WhatsApp Support
                  </span>
                </motion.button>

                {/* Footer note */}
                <p className="text-xs text-white/50 text-center mt-4">
                  This will open WhatsApp with your message to our professional skipper support group
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
