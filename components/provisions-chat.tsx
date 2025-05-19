"use client"

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DietaryPreference {
  type: string;
  count: number;
}

interface ProvisionItem {
  name: string;
  quantity: string;
}

interface ProvisionCategory {
  category: string;
  items: ProvisionItem[];
}

interface MealSuggestion {
  type: string;
  suggestion: string;
}

interface DayMealPlan {
  day: string;
  meals: MealSuggestion[];
}

interface Message {
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

interface MealPreference {
  type: string;
  count: number;
}

interface ProvisionsChatProps {
  provisionsList: ProvisionCategory[]
  mealSuggestions: DayMealPlan[]
  tripDuration: string
  totalPeople: number
  dietaryPreferences: DietaryPreference[]
  mealPreferences: MealPreference[]
}

export function ProvisionsChat({
  provisionsList,
  mealSuggestions,
  tripDuration,
  totalPeople,
  dietaryPreferences,
  mealPreferences,
}: ProvisionsChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      content: inputMessage,
      sender: "user" as const,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/provisions-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          context: {
            provisionsList,
            mealSuggestions,
            tripDuration,
            totalPeople,
            dietaryPreferences,
            mealPreferences,
          },
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      const assistantMessage = {
        content: data.content,
        sender: "assistant" as const,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error in chat:", error)
      const errorMessage = {
        content: "Sorry, I encountered an error. Please try again.",
        sender: "assistant" as const,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Add initial welcome message when chat is empty
  const welcomeMessage = {
    content: `Hello! I'm your provisions assistant. I can help you with:
- Explaining recipes and meal plans in detail
- Adjusting portions and quantities
- Suggesting alternatives for dietary restrictions
- Providing storage and preparation tips
- Generating new meal plans

What would you like to know about your current provisions list or meal plan?`,
    sender: "assistant" as const,
    timestamp: new Date(),
  }

  // Initialize messages with welcome message if empty
  useState(() => {
    if (messages.length === 0) {
      setMessages([welcomeMessage])
    }
  })

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white/90">Ask About Your Provisions</h3>
      </div>

      {/* Messages Container */}
      <div className="h-[300px] overflow-y-auto space-y-4 mb-4 custom-scrollbar">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user"
                    ? "bg-emerald-500/20 text-white"
                    : "bg-white/10 text-white/90"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs text-white/50 mt-1 block">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 rounded-lg px-4 py-2 flex items-center">
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
              <span className="text-white/70 text-sm ml-2">Thinking...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Ask about recipes, adjustments, or details..."
          className="flex-1 bg-white/5 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="p-2 rounded-lg bg-emerald-500/80 text-white hover:bg-emerald-500/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-sm text-white/70 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Can you explain this recipe in detail?",
            "How should I store these ingredients?",
            "What if someone has a nut allergy?",
            "Can we adjust portions for more people?",
            "Suggest alternatives for vegetarians",
            "What equipment do I need for these recipes?",
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="text-sm px-3 py-1 rounded-full bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 