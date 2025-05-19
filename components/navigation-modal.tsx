"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Grid, Anchor, Users, User, ArrowUp, X, Loader2, Download, Printer, Edit, RefreshCw } from "lucide-react"
import { useState } from "react"
import { CharterBookingModal } from "./charter-booking-modal"
import { ProvisionsChat } from "./provisions-chat"
import { useRouter } from 'next/navigation'  // Update this import

// Add keyframe animations for light reflections
const lightReflectionKeyframes = `
@keyframes moveLight1 {
  0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
  25% { opacity: 0.5; }
  50% { transform: translate(-30%, -30%) rotate(180deg); opacity: 0; }
  100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
}

@keyframes moveLight2 {
  0% { transform: translate(100%, 100%); opacity: 0; }
  50% { transform: translate(80%, 80%); opacity: 0.3; }
  100% { transform: translate(100%, 100%); opacity: 0; }
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
`

interface NavigationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ProvisionItem {
  name: string;
  quantity: string;
  estimatedPrice?: number;
}

interface ProvisionCategory {
  category: string;
  items: ProvisionItem[];
  estimatedCost?: number;
}

interface MealSuggestion {
  type: string;
  suggestion: string;
}

interface DayMealPlan {
  day: string;
  meals: MealSuggestion[];
}

interface DietaryPreference {
  type: string;
  count: number;
}

interface MealPreference {
  type: string;
  count: number;
}

interface BudgetCategory {
  category: string;
  total: number;
  percentage: number;
  items: Array<{
    name: string;
    quantity: string;
    estimatedPrice: number;
    percentage: number;
  }>;
}

interface BudgetErrorDetails {
  totalCost: number;
  budget: number;
  overage: number;
  overagePercentage: number;
  message: string;
  categories: BudgetCategory[];
  suggestions: string[];
}

// Add new interface for allergies
interface AllergyPreference {
  type: string;
  count: number;
}

// Enhanced calculation functions
const calculateItemTotal = (item: any): number => {
  if (!item.estimatedPrice || typeof item.estimatedPrice !== 'number') {
    console.warn(`Invalid price for item: ${item.name}`);
    return 0;
  }

  // Extract quantity number from the quantity string
  let quantity = 1;
  const quantityMatch = item.quantity.match(/(\d+)\s*(kg|g|pieces|bottles|loaves|units|dozen|ml|L)/i);
  
  if (quantityMatch) {
    const [, amount, unit] = quantityMatch;
    quantity = parseFloat(amount);
    
    // Convert grams to kg if needed
    if (unit.toLowerCase() === 'g') {
      quantity = quantity / 1000;
    }
    // Convert ml to L if needed
    if (unit.toLowerCase() === 'ml') {
      quantity = quantity / 1000;
    }
  }

  // Calculate total price based on quantity
  return item.estimatedPrice * quantity;
};

const calculateCategoryTotal = (category: ProvisionCategory): number => {
  if (!category.items || !Array.isArray(category.items)) {
    console.warn(`Invalid items array for category: ${category.category}`);
    return 0;
  }
  const total = category.items.reduce((acc, item) => acc + calculateItemTotal(item), 0);
  // Store the calculated total on the category for consistency
  category.estimatedCost = total;
  return total;
};

const calculateOverallTotal = (provisionsList: ProvisionCategory[]): number => {
  if (!provisionsList || !Array.isArray(provisionsList)) {
    console.warn('Invalid provisions list');
    return 0;
  }
  
  const total = provisionsList.reduce((acc, category) => {
    const categoryTotal = calculateCategoryTotal(category);
    return acc + categoryTotal;
  }, 0);

  // Validate total matches sum of all items
  const itemLevelTotal = provisionsList.reduce((acc, category) => 
    acc + category.items.reduce((itemAcc, item) => itemAcc + calculateItemTotal(item), 0), 0
  );

  if (Math.abs(total - itemLevelTotal) > 0.01) {
    console.error('Budget calculation mismatch detected:', {
      categoryTotal: total,
      itemLevelTotal: itemLevelTotal,
      difference: total - itemLevelTotal
    });
  }

  return total;
};

const calculateMealTypeTotal = (provisionsList: ProvisionCategory[], mealType: string): number => {
  return provisionsList
    .filter(category => category.category.toLowerCase().includes(mealType.toLowerCase()))
    .reduce((acc, category) => acc + calculateCategoryTotal(category), 0);
};

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// Add helper for trip duration conversion
const getTripDays = (duration: string): number => {
  const matches = duration.match(/(\d+)\s*(week|month)/i);
  if (!matches) return 0;
  
  const [, count, unit] = matches;
  const numCount = parseInt(count);
  
  if (unit.toLowerCase() === 'week') {
    return numCount * 7;
  } else if (unit.toLowerCase() === 'month') {
    return numCount * 30;
  }
  return 0;
};

// Update the BudgetBreakdown component to include per-person calculations
const BudgetBreakdown: React.FC<{ 
  provisionsList: ProvisionCategory[], 
  budget: number,
  tripDuration: string,
  totalPeople: string 
}> = ({ provisionsList, budget, tripDuration, totalPeople }) => {
  const totalSpent = calculateOverallTotal(provisionsList);
  const remaining = budget - totalSpent;
  const numPeople = parseInt(totalPeople) || 0;
  const numDays = getTripDays(tripDuration);

  // Calculate totals by major category
  const categoryTotals = provisionsList.reduce((acc, category) => {
    const total = calculateCategoryTotal(category);
    acc[category.category] = {
      total,
      perPerson: total / (numPeople || 1)
    };
    return acc;
  }, {} as Record<string, { total: number; perPerson: number }>);

  // Calculate per-person, per-day metrics
  const perPersonPerDay = numPeople && numDays ? totalSpent / (numPeople * numDays) : 0;
  const waterRequirement = numPeople * numDays * 2;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-white/70">Total Budget:</span>
        <span className="text-white">€{formatCurrency(budget)}</span>
      </div>

      {/* Trip Details */}
      <div className="bg-white/5 rounded-md p-2 space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">People on Board:</span>
          <span className="text-white/80">{numPeople}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Trip Duration:</span>
          <span className="text-white/80">{numDays} days</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Per Person/Day:</span>
          <span className="text-white/80">€{formatCurrency(perPersonPerDay)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Water Required:</span>
          <span className="text-white/80">{waterRequirement}L</span>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-1 border-t border-white/10 pt-2">
        {Object.entries(categoryTotals).map(([category, { total, perPerson }]) => (
          <div key={category} className="flex justify-between text-sm">
            <span className="text-white/60">{category}:</span>
            <div className="text-right">
              <div className="text-white/80">€{formatCurrency(total)}</div>
              <div className="text-xs text-white/50">€{formatCurrency(perPerson)} per person</div>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-white/10 pt-2 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-white">Total Spent:</span>
          <div className="text-right">
            <div className="text-white">€{formatCurrency(totalSpent)}</div>
            <div className="text-xs text-white/50">€{formatCurrency(totalSpent/(numPeople || 1))} per person</div>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-white">Remaining:</span>
          <span className={remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}>
            €{formatCurrency(remaining)}
          </span>
        </div>
      </div>
    </div>
  );
};

export function NavigationModal({ isOpen, onClose }: NavigationModalProps) {
  const router = useRouter()  // Add this line
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<"shopping" | "meals">("shopping")
  const [isProvisionsFlipped, setIsProvisionsFlipped] = useState(true)
  const [isProvisionsResultFlipped, setIsProvisionsResultFlipped] = useState(false)
  const [isGeneratingProvisions, setIsGeneratingProvisions] = useState(false)
  const [provisionsList, setProvisionsList] = useState<ProvisionCategory[]>([])
  const [mealSuggestions, setMealSuggestions] = useState<DayMealPlan[]>([])
  const [isCharterModalOpen, setIsCharterModalOpen] = useState(false)

  // Form state
  const [tripDuration, setTripDuration] = useState("")
  const [totalPeople, setTotalPeople] = useState("")
  const [dietaryPreferences, setDietaryPreferences] = useState<DietaryPreference[]>([
    { type: "Vegan", count: 0 },
    { type: "Pescatarian", count: 0 },
    { type: "Gluten-Free", count: 0 }
  ])
  const [mealPreferences, setMealPreferences] = useState<MealPreference[]>([
    { type: "Breakfast", count: 0 },
    { type: "Lunch", count: 0 },
    { type: "Dinner", count: 0 },
    { type: "Snacks", count: 0 },
    { type: "Desserts", count: 0 }
  ])
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [kidsNotes, setKidsNotes] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Add state for budget
  const [budget, setBudget] = useState(1000)
  const [showBudgetOptions, setShowBudgetOptions] = useState(false)

  // Add allergy state
  const [allergyPreferences, setAllergyPreferences] = useState<AllergyPreference[]>([
    { type: "Nuts", count: 0 },
    { type: "Shellfish", count: 0 },
    { type: "Eggs", count: 0 },
    { type: "Soy", count: 0 },
    { type: "Lactose", count: 0 }
  ]);

  // 1. Add state for child age groups
  const [childAgeGroups, setChildAgeGroups] = useState([
    { ageRange: "0-2", count: 0, notes: "" },
    { ageRange: "3-5", count: 0, notes: "" },
    { ageRange: "6-12", count: 0, notes: "" },
    { ageRange: "13-17", count: 0, notes: "" }
  ]);

  // 2. Add handlers for child age groups
  const updateChildCount = (idx: number, delta: number) => {
    setChildAgeGroups(groups => groups.map((g, i) =>
      i === idx ? { ...g, count: Math.max(0, g.count + delta) } : g
    ));
  };
  const updateChildNotes = (idx: number, notes: string) => {
    setChildAgeGroups(groups => groups.map((g, i) =>
      i === idx ? { ...g, notes } : g
    ));
  };

  const navigationItems = [
    {
      name: "Provisions",
      icon: <Grid className="w-6 h-6 text-emerald-400" />,
      color: "bg-[#0D1117]/80 text-emerald-400 border-emerald-400/20",
      hoverGradient: "from-emerald-400/5",
      description: "Plan your yacht provisions",
    },
    {
      name: "Yacht",
      icon: (
        <div className="w-6 h-6 rounded-full border-2 border-amber-400 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
        </div>
      ),
      color: "bg-[#0D1117]/80 text-amber-400 border-amber-400/20",
      hoverGradient: "from-amber-400/5",
      description: "Explore available yachts",
    },
    {
      name: "Charter",
      icon: <Anchor className="w-6 h-6 text-teal-400" />,
      color: "bg-[#0D1117]/80 text-teal-400 border-teal-400/20",
      hoverGradient: "from-teal-400/5",
      description: "Book your charter experience",
    },
    {
      name: "Flotilla",
      icon: <Users className="w-6 h-6 text-blue-400" />,
      color: "bg-[#0D1117]/80 text-blue-400 border-blue-400/20",
      hoverGradient: "from-blue-400/5",
      description: "Join group sailing adventures",
    },
    {
      name: "Cabins",
      icon: <User className="w-6 h-6 text-purple-400" />,
      color: "bg-[#0D1117]/80 text-purple-400 border-purple-400/20",
      hoverGradient: "from-purple-400/5",
      description: "Browse cabin accommodations",
    },
    {
      name: "Learning",
      icon: <ArrowUp className="w-6 h-6 text-emerald-400" />,
      color: "bg-[#0D1117]/80 text-emerald-400 border-emerald-400/20",
      hoverGradient: "from-emerald-400/5",
      description: "Access yachting education resources",
    },
  ]

  const flotillaEvents = [
    {
      id: "fl-001",
      title: "Volatile Bodies",
      date: "June 15-22, 2023",
      location: "Greek Islands",
      description:
        "Join our flagship event exploring the stunning Greek Islands with a group of fellow sailing enthusiasts. Perfect for intermediate sailors.",
      details: {
        duration: "7 days / 6 nights",
        departure: "Athens Marina",
        arrival: "Mykonos",
        price: "€1,950 per person",
      },
      spots: 4,
      totalSpots: 12,
      image: "/greek-islands-sailing-yacht.png",
    },
    {
      id: "fl-002",
      title: "Caribbean Winter Escape",
      date: "December 10-17, 2023",
      location: "British Virgin Islands",
      description:
        "Escape the winter cold and enjoy the crystal clear waters of the Caribbean. Suitable for all experience levels.",
      spots: 6,
      totalSpots: 10,
      image: "/caribbean-sailing-yacht.png",
    },
    {
      id: "fl-003",
      title: "Croatian Coast Adventure",
      date: "September 5-12, 2023",
      location: "Dalmatian Coast",
      description:
        "Discover hidden coves and historic towns along Croatia's beautiful Dalmatian Coast. Intermediate level recommended.",
      spots: 2,
      totalSpots: 8,
      image: "/croatia-sailing-yacht.png",
    },
  ]

  const handleSectionClick = (name: string) => {
    setActiveSection(name)
    if (name === "Charter") {
      setIsCharterModalOpen(true)
    }
  }

  const handleBackClick = () => {
    setActiveSection(null)
  }

  const handleDietaryPreferenceChange = (type: string, isChecked: boolean) => {
    setDietaryPreferences(prev => 
      prev.map(pref => 
        pref.type === type 
          ? { ...pref, count: isChecked ? 1 : 0 }
          : pref
      )
    )
  }

  const handleDietaryPreferenceCount = (type: string, delta: number) => {
    setDietaryPreferences(prev => 
      prev.map(pref => 
        pref.type === type 
          ? { ...pref, count: Math.max(0, pref.count + delta) }
          : pref
      )
    )
  }

  const handleMealPreferenceChange = (meal: string, isChecked: boolean) => {
    setMealPreferences(prev => {
      const newPreferences = isChecked 
        ? [...prev, { type: meal, count: 0 }]
        : prev.filter(m => m.type !== meal);
      
      // Ensure at least one meal type is selected
      if (newPreferences.length === 0) {
        setError("Please select at least one meal type");
        return prev;
      }
      
      setError(null);
      return newPreferences;
    });
  };

  const handleMealPreferenceCount = (type: string, delta: number) => {
    setMealPreferences(prev => 
      prev.map(pref => 
        pref.type === type 
          ? { ...pref, count: Math.max(0, pref.count + delta) }
          : pref
      )
    );
  };

  const getMealPreferenceCount = (type: string): number => {
    return mealPreferences.find(p => p.type === type)?.count ?? 0;
  };

  const getActiveMealTypes = () => {
    return mealPreferences
      .filter(pref => pref.count > 0)
      .map(pref => pref.type.toLowerCase()); // Convert to lowercase for case-insensitive comparison
  };

  const validateMealSuggestions = (suggestions: DayMealPlan[]): boolean => {
    const activeMealTypes = getActiveMealTypes();
    
    // Log for debugging
    console.log('Active meal types:', activeMealTypes);
    console.log('Received meal suggestions:', suggestions);
    
    return suggestions.every(day => 
      day.meals.every(meal => 
        activeMealTypes.includes(meal.type.toLowerCase()) // Case-insensitive comparison
      )
    );
  };

  const handleGenerateProvisions = async () => {
    try {
      setError(null);
      
      // Validate form
      if (!tripDuration) {
        setError("Please select a trip duration");
        return;
      }
      if (!totalPeople || isNaN(parseInt(totalPeople))) {
        setError("Please enter a valid number of people");
        return;
      }
      const activeMeals = getActiveMealTypes();
      if (activeMeals.length === 0) {
        setError("Please select at least one meal type");
        return;
      }
      if (budget < 500 || budget > 10000) {
        setError("Budget must be between €500 and €10,000");
        return;
      }

    // Flip to the provisions result card
      setIsProvisionsFlipped(false);
      setIsProvisionsResultFlipped(true);
      setIsGeneratingProvisions(true);

      // Filter out preferences with count 0
      const activeDietaryPreferences = dietaryPreferences.filter(pref => pref.count > 0);
      const activeMealPreferences = mealPreferences.filter(pref => pref.count > 0);
      const activeAllergies = allergyPreferences.filter(pref => pref.count > 0);

      // Format allergy notes
      const allergyNotes = activeAllergies.length > 0 
        ? `Allergies: ${activeAllergies.map(a => `${a.count} guest(s) with ${a.type} allergy`).join(', ')}`
        : '';

      // Combine allergy notes with additional notes
      const combinedNotes = [
        additionalNotes,
        allergyNotes
      ].filter(Boolean).join('\n\n');

      // 4. Calculate adults and total kids before API request
      const totalKids = childAgeGroups.reduce((sum, g) => sum + g.count, 0);
      const adults = parseInt(totalPeople) - totalKids;

      // Call the API
      const response = await fetch('/api/provisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDuration,
          totalPeople: parseInt(totalPeople),
          adults,
          children: childAgeGroups.filter(g => g.count > 0),
          dietaryPreferences: activeDietaryPreferences,
          mealPreferences: activeMealPreferences,
          budget,
          additionalNotes: combinedNotes || undefined, // for adults
          kidsNotes: kidsNotes || undefined
        }),
      });

      console.log('API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error response:', errorData);
        
        if (response.status === 422 && errorData.details) {
          const details = errorData.details as BudgetErrorDetails;
          // Show detailed budget feedback
          setError(details.message);
          
          // Create a formatted message with suggestions
          const detailedMessage = `
Budget Analysis:
- Total Cost: €${details.totalCost.toFixed(2)}
- Budget: €${details.budget.toFixed(2)}
- Over Budget: €${details.overage.toFixed(2)} (${details.overagePercentage.toFixed(1)}%)

Highest Cost Categories:
${details.categories.slice(0, 3).map((cat: BudgetCategory) => 
  `- ${cat.category}: €${cat.total.toFixed(2)} (${cat.percentage.toFixed(1)}%)`
).join('\n')}

Suggestions:
${details.suggestions.map((s: string) => `- ${s}`).join('\n')}

Would you like to:
1. Increase budget to €${Math.ceil(details.totalCost)}
2. Try again with stricter budget constraints
3. View detailed breakdown of costs`;

          setAdditionalNotes(detailedMessage);
          
          // Show a modal or update UI to display options
          setShowBudgetOptions(true);
        } else {
          throw new Error(errorData.error || 'Failed to generate provisions list');
        }
        return;
      }

      const data = await response.json();
      console.log('API success response:', {
        categoriesCount: data.provisionsList?.length,
        mealsCount: data.mealSuggestions?.length
      });
      
      // Validate that the response only includes selected meal types
      if (!validateMealSuggestions(data.mealSuggestions)) {
        console.error('Invalid meal suggestions:', data.mealSuggestions);
        throw new Error('Received meal suggestions for unselected meal types');
      }

      setProvisionsList(data.provisionsList);
      setMealSuggestions(data.mealSuggestions);
    } catch (err) {
      console.error('Error generating provisions:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate provisions list');
      // Flip back to the form on error
      setIsProvisionsFlipped(true);
      setIsProvisionsResultFlipped(false);
    } finally {
      setIsGeneratingProvisions(false);
    }
  };

  const handleRegenerateProvisions = async () => {
    try {
      setError(null);
      setIsGeneratingProvisions(true);

      // Filter out preferences with count 0
      const activeDietaryPreferences = dietaryPreferences.filter(pref => pref.count > 0);
      const activeAllergies = allergyPreferences.filter(pref => pref.count > 0);

      // Format allergy notes
      const allergyNotes = activeAllergies.length > 0 
        ? `Allergies: ${activeAllergies.map(a => `${a.count} guest(s) with ${a.type} allergy`).join(', ')}`
        : '';

      // Combine allergy notes with additional notes
      const combinedNotes = [
        additionalNotes,
        allergyNotes
      ].filter(Boolean).join('\n\n');

      // Call the API
      const response = await fetch('/api/provisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDuration,
          totalPeople: parseInt(totalPeople),
          dietaryPreferences: activeDietaryPreferences,
          mealPreferences,
          budget,
          additionalNotes: combinedNotes || undefined,
          kidsNotes: kidsNotes || undefined,
          isRegenerating: true
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to regenerate provisions list');
      }

      const data = await response.json();
      
      // Validate that the response only includes selected meal types
      if (!validateMealSuggestions(data.mealSuggestions)) {
        throw new Error('Received meal suggestions for unselected meal types');
      }

      setProvisionsList(data.provisionsList);
      setMealSuggestions(data.mealSuggestions);
    } catch (err) {
      console.error('Error regenerating provisions:', err);
      setError(err instanceof Error ? err.message : 'Failed to regenerate provisions list');
    } finally {
      setIsGeneratingProvisions(false);
    }
  };

  const handleEditProvisions = () => {
    setIsProvisionsFlipped(true)
    setIsProvisionsResultFlipped(false)
  }

  const handlePrintProvisions = () => {
    window.print()
  }

  const handleDownloadProvisions = () => {
    // Create a text representation of the provisions list
    let provisionsText = "YAGA PROVISIONS LIST\n\n"

    provisionsList.forEach((category) => {
      provisionsText += `${category.category.toUpperCase()}\n`
      category.items.forEach((item) => {
        provisionsText += `- ${item.name}: ${item.quantity}\n`
      })
      provisionsText += "\n"
    })

    provisionsText += "MEAL SUGGESTIONS\n\n"
    mealSuggestions.forEach((day) => {
      provisionsText += `${day.day}\n`
      day.meals.forEach((meal) => {
        provisionsText += `- ${meal.type}: ${meal.suggestion}\n`
      })
      provisionsText += "\n"
    })

    // Create a blob and download link
    const blob = new Blob([provisionsText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "yaga-provisions-list.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getPreferenceCount = (type: string): number => {
    return dietaryPreferences.find(p => p.type === type)?.count ?? 0;
  };

  // Add new function for enhancing the menu
  const handleEnhanceMenu = async () => {
    try {
      setError(null);
      setIsGeneratingProvisions(true);

      // Calculate enhanced budget with a buffer to prevent common overages
      const enhancedBudget = Math.ceil(budget * 1.6); // Increased from 1.5 to 1.6 to provide more buffer

      // Call the API with enhanced flag
      const response = await fetch('/api/provisions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDuration,
          totalPeople: parseInt(totalPeople),
          dietaryPreferences: dietaryPreferences.filter(pref => pref.count > 0),
          mealPreferences: mealPreferences.filter(pref => pref.count > 0),
          budget: enhancedBudget,
          additionalNotes: 'Please enhance with premium ingredients and additional luxury items',
          kidsNotes: kidsNotes || undefined,
          isEnhanced: true
        }),
      });

      let data;
      if (!response.ok) {
        const errorData = await response.json();
        
        if (response.status === 422 && errorData.details) {
          const details = errorData.details as BudgetErrorDetails;
          
          // Calculate the percentage over the enhanced budget
          const percentageOver = ((details.totalCost - enhancedBudget) / enhancedBudget) * 100;
          
          // Show confirmation dialog regardless of overage percentage
          const proceedMessage = `
Enhanced Menu Analysis:
- Original Budget: €${budget.toFixed(2)}
- Enhanced Budget: €${enhancedBudget.toFixed(2)}
- Required Total: €${details.totalCost.toFixed(2)}
- Additional Cost: €${(details.totalCost - budget).toFixed(2)} (${percentageOver.toFixed(1)}% over)

The enhanced menu includes premium items like:
${details.categories.slice(0, 3).map((cat: BudgetCategory) => 
  `- ${cat.category}: Premium selections and upgrades`
).join('\n')}

Would you like to proceed with the enhanced menu?
This will increase your budget to cover all premium items while maintaining quality.`;

          // Show confirmation dialog
          if (window.confirm(proceedMessage)) {
            // Update budget and proceed
            const newBudget = Math.ceil(details.totalCost * 1.05); // Add 5% buffer
            setBudget(newBudget);
            
            // Retry the API call with adjusted budget
            const retryResponse = await fetch('/api/provisions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tripDuration,
                totalPeople: parseInt(totalPeople),
                dietaryPreferences: dietaryPreferences.filter(pref => pref.count > 0),
                mealPreferences: mealPreferences.filter(pref => pref.count > 0),
                budget: newBudget,
                additionalNotes: 'Please enhance with premium ingredients and additional luxury items',
                kidsNotes: kidsNotes || undefined,
                isEnhanced: true
              }),
            });

            if (!retryResponse.ok) {
              throw new Error('Failed to generate enhanced provisions list');
            }

            data = await retryResponse.json();
            setProvisionsList(data.provisionsList);
            setMealSuggestions(data.mealSuggestions);
            
            // Show success message
            setAdditionalNotes(`
Successfully enhanced menu with premium items!
- Original Budget: €${budget.toFixed(2)}
- Enhanced Budget: €${newBudget.toFixed(2)}

The menu now includes premium ingredients and luxury items while maintaining all dietary preferences.`);
            return;
          }
          return;
        }
        
        throw new Error(errorData.error || 'Failed to enhance provisions list');
      }

      data = await response.json();
      
      // Validate that the response only includes selected meal types
      if (!validateMealSuggestions(data.mealSuggestions)) {
        console.error('Invalid meal suggestions:', data.mealSuggestions);
        throw new Error('Received invalid meal suggestions. Please try again.');
      }

      // Update the budget to match the enhanced version
      setBudget(enhancedBudget);
      setProvisionsList(data.provisionsList);
      setMealSuggestions(data.mealSuggestions);
      
      // Show success message
      setAdditionalNotes(`
Successfully enhanced menu with premium items!
- Original Budget: €${budget.toFixed(2)}
- Enhanced Budget: €${enhancedBudget.toFixed(2)}

The menu now includes premium ingredients and luxury items while maintaining all dietary preferences.`);
      
    } catch (err) {
      console.error('Error enhancing provisions:', err);
      setError(err instanceof Error ? err.message : 'Failed to enhance provisions list');
    } finally {
      setIsGeneratingProvisions(false);
    }
  };

  // Add allergy handlers
  const handleAllergyPreferenceCount = (type: string, delta: number) => {
    setAllergyPreferences(prev => 
      prev.map((pref: AllergyPreference) => 
        pref.type === type 
          ? { ...pref, count: Math.max(0, pref.count + delta) }
          : pref
      )
    );
  };

  const getAllergyPreferenceCount = (type: string): number => {
    return allergyPreferences.find((pref: AllergyPreference) => pref.type === type)?.count ?? 0;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full max-w-4xl mx-4 rounded-2xl bg-[#0A0E17]/90 border border-white/10 backdrop-blur-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="backdrop-blur-2xl bg-[#0a0c19]/40 border border-white/15 rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_2px_rgba(255,255,255,0.1)] relative overflow-hidden max-h-[85vh] flex flex-col before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none">
                {/* Light reflection elements */}
                <style jsx>{lightReflectionKeyframes}</style>
                <div
                  className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] rounded-full bg-gradient-radial from-white/10 to-transparent opacity-0 pointer-events-none"
                  style={{ animation: "moveLight1 15s infinite ease-in-out" }}
                ></div>
                <div
                  className="absolute -bottom-[100px] -right-[100px] w-[200px] h-[200px] rounded-full bg-gradient-radial from-white/5 to-transparent opacity-0 pointer-events-none"
                  style={{ animation: "moveLight2 12s infinite ease-in-out" }}
                ></div>
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 pointer-events-none"
                  style={{ animation: "shimmer 8s infinite linear" }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20 pointer-events-none"
                  style={{ animation: "shimmer 8s infinite linear reverse" }}
                ></div>

                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-trend-yellow/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 overflow-y-auto custom-scrollbar flex-1">
                  <AnimatePresence mode="wait">
                    {activeSection === null ? (
                      <motion.div
                        key="navigation-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                      >
                        <div className="mb-10 flex justify-center">
                          <div className="absolute left-1/2 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2">
                            <h2 className="text-2xl font-medium text-white whitespace-nowrap">
                              Navigate Your Yachting Experience
                            </h2>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 relative z-10">
                          {navigationItems.map((item, index) => (
                            <motion.button
                              key={item.name}
                              className={`group flex flex-col items-center justify-center p-6 rounded-xl border border-white/10 ${item.color} hover:bg-opacity-100 transition-all relative overflow-hidden`}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.1 + index * 0.05 },
                              }}
                              onClick={() => handleSectionClick(item.name)}
                            >
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${item.hoverGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                              ></div>

                              {/* Icon and name that fade out on hover */}
                              <div className="flex flex-col items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                                <div className="mb-3 relative z-10">{item.icon}</div>
                                <span className="text-sm font-medium relative z-10">{item.name}</span>
                              </div>

                              {/* Tooltip description that fades in on hover */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm rounded-xl">
                                <span className="text-sm text-white/90 px-3 text-center">{item.description}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>

                        <div className="relative z-10 mt-10 flex justify-center">
                          <motion.button
                            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70 text-sm"
                            onClick={onClose}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.4 } }}
                          >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Home
                          </motion.button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="section-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10"
                      >
                        {/* Section header */}
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-2xl font-medium text-white flex items-center">
                            {navigationItems.find((item) => item.name === activeSection)?.icon}
                            <span className="ml-3">{activeSection}</span>
                          </h2>
                          <motion.button
                            className="p-2 rounded-full bg-[#0D1117]/80 border border-white/10 text-white/70"
                            onClick={handleBackClick}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Section content */}
                        {activeSection === "Provisions" && (
                          <AnimatePresence mode="wait">
                            {isProvisionsFlipped ? (
                              <motion.div
                                key="provisions-form"
                                initial={{ opacity: 0, rotateY: -90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: 90 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar"
                              >
                                <h2 className="text-2xl font-semibold mb-6 text-white sticky top-0 bg-[#0a0c19]/95 backdrop-blur-md py-2 z-10">
                                  Plan Your Provisions
                                </h2>

                                {/* Trip Information */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                      Trip Duration
                                    </label>
                                    <select 
                                      className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                                      value={tripDuration}
                                      onChange={(e) => setTripDuration(e.target.value)}
                                    >
                                      <option value="">Select duration</option>
                                      <option value="1 week">1 week</option>
                                      <option value="2 weeks">2 weeks</option>
                                      <option value="3 weeks">3 weeks</option>
                                      <option value="1 month">1 month</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                      Number of People
                                    </label>
                                    <input
                                      type="text"
                                      className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30"
                                      placeholder="Enter number of people"
                                      value={totalPeople}
                                      onChange={(e) => setTotalPeople(e.target.value)}
                                    />
                                  </div>
                                </div>

                                {/* Dietary Preferences */}
                                <div>
                                  <h3 className="text-lg font-medium text-white/80 mb-4">Dietary Preferences</h3>
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-vegetarian"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                          />
                                          <label htmlFor="diet-vegetarian" className="ml-2 text-white">
                                            Vegetarian
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md">
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">0</span>
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md">
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-vegan"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                            checked={getPreferenceCount("Vegan") > 0}
                                            onChange={(e) => handleDietaryPreferenceChange("Vegan", e.target.checked)}
                                          />
                                          <label htmlFor="diet-vegan" className="ml-2 text-white">
                                            Vegan
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                              onClick={() => handleDietaryPreferenceCount("Vegan", -1)}
                                            >
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">
                                              {getPreferenceCount("Vegan")}
                                            </span>
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                              onClick={() => handleDietaryPreferenceCount("Vegan", 1)}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-pescatarian"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                            checked={getPreferenceCount("Pescatarian") > 0}
                                            onChange={(e) => handleDietaryPreferenceChange("Pescatarian", e.target.checked)}
                                          />
                                          <label htmlFor="diet-pescatarian" className="ml-2 text-white">
                                            Pescatarian
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                              onClick={() => handleDietaryPreferenceCount("Pescatarian", -1)}
                                            >
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">
                                              {getPreferenceCount("Pescatarian")}
                                            </span>
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                              onClick={() => handleDietaryPreferenceCount("Pescatarian", 1)}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-gluten-free"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                            checked={getPreferenceCount("Gluten-Free") > 0}
                                            onChange={(e) => handleDietaryPreferenceChange("Gluten-Free", e.target.checked)}
                                          />
                                          <label htmlFor="diet-gluten-free" className="ml-2 text-white">
                                            Gluten-Free
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                              onClick={() => handleDietaryPreferenceCount("Gluten-Free", -1)}
                                            >
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">
                                              {getPreferenceCount("Gluten-Free")}
                                            </span>
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                              onClick={() => handleDietaryPreferenceCount("Gluten-Free", 1)}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-dairy-free"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                          />
                                          <label htmlFor="diet-dairy-free" className="ml-2 text-white">
                                            Dairy-Free
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md">
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">0</span>
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md">
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="diet-keto"
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                          />
                                          <label htmlFor="diet-keto" className="ml-2 text-white">
                                            Keto
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md">
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">0</span>
                                            <button className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md">
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Add Budget Section before Notes */}
                                <div className="mb-6">
                                  <h3 className="text-lg font-medium text-white/80 mb-4">Budget</h3>
                                  <div className="space-y-4">
                                    <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-4">
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-white/70">Total Budget</span>
                                        <span className="text-sm font-medium text-emerald-400">€{budget}</span>
                                        </div>
                                          <input
                                        type="range"
                                        min="500"
                                        max="10000"
                                        step="100"
                                        value={budget}
                                        onChange={(e) => setBudget(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                          />
                                      <div className="flex justify-between text-xs text-white/50 mt-1">
                                        <span>€500</span>
                                        <span>€10,000</span>
                                        </div>
                                      <div className="mt-4 grid grid-cols-3 gap-2">
                                        {[1000, 2500, 5000].map((preset) => (
                                          <button
                                            key={preset}
                                            onClick={() => setBudget(preset)}
                                            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                                              budget === preset
                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/20"
                                                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                                            }`}
                                          >
                                            €{preset.toLocaleString()}
                                            </button>
                                        ))}
                                      </div>
                                      <p className="text-xs text-white/50 mt-4">
                                        This budget will be used to optimize the provisions list while maintaining quality and meeting all dietary requirements.
                                      </p>
                                          </div>
                                        </div>
                                      </div>

                                {/* Allergies */}
                                <div>
                                  <h3 className="text-lg font-medium text-white/80 mb-4">Allergies</h3>
                                  <div className="space-y-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {allergyPreferences.map((allergy) => (
                                        <div key={allergy.type} className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2">
                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                              id={`allergy-${allergy.type.toLowerCase()}`}
                                            className="w-4 h-4 rounded border-white/20 text-green-400 focus:ring-green-400 bg-white/10"
                                              checked={getAllergyPreferenceCount(allergy.type) > 0}
                                              onChange={(e) => {
                                                if (e.target.checked && getAllergyPreferenceCount(allergy.type) === 0) {
                                                  handleAllergyPreferenceCount(allergy.type, 1);
                                                } else if (!e.target.checked) {
                                                  handleAllergyPreferenceCount(allergy.type, -getAllergyPreferenceCount(allergy.type));
                                                }
                                              }}
                                          />
                                            <label htmlFor={`allergy-${allergy.type.toLowerCase()}`} className="ml-2 text-white">
                                              {allergy.type}
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">People:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                              <button 
                                                className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                                onClick={() => handleAllergyPreferenceCount(allergy.type, -1)}
                                              >
                                              -
                                            </button>
                                              <span className="px-2 py-1 text-white min-w-[20px] text-center">
                                                {getAllergyPreferenceCount(allergy.type)}
                                              </span>
                                              <button 
                                                className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                                onClick={() => handleAllergyPreferenceCount(allergy.type, 1)}
                                              >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      ))}
                                          </div>
                                        </div>
                                      </div>

                                {/* Meal Preferences */}
                                <div>
                                  <h3 className="text-lg font-medium text-white/80 mb-4">Meal Preferences</h3>
                                  <p className="text-sm text-white/60 mb-4">Select how many of each meal type you'd like provisions for. Set to 0 if you plan to eat out.</p>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mealPreferences.map((pref) => (
                                      <div
                                        key={pref.type}
                                        className="flex items-center justify-between backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-2"
                                      >
                                        <div className="flex items-center">
                                          <label className="text-white">
                                            {pref.type}
                                          </label>
                                        </div>
                                        <div className="flex items-center">
                                          <span className="text-xs text-white/60 mr-2">Meals per day:</span>
                                          <div className="flex items-center bg-black/30 backdrop-blur-sm rounded-md">
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                              onClick={() => handleMealPreferenceCount(pref.type, -1)}
                                            >
                                              -
                                            </button>
                                            <span className="px-2 py-1 text-white min-w-[20px] text-center">
                                              {getMealPreferenceCount(pref.type)}
                                            </span>
                                            <button 
                                              className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                              onClick={() => handleMealPreferenceCount(pref.type, 1)}
                                            >
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Children Information */}
                                <div>
                                  <h3 className="text-lg font-medium text-white/80 mb-4">Children Information</h3>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {childAgeGroups.map((group, idx) => (
                                      <div key={group.ageRange} className="mb-4 p-2 border border-white/20 rounded-md bg-white/5">
                                        <div className="flex items-center mb-2">
                                          <span className="font-medium mr-2">{group.ageRange} years</span>
                                          <button
                                            className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-l-md"
                                            onClick={() => updateChildCount(idx, -1)}
                                          >-</button>
                                          <span className="mx-2">{group.count}</span>
                                          <button
                                            className="px-2 py-1 text-white/70 hover:bg-white/10 rounded-r-md"
                                            onClick={() => updateChildCount(idx, 1)}
                                          >+</button>
                                        </div>
                                        <textarea
                                          className="w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30 min-h-[40px]"
                                          placeholder="Dietary notes for this age group"
                                          value={group.notes}
                                          onChange={e => updateChildNotes(idx, e.target.value)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Notes */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                      Additional Notes
                                    </label>
                                    <textarea
                                      className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30 min-h-[100px]"
                                      placeholder="Any specific preferences or requirements..."
                                      value={additionalNotes}
                                      onChange={(e) => setAdditionalNotes(e.target.value)}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                      Kids' Dietary Notes
                                    </label>
                                    <textarea
                                      className="w-full backdrop-blur-md bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white/30 min-h-[100px]"
                                      placeholder="Any specific dietary needs for children..."
                                      value={kidsNotes}
                                      onChange={(e) => setKidsNotes(e.target.value)}
                                    ></textarea>
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-between pt-4 sticky bottom-0 bg-[#0a0c19]/95 backdrop-blur-md py-3 z-10">
                                  <button className="px-6 py-2 rounded-md backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors">
                                    Back
                                  </button>
                                  <button
                                    onClick={handleGenerateProvisions}
                                    className="px-6 py-2 rounded-md bg-emerald-500/80 backdrop-blur-sm text-white hover:bg-emerald-500/90 transition-colors flex items-center"
                                  >
                                    Generate Provisions List
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 ml-2"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="provisions-result"
                                initial={{ opacity: 0, rotateY: 90 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.4 }}
                                className="space-y-6"
                              >
                                {isGeneratingProvisions ? (
                                  <div className="flex flex-col items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-4" />
                                    <h3 className="text-xl font-medium text-white">Generating Your Provisions List</h3>
                                    <p className="text-white/60 mt-2">
                                      We're creating a personalized list based on your preferences...
                                    </p>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex justify-between items-center sticky top-0 bg-[#0a0c19]/95 backdrop-blur-md py-2 z-10">
                                      <h2 className="text-2xl font-semibold">Your Provisions List</h2>
                                      <div className="flex space-x-2">
                                        <motion.button
                                          className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={handleRegenerateProvisions}
                                          disabled={isGeneratingProvisions}
                                        >
                                          <RefreshCw className={`w-4 h-4 ${isGeneratingProvisions ? 'animate-spin' : ''}`} />
                                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Regenerate List
                                          </span>
                                        </motion.button>
                                        
                                        <motion.button
                                          className="p-2 rounded-full backdrop-blur-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/30 transition-colors relative group"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={handleEnhanceMenu}
                                          disabled={isGeneratingProvisions}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          >
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                          </svg>
                                          <span className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/90 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity max-w-[200px] text-center">
                                            Add premium ingredients & enhance all meals (+50% budget)
                                          </span>
                                        </motion.button>

                                        <motion.button
                                          className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={handlePrintProvisions}
                                        >
                                          <Printer className="w-4 h-4" />
                                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Print List
                                          </span>
                                        </motion.button>

                                        <motion.button
                                          className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={handleDownloadProvisions}
                                        >
                                          <Download className="w-4 h-4" />
                                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Download List
                                          </span>
                                        </motion.button>

                                        <motion.button
                                          className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                          whileHover={{ scale: 1.05 }}
                                          whileTap={{ scale: 0.95 }}
                                          onClick={handleEditProvisions}
                                        >
                                          <Edit className="w-4 h-4" />
                                          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            Edit Preferences
                                          </span>
                                        </motion.button>
                                      </div>
                                    </div>

                                    {/* Add state for toggle view */}

                                    <div className="space-y-6">
                                      {/* Toggle buttons */}
                                      <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-full p-1 flex mx-auto w-fit">
                                        <button
                                          className={`px-4 py-2 rounded-full transition-colors ${
                                            activeView === "shopping"
                                              ? "bg-emerald-500/30 text-white"
                                              : "text-white/60 hover:text-white/80"
                                          }`}
                                          onClick={() => setActiveView("shopping")}
                                        >
                                          Items to Purchase
                                        </button>
                                        <button
                                          className={`px-4 py-2 rounded-full transition-colors ${
                                            activeView === "meals"
                                              ? "bg-emerald-500/30 text-white"
                                              : "text-white/60 hover:text-white/80"
                                          }`}
                                          onClick={() => setActiveView("meals")}
                                        >
                                          Weekly Meal Plan
                                        </button>
                                      </div>

                                      {/* Content based on active view */}
                                      <AnimatePresence mode="wait">
                                        {activeView === "shopping" ? (
                                          <motion.div
                                            key="shopping-list"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-4"
                                          >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              {/* Add budget summary at the top */}
                                              <div className="md:col-span-2 backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-4 mb-4">
                                                <h5 className="font-medium text-white/90 mb-3">Budget Summary</h5>
                                                <BudgetBreakdown 
                                                  provisionsList={provisionsList} 
                                                  budget={budget}
                                                  tripDuration={tripDuration}
                                                  totalPeople={totalPeople}
                                                />
                                              </div>
                                                  {provisionsList.map((category, index) => (
                                                    <div
                                                      key={index}
                                                      className="backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-3"
                                                    >
                                                  <div className="flex justify-between items-center mb-2 border-b border-white/10 pb-1">
                                                    <h5 className="font-medium text-white/90">{category.category}</h5>
                                                    <div className="text-right">
                                                      <span className="text-sm text-emerald-400">
                                                        €{formatCurrency(calculateCategoryTotal(category))}
                                                      </span>
                                                      <div className="text-xs text-white/50">
                                                        {((calculateCategoryTotal(category) / budget) * 100).toFixed(1)}% of budget
                                                      </div>
                                                    </div>
                                                  </div>
                                                      <ul className="space-y-1">
                                                    {category.items.map((item: any, itemIndex: number) => (
                                                          <li
                                                            key={itemIndex}
                                                        className="text-white/70 text-sm flex justify-between"
                                                      >
                                                        <span>{item.name}</span>
                                                        <div className="flex gap-4">
                                                          <span className="text-white/50">{item.quantity}</span>
                                                          {item.estimatedPrice && (
                                                            <span className="text-emerald-400/70">€{item.estimatedPrice.toLocaleString()}</span>
                                                          )}
                                                            </div>
                                                          </li>
                                                        ))}
                                                      </ul>
                                                    </div>
                                                  ))}
                                                </div>

                                            {/* Add chat component */}
                                            <ProvisionsChat
                                              provisionsList={provisionsList}
                                              mealSuggestions={mealSuggestions}
                                              tripDuration={tripDuration}
                                              totalPeople={parseInt(totalPeople)}
                                              dietaryPreferences={dietaryPreferences}
                                              mealPreferences={mealPreferences}
                                            />
                                          </motion.div>
                                        ) : (
                                          <motion.div
                                            key="meal-plan"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="space-y-4"
                                          >
                                            <div className="backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-4">
                                              <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-medium text-emerald-400">Weekly Meal Plan</h4>
                                                <div className="flex space-x-2">
                                                  <motion.button
                                                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleRegenerateProvisions}
                                                    disabled={isGeneratingProvisions}
                                                  >
                                                    <RefreshCw className={`w-4 h-4 ${isGeneratingProvisions ? 'animate-spin' : ''}`} />
                                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                      Regenerate List
                                                    </span>
                                                  </motion.button>
                                                  <motion.button
                                                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleEditProvisions}
                                                  >
                                                    <Edit className="w-4 h-4" />
                                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                      Edit Preferences
                                                    </span>
                                                  </motion.button>
                                                  <motion.button
                                                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handlePrintProvisions}
                                                  >
                                                    <Printer className="w-4 h-4" />
                                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                      Print List
                                                    </span>
                                                  </motion.button>
                                                  <motion.button
                                                    className="p-2 rounded-full backdrop-blur-md bg-white/5 border border-white/20 text-white/70 hover:bg-white/10 transition-colors relative group"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleDownloadProvisions}
                                                  >
                                                    <Download className="w-4 h-4" />
                                                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                      Download List
                                                    </span>
                                                  </motion.button>
                                                </div>
                                              </div>
                                              <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                  {mealSuggestions.map((day, index) => (
                                                      <div
                                                      key={index}
                                                        className="backdrop-blur-md bg-white/5 border border-white/20 rounded-md p-3"
                                                      >
                                                        <h5 className="font-medium text-white/90 mb-2 border-b border-white/10 pb-1">
                                                        {day.day}
                                                        </h5>
                                                      <ul className="space-y-2">
                                                        {day.meals.map((meal: MealSuggestion, mealIndex: number) => (
                                                          <li key={mealIndex} className="text-white/70 text-sm">
                                                            <span className="font-medium text-white/90">{meal.type}:</span>{" "}
                                                            {meal.suggestion}
                                                            </li>
                                                          ))}
                                                        </ul>
                                                      </div>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Add chat component */}
                                            <ProvisionsChat
                                              provisionsList={provisionsList}
                                              mealSuggestions={mealSuggestions}
                                              tripDuration={tripDuration}
                                              totalPeople={parseInt(totalPeople)}
                                              dietaryPreferences={dietaryPreferences}
                                              mealPreferences={mealPreferences}
                                            />
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charter Booking Modal */}
      <CharterBookingModal isOpen={isCharterModalOpen} onClose={() => setIsCharterModalOpen(false)} />

      {error && (
        <div className="text-red-400 text-sm mt-2">
          {error}
        </div>
      )}
    </>
  )
}

