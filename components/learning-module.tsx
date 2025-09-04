"use client"

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"

interface LearningModuleProps {
  onBack: () => void
}

export function LearningModule({ onBack }: LearningModuleProps) {
  // Learning module state
  const [selectedModule, setSelectedModule] = useState<any>(null)
  const [activeQuiz, setActiveQuiz] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showCourseContent, setShowCourseContent] = useState(false)
  const [showModuleDetails, setShowModuleDetails] = useState(false)
  const [showAnswerReview, setShowAnswerReview] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState<Array<{questionIndex: number, userAnswer: number, correctAnswer: number, question: any}>>([])

  const learningModules = [
    {
      id: "competent-crew",
      title: "Competent Crew",
      description: "Learn the basics of sailing and become a useful crew member on a yacht.",
      detailedDescription:
        "This comprehensive course introduces you to the world of sailing. You'll master the fundamental concepts that every sailor needs to know, from understanding how wind powers a sailboat to identifying every part of the vessel. Perfect for absolute beginners who want to build a solid foundation in sailing.",
      duration: "5 days",
      lessons: 12,
      difficulty: "Beginner",
      progress: 75,
      completed: false,
      icon: "⛵",
      gradient: "from-blue-500 to-cyan-500",
      price: "€795",
      prerequisites: ["None - Perfect for beginners"],
      learningObjectives: [
        "Understand basic sailing terminology and boat parts",
        "Learn how wind direction affects sailing",
        "Master fundamental sailing maneuvers",
        "Develop safety awareness on the water",
        "Practice basic anchoring techniques",
      ],
      whatYoullLearn: [
        "Parts of a sailboat and their functions",
        "Wind theory and points of sail",
        "Basic sailing maneuvers (tacking, jibing)",
        "Safety procedures and emergency protocols",
        "Anchoring and mooring basics",
      ],
      content: [
        { title: "Introduction to Sailing", duration: "4 hours", completed: true },
        { title: "Parts of a Sailboat", duration: "3 hours", completed: true },
        { title: "Wind Theory", duration: "4 hours", completed: true },
        { title: "Basic Sailing Maneuvers", duration: "6 hours", completed: false },
        { title: "Tacking and Jibing", duration: "4 hours", completed: false },
        { title: "Anchoring Basics", duration: "3 hours", completed: false },
        { title: "Safety Procedures", duration: "4 hours", completed: false },
        { title: "Practice Exercises", duration: "12 hours", completed: false },
      ],
      quiz: {
        questions: [
          {
            question: "What is the term for turning the bow of the boat through the wind?",
            options: ["Jibing", "Tacking", "Bearing away", "Heading up"],
            correct: 1,
            explanation: "Tacking is when you turn the bow through the wind to change direction.",
          },
          {
            question: "Which sail is typically located at the front of the boat?",
            options: ["Mainsail", "Jib", "Spinnaker", "Genoa"],
            correct: 1,
            explanation: "The jib is the triangular sail at the front of the boat, ahead of the mast.",
          },
          {
            question: "What does 'port' refer to on a sailboat?",
            options: ["The right side", "The left side", "The front", "The back"],
            correct: 1,
            explanation: "Port is the left side of the boat when facing forward.",
          },
          {
            question: "What is the main driving force for a sailboat?",
            options: ["Engine", "Wind", "Current", "Waves"],
            correct: 1,
            explanation: "Wind is the primary force that propels a sailboat forward.",
          },
          {
            question: "What is the boom on a sailboat?",
            options: [
              "A type of sail",
              "A horizontal pole attached to the mast",
              "The front of the boat",
              "A safety device",
            ],
            correct: 1,
            explanation: "The boom is the horizontal pole that extends from the mast and controls the mainsail.",
          },
        ],
      },
    },
    {
      id: "day-skipper",
      title: "Day Skipper",
      description: "Learn to skipper a yacht on short passages in familiar waters during daylight.",
      detailedDescription:
        "This intermediate course builds on your basic sailing knowledge and teaches you to take command of a yacht. You'll learn navigation, boat handling, and leadership skills necessary to safely skipper a yacht on day trips in familiar waters.",
      duration: "5 days",
      lessons: 15,
      difficulty: "Intermediate",
      progress: 30,
      completed: false,
      icon: "🧭",
      gradient: "from-emerald-500 to-teal-500",
      price: "€995",
      prerequisites: ["Competent Crew or equivalent sailing experience"],
      learningObjectives: [
        "Plan and execute day sailing trips",
        "Navigate using charts and electronic aids",
        "Understand weather patterns and forecasting",
        "Lead and manage a crew effectively",
        "Handle emergency situations confidently",
      ],
      whatYoullLearn: [
        "Chart work and navigation planning",
        "Pilotage and position fixing",
        "Weather interpretation",
        "Boat handling under power and sail",
        "Crew management and leadership",
        "Emergency procedures and safety",
      ],
      content: [
        { title: "Navigation Fundamentals", duration: "4 hours", completed: true },
        { title: "Chart Work", duration: "5 hours", completed: true },
        { title: "Electronic Navigation", duration: "3 hours", completed: false },
        { title: "Weather Systems", duration: "4 hours", completed: false },
        { title: "Boat Handling", duration: "6 hours", completed: false },
        { title: "Crew Management", duration: "3 hours", completed: false },
        { title: "Emergency Procedures", duration: "4 hours", completed: false },
        { title: "Practical Sailing", duration: "16 hours", completed: false },
      ],
      quiz: {
        questions: [
          {
            question: "What is a bearing in navigation?",
            options: [
              "The speed of the boat",
              "The direction to a landmark",
              "The depth of water",
              "The wind direction",
            ],
            correct: 1,
            explanation: "A bearing is the direction or angle to a specific landmark or destination.",
          },
          {
            question: "How often should you update your position when coastal sailing?",
            options: ["Every hour", "Every 15-30 minutes", "Once per day", "Only when visibility is poor"],
            correct: 1,
            explanation: "Regular position updates every 15-30 minutes help ensure safe navigation.",
          },
          {
            question: "What does GPS stand for?",
            options: [
              "Global Positioning System",
              "General Purpose Sailing",
              "Geographic Position Sensor",
              "Global Port Service",
            ],
            correct: 0,
            explanation: "GPS stands for Global Positioning System, a satellite-based navigation system.",
          },
          {
            question: "What is dead reckoning?",
            options: [
              "Navigation using only GPS",
              "Estimating position based on course and speed",
              "Navigation at night",
              "Emergency navigation",
            ],
            correct: 1,
            explanation:
              "Dead reckoning is estimating your current position based on your last known position, course, and speed.",
          },
        ],
      },
    },
    {
      id: "coastal-skipper",
      title: "Coastal Skipper",
      description: "Advanced course for experienced sailors ready to skipper longer coastal passages.",
      detailedDescription:
        "Take your sailing skills to the next level with this advanced course. Learn to skipper longer coastal passages, handle challenging conditions, and make critical decisions at sea. Perfect for sailors who want to undertake more ambitious voyages.",
      duration: "5 days",
      lessons: 18,
      difficulty: "Advanced",
      progress: 0,
      completed: false,
      icon: "🌊",
      gradient: "from-indigo-500 to-purple-500",
      price: "€1,295",
      prerequisites: ["Day Skipper certificate and 15 days at sea"],
      learningObjectives: [
        "Plan and execute coastal passages",
        "Handle challenging weather conditions",
        "Master advanced navigation techniques",
        "Lead crew in demanding situations",
        "Make critical decisions at sea",
      ],
      whatYoullLearn: [
        "Advanced navigation and passage planning",
        "Weather routing and forecasting",
        "Night sailing and navigation",
        "Advanced boat handling",
        "Emergency management",
        "Crew leadership in challenging conditions",
      ],
      content: [
        { title: "Advanced Navigation", duration: "6 hours", completed: false },
        { title: "Passage Planning", duration: "5 hours", completed: false },
        { title: "Weather Routing", duration: "4 hours", completed: false },
        { title: "Night Sailing", duration: "8 hours", completed: false },
        { title: "Advanced Boat Handling", duration: "6 hours", completed: false },
        { title: "Emergency Management", duration: "4 hours", completed: false },
        { title: "Crew Leadership", duration: "3 hours", completed: false },
        { title: "Practical Assessment", duration: "20 hours", completed: false },
      ],
      quiz: {
        questions: [
          {
            question: "What is the primary consideration when planning a coastal passage?",
            options: [
              "Fuel consumption",
              "Weather and tidal conditions",
              "Crew comfort",
              "Destination popularity",
            ],
            correct: 1,
            explanation: "Weather and tidal conditions are crucial for safe passage planning.",
          },
          {
            question: "When should you consider diverting to an alternative port?",
            options: [
              "Only in severe storms",
              "When conditions exceed your vessel's capabilities",
              "Never, stick to the original plan",
              "Only if the crew requests it",
            ],
            correct: 1,
            explanation: "You should divert when conditions exceed your vessel's or crew's capabilities.",
          },
          {
            question: "What is the most important factor in night navigation?",
            options: [
              "Maintaining speed",
              "Regular position fixing",
              "Keeping lights on",
              "Following shipping lanes",
            ],
            correct: 1,
            explanation: "Regular position fixing is crucial for safe night navigation.",
          },
        ],
      },
    },
    {
      id: "yachtmaster",
      title: "Yachtmaster",
      description: "Professional qualification for experienced sailors ready to command vessels.",
      detailedDescription:
        "The Yachtmaster qualification is the gold standard in sailing certifications. This comprehensive course prepares you for professional yacht command, covering advanced navigation, leadership, and vessel management in all conditions.",
      duration: "7 days",
      lessons: 25,
      difficulty: "Professional",
      progress: 0,
      completed: false,
      icon: "🎯",
      gradient: "from-red-500 to-orange-500",
      price: "€1,995",
      prerequisites: ["Coastal Skipper certificate and 50 days at sea"],
      learningObjectives: [
        "Command vessels in all conditions",
        "Master advanced navigation techniques",
        "Lead professional crews",
        "Handle complex emergency situations",
        "Manage vessel operations",
      ],
      whatYoullLearn: [
        "Advanced navigation and meteorology",
        "Vessel management and maintenance",
        "Professional crew leadership",
        "Emergency response and SAR",
        "International regulations",
        "Business operations",
      ],
      content: [
        { title: "Advanced Navigation", duration: "8 hours", completed: false },
        { title: "Meteorology", duration: "6 hours", completed: false },
        { title: "Vessel Management", duration: "5 hours", completed: false },
        { title: "Crew Leadership", duration: "4 hours", completed: false },
        { title: "Emergency Response", duration: "6 hours", completed: false },
        { title: "International Law", duration: "4 hours", completed: false },
        { title: "Business Operations", duration: "3 hours", completed: false },
        { title: "Practical Assessment", duration: "30 hours", completed: false },
      ],
      quiz: {
        questions: [
          {
            question: "What is the minimum visibility required for safe navigation in restricted visibility?",
            options: [
              "1 nautical mile",
              "2 nautical miles",
              "3 nautical miles",
              "4 nautical miles",
            ],
            correct: 1,
            explanation: "2 nautical miles is the minimum recommended visibility for safe navigation.",
          },
          {
            question: "What is the primary responsibility of a Yachtmaster?",
            options: [
              "Vessel maintenance",
              "Crew safety and vessel security",
              "Navigation planning",
              "Business operations",
            ],
            correct: 1,
            explanation: "Crew safety and vessel security are the primary responsibilities.",
          },
          {
            question: "How often should you update the passage plan during a voyage?",
            options: [
              "Once per day",
              "Continuously as conditions change",
              "Only in poor weather",
              "At major waypoints",
            ],
            correct: 1,
            explanation: "The passage plan should be continuously updated as conditions change.",
          },
        ],
      },
    },
    {
      id: "first-aid",
      title: "First Aid at Sea",
      description: "Essential medical training for handling emergencies at sea.",
      detailedDescription:
        "Learn crucial first aid skills specifically designed for the marine environment. This course covers emergency response, medical care, and survival techniques when professional medical help is not immediately available.",
      duration: "2 days",
      lessons: 8,
      difficulty: "All Levels",
      progress: 0,
      completed: false,
      icon: "🚑",
      gradient: "from-rose-500 to-pink-500",
      price: "€395",
      prerequisites: ["None"],
      learningObjectives: [
        "Handle medical emergencies at sea",
        "Provide first aid in marine conditions",
        "Manage common sailing injuries",
        "Coordinate emergency responses",
        "Use marine first aid equipment",
      ],
      whatYoullLearn: [
        "Basic life support",
        "Marine-specific injuries",
        "Emergency response procedures",
        "First aid equipment usage",
        "Medical communication",
        "Survival techniques",
      ],
      content: [
        { title: "Basic Life Support", duration: "4 hours", completed: false },
        { title: "Marine Injuries", duration: "3 hours", completed: false },
        { title: "Emergency Response", duration: "3 hours", completed: false },
        { title: "First Aid Equipment", duration: "2 hours", completed: false },
        { title: "Medical Communication", duration: "2 hours", completed: false },
        { title: "Practical Scenarios", duration: "4 hours", completed: false },
      ],
      quiz: {
        questions: [
          {
            question: "What is the first step in assessing a casualty at sea?",
            options: [
              "Check for breathing",
              "Ensure scene safety",
              "Call for help",
              "Begin CPR",
            ],
            correct: 1,
            explanation: "Ensuring scene safety is the first priority in any emergency.",
          },
          {
            question: "How should you treat a suspected broken bone at sea?",
            options: [
              "Immediately set the bone",
              "Immobilize and seek medical help",
              "Apply heat",
              "Continue normal activities",
            ],
            correct: 1,
            explanation: "Immobilize the injury and seek medical help as soon as possible.",
          },
          {
            question: "What is the correct ratio for CPR at sea?",
            options: [
              "15 compressions to 2 breaths",
              "30 compressions to 2 breaths",
              "5 compressions to 1 breath",
              "10 compressions to 1 breath",
            ],
            correct: 1,
            explanation: "The standard ratio is 30 compressions to 2 breaths.",
          },
        ],
      },
    },
    {
      id: "vhf-radio",
      title: "VHF Radio",
      description: "Learn to use marine VHF radio equipment, including Digital Selective Calling.",
      detailedDescription:
        "Essential communication skills for all sailors. This course covers the proper use of marine VHF radio equipment, emergency procedures, and Digital Selective Calling (DSC) systems to ensure safe communication at sea.",
      duration: "1 day",
      lessons: 6,
      difficulty: "All Levels",
      progress: 100,
      completed: true,
      icon: "📻",
      gradient: "from-green-500 to-blue-500",
      price: "€195",
      prerequisites: ["None"],
      learningObjectives: [
        "Operate VHF radio equipment correctly",
        "Use proper radio procedures and protocols",
        "Understand Digital Selective Calling",
        "Handle emergency communications",
        "Know international radio regulations",
      ],
      whatYoullLearn: [
        "VHF radio operation",
        "Radio procedures and etiquette",
        "Digital Selective Calling (DSC)",
        "Emergency communications",
        "International regulations",
        "Practical radio exercises",
      ],
      content: [
        { title: "VHF Radio Basics", duration: "1 hour", completed: true },
        { title: "Radio Procedures", duration: "1.5 hours", completed: true },
        { title: "Digital Selective Calling", duration: "1 hour", completed: true },
        { title: "Emergency Communications", duration: "1.5 hours", completed: true },
        { title: "Regulations", duration: "1 hour", completed: true },
        { title: "Practical Exercises", duration: "2 hours", completed: true },
      ],
      quiz: {
        questions: [
          {
            question: "What channel should you use for initial contact with another vessel?",
            options: ["Channel 16", "Channel 9", "Channel 6", "Channel 12"],
            correct: 0,
            explanation: "Channel 16 is the international calling and distress frequency.",
          },
          {
            question: "What does DSC stand for?",
            options: [
              "Digital Safety Communication",
              "Digital Selective Calling",
              "Direct Safety Channel",
              "Digital Signal Control",
            ],
            correct: 1,
            explanation: "DSC stands for Digital Selective Calling, an automated calling system.",
          },
          {
            question: "How should you begin a MAYDAY call?",
            options: ["Say MAYDAY once", "Say MAYDAY twice", "Say MAYDAY three times", "Say EMERGENCY first"],
            correct: 2,
            explanation: "A MAYDAY call should begin with MAYDAY repeated three times.",
          },
          {
            question: "What is the range of a typical handheld VHF radio?",
            options: ["1-2 miles", "3-5 miles", "10-15 miles", "20-30 miles"],
            correct: 1,
            explanation: "Handheld VHF radios typically have a range of 3-5 miles depending on conditions.",
          },
        ],
      },
    },
  ]

  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = selectedAnswer!
    setUserAnswers(newAnswers)

    if (currentQuestion === activeQuiz.questions.length - 1) {
      // Calculate score and identify wrong answers
      let correct = 0
      const wrongAnswersList: Array<{questionIndex: number, userAnswer: number, correctAnswer: number, question: any}> = []
      
      newAnswers.forEach((answer, index) => {
        if (answer === activeQuiz.questions[index].correct) {
          correct++
        } else {
          // Store wrong answer details
          wrongAnswersList.push({
            questionIndex: index,
            userAnswer: answer,
            correctAnswer: activeQuiz.questions[index].correct,
            question: activeQuiz.questions[index]
          })
        }
      })
      
      setCorrectAnswers(correct)
      setQuizScore(Math.round((correct / activeQuiz.questions.length) * 100))
      setWrongAnswers(wrongAnswersList)
      setQuizCompleted(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(userAnswers[currentQuestion + 1] || null)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setUserAnswers([])
    setQuizCompleted(false)
    setQuizScore(0)
    setCorrectAnswers(0)
    setShowCourseContent(false)
    setShowAnswerReview(false)
    setWrongAnswers([])
  }

  return (
    <div className="space-y-6">
      {/* Main course list */}
      {!selectedModule && !activeQuiz && !showCourseContent && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Sailing Education Modules</h2>
            </div>

            <div className="flex items-center mb-6">
              <div className="w-1 h-8 bg-emerald-400 mr-4"></div>
              <h3 className="text-xl font-medium text-white">Course Packages</h3>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module, index) => (
              <motion.div
                key={module.id}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden relative group cursor-pointer"
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
                onClick={() => setSelectedModule(module)}
              >
                {/* Module completion badge */}
                {module.completed && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-emerald-400/20">
                      ✓ Completed
                    </div>
                  </div>
                )}

                {/* Difficulty badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                      module.difficulty === "Beginner" || module.difficulty === "All Levels"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                        : module.difficulty === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-400/20"
                          : "bg-red-500/20 text-red-400 border-red-400/20"
                    }`}
                  >
                    {module.difficulty}
                  </div>
                </div>

                <div className="relative h-32 overflow-hidden">
                  <div className={`w-full h-full bg-gradient-to-br ${module.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-2xl mb-1">{module.icon}</div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h4 className="text-lg font-medium text-white group-hover:text-yellow-400 transition-colors">
                    {module.title}
                  </h4>
                  <p className="text-white/70 text-sm line-clamp-2">{module.description}</p>

                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>{module.duration}</span>
                    <span>{module.lessons} lessons</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        className="bg-yellow-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${module.progress}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                      ></motion.div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <motion.button
                      className="flex-1 py-2 bg-emerald-500/20 text-emerald-400 rounded-md text-sm font-medium border border-emerald-400/20 hover:bg-emerald-500/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedModule(module)
                      }}
                    >
                      {module.progress === 0 ? "Start Learning" : "Continue"}
                    </motion.button>
                    <motion.button
                      className="flex-1 py-2 bg-yellow-400/20 text-yellow-400 rounded-md text-sm font-medium border border-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedModule(module)
                        setShowModuleDetails(true)
                      }}
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <motion.button
              className="px-4 py-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70 flex items-center"
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Navigation
            </motion.button>
          </div>
        </>
      )}

      {/* Course content view */}
      {selectedModule && showCourseContent && !activeQuiz && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              className="p-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70"
              onClick={() => {
                setShowCourseContent(false)
                setActiveQuiz(null)
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <h3 className="text-xl font-medium text-white">{selectedModule.title} - Course Content</h3>
          </div>

          <div className="space-y-4">
            {selectedModule.content.map((lesson: any, index: number) => (
              <motion.div
                key={index}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        lesson.completed
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20"
                          : "bg-white/10 text-white/60 border border-white/20"
                      }`}
                    >
                      {lesson.completed ? "✓" : index + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white">{lesson.title}</h4>
                      <p className="text-white/60 text-sm">{lesson.duration}</p>
                    </div>
                  </div>
                  <motion.button
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      lesson.completed
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20"
                        : "bg-yellow-400/20 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {lesson.completed ? "Completed" : "Start Lesson"}
                  </motion.button>
                </div>

                <div className="text-white/80 text-sm">
                  <p>
                    This lesson covers the fundamentals of {lesson.title.toLowerCase()}. You'll learn practical
                    techniques and best practices that are essential for safe and effective sailing.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Module overview */}
      {selectedModule && !activeQuiz && !showCourseContent && !showModuleDetails && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <motion.button
              className="p-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70"
              onClick={() => setSelectedModule(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <h3 className="text-xl font-medium text-white">{selectedModule.title}</h3>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-lg font-medium text-white">Course Overview</h4>
                <p className="text-white/80">{selectedModule.description}</p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Duration</div>
                    <div className="text-white font-medium">{selectedModule.duration}</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Difficulty</div>
                    <div className="text-white font-medium">{selectedModule.difficulty}</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Lessons</div>
                    <div className="text-white font-medium">{selectedModule.lessons}</div>
                  </div>
                  <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
                    <div className="text-white/60 text-sm">Progress</div>
                    <div className="text-white font-medium">{selectedModule.progress}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Course Content</h4>
                <div className="space-y-2">
                  {selectedModule.content.map((lesson: any, index: number) => (
                    <div
                      key={index}
                      className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                            lesson.completed ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-white/60"
                          }`}
                        >
                          {lesson.completed ? "✓" : index + 1}
                        </div>
                        <span className="text-white/80 text-sm">{lesson.title}</span>
                      </div>
                      <span className="text-white/60 text-xs">{lesson.duration}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    className="flex-1 py-3 bg-emerald-500/20 text-emerald-400 rounded-lg font-medium border border-emerald-400/20 hover:bg-emerald-500/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCourseContent(true)}
                  >
                    Course Content
                  </motion.button>
                  <motion.button
                    className="flex-1 py-3 bg-yellow-400/20 text-yellow-400 rounded-lg font-medium border border-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveQuiz(selectedModule.quiz)
                      setShowCourseContent(false)
                    }}
                  >
                    Take Quiz
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quiz interface */}
      {activeQuiz && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <motion.button
                className="p-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70"
                onClick={() => {
                  setActiveQuiz(null)
                  setShowCourseContent(false)
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <h3 className="text-xl font-medium text-white">Quiz: {selectedModule?.title}</h3>
            </div>
            <div className="text-sm text-white/60">
              Question {currentQuestion + 1} of {activeQuiz.questions.length}
            </div>
          </div>

          {/* Quiz Progress */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Progress</span>
              <span>{Math.round(((currentQuestion + 1) / activeQuiz.questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <motion.div
                className="bg-yellow-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentQuestion + 1) / activeQuiz.questions.length) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </div>
          </div>

          {!quizCompleted ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h4 className="text-lg font-medium text-white mb-6">{activeQuiz.questions[currentQuestion].question}</h4>

              <div className="space-y-3">
                {activeQuiz.questions[currentQuestion].options.map((option: string, index: number) => (
                  <motion.button
                    key={index}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswer === index
                        ? "bg-yellow-400/20 border-yellow-400/40 text-white"
                        : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? "border-yellow-400 bg-yellow-400/20" : "border-white/30"
                        }`}
                      >
                        {selectedAnswer === index && <div className="w-3 h-3 rounded-full bg-yellow-400"></div>}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <motion.button
                  className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors disabled:opacity-50"
                  disabled={currentQuestion === 0}
                  onClick={() => setCurrentQuestion((prev) => prev - 1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Previous
                </motion.button>

                <motion.button
                  className="px-6 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/30 transition-colors disabled:opacity-50"
                  disabled={selectedAnswer === null}
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentQuestion === activeQuiz.questions.length - 1 ? "Finish Quiz" : "Next"}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">{quizScore >= 80 ? "🎉" : quizScore >= 60 ? "👍" : "📚"}</div>
                <h3 className="text-2xl font-medium text-white mb-2">Quiz Completed!</h3>
                <p className="text-white/70 mb-4">
                  You scored {quizScore}% ({correctAnswers} out of {activeQuiz.questions.length} correct)
                </p>

                <div
                  className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                    quizScore >= 80
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20"
                      : quizScore >= 60
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-400/20"
                        : "bg-red-500/20 text-red-400 border border-red-400/20"
                  }`}
                >
                  {quizScore >= 80 ? "Excellent!" : quizScore >= 60 ? "Good Job!" : "Keep Learning!"}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <motion.button
                  className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
                  onClick={() => {
                    setActiveQuiz(null)
                    setSelectedModule(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to Modules
                </motion.button>

                {wrongAnswers.length > 0 && (
                  <motion.button
                    className="px-6 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-400/20 hover:bg-blue-500/30 transition-colors"
                    onClick={() => setShowAnswerReview(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Review Wrong Answers
                  </motion.button>
                )}

                {quizScore < 80 && (
                  <motion.button
                    className="px-6 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
                    onClick={resetQuiz}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Retake Quiz
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Answer Review Screen */}
      {showAnswerReview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between mb-6">
            <motion.button
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setShowAnswerReview(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Results</span>
            </motion.button>
            <h2 className="text-xl font-medium text-white">Review Wrong Answers</h2>
            <div></div>
          </div>

          <div className="space-y-4">
            {wrongAnswers.map((wrongAnswer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/50">Question {wrongAnswer.questionIndex + 1}</span>
                    <span className="text-sm text-red-400">Incorrect</span>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    {wrongAnswer.question.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {wrongAnswer.question.options.map((option: string, optionIndex: number) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border transition-colors ${
                        optionIndex === wrongAnswer.correctAnswer
                          ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-400'
                          : optionIndex === wrongAnswer.userAnswer
                          ? 'bg-red-500/20 border-red-400/30 text-red-400'
                          : 'bg-white/5 border-white/10 text-white/70'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                          optionIndex === wrongAnswer.correctAnswer
                            ? 'bg-emerald-500 text-white'
                            : optionIndex === wrongAnswer.userAnswer
                            ? 'bg-red-500 text-white'
                            : 'bg-white/10 text-white/50'
                        }`}>
                          {String.fromCharCode(65 + optionIndex)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {optionIndex === wrongAnswer.correctAnswer && (
                          <div className="flex items-center space-x-1 text-emerald-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Correct</span>
                          </div>
                        )}
                        {optionIndex === wrongAnswer.userAnswer && optionIndex !== wrongAnswer.correctAnswer && (
                          <div className="flex items-center space-x-1 text-red-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">Your Answer</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {wrongAnswer.question.explanation && (
                  <div className="mt-4 p-4 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-400 mb-2">Explanation:</h4>
                    <p className="text-blue-300 text-sm">{wrongAnswer.question.explanation}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 pt-6">
            <motion.button
              className="px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors"
              onClick={() => setShowAnswerReview(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Results
            </motion.button>

            <motion.button
              className="px-6 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 border border-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
              onClick={() => {
                setShowAnswerReview(false)
                resetQuiz()
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Retake Quiz
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
