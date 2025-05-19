"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Minimize2, Maximize2, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI yachting concierge. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Add the new event listener
  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Show AI typing indicator
    setIsTyping(true)

    try {
      // Get conversation history (excluding the welcome message)
      const history = messages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => ({
          content: msg.content,
          sender: msg.sender
        }));

      console.log('Sending message to API:', message);
      // Call the API with message and history
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message,
          history 
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        throw new Error('Received non-JSON response from server');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      console.log('Received response from API:', data);

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "I apologize, but I'm having trouble connecting right now. Please try again later.",
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      {/* Hidden button to trigger chat programmatically */}
      <button data-chat-open className="hidden" onClick={() => setIsOpen(true)} />

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cn(
              "fixed z-[70] overflow-hidden rounded-b-xl border border-white/20 shadow-xl",
              isMinimized
                ? "top-[4.5rem] left-0 right-0 mx-auto w-[85%] h-auto"
                : "top-[calc(4.5rem+0.5rem)] left-0 right-0 mx-auto w-[85%] h-[500px] max-h-[calc(100vh-5rem)]",
            )}
            initial={{ opacity: 0, y: -20, height: isMinimized ? "auto" : 500 }}
            animate={{ opacity: 1, y: 0, height: isMinimized ? "auto" : 500 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              background: "rgba(15, 15, 25, 0.85)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Enhanced animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent z-0 pointer-events-none"
              animate={{
                background: [
                  "linear-gradient(to bottom left, rgba(255,255,255,0.1), transparent)",
                  "linear-gradient(to bottom left, rgba(255,255,255,0.15), transparent)",
                  "linear-gradient(to bottom left, rgba(255,255,255,0.1), transparent)",
                ],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            ></motion.div>

            {/* Chat Header */}
            <div className="flex items-center justify-between p-3 bg-white/20 dark:bg-black/30 backdrop-blur-xl border-b border-white/20 relative z-10">
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">AI Concierge</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-white/10 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat Content (hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto bg-black/30 backdrop-blur-lg h-[calc(500px-120px)] relative z-10">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                        <div
                          className={cn(
                            "max-w-[80%] rounded-lg px-4 py-2 relative overflow-hidden",
                            msg.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-white/30 dark:bg-black/50 backdrop-blur-md border border-white/10",
                          )}
                        >
                          {/* Message bubble gradient for AI messages */}
                          {msg.sender === "ai" && (
                            <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></span>
                          )}

                          <p className="font-medium relative z-10">{msg.content}</p>
                          <p className="text-xs opacity-70 mt-1 relative z-10">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white/20 dark:bg-white/10 backdrop-blur-md max-w-[80%] rounded-lg px-4 py-2 relative overflow-hidden">
                          {/* Typing indicator gradient */}
                          <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></span>

                          <div className="flex space-x-1 relative z-10">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-white/70"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 rounded-full bg-white/70"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 rounded-full bg-white/70"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-white/20 bg-black/40 backdrop-blur-xl relative z-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="flex items-center space-x-2"
                  >
                    <div className="flex-1 relative">
                      {/* Input field gradient */}
                      <span className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-md pointer-events-none"></span>

                      <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full bg-black/50 border border-white/20 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary text-white placeholder:text-white/70 relative z-10"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className="p-2 rounded-md bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      {/* Send button gradient */}
                      <span className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>

                      <Send className="h-4 w-4 relative z-10" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
