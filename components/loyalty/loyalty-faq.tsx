"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left flex items-center justify-between focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-trend-yellow" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 pt-0 text-white/70 border-t border-white/10">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function LoyaltyFAQ() {
  const faqs = [
    {
      question: "How long do SeaMiles remain valid?",
      answer:
        "SeaMiles do not expire for 24 months from the date they are earned. This gives you plenty of time to accumulate enough miles for your desired reward or to plan your next charter.",
    },
    {
      question: "Can I transfer my SeaMiles to someone else?",
      answer:
        "SeaMiles are non-transferable and linked to your personal account. They can only be redeemed by the account holder who earned them.",
    },
    {
      question: "Are there any blackout dates for redeeming SeaMiles?",
      answer:
        "Redemptions are subject to availability. While we try to accommodate all requests, certain peak periods may have limited availability for SeaMiles redemptions, especially for charter discounts during high season.",
    },
    {
      question: "How do I check my current SeaMiles balance?",
      answer:
        "You can check your current SeaMiles balance by logging into your account on our website, through our mobile app, or by contacting our customer service team who will be happy to provide you with your current balance and redemption options.",
    },
    {
      question: "Can SeaMiles be redeemed for cash?",
      answer:
        "No, SeaMiles cannot be exchanged for cash. They can only be redeemed for the specified rewards such as training sessions or charter discounts.",
    },
  ]

  return (
    <section className="py-12 md:py-16 flex items-start justify-center relative">
      <div className="w-[85%] md:w-[75%] mx-auto relative z-10 px-3 sm:px-4 md:px-6">
        <motion.div
          className="flex flex-col space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-trend-yellow/20 flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HelpCircle className="w-6 h-6 text-trend-yellow" />
              </motion.div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to know about the SeaMiles Loyalty Program
            </p>
          </div>

          <div className="max-w-3xl mx-auto w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <FAQItem question={faq.question} answer={faq.answer} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-white/70 mb-4">Still have questions about the SeaMiles program?</p>
            <motion.button
              className="px-8 py-3 rounded-lg bg-trend-yellow/20 text-trend-yellow font-medium inline-flex items-center justify-center"
              whileHover={{ backgroundColor: "rgba(255, 215, 0, 0.3)" }}
            >
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
