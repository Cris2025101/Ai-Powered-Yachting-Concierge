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

type SailingExperience = {
  level: 'beginner' | 'intermediate' | 'advanced';
  previousAreas: string[];
  yearsOfExperience: number;
};

type TripRequirements = {
  groupSize: number;
  preferredArea: string;
  dates: {
    start: string;
    end: string;
  };
  budget: string;
  experience: SailingExperience;
};

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [message, setMessage] = useState("")
  const [tripRequirements, setTripRequirements] = useState<any>({})
  const questions = [
    "Are you sailing with family, friends, or solo?",
    "What's your sailing experience level?",
    "Where would you like to sail?",
    "How many people will be on board?",
    "What's your budget range? (This is very important for recommendations)",
    "What's your preferred departure port?",
    "Do you have any specific requirements for the vessel?",
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI yachting concierge. To help you find the perfect boat, I'll ask you a few questions.",
      sender: "ai",
      timestamp: new Date(),
    },
    {
      id: "q0",
      content: questions[0],
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const generalQuestionPrefixes = [
    'how', 'what', 'where', 'when', 'why', 'can', 'do', 'is', 'are', 'should', 'could', 'would', 'will', 'who'
  ];

  const sailingKeywords = [
    'sail', 'yacht', 'boat', 'marina', 'charter', 'catamaran', 'monohull', 'port', 'harbor', 'island', 'cruise', 'nautical', 'marine', 'sea', 'ocean', 'travel', 'trip', 'voyage', 'skipper', 'crew', 'anchorage', 'mooring', 'navigation', 'weather', 'wind', 'route', 'destination', 'greece', 'mediterranean', 'adriatic', 'caribbean', 'provision', 'itinerary', 'vacation', 'holiday'
  ];

  const offTopicResponseIndexRef = useRef(0);
  const offTopicResponses = [
    {
      message: "That topic isn't related to yachting or sailing. For other information, you may want to check different sources.",
      control: "By the way, are you planning a sailing trip soon?"
    },
    {
      message: "I'm focused on yachting, sailing, and travel topics. Other questions are best answered elsewhere.",
      control: "Is there a destination or boat type you're interested in?"
    },
    {
      message: "I specialize in sailing and yacht advice. For unrelated topics, please consult other resources.",
      control: "Are you considering a vacation on the water this year?"
    },
    {
      message: "My expertise is in yachting and marine travel. For other topics, try a general search.",
      control: "Would you like help planning a sailing itinerary?"
    },
    {
      message: "I can best assist with yachting, sailing, or marine travel questions.",
      control: "What kind of sailing experience are you looking for?"
    }
  ];

  const CONTROL_QUESTION_ID = 'control_sailing_trip';
  const CONTROL_QUESTION = "Are you planning a sailing trip soon?";
  const CONTROL_FOLLOWUP = "Wonderful! When are you planning to sail, or where would you like to go?";

  const [lastQuestionType, setLastQuestionType] = useState<'structured' | 'control' | 'followup' | null>(null);
  const [lastControlContext, setLastControlContext] = useState<string | null>(null);

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
    setIsTyping(true)

    // Check if the last AI message was a control question
    const lastAiMsg = messages.filter(m => m.sender === 'ai').slice(-1)[0];
    if (lastQuestionType === 'control' && lastControlContext) {
      // Use the user's answer as the sailing area or boat type
      let followupMsg = '';
      if (lastControlContext.includes('destination')) {
        followupMsg = `What's your sailing experience level in ${message.trim()}?`;
        setLastQuestionType('followup');
      } else if (lastControlContext.includes('boat type')) {
        followupMsg = `How many people will be on board your ${message.trim()}?`;
        setLastQuestionType('followup');
      } else if (lastControlContext.includes('vacation')) {
        followupMsg = `Where would you like to go for your sailing vacation?`;
        setLastQuestionType('followup');
      } else if (lastControlContext.includes('itinerary')) {
        followupMsg = `What dates are you considering for your sailing itinerary?`;
        setLastQuestionType('followup');
      } else if (lastControlContext.includes('experience')) {
        followupMsg = `What's your sailing experience level?`;
        setLastQuestionType('followup');
      } else {
        followupMsg = `Great! When are you planning to sail?`;
        setLastQuestionType('followup');
      }
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: 'followup_' + Date.now(),
            content: followupMsg,
            sender: "ai",
            timestamp: new Date(),
          }
        ]);
        setIsTyping(false);
      }, 600);
      setLastControlContext(null);
      return;
    }

    // Send ALL messages directly to API for better responses
    try {
      const history = messages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => ({
          content: msg.content,
          sender: msg.sender
        }));
      const response = await fetch(`${window.location.origin}/api/chat`, {
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
        throw new Error('Received non-JSON response from server');
      }
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
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
    setLastQuestionType('structured');
    setLastControlContext(null);
    return;

    // Save answer to tripRequirements
    const updatedRequirements = { ...tripRequirements };
    const qIdx = currentQuestionIndex;
    const keys = [
      'sailingWith',
      'experienceLevel',
      'sailingArea',
      'groupSize',
      'budget',
      'departurePort',
      'specialRequirements',
    ];
    updatedRequirements[keys[qIdx]] = message;
    setTripRequirements(updatedRequirements);

    // If just answered the area question, ask about experience in that area
    if (qIdx === 2) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `q_area_exp` ,
            content: `Have you sailed in ${message} before?`,
            sender: "ai",
            timestamp: new Date(),
          }
        ]);
        setCurrentQuestionIndex(idx => idx + 1); // skip to next question after this
        setIsTyping(false);
      }, 600);
      setLastQuestionType('structured');
      setLastControlContext(null);
      return;
    }

    // If just answered the area experience question, continue with next question
    if (qIdx === 3 && messages[messages.length-1]?.id === 'q_area_exp') {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `q${qIdx}`,
            content: questions[qIdx],
            sender: "ai",
            timestamp: new Date(),
          }
        ]);
        setCurrentQuestionIndex(idx => idx + 1);
        setIsTyping(false);
      }, 600);
      setLastQuestionType('structured');
      setLastControlContext(null);
      return;
    }

    // If not last question, ask next question
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `q${currentQuestionIndex + 1}`,
            content: questions[currentQuestionIndex + 1],
            sender: "ai",
            timestamp: new Date(),
          }
        ]);
        setCurrentQuestionIndex(idx => idx + 1);
        setIsTyping(false);
      }, 600);
      setLastQuestionType('structured');
      setLastControlContext(null);
      return;
    }

    // If all questions answered, send summary to API
    try {
      // Compose a more human, context-aware summary for the AI
      const summary = `User context: Sailing with: ${updatedRequirements.sailingWith}; Experience: ${updatedRequirements.experienceLevel}; Sailed area before: ${updatedRequirements.sailedAreaBefore}; Area: ${updatedRequirements.sailingArea}; Group size: ${updatedRequirements.groupSize}; Budget (very important): ${updatedRequirements.budget}; Departure port: ${updatedRequirements.departurePort}; Special requirements: ${updatedRequirements.specialRequirements}.

Budget is a key factor for recommendations. If user is a beginner or unfamiliar with the area, recommend a safe, beginner-friendly area (e.g., Greece Alimos). Suggest a suitable catamaran (e.g., Lagoon 42) for the group size, emphasizing comfort and space. End by asking: 'Would you like to search the exact price for this boat?'. Make the conversation warm and human.`;
      const history = [
        ...messages.filter(msg => msg.sender === 'user' || msg.sender === 'ai').map(msg => ({ content: msg.content, sender: msg.sender })),
        { content: summary, sender: 'user' }
      ];
      const response = await fetch(`${window.location.origin}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: summary,
          history
        }),
      });
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error('Received non-JSON response from server');
      }
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI response');
      }
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
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
    setLastQuestionType('structured');
    setLastControlContext(null);
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
