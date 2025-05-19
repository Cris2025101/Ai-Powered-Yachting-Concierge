"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, X, Calendar, Anchor, Users, Ship, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

// Add keyframe animations for light reflections and glass effects
const glassEffectKeyframes = `
@keyframes shimmerGlass {
  0% { background-position: -100% 0; opacity: 0.3; }
  50% { opacity: 0.7; }
  100% { background-position: 200% 0; opacity: 0.3; }
}

@keyframes pulseGlow {
  0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.2); }
  70% { box-shadow: 0 0 15px 10px rgba(20, 184, 166, 0); }
  100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
}

@keyframes floatLight {
  0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
  50% { transform: translateY(-15px) translateX(10px); opacity: 0.5; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
}

@keyframes rotateLight {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes breathe {
  0% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
  100% { opacity: 0.3; transform: scale(1); }
}

@keyframes ripple {
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2); opacity: 0; }
}
`

interface CharterBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  yacht: string;
  destination: string;
  startDate: string;
  endDate: string;
  guests: number;
  captain: boolean;
  chef: boolean;
  steward: boolean;
  equipment: string[];
  preferences: {
    dining: string;
    activities: string[];
    special: string;
  };
}

export function CharterBookingModal({ isOpen, onClose }: CharterBookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    yacht: "",
    destination: "",
    startDate: "",
    endDate: "",
    guests: 4,
    captain: true,
    chef: false,
    steward: false,
    equipment: [],
    preferences: {
      dining: "onboard",
      activities: [],
      special: "",
    },
  })

  const [currentYachtPage, setCurrentYachtPage] = useState(0)

  // Reset step when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  const steps = [
    {
      id: "yacht-details",
      title: "Yacht Details",
      icon: <Ship className="w-5 h-5" />,
      description: "Select your yacht and dates",
    },
    {
      id: "itinerary",
      title: "Itinerary",
      icon: <Anchor className="w-5 h-5" />,
      description: "Plan your sailing route",
    },
    {
      id: "crew",
      title: "Crew",
      icon: <Users className="w-5 h-5" />,
      description: "Choose your crew members",
    },
    {
      id: "equipment",
      title: "Equipment",
      icon: <Settings className="w-5 h-5" />,
      description: "Add additional equipment",
    },
    {
      id: "preferences",
      title: "Preferences",
      icon: <Calendar className="w-5 h-5" />,
      description: "Set your preferences",
    },
    {
      id: "review",
      title: "Review & Confirm",
      icon: <Check className="w-5 h-5" />,
      description: "Confirm your booking",
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
  }

  const yachtArray = ([
    // Page 0
    currentYachtPage === 0 && [
      {
        id: "yacht-1",
        name: "Ocean Explorer 42",
        type: "Sailing Yacht",
        length: "42 ft",
        capacity: "8 guests",
        price: "$2,500/day",
        image: "/placeholder.svg?key=4m6sk",
      },
      {
        id: "yacht-2",
        name: "Azure Breeze 38",
        type: "Catamaran",
        length: "38 ft",
        capacity: "10 guests",
        price: "$3,200/day",
        image: "/luxury-catamaran.png",
      },
    ],
    // Page 1
    currentYachtPage === 1 && [
      {
        id: "yacht-3",
        name: "Coastal Voyager 45",
        type: "Motor Yacht",
        length: "45 ft",
        capacity: "12 guests",
        price: "$3,800/day",
        image: "/placeholder.svg?key=yacht3",
      },
      {
        id: "yacht-4",
        name: "Island Hopper 36",
        type: "Sailing Yacht",
        length: "36 ft",
        capacity: "6 guests",
        price: "$2,200/day",
        image: "/placeholder.svg?key=yacht4",
      },
    ],
    // Page 2
    currentYachtPage === 2 && [
      {
        id: "yacht-5",
        name: "Luxury Horizon 50",
        type: "Power Catamaran",
        length: "50 ft",
        capacity: "14 guests",
        price: "$4,500/day",
        image: "/placeholder.svg?key=yacht5",
      },
      {
        id: "yacht-6",
        name: "Sea Breeze 40",
        type: "Sailing Yacht",
        length: "40 ft",
        capacity: "8 guests",
        price: "$2,800/day",
        image: "/placeholder.svg?key=yacht6",
      },
    ],
  ][currentYachtPage] || []) as Array<{id: string; name: string; type: string; length: string; capacity: string; price: string; image: string}>;

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
            className="w-full max-w-5xl mx-4 my-auto rounded-2xl overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass container with enhanced effects */}
            <div className="relative backdrop-blur-2xl bg-[#0a0c19]/30 border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_2px_rgba(255,255,255,0.2)] overflow-hidden">
              {/* Glass effect animations */}
              <style jsx>{glassEffectKeyframes}</style>

              {/* Decorative elements */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl"></div>
              <div
                className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
                style={{ animation: "breathe 8s infinite ease-in-out" }}
              ></div>
              <div
                className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"
                style={{ animation: "breathe 12s infinite ease-in-out reverse" }}
              ></div>

              {/* Light reflection elements */}
              <div
                className="absolute top-[10%] left-[5%] w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/15 to-transparent opacity-0 pointer-events-none"
                style={{ animation: "floatLight 15s infinite ease-in-out" }}
              ></div>
              <div
                className="absolute bottom-[20%] right-[10%] w-[150px] h-[150px] rounded-full bg-gradient-radial from-white/10 to-transparent opacity-0 pointer-events-none"
                style={{ animation: "floatLight 12s infinite ease-in-out reverse" }}
              ></div>

              {/* Shimmer effects */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-30 pointer-events-none"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmerGlass 8s infinite linear",
                }}
              ></div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 pointer-events-none"
                style={{
                  backgroundSize: "200% 100%",
                  animation: "shimmerGlass 8s infinite linear reverse",
                }}
              ></div>
              <div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-20 pointer-events-none"
                style={{
                  backgroundSize: "100% 200%",
                  animation: "shimmerGlass 10s infinite linear",
                }}
              ></div>
              <div
                className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-20 pointer-events-none"
                style={{
                  backgroundSize: "100% 200%",
                  animation: "shimmerGlass 10s infinite linear reverse",
                }}
              ></div>

              {/* Rotating light effect */}
              <div
                className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none opacity-[0.03]"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent, transparent)",
                  animation: "rotateLight 20s linear infinite",
                }}
              ></div>

              {/* Content container */}
              <div className="relative z-10 p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                {/* Header with close button */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-medium text-white">Charter Your Yacht</h2>
                  <motion.button
                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Progress tracker */}
                <div className="mb-8">
                  <div className="flex justify-between items-center relative">
                    {/* Progress line */}
                    <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/10 -translate-y-1/2 z-0"></div>
                    <div
                      className="absolute left-0 top-1/2 h-[2px] bg-gradient-to-r from-teal-400 to-teal-500 -translate-y-1/2 z-0 transition-all duration-500"
                      style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    ></div>

                    {/* Step indicators */}
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className="relative z-10 flex flex-col items-center"
                        onClick={() => index <= currentStep && handleStepClick(index)}
                      >
                        <motion.div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 cursor-pointer relative overflow-hidden",
                            index < currentStep
                              ? "bg-teal-500/20 border-teal-400 text-teal-400"
                              : index === currentStep
                                ? "bg-teal-500/30 border-teal-400 text-white"
                                : "bg-white/5 border-white/20 text-white/40",
                          )}
                          whileHover={index <= currentStep ? { scale: 1.1 } : {}}
                          whileTap={index <= currentStep ? { scale: 0.95 } : {}}
                          style={
                            index === currentStep
                              ? {
                                  boxShadow: "0 0 15px rgba(20,184,166,0.3)",
                                  animation: "pulseGlow 2s infinite",
                                }
                              : {}
                          }
                        >
                          {index === currentStep && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute inset-0 animate-ping rounded-full bg-teal-400/10 duration-1000"></div>
                            </div>
                          )}
                          {index < currentStep ? <Check className="w-5 h-5" /> : step.icon}
                        </motion.div>
                        <span
                          className={cn(
                            "text-xs mt-2 hidden md:block",
                            index <= currentStep ? "text-white" : "text-white/40",
                          )}
                        >
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step content */}
                <div className="min-h-[300px] mb-6 overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Step 1: Yacht Details */}
                      {currentStep === 0 && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-medium text-white">Select Your Yacht</h3>
                            <div className="flex space-x-2">
                              <motion.button
                                className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors"
                                onClick={() => setCurrentYachtPage((prev) => Math.max(0, prev - 1))}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={currentYachtPage === 0}
                                style={{ opacity: currentYachtPage === 0 ? 0.5 : 1 }}
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors"
                                onClick={() => setCurrentYachtPage((prev) => Math.min(2, prev + 1))}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={currentYachtPage === 2}
                                style={{ opacity: currentYachtPage === 2 ? 0.5 : 1 }}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>

                          <div className="relative">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={currentYachtPage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                {yachtArray.map((yacht) => (
                                  <motion.div
                                    key={yacht.id}
                                    className={cn(
                                      "backdrop-blur-md border rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                                      formData.yacht === yacht.id
                                        ? "bg-teal-500/20 border-teal-400"
                                        : "bg-white/5 border-white/20 hover:bg-white/10",
                                    )}
                                    whileHover={{
                                      y: -5,
                                      boxShadow: "0 15px 30px rgba(0,0,0,0.2), 0 0 15px rgba(20,184,166,0.3)",
                                    }}
                                    whileTap={{
                                      scale: 0.98,
                                      boxShadow: "0 5px 15px rgba(0,0,0,0.1), 0 0 5px rgba(20,184,166,0.2)",
                                    }}
                                    onClick={() => setFormData({ ...formData, yacht: yacht.id })}
                                  >
                                    <div className="relative h-40 overflow-hidden">
                                      <img
                                        src={yacht.image || "/placeholder.svg"}
                                        alt={yacht.name}
                                        className="w-full h-full object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                      <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <h4 className="text-lg font-medium text-white">{yacht.name}</h4>
                                        <p className="text-sm text-white/80">{yacht.type}</p>
                                      </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Length:</span>
                                        <span className="text-white">{yacht.length}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Capacity:</span>
                                        <span className="text-white">{yacht.capacity}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-white/70">Price:</span>
                                        <span className="text-teal-400 font-medium">{yacht.price}</span>
                                      </div>
                                    </div>
                                    {formData.yacht === yacht.id && (
                                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-white" />
                                      </div>
                                    )}
                                  </motion.div>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          <div className="flex justify-center mt-4 mb-6">
                            <div className="flex space-x-2">
                              {[0, 1, 2].map((page) => (
                                <button
                                  key={page}
                                  className={`w-2 h-2 rounded-full ${
                                    currentYachtPage === page ? "bg-teal-400" : "bg-white/20"
                                  } transition-colors`}
                                  onClick={() => setCurrentYachtPage(page)}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Important booking details section with divider */}
                          <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center">
                              <span className="bg-[#0a0c19] px-4 text-sm text-white/70">BOOKING DETAILS</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-white/80 mb-2">Start Date</label>
                              <p className="text-xs text-teal-400 mb-2">Charters run from Saturday to Saturday only</p>
                              <input
                                type="date"
                                className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                                value={formData.startDate}
                                onChange={(e) => {
                                  const selectedDate = new Date(e.target.value)
                                  // Check if the selected date is a Saturday (day 6)
                                  if (selectedDate.getDay() === 6) {
                                    setFormData({ ...formData, startDate: e.target.value })
                                  } else {
                                    // Find the next Saturday
                                    const daysUntilSaturday = (6 - selectedDate.getDay() + 7) % 7
                                    const nextSaturday = new Date(selectedDate)
                                    nextSaturday.setDate(selectedDate.getDate() + daysUntilSaturday)

                                    // Format the date as YYYY-MM-DD for the input
                                    const formattedDate = nextSaturday.toISOString().split("T")[0]
                                    setFormData({ ...formData, startDate: formattedDate })
                                  }
                                }}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-white/80 mb-2">End Date</label>
                              <p className="text-xs text-teal-400 mb-2">Charters run from Saturday to Saturday only</p>
                              <input
                                type="date"
                                className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                                value={formData.endDate}
                                onChange={(e) => {
                                  const selectedDate = new Date(e.target.value)
                                  // Check if the selected date is a Saturday (day 6)
                                  if (selectedDate.getDay() === 6) {
                                    setFormData({ ...formData, endDate: e.target.value })
                                  } else {
                                    // Find the next Saturday
                                    const daysUntilSaturday = (6 - selectedDate.getDay() + 7) % 7
                                    const nextSaturday = new Date(selectedDate)
                                    nextSaturday.setDate(selectedDate.getDate() + daysUntilSaturday)

                                    // Format the date as YYYY-MM-DD for the input
                                    const formattedDate = nextSaturday.toISOString().split("T")[0]
                                    setFormData({ ...formData, endDate: formattedDate })
                                  }
                                }}
                              />
                            </div>
                          </div>

                          <div className="mt-6">
                            <label className="block text-sm font-medium text-white/80 mb-2">Number of Guests</label>
                            <p className="text-xs text-teal-400 mb-2">
                              This yacht is fully booked for your selected dates. Please specify exactly how many guests
                              will be on board for your private charter.
                            </p>
                            <div className="flex items-center backdrop-blur-md bg-white/5 border border-white/20 rounded-md">
                              <button
                                className="px-4 py-2 text-white/70 hover:bg-white/10 rounded-l-md"
                                onClick={() =>
                                  formData.guests > 1 && setFormData({ ...formData, guests: formData.guests - 1 })
                                }
                              >
                                -
                              </button>
                              <span className="flex-1 py-2 text-white text-center">{formData.guests}</span>
                              <button
                                className="px-4 py-2 text-white/70 hover:bg-white/10 rounded-r-md"
                                onClick={() =>
                                  formData.guests < 12 && setFormData({ ...formData, guests: formData.guests + 1 })
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Itinerary */}
                      {currentStep === 1 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-white mb-4">Plan Your Itinerary</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-white/80 mb-2">Destination</label>
                              <select
                                className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400"
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                              >
                                <option value="">Select destination</option>
                                <option value="greek-islands">Greek Islands</option>
                                <option value="amalfi-coast">Amalfi Coast</option>
                                <option value="balearic-islands">Balearic Islands</option>
                                <option value="caribbean">Caribbean</option>
                                <option value="croatia">Croatia</option>
                              </select>
                            </div>
                          </div>

                          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Custom Itinerary</h4>
                            <p className="text-white/70 text-sm mb-4">
                              Our sailing experts will create a personalized itinerary for your adventure.
                            </p>
                            <textarea
                              className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 min-h-[150px]"
                              placeholder="Tell us about any specific places you'd like to visit or experiences you'd like to have..."
                            ></textarea>
                          </div>
                        </div>
                      )}

                      {/* Step 3: Crew */}
                      {currentStep === 2 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-white mb-4">Choose Your Crew</h3>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              {
                                id: "captain",
                                title: "Captain",
                                description: "Professional skipper to navigate and ensure safety",
                                price: "$350/day",
                                required: true,
                                selected: formData.captain,
                              },
                              {
                                id: "chef",
                                title: "Chef",
                                description: "Prepare gourmet meals with local ingredients",
                                price: "$250/day",
                                required: false,
                                selected: formData.chef,
                              },
                              {
                                id: "steward",
                                title: "Steward",
                                description: "Attend to your needs and keep the yacht pristine",
                                price: "$200/day",
                                required: false,
                                selected: formData.steward,
                              },
                            ].map((crew) => (
                              <motion.div
                                key={crew.id}
                                className={cn(
                                  "backdrop-blur-md border rounded-xl p-4 transition-all duration-300",
                                  crew.selected ? "bg-teal-500/20 border-teal-400" : "bg-white/5 border-white/20",
                                )}
                                whileHover={{ y: -5 }}
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <h4 className="text-lg font-medium text-white">{crew.title}</h4>
                                  {crew.required ? (
                                    <span className="text-xs px-2 py-1 bg-teal-500/20 text-teal-400 rounded-full">
                                      Required
                                    </span>
                                  ) : (
                                    <div
                                      className={cn(
                                        "w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer",
                                        crew.selected ? "bg-teal-500 border-teal-400" : "bg-white/5 border-white/20",
                                      )}
                                      onClick={() => {
                                        if (crew.id === "chef") {
                                          setFormData({ ...formData, chef: !formData.chef })
                                        } else if (crew.id === "steward") {
                                          setFormData({ ...formData, steward: !formData.steward })
                                        }
                                      }}
                                    >
                                      {crew.selected && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                  )}
                                </div>
                                <p className="text-white/70 text-sm mb-3">{crew.description}</p>
                                <div className="text-teal-400 font-medium">{crew.price}</div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Crew Notes</h4>
                            <textarea
                              className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 min-h-[100px]"
                              placeholder="Any specific requirements or questions for your crew..."
                            ></textarea>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Equipment */}
                      {currentStep === 3 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-white mb-4">Additional Equipment</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              {
                                id: "jetski",
                                name: "Jet Ski",
                                price: "$150/day",
                                image: "/placeholder.svg?key=b0q73",
                              },
                              {
                                id: "seabob",
                                name: "Seabob",
                                price: "$120/day",
                                image: "/placeholder.svg?key=2pe6x",
                              },
                              {
                                id: "paddleboard",
                                name: "Paddle Boards",
                                price: "$50/day",
                                image: "/placeholder.svg?key=avas1",
                              },
                              {
                                id: "snorkel",
                                name: "Snorkeling Gear",
                                price: "$30/day",
                                image: "/placeholder.svg?key=zygro",
                              },
                              {
                                id: "kayak",
                                name: "Kayaks",
                                price: "$60/day",
                                image: "/placeholder.svg?key=lpjse",
                              },
                              {
                                id: "fishing",
                                name: "Fishing Equipment",
                                price: "$80/day",
                                image: "/fishing-equipment.png",
                              },
                            ].map((item, idx) => (
                              <motion.div
                                key={`${item.id}-${idx}`}
                                className={cn(
                                  "backdrop-blur-md border rounded-xl overflow-hidden cursor-pointer transition-all duration-300",
                                  formData.equipment.includes(item.id)
                                    ? "bg-teal-500/20 border-teal-400"
                                    : "bg-white/5 border-white/20 hover:bg-white/10",
                                )}
                                whileHover={{ y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  const newEquipment = formData.equipment.includes(item.id)
                                    ? formData.equipment.filter((id) => id !== item.id)
                                    : [...formData.equipment, item.id]
                                  setFormData({ ...formData, equipment: newEquipment })
                                }}
                              >
                                <div className="flex items-center p-3">
                                  <div className="w-16 h-16 rounded-md overflow-hidden mr-3">
                                    <img
                                      src={item.image || "/placeholder.svg"}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-white font-medium">{item.name}</h4>
                                    <p className="text-teal-400">{item.price}</p>
                                  </div>
                                  <div
                                    className={cn(
                                      "w-6 h-6 rounded-full border flex items-center justify-center",
                                      formData.equipment.includes(item.id)
                                        ? "bg-teal-500 border-teal-400"
                                        : "bg-white/5 border-white/20",
                                    )}
                                  >
                                    {formData.equipment.includes(item.id) && <Check className="w-4 h-4 text-white" />}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 5: Preferences */}
                      {currentStep === 4 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-white mb-4">Your Preferences</h3>

                          <div>
                            <h4 className="text-lg font-medium text-white/80 mb-3">Dining Preferences</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {[
                                { id: "onboard", label: "All meals onboard" },
                                { id: "mixed", label: "Mix of onboard and restaurants" },
                                { id: "restaurants", label: "Mostly restaurants" },
                              ].map((option) => (
                                <div
                                  key={option.id}
                                  className={cn(
                                    "backdrop-blur-md border rounded-md p-3 cursor-pointer transition-all duration-300",
                                    formData.preferences.dining === option.id
                                      ? "bg-teal-500/20 border-teal-400"
                                      : "bg-white/5 border-white/20 hover:bg-white/10",
                                  )}
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      preferences: { ...formData.preferences, dining: option.id },
                                    })
                                  }
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={cn(
                                        "w-5 h-5 rounded-full border mr-2 flex items-center justify-center",
                                        formData.preferences.dining === option.id
                                          ? "border-teal-400"
                                          : "border-white/20",
                                      )}
                                    >
                                      {formData.preferences.dining === option.id && (
                                        <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                                      )}
                                    </div>
                                    <span className="text-white">{option.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-medium text-white/80 mb-3">Activities</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {[
                                "Swimming",
                                "Snorkeling",
                                "Fishing",
                                "Sunbathing",
                                "Water Sports",
                                "Beach Visits",
                                "Cultural Tours",
                                "Nightlife",
                              ].map((activity) => (
                                <div
                                  key={activity}
                                  className={cn(
                                    "backdrop-blur-md border rounded-md p-2 cursor-pointer transition-all duration-300",
                                    formData.preferences.activities.includes(activity)
                                      ? "bg-teal-500/20 border-teal-400"
                                      : "bg-white/5 border-white/20 hover:bg-white/10",
                                  )}
                                  onClick={() => {
                                    const newActivities = formData.preferences.activities.includes(activity)
                                      ? formData.preferences.activities.filter((a) => a !== activity)
                                      : [...formData.preferences.activities, activity]
                                    setFormData({
                                      ...formData,
                                      preferences: { ...formData.preferences, activities: newActivities },
                                    })
                                  }}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={cn(
                                        "w-5 h-5 rounded border mr-2 flex items-center justify-center",
                                        formData.preferences.activities.includes(activity)
                                          ? "bg-teal-500 border-teal-400"
                                          : "border-white/20",
                                      )}
                                    >
                                      {formData.preferences.activities.includes(activity) && (
                                        <Check className="w-3 h-3 text-white" />
                                      )}
                                    </div>
                                    <span className="text-white text-sm">{activity}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-medium text-white/80 mb-3">Special Requests</h4>
                            <textarea
                              className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-teal-400 min-h-[100px]"
                              placeholder="Any special requests or preferences for your charter..."
                              value={formData.preferences.special}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  preferences: { ...formData.preferences, special: e.target.value },
                                })
                              }
                            ></textarea>
                          </div>
                        </div>
                      )}

                      {/* Step 6: Review & Confirm */}
                      {currentStep === 5 && (
                        <div className="space-y-6">
                          <h3 className="text-xl font-medium text-white mb-4">Review Your Charter</h3>

                          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Charter Summary</h4>

                            <div className="space-y-4">
                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Yacht:</span>
                                <span className="text-white font-medium">
                                  {formData.yacht === "yacht-1"
                                    ? "Ocean Explorer 42"
                                    : formData.yacht === "yacht-2"
                                      ? "Azure Breeze 38"
                                      : "Not selected"}
                                </span>
                              </div>

                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Dates:</span>
                                <span className="text-white font-medium">
                                  {formData.startDate && formData.endDate
                                    ? `${formData.startDate} to ${formData.endDate}`
                                    : "Not selected"}
                                </span>
                              </div>

                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Guests:</span>
                                <span className="text-white font-medium">{formData.guests}</span>
                              </div>

                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Destination:</span>
                                <span className="text-white font-medium">
                                  {formData.destination ? formData.destination.replace("-", " ") : "Not selected"}
                                </span>
                              </div>

                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Crew:</span>
                                <span className="text-white font-medium">
                                  {[
                                    formData.captain && "Captain",
                                    formData.chef && "Chef",
                                    formData.steward && "Steward",
                                  ]
                                    .filter(Boolean)
                                    .join(", ") || "None"}
                                </span>
                              </div>

                              <div className="flex justify-between pb-2 border-b border-white/10">
                                <span className="text-white/70">Equipment:</span>
                                <span className="text-white font-medium">
                                  {formData.equipment.length > 0 ? formData.equipment.join(", ") : "None"}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Price Breakdown</h4>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span className="text-white/70">Yacht Charter (5 days):</span>
                                <span className="text-white">$12,500</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Crew:</span>
                                <span className="text-white">$3,750</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Equipment:</span>
                                <span className="text-white">$1,200</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white/70">Taxes & Fees:</span>
                                <span className="text-white">$1,745</span>
                              </div>
                            </div>

                            <div className="flex justify-between pt-2 border-t border-white/20">
                              <span className="text-white font-medium">Total:</span>
                              <span className="text-teal-400 font-bold text-xl">$19,195</span>
                            </div>
                          </div>

                          <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-xl p-4">
                            <h4 className="text-lg font-medium text-white mb-3">Booking Confirmation</h4>
                            <p className="text-white/70 mb-4">
                              Please review your charter details above. Once you confirm, our team will contact you to
                              finalize your booking.
                            </p>

                            <div className="flex items-center mb-4">
                              <input
                                type="checkbox"
                                id="terms"
                                className="w-4 h-4 rounded border-white/20 text-teal-400 focus:ring-teal-400 bg-white/10"
                              />
                              <label htmlFor="terms" className="ml-2 text-white/80 text-sm">
                                I agree to the{" "}
                                <a href="#" className="text-teal-400 hover:underline">
                                  Terms & Conditions
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-teal-400 hover:underline">
                                  Privacy Policy
                                </a>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className="flex justify-between sticky bottom-0 pt-4 bg-[#0a0c19]/95 backdrop-blur-md z-10">
                  <motion.button
                    className={cn(
                      "px-6 py-2 rounded-md backdrop-blur-md border text-white/70 flex items-center transition-colors",
                      currentStep > 0
                        ? "bg-white/5 border-white/20 hover:bg-white/10"
                        : "bg-white/5 border-white/10 opacity-50 cursor-not-allowed",
                    )}
                    onClick={handlePrevious}
                    whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
                    whileTap={currentStep > 0 ? { scale: 0.95 } : {}}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </motion.button>

                  {currentStep < steps.length - 1 ? (
                    <motion.button
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:opacity-90 transition-all duration-300 relative overflow-hidden shadow-[0_5px_15px_rgba(20,184,166,0.3)]"
                      onClick={handleNext}
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(20,184,166,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundSize: "200% 100%", animation: "shimmerGlass 2s infinite linear" }}
                      ></div>
                      <span className="relative z-10 flex items-center">
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </span>
                    </motion.button>
                  ) : (
                    <motion.button
                      className="px-6 py-2 rounded-md bg-gradient-to-r from-teal-500 to-teal-400 text-white hover:opacity-90 transition-all duration-300 relative overflow-hidden shadow-[0_5px_15px_rgba(20,184,166,0.3)]"
                      whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(20,184,166,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundSize: "200% 100%", animation: "shimmerGlass 2s infinite linear" }}
                      ></div>
                      <span className="relative z-10">Confirm Request</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
