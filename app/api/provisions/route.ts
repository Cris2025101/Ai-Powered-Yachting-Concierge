import { NextResponse } from 'next/server';

interface DietaryPreference {
  type: string;
  count: number;
}

interface MealPreference {
  type: string;
  count: number;
}

interface ChildAgeGroup {
  ageRange: string;
  count: number;
  notes: string;
}

interface ProvisionRequest {
  tripDuration: string;
  totalPeople: number;
  adults: number;
  children: ChildAgeGroup[];
  dietaryPreferences: DietaryPreference[];
  mealPreferences: MealPreference[];
  budget: number;
  additionalNotes?: string;
  kidsNotes?: string;
  isRegenerating?: boolean;
  isEnhanced?: boolean;
}

interface DayMealPlan {
  day: string;
  meals: MealSuggestion[];
}

interface MealSuggestion {
  type: string;
  suggestion: string;
}

interface ProvisionCategory {
  category: string;
  items: ProvisionItem[];
}

interface ProvisionItem {
  name: string;
  quantity: string;
  estimatedPrice: number;
}

// Add interfaces for provisioning guidelines
interface PortionGuideline {
  [key: string]: number | string;
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
  unit: string;
}

interface CategoryGuidelines {
  [key: string]: {
    portions: PortionGuideline;
    shelfLife: number;
    storageTemp: string;
    backupPercentage: number;
    maxBudgetPercentage: number;
  };
}

// Update the provisioning guidelines with water categories
const PROVISIONING_GUIDELINES: CategoryGuidelines = {
  stillWater: {
    portions: {
      breakfast: 350,    // ml per person (70% of total water)
      lunch: 350,        // ml per person
      dinner: 350,       // ml per person
      snack: 175,        // ml per person
      unit: 'ml'
    },
    shelfLife: 30,
    storageTemp: 'room',
    backupPercentage: 10,
    maxBudgetPercentage: 7  // 70% of water budget
  },
  sparklingWater: {
    portions: {
      breakfast: 150,    // ml per person (30% of total water)
      lunch: 150,        // ml per person
      dinner: 150,       // ml per person
      snack: 75,         // ml per person
      unit: 'ml'
    },
    shelfLife: 30,
    storageTemp: 'room',
    backupPercentage: 10,
    maxBudgetPercentage: 3  // 30% of water budget
  },
  otherBeverages: {
    portions: {
      breakfast: 250,    // ml per person
      lunch: 250,        // ml per person
      dinner: 250,       // ml per person
      snack: 250,        // ml per person
      unit: 'ml'
    },
    shelfLife: 30,
    storageTemp: 'room',
    backupPercentage: 10,
    maxBudgetPercentage: 10
  },
  freshFruits: {
    portions: {
      breakfast: 150,    // g per person
      lunch: 100,        // g per person
      dinner: 100,       // g per person
      snack: 100,        // g per person
      unit: 'g'
    },
    shelfLife: 7,
    storageTemp: 'refrigerated',
    backupPercentage: 15,
    maxBudgetPercentage: 12  // Increased slightly for fresh quality
  },
  standardProteins: {
    portions: {
      breakfast: 100,    // g per person
      lunch: 200,        // g per person
      dinner: 200,       // g per person
      snack: 0,          // g per person
      unit: 'g'
    },
    shelfLife: 5,
    storageTemp: 'refrigerated',
    backupPercentage: 10,
    maxBudgetPercentage: 30  // Increased as proteins are typically more expensive
  },
  freshProduce: {
    portions: {
      breakfast: 150,    // g per person
      lunch: 200,        // g per person
      dinner: 200,       // g per person
      snack: 50,         // g per person
      unit: 'g'
    },
    shelfLife: 5,
    storageTemp: 'refrigerated',
    backupPercentage: 10,
    maxBudgetPercentage: 15  // Increased for fresh vegetables
  },
  breakfastEssentials: {
    portions: {
      breakfast: 250,    // g per person
      lunch: 0,
      dinner: 0,
      snack: 50,
      unit: 'g'
    },
    shelfLife: 14,
    storageTemp: 'room',
    backupPercentage: 10,
    maxBudgetPercentage: 10
  },
  dairyAndCheese: {
    portions: {
      breakfast: 100,    // g per person
      lunch: 50,
      dinner: 50,
      snack: 30,
      unit: 'g'
    },
    shelfLife: 14,
    storageTemp: 'refrigerated',
    backupPercentage: 10,
    maxBudgetPercentage: 13  // Added reasonable budget for dairy products
  }
};

// Add meal plan generation guidelines
const MEAL_PLAN_GUIDELINES = {
  breakfast: {
    base: [
      {
        name: 'Luxury Continental',
        items: ['Artisanal Greek Yogurt (300g)', 'Premium Fresh Berries Mix (150g)', 'Artisanal Gluten-Free Bread (3 slices)', 'Premium Coffee Beans (4 servings)', 'Sparkling Mineral Water (750ml)', 'Exotic Fruit Platter (mixed selection)']
      },
      {
        name: 'Gourmet Hot Breakfast',
        items: ['Free-Range Organic Eggs (3 pieces)', 'Artisanal Bread (3 slices)', 'Premium Smoked Salmon (100g)', 'Fresh Avocado (1 piece)', 'Premium Coffee (4 servings)', 'Fresh Orange Juice (500ml)']
      },
      {
        name: 'Exotic Start',
        items: ['Tropical Fruit Selection (3 pieces)', 'Artisanal Bread (3 slices)', 'Premium Nut Butter (50g)', 'Premium Coffee (4 servings)', 'Fresh Coconut Water (500ml)', 'Artisanal Honey (30g)']
      },
      {
        name: 'Mediterranean Breakfast',
        items: ['Premium Feta Cheese (100g)', 'Artisanal Olives (50g)', 'Fresh Tomatoes (2 pieces)', 'Artisanal Bread (3 slices)', 'Premium Coffee (4 servings)', 'Fresh Lemon Water (500ml)']
      },
      {
        name: 'Luxury Pancakes',
        items: ['Premium Pancake Mix (200g)', 'Fresh Berries (150g)', 'Artisanal Maple Syrup (100ml)', 'Premium Butter (50g)', 'Premium Coffee (4 servings)', 'Fresh Orange Juice (500ml)']
      }
    ],
    beverages: [
      'Premium Coffee Beans (4 servings per person)',
      'Sparkling Mineral Water (750ml per person)',
      'Fresh Orange Juice (500ml per person)',
      'Premium Tea Selection (2 servings per person)',
      'Fresh Coconut Water (500ml per person)'
    ]
  },
  snacks: {
    combinations: [
      {
        name: 'Premium Fruit & Nuts',
        items: ['Exotic Fruit Selection (2 pieces)', 'Premium Mixed Nuts (100g)', 'Sparkling Water (500ml)', 'Artisanal Dark Chocolate (50g)']
      },
      {
        name: 'Gourmet Cheese Board',
        items: ['Premium Cheese Selection (150g)', 'Artisanal Crackers (100g)', 'Fresh Grapes (200g)', 'Premium Wine (250ml)', 'Sparkling Water (500ml)']
      },
      {
        name: 'Luxury Yogurt Parfait',
        items: ['Premium Greek Yogurt (200g)', 'Fresh Berries (100g)', 'Premium Granola (50g)', 'Artisanal Honey (30g)', 'Sparkling Water (500ml)']
      },
      {
        name: 'Mediterranean Platter',
        items: ['Premium Olives (100g)', 'Artisanal Bread (2 slices)', 'Premium Hummus (100g)', 'Fresh Vegetables (150g)', 'Sparkling Water (500ml)']
      },
      {
        name: 'Tropical Delight',
        items: ['Fresh Tropical Fruits (300g)', 'Premium Coconut Chips (50g)', 'Artisanal Dark Chocolate (50g)', 'Fresh Coconut Water (500ml)']
      }
    ]
  },
  portions: {
    beverages: {
      water: 3000,      // ml per person per day (increased for yacht charter)
      coffee: 4,        // servings per person per breakfast (increased)
      juice: 1000,      // ml per person per day (increased)
      wine: 250,        // ml per person per day (added for luxury)
      tea: 2            // servings per person per day (added)
    },
    breakfast: {
      bread: 3,         // slices per person (increased)
      eggs: 3,          // pieces per person (increased)
      yogurt: 300,      // g per person (increased)
      berries: 150,     // g per person (increased)
      fruit: 2,         // pieces per person (increased)
      cheese: 100,      // g per person (added)
      salmon: 100,      // g per person (added for luxury)
      avocado: 1        // piece per person (added)
    },
    snacks: {
      bread: 1,         // slice per person
      peanutButter: 15, // g per person
      yogurt: 150,      // g per person
      berries: 50,      // g per person
      fruit: 1          // piece per person
    }
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json() as ProvisionRequest;

    // Validate request
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Add a small buffer to the target budget to prevent minor overages
    const targetBudget = Math.floor(body.budget * 0.95); // Use 95% of the budget as target

    // Add premium enhancements instructions before the main prompt
    const getEnhancementInstructions = (isEnhanced: boolean) => isEnhanced ? `
PREMIUM ENHANCEMENTS INSTRUCTIONS:
When enhancing the provisions and meal plan:
1. KEEP all existing items and meals as the base
2. ADD premium versions and luxury additions to enhance each meal
3. MAINTAIN the full duration of ${body.tripDuration}
4. ENSURE all dietary preferences are still respected

Enhancement Guidelines:
1. Upgrade Existing Items:
   - Replace regular proteins with premium versions (e.g., regular beef → wagyu)
   - Upgrade regular ingredients to artisanal/premium versions
   - Add luxury garnishes and sides to existing dishes

2. Add Luxury Elements (on top of existing items):
   - Premium appetizers for each dinner
   - Artisanal bread selections
   - Gourmet cheese platters
   - Premium dessert options
   - Luxury snack selections
   - Truffle additions where appropriate
   - Premium condiments and oils

3. Enhance Each Meal Type:
   Breakfast:
   - Add artisanal pastries and breads
   - Include premium coffee and tea selections
   - Add exotic fruit platters
   - Include premium preserves and honey

   Lunch/Dinner:
   - Add luxury appetizers
   - Include premium side dishes
   - Add gourmet dessert options
   - Include wine pairing suggestions (non-alcoholic)

   Snacks:
   - Add premium nuts and dried fruits
   - Include artisanal chocolates
   - Add luxury cheese selections
   - Include premium fresh fruit platters

4. Beverage Upgrades:
   - Premium mineral waters
   - Fresh cold-pressed juices
   - Artisanal sodas and mocktails
   - Specialty coffee beans
   - Premium tea collections

IMPORTANT: Generate a complete meal plan for ALL ${body.tripDuration} days, not just a sample week.
Each day should include all selected meal types with their premium enhancements.
` : '';

    // Prepare the prompt for OpenAI
    const catalogInstructions = `
When generating the provisions list:
1. PREFER products from the YAGA catalog when available
2. If a product is not in the YAGA catalog, use realistic pricing based on Greek yacht provisioning stores (Yachtness Store, Balaskas Shop)
3. Respect dietary restrictions:
   - For gluten-free guests, only use products marked isGlutenFree: true
   - For vegan guests, only use products marked isVegan: true
   - For pescatarian guests, only use products marked isPescatarian: true
4. For products not in catalog, use standard yacht provisioning pricing:
   - Still Water: €0.80 per 500ml bottle
   - Mineral Water: €1.20 per 500ml bottle
   - Fresh Produce: €3-8 per kg
   - Premium Coffee: €35 per kg
   - Fresh Juice: €4 per liter
   - Premium Cheese: €15-20 per kg
   - Fresh Fish: €25-40 per kg
   - Premium Meat: €30-50 per kg
5. Use realistic product names and quantities
6. IMPORTANT: Aim to keep the total cost at or below €${targetBudget} to ensure we stay within the maximum budget of €${body.budget}`;

    const adults = body.adults;
    const children = body.children || [];

    const childrenPrompt = children.length
      ? `CHILDREN'S REQUIREMENTS:\n${children.map(
          g => `- ${g.count} child(ren) aged ${g.ageRange}: ${g.notes || 'no special notes'}`
        ).join('\n')}`
      : '';
    const adultsPrompt = adults
      ? `ADULTS' REQUIREMENTS:\n- ${adults} adults${body.additionalNotes ? `: ${body.additionalNotes}` : ''}`
      : '';

    // Calculate number of days for prompt clarity
    const days = body.tripDuration.includes('week') ? 
      parseInt(body.tripDuration) * 7 : 
      parseInt(body.tripDuration) * 30;

    const prompt = `
${childrenPrompt}
${adultsPrompt}
As a luxury yacht provisioning expert, create a detailed provisions list and meal plan for a yacht charter with the following specifications:

IMPORTANT: Use realistic pricing based on Greek yacht provisioning stores like Yachtness Store and Balaskas Shop. Focus on quality products available in Greek marinas.

Trip Duration: ${body.tripDuration}
Total People: ${body.totalPeople}
Budget: €${body.budget}

CREW PREFERENCES AND REQUIREMENTS:
Dietary Preferences: ${body.dietaryPreferences.map(p => `${p.count} ${p.type}`).join(', ')}
Meal Requirements: ${body.mealPreferences.map(p => `${p.count}x ${p.type}`).join(', ')}
${body.additionalNotes ? `\nSpecial Requirements & Notes:\n${body.additionalNotes.split('\n').map(note => `- ${note}`).join('\n')}` : ''}
${body.kidsNotes ? `\nChildren's Dietary Requirements:\n${body.kidsNotes.split('\n').map(note => `- ${note}`).join('\n')}` : ''}

IMPORTANT: All meal planning and quantities MUST take into account:
1. Any allergies or dietary restrictions mentioned in the notes
2. Special requests or preferences from the crew
3. Children's specific dietary needs and portion sizes
4. Any timing or scheduling preferences mentioned
5. Cultural or religious dietary requirements if specified
6. Food temperature preferences
7. Any ingredients to avoid or preferred alternatives
8. Special occasions or events mentioned

${getEnhancementInstructions(body.isEnhanced || false)}
${catalogInstructions}

Please provide:
1. A categorized provisions list with specific quantities, considering:
   - Total budget of €${body.budget}
   - Cost-effective alternatives when possible while maintaining quality
   - Fresh produce shelf life
   - Luxury yacht standards
   - Dietary restrictions
   - Storage space optimization
   - Backup ingredients
   - ONLY include items needed for the specified meal counts
   - Prioritize essential items within the budget
   - Include estimated costs for major categories to ensure budget compliance

DAILY FRUIT REQUIREMENTS:
   - Include a variety of fresh fruits for daily consumption (minimum 2 pieces per person per day)
   - Mix of seasonal and tropical fruits
   - Consider ripening times and storage conditions
   - Include:
     * Breakfast fruits (berries, bananas, etc.)
     * Snacking fruits (apples, pears, citrus)
     * Exotic fruits (mangoes, pineapples, etc.)
     * Pre-cut fruit platters ingredients
   - Ensure proper quantities for the entire trip duration

BEVERAGE REQUIREMENTS:
   - DO NOT include any alcoholic beverages
   - Calculate and include sufficient water for the entire crew (minimum 2L per person per day)
   - Include a variety of non-alcoholic beverages:
     * Still and sparkling water
     * Fresh juices
     * Soft drinks
     * Coffee and tea
     * Healthy alternatives (coconut water, kombucha, etc.)
   - Consider storage space and temperature requirements for beverages

2. A detailed meal plan that STRICTLY follows the specified meal counts:
   - Only generate meal suggestions for the meals requested: ${body.mealPreferences.map(p => p.type).join(', ')}
   - For each meal type, provide exactly the number of meals specified
   - IMPORTANT: Use EXACT meal type names as provided: ${body.mealPreferences.map(p => `"${p.type}"`).join(', ')}
   - Do not include any meal types that weren't selected or have count 0
   - Variety in cuisine within the selected meal types
   - Local specialties that fit within the budget
   - Special occasion meals if appropriate
   - Balance between luxury items and cost-effective options

IMPORTANT: Generate a meal plan for EXACTLY ${days} days (no more, no less).
- For each day, provide a separate entry in the mealSuggestions array.
- Do NOT group days together or use ranges like 'Day 2-7'.
- Each day must be listed as 'Day 1', 'Day 2', ..., 'Day ${days}'.
- The mealSuggestions array must have exactly ${days} objects, one for each day.
- If you do not follow this, the response will be rejected.

Format the response as a JSON object with two arrays:
1. provisionsList: Array of categories, each with:
   - category: string (category name)
   - items: array of objects with:
     - name: string (item name)
     - quantity: string (amount needed, MUST use one of these formats:
       * For countable items: "X pieces" (e.g. "14 pieces")
       * For weight: "X kg" or "X g" (e.g. "2 kg" or "500 g")
       * For volume: "X L" or "X ml" (e.g. "2 L" or "500 ml")
       * For packaged items: "X packs/bottles/jars" (e.g. "3 bottles")
     - estimatedPrice: number (price PER UNIT in EUR)

2. mealSuggestions: Array of days, each with:
   - day: string (day identifier, must be 'Day 1', 'Day 2', ..., 'Day ${days}')
   - meals: array of objects with:
     - type: string (MUST be one of: ${body.mealPreferences.map(p => `"${p.type}"`).join(', ')})
     - suggestion: string (meal description)

Example mealSuggestions array for a 3-day trip:
[
  { "day": "Day 1", "meals": [ { "type": "Breakfast", "suggestion": "..." }, ... ] },
  { "day": "Day 2", "meals": [ { "type": "Breakfast", "suggestion": "..." }, ... ] },
  { "day": "Day 3", "meals": [ { "type": "Breakfast", "suggestion": "..." }, ... ] }
]

IMPORTANT CONSTRAINTS:
1. The total cost of all items should aim to be at or below €${targetBudget} and MUST NOT exceed €${body.budget}
2. Only include meals for the selected types and counts
3. Ensure all dietary preferences are respected
4. NO ALCOHOLIC BEVERAGES in the provisions list
5. Ensure adequate water supply (2L per person per day minimum)
6. Prioritize essential ingredients and adjust luxury items based on remaining budget
${body.isRegenerating ? '\n7. Provide different meal suggestions and ingredient combinations than previous versions while maintaining the same quality and budget constraints' : ''}

IMPORTANT VALIDATION RULES:
1. Every ingredient mentioned in the meal plan MUST have a corresponding item in the provisions list
2. Quantities must be sufficient for the entire trip duration
3. For each meal type, ensure:
   - Breakfast items include all components (e.g., eggs, bread, fruits)
   - Main meals include proteins, sides, and accompaniments
   - Snacks include all mentioned items
4. Cross-reference the meal plan with provisions to ensure nothing is missing
`;

                // Call OpenAI API directly with timeout
                const completion = await Promise.race([
                  fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      model: "gpt-4-turbo-preview",
                      messages: [
                        {
                          role: "system",
                          content: "You are a luxury yacht provisioning expert. Provide concise, well-organized responses in the exact JSON format requested. Keep responses under 2000 tokens."
                        },
                        {
                          role: "user",
                          content: prompt
                        }
                      ],
                      temperature: 0.7,
                      max_tokens: 2000,
                      response_format: { type: "json_object" }
                    })
                  }).then(res => res.json()),
                  new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Request timeout')), 25000)
                  )
                ]) as any;

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }
    
    // Parse and validate the response
    let response;
    try {
      response = JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      throw new Error('Invalid response format from OpenAI');
    }
    
    if (!response.provisionsList || !response.mealSuggestions) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Calculate water needs
    const waterNeeds = calculateWaterNeeds(days, body.totalPeople);

    // First, remove ALL water items from the response
    response.provisionsList = response.provisionsList.filter((category: ProvisionCategory) => {
      if (category.category.toLowerCase().includes('water')) {
        return false;
      }
      // Remove water items from other categories
      category.items = category.items.filter(item => 
        !item.name.toLowerCase().match(/^(still|mineral|sparkling)\s+water$/i)
      );
      return true;
    });

    // Then add our calculated water categories with correct quantities
    response.provisionsList.unshift({
      category: 'Still Water',
      items: [{
        name: 'Still Water',
        quantity: `${waterNeeds.still} bottles`,
        estimatedPrice: 0.8 // €0.80 per 500ml bottle (Yachtness Store pricing)
      }]
    });

    response.provisionsList.unshift({
      category: 'Mineral Water',
      items: [{
        name: 'Mineral Water',
        quantity: `${waterNeeds.mineral} bottles`,
        estimatedPrice: 1.2 // €1.20 per 500ml bottle (Yachtness Store pricing)
      }]
    });

    // Calculate totals and validate budget
    let totalCost = 0;
    const categoryTotals: { [key: string]: number } = {};
    const categoryDetails: { [key: string]: { total: number; items: any[] } } = {};

    // Process each category
    for (const category of response.provisionsList) {
      let categoryTotal = 0;
      categoryDetails[category.category] = { total: 0, items: [] };
      
      for (const item of category.items) {
        if (!item.estimatedPrice || item.estimatedPrice <= 0) {
          throw new Error(`Invalid price for item: ${item.name}`);
        }

        // Extract quantity from the quantity string
        let quantity = 1;
        const quantityMatch = item.quantity.match(/(\d+)\s*(kg|g|pieces|bottles|packs|tubs|jars|bags|loaves|units|dozen|ml|L)/i);
        
        if (quantityMatch) {
          const [, amount, unit] = quantityMatch;
          quantity = parseFloat(amount);
          
          // Convert units if needed
          if (unit.toLowerCase() === 'g') {
            quantity = quantity / 1000; // Convert to kg
          } else if (unit.toLowerCase() === 'ml') {
            quantity = quantity / 1000; // Convert to L
          } else if (unit.toLowerCase() === 'dozen') {
            quantity = quantity * 12;
          }
        }

        // Calculate total cost for the item
        const itemTotal = item.estimatedPrice * quantity;
        categoryTotal += itemTotal;
        
        categoryDetails[category.category].items.push({
          ...item,
          totalPrice: itemTotal,
          quantity: quantity,
          percentage: (itemTotal / body.budget) * 100
        });
      }
      
      // Validate category budget
      categoryTotal = validateCategoryBudget(category.category, categoryTotal, body.budget);
      categoryTotals[category.category] = categoryTotal;
      categoryDetails[category.category].total = categoryTotal;
      totalCost += categoryTotal;
      category.estimatedCost = categoryTotal;
    }

    // If over budget, provide detailed feedback
    if (totalCost > body.budget) {
      const overage = totalCost - body.budget;
      const overagePercentage = (overage / body.budget) * 100;

      // Sort categories by total cost
      const sortedCategories = Object.entries(categoryDetails)
        .sort(([,a], [,b]) => b.total - a.total)
        .map(([category, details]) => ({
          category,
          total: details.total,
          percentage: (details.total / totalCost) * 100,
          items: details.items.sort((a, b) => b.estimatedPrice - a.estimatedPrice)
        }));

      return NextResponse.json({
        error: 'Budget exceeded',
        details: {
          totalCost,
          budget: body.budget,
          overage,
          overagePercentage,
          message: `Generated provisions list exceeds budget by €${overage.toFixed(2)} (${overagePercentage.toFixed(1)}%)`,
          categories: sortedCategories,
          suggestions: [
            'Consider reducing quantities of luxury items',
            'Review the highest cost categories for potential savings',
            'Consider alternative products in the same category',
            'Adjust meal plan to reduce ingredient variety'
          ]
        }
      }, { status: 422 }); // Use 422 to indicate a processable error with details
    }

    // After generating the meal suggestions, validate and adjust provisions
    const extractedIngredients = extractIngredientsFromMeals(response.mealSuggestions);
    let adjustedProvisionsList = response.provisionsList;

    // Ensure all extracted ingredients are in the provisions list
    extractedIngredients.forEach(ingredient => {
      const categoryExists = adjustedProvisionsList.find((category: ProvisionCategory) => 
        category.items.some((item: ProvisionItem) => 
          item.name.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      
      if (!categoryExists) {
        // Add missing ingredient to appropriate category
        const category = determineCategory(ingredient);
        const existingCategory = adjustedProvisionsList.find((c: ProvisionCategory) => c.category === category);
        
        if (existingCategory) {
          existingCategory.items.push({
            name: ingredient,
            quantity: calculateQuantity(ingredient, body.tripDuration, body.totalPeople),
            estimatedPrice: getEstimatedPrice(ingredient)
          });
        } else {
          adjustedProvisionsList.push({
            category,
            items: [{
              name: ingredient,
              quantity: calculateQuantity(ingredient, body.tripDuration, body.totalPeople),
              estimatedPrice: getEstimatedPrice(ingredient)
            }]
          });
        }
      }
    });

    // After parsing the OpenAI response and before returning the result
    // Ensure mealSuggestions has an entry for every day of the trip
    if (response.mealSuggestions && response.mealSuggestions.length < days) {
      // If only 1 or 2 entries, expand to full days
      const expanded = [];
      if (response.mealSuggestions.length === 1) {
        // Duplicate the single entry for all days
        for (let i = 0; i < days; i++) {
          expanded.push({
            day: `Day ${i + 1}`,
            meals: response.mealSuggestions[0].meals
          });
        }
      } else if (response.mealSuggestions.length === 2) {
        // Use the first for Day 1, the second for all other days
        expanded.push({ day: 'Day 1', meals: response.mealSuggestions[0].meals });
        for (let i = 1; i < days; i++) {
          expanded.push({
            day: `Day ${i + 1}`,
            meals: response.mealSuggestions[1].meals
          });
        }
      } else {
        // If more than 2 but less than days, repeat as needed
        for (let i = 0; i < days; i++) {
          const template = response.mealSuggestions[i % response.mealSuggestions.length];
          expanded.push({
            day: `Day ${i + 1}`,
            meals: template.meals
          });
        }
      }
      response.mealSuggestions = expanded;
    }

    // Success response
    return NextResponse.json({
      provisionsList: [
        // Water categories first
        ...response.provisionsList.filter((cat: ProvisionCategory) => cat.category === 'Still Water'),
        ...response.provisionsList.filter((cat: ProvisionCategory) => cat.category === 'Mineral Water'),
        // Other categories (excluding water items)
        ...response.provisionsList.filter((cat: ProvisionCategory) => {
          // Skip water categories
          if (cat.category.toLowerCase().includes('water')) {
            return false;
          }
          // For other categories, filter out any water items
          if (cat.category === 'Beverages') {
            cat.items = cat.items.filter(item => !item.name.toLowerCase().includes('water'));
          }
          return cat.category !== 'Snacks' && cat.category !== 'Snack Options';
        }),
        // Consolidated snacks at the end
        ...response.provisionsList.filter((cat: ProvisionCategory) => 
          cat.category === 'Snacks' || 
          cat.category === 'Snack Options'
        ).reduce((acc: ProvisionCategory[], curr: ProvisionCategory) => {
          // Combine items from both snack categories
          if (acc.length === 0) {
            return [{
              category: 'Snacks',
              items: curr.items
            }];
          }
          acc[0].items = [...acc[0].items, ...curr.items];
          return acc;
        }, [] as ProvisionCategory[])
      ],
      mealSuggestions: response.mealSuggestions,
      totalCost,
      remainingBudget: body.budget - totalCost,
      categoryTotals,
      categoryDetails,
      adjustedProvisionsList
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Update the extractIngredientsFromMeals function
function extractIngredientsFromMeals(mealSuggestions: DayMealPlan[]): Set<string> {
  const ingredients = new Set<string>();
  
  // Always add both water types regardless of meal suggestions
  ingredients.add('Still Water');
  ingredients.add('Mineral Water');
  
  mealSuggestions.forEach(day => {
    day.meals.forEach((meal: MealSuggestion) => {
      // Extract ingredients from meal description
      const mealWords = meal.suggestion.toLowerCase().split(/[,.]?\s+/);
      
      mealWords.forEach((word, index) => {
        // Basic ingredients
        if (word.match(/salad/i)) ingredients.add('Organic Salad Greens Mix');
        if (word.match(/bread|toast/i)) ingredients.add('Gluten-Free Bread');
        if (word.match(/flour|pancake/i)) ingredients.add('Gluten-Free Flour Mix');
        if (word.match(/preserves|honey/i)) ingredients.add('Premium Preserves and Honey');
        if (word.match(/nuts/i)) ingredients.add('Mixed Premium Nuts');
      });
    });
  });
  
  return ingredients;
}

// Update category determination to prevent duplicates
function determineCategory(ingredient: string): string {
  // Special handling for water types first
  const ingredientLower = ingredient.toLowerCase();
  if (ingredientLower.includes('water')) {
    if (ingredientLower.match(/mineral|sparkling/)) {
      return 'Mineral Water';  // Mineral water category (30%)
    } else if (!ingredientLower.match(/mineral|sparkling|coconut/)) {
      return 'Still Water';    // Regular bottled water (70%)
    } else if (ingredientLower.includes('coconut')) {
      return 'Beverages';      // Coconut water goes to beverages
    }
  }

  // Define primary categories with clear boundaries
  const categoryMap: Record<string, string> = {
    // Beverages (non-water)
    'juice': 'Beverages',
    'coffee': 'Beverages',
    'tea': 'Beverages',
    'cold-pressed': 'Beverages',

    // Breakfast items
    'egg': 'Breakfast',
    'bread': 'Breakfast',
    'oat': 'Breakfast',
    'granola': 'Breakfast',
    'cereal': 'Breakfast',
    'avocado': 'Breakfast',
    'milk': 'Breakfast',

    // Fresh Fruits
    'banana': 'Fresh Fruits',
    'berr': 'Fresh Fruits',
    'apple': 'Fresh Fruits',
    'mango': 'Fresh Fruits',
    'pineapple': 'Fresh Fruits',
    'fruit': 'Fresh Fruits',
    'pear': 'Fresh Fruits',

    // Fresh Produce
    'vegetable': 'Fresh Produce',
    'salad': 'Fresh Produce',
    'spinach': 'Fresh Produce',
    'greens': 'Fresh Produce',
    'carrot': 'Fresh Produce',

    // Snacks (consolidated)
    'nuts': 'Snacks',
    'granola bar': 'Snacks',
    'mixed nuts': 'Snacks',
    'preserves': 'Snacks',
    'honey': 'Snacks',
    'hummus': 'Snacks',
    'snack': 'Snacks',

    // Dinner Ingredients
    'salmon': 'Dinner Ingredients',
    'quinoa': 'Dinner Ingredients',
    'protein': 'Dinner Ingredients',
    'fish': 'Dinner Ingredients'
  };

  // Find the most specific match
  const matches = Object.entries(categoryMap)
    .filter(([key]) => ingredient.toLowerCase().includes(key.toLowerCase()))
    .sort((a, b) => b[0].length - a[0].length);

  return matches.length > 0 ? matches[0][1] : 'Miscellaneous';
}

// Update budget percentages to strictly enforce water budget split
const CATEGORY_BUDGET_LIMITS: Record<string, number> = {
  'Still Water': 6,        // 60% of water budget (6% of total budget)
  'Mineral Water': 4,      // 40% of water budget (4% of total budget)
  'Beverages': 12,         // Other beverages (juices, coffee, tea, etc.)
  'Fresh Fruits': 15,
  'Fresh Produce': 18,
  'Breakfast': 12,
  'Dinner Ingredients': 35,
  'Snacks': 10,           // Consolidated snacks category
  'Premium Meat': 20,     // Premium meat category from Yachtness
  'Premium Fish & Seafood': 20, // Premium seafood category
  'Gourmet Products': 15,  // Gourmet products category
  'Miscellaneous': 8
};

// Update the validation function to strictly enforce water budget limits
function validateCategoryBudget(category: string, currentAmount: number, totalBudget: number): number {
  // Special handling for water categories to strictly maintain 60/40 split
  if (category === 'Still Water' || category === 'Mineral Water') {
    const totalWaterBudget = totalBudget * 0.10; // 10% of total budget for water
    if (category === 'Still Water') {
      return Math.min(currentAmount, totalWaterBudget * 0.6); // Strictly 60% of water budget
    } else {
      return Math.min(currentAmount, totalWaterBudget * 0.4); // Strictly 40% of water budget
    }
  }

  // For other categories, use standard budget limits
  const maxBudget = (CATEGORY_BUDGET_LIMITS[category] || 15) * totalBudget / 100;
  return Math.min(currentAmount, maxBudget);
}

// Water calculation function
function calculateWaterNeeds(
  days: number,
  people: number
): { still: number; mineral: number } {
  const TOTAL_WATER_PER_PERSON = 3000;   // 3L per person per day (increased for yacht charter)
  const STILL_PERCENTAGE = 0.6;           // 60% still water (1.8L per person)
  const MINERAL_PERCENTAGE = 0.4;         // 40% mineral water (1.2L per person)
  const BOTTLE_SIZE = 500;                // 500ml bottles

  // Calculate total water needed for all people for all days
  const totalWaterNeeded = TOTAL_WATER_PER_PERSON * people * days;
  
  // Split between still and mineral (strict 70/30 split)
  const stillWaterML = totalWaterNeeded * STILL_PERCENTAGE;    // 70% = 1.19L per person per day
  const mineralWaterML = totalWaterNeeded * MINERAL_PERCENTAGE; // 30% = 0.51L per person per day

  // Convert to number of bottles (rounding up)
  // Still water: 1.19L per person per day = 2.38 bottles (500ml each)
  // Mineral water: 0.51L per person per day = 1.02 bottles (500ml each)
  return {
    still: Math.ceil(stillWaterML / BOTTLE_SIZE),      // Number of 500ml still water bottles
    mineral: Math.ceil(mineralWaterML / BOTTLE_SIZE)   // Number of 500ml mineral water bottles
  };
}

function handleSpecialItem(
  ingredient: string,
  days: number,
  people: number,
  mealTypes: string[]
): { quantity: string; estimatedCost: number } {
  const ingredientLower = ingredient.toLowerCase();
  
  // Water calculation (2L per person per day, strictly 70/30 split)
  if (ingredientLower.includes('water')) {
    const waterNeeds = calculateWaterNeeds(days, people);
    
    if (ingredientLower.includes('mineral')) {
      return {
        quantity: `${waterNeeds.mineral} bottles`,
        estimatedCost: 1.2 // Price per bottle (Yachtness Store pricing)
      };
    } else if (!ingredientLower.match(/mineral|coconut/)) {
      return {
        quantity: `${waterNeeds.still} bottles`,
        estimatedCost: 0.8 // Price per bottle (Yachtness Store pricing)
      };
    }
  }

  // Fresh produce and ingredients needed for meals
  if (ingredient.match(/avocado/i)) {
    const piecesPerMeal = 0.5; // Half avocado per person per meal
    const pieces = Math.ceil(people * days * piecesPerMeal);
    return {
      quantity: `${pieces} pieces`,
      estimatedCost: pieces * 2.5 // €2.50 per avocado (Yachtness Store pricing)
    };
  }

  // Cheese for meals
  if (ingredient.match(/cheese|parmesan/i)) {
    const gramsPerMeal = 30; // 30g per person per meal
    const totalGrams = Math.ceil(people * days * gramsPerMeal);
    return {
      quantity: `${totalGrams}g`,
      estimatedCost: (totalGrams / 100) * 5 // €5 per 100g
    };
  }

  // Quinoa for meals
  if (ingredient.match(/quinoa/i)) {
    const gramsPerMeal = 80; // 80g per person per meal
    const totalGrams = Math.ceil(people * days * gramsPerMeal);
    return {
      quantity: `${Math.ceil(totalGrams / 1000)}kg`,
      estimatedCost: Math.ceil(totalGrams / 1000) * 12 // €12 per kg (Yachtness Store pricing)
    };
  }

  // Fresh tomatoes
  if (ingredient.match(/tomato/i)) {
    const gramsPerDay = 150; // 150g per person per day
    const totalKg = Math.ceil((people * days * gramsPerDay) / 1000);
    return {
      quantity: `${totalKg}kg`,
      estimatedCost: totalKg * 5 // €5 per kg (Yachtness Store pricing)
    };
  }

  // Coffee beans/ground coffee
  if (ingredient.match(/coffee beans|ground coffee/i)) {
    const gramsPerDay = 20; // 20g per person per day
    const totalGrams = Math.ceil(people * days * gramsPerDay);
    const kgNeeded = Math.ceil(totalGrams / 1000);
    return {
      quantity: `${kgNeeded}kg`,
      estimatedCost: kgNeeded * 35 // €35 per kg for premium coffee (Yachtness Store pricing)
    };
  }

  // Fresh juices
  if (ingredient.match(/juice/i)) {
    const mlPerDay = 250; // 250ml per person per day
    const totalLiters = Math.ceil((people * days * mlPerDay) / 1000);
    const bottles = Math.ceil(totalLiters / 1); // 1L bottles
    return {
      quantity: `${bottles} bottles`,
      estimatedCost: bottles * 4 // €4 per bottle (Yachtness Store pricing)
    };
  }

  // Rest of the existing special item handling...
  return {
    quantity: '0',
    estimatedCost: 0
  };
}

// Update price mapping for water types
function getEstimatedPrice(ingredient: string): number {
  const ingredientLower = ingredient.toLowerCase();
  
  // Special handling for water types with fixed prices
  if (ingredientLower.includes('water')) {
    if (ingredientLower.includes('mineral')) {
      return 0.8; // €0.80 per 500ml bottle for mineral water
    } else if (!ingredientLower.match(/mineral|coconut/)) {
      return 0.5; // €0.50 per 500ml bottle for still water
    }
  }

  const priceMap: Record<string, number> = {
    // Water types
    'coconut water': 1.8,    // Per 500ml
    'sparkling water': 1.5,  // Per 500ml
    
    // Beverages
    'orange juice': 4,       // Per liter (Yachtness Store pricing)
    'cold-pressed juice': 6, // Per bottle
    'coffee': 35,            // Per kg (Yachtness Store pricing)
    'tea': 25,              // Per kg
    
    // Dairy
    'milk': 2,              // Per liter
    'yogurt': 4,            // Per 500g
    'cheese': 15,           // Per kg
    
    // Proteins
    'salmon': 30,           // Per kg
    'fish': 25,             // Per kg
    'meat': 30,             // Per kg
    'beef': 35,             // Per kg
    'chicken': 20,          // Per kg
    
    // Fresh produce
    'vegetables': 5,        // Per kg
    'fruits': 6,            // Per kg
    'tomatoes': 5,          // Per kg
    'avocado': 2.5,         // Per piece
    
    // Grains & staples
    'bread': 3,             // Per loaf
    'quinoa': 12,           // Per kg
    'rice': 4,              // Per kg
    
    // Snacks & extras
    'nuts': 12,             // Per kg
    'olives': 8,            // Per kg
    'honey': 15,            // Per kg
    'wine': 15,             // Per bottle
    'beer': 2,              // Per bottle
    
    // Premium items
    'premium': 20,          // Premium products
    'artisanal': 15,        // Artisanal products
    'organic': 12,          // Organic products
    'wagyu': 50,            // Premium beef
    'lobster': 40,          // Premium seafood
    'truffle': 25,          // Luxury ingredients
    'caviar': 100           // Luxury items
  };

  const matches = Object.entries(priceMap)
    .filter(([key]) => ingredientLower.includes(key))
    .sort((a, b) => b[0].length - a[0].length);

  return matches.length > 0 ? matches[0][1] : 8; // Default price increased to €8 for yacht provisioning
}

// Function to handle products not in YAGA catalog
function handleNonCatalogProduct(ingredient: string, days: number, people: number): { quantity: string; estimatedCost: number; category: string } {
  const ingredientLower = ingredient.toLowerCase();
  
  // Calculate base quantity per person per day
  const baseQuantity = 100; // Default 100g per person per day
  const totalQuantity = Math.ceil(people * days * baseQuantity / 1000); // Convert to kg
  
  // Get estimated price
  const pricePerKg = getEstimatedPrice(ingredient);
  const estimatedCost = totalQuantity * pricePerKg;
  
  // Determine category
  const category = determineCategory(ingredient);
  
  return {
    quantity: `${totalQuantity}kg`,
    estimatedCost,
    category
  };
}

// Update the main calculation function
function calculateQuantityFromGuidelines(
  ingredient: string,
  duration: string,
  people: number,
  mealTypes: string[],
  totalBudget: number
): { quantity: string; estimatedCost: number } {
  const days = duration.includes('week') ? parseInt(duration) * 7 : parseInt(duration) * 30;
  
  // Special handling for water items
  const ingredientLower = ingredient.toLowerCase();
  if (ingredientLower.includes('water')) {
    const waterNeeds = calculateWaterNeeds(days, people);
    
    if (ingredientLower.includes('mineral')) {
      const quantity = waterNeeds.mineral;
      return {
        quantity: `${quantity} bottles`,
        estimatedCost: quantity * 1.2 // Total cost for all mineral water bottles (Yachtness Store pricing)
      };
    } else if (ingredientLower.includes('still') || !ingredientLower.match(/mineral|coconut/)) {
      const quantity = waterNeeds.still;
      return {
        quantity: `${quantity} bottles`,
        estimatedCost: quantity * 0.8 // Total cost for all still water bottles (Yachtness Store pricing)
      };
    }
  }

  // Base quantities per person per day
  const baseQuantities: Record<string, { amount: number; unit: string }> = {
    'juice': { amount: 500, unit: 'ml' },
    'coffee': { amount: 20, unit: 'g' },
    'tea': { amount: 5, unit: 'g' },
    'fruit': { amount: 300, unit: 'g' },
    'vegetable': { amount: 400, unit: 'g' },
    'bread': { amount: 200, unit: 'g' },
    'egg': { amount: 2, unit: 'pieces' },
    'nuts': { amount: 50, unit: 'g' },
    'fish': { amount: 200, unit: 'g' }
  };

  // Find matching base quantity
  const baseQty = Object.entries(baseQuantities).find(([key]) => 
    ingredient.toLowerCase().includes(key)
  );

  let quantity: number;
  let unit: string;

  if (baseQty) {
    quantity = baseQty[1].amount * people * days;
    unit = baseQty[1].unit;
  } else {
    // Default quantities if no specific match
    quantity = 100 * people * days;
    unit = 'g';
  }

  // Add 10% buffer for safety
  quantity = Math.ceil(quantity * 1.1);

  // Convert units if necessary
  if (unit === 'g' && quantity >= 1000) {
    quantity = quantity / 1000;
    unit = 'kg';
  } else if (unit === 'ml' && quantity >= 1000) {
    quantity = quantity / 1000;
    unit = 'L';
  }

  // Calculate cost based on category budget limits
  const category = determineCategory(ingredient);
  const basePrice = getEstimatedPrice(ingredient);
  let estimatedCost = basePrice * (unit === 'kg' || unit === 'L' ? quantity : quantity / 1000);
  
  // Validate against category budget
  estimatedCost = validateCategoryBudget(category, estimatedCost, totalBudget);

  // Adjust quantity if cost was reduced
  if (estimatedCost < basePrice * quantity) {
    quantity = Math.floor(estimatedCost / basePrice);
  }

  // Ensure minimum quantities
  quantity = Math.max(quantity, 1);

  return {
    quantity: `${quantity} ${unit}`,
    estimatedCost
  };
}

function calculateEstimatedCost(ingredient: string, quantity: number, unit: string): number {
  const pricePerUnit: Record<string, number> = {
    'Wagyu Beef': 50,
    'Fresh Salmon': 25,
    'Lobster': 40,
    'Premium Coffee': 30,
    'Truffle Oil': 25,
    'Caviar': 100,
    'Premium Cheese': 20
  };

  const matchedPrice = Object.entries(pricePerUnit).find(([key]) => 
    ingredient.toLowerCase().includes(key.toLowerCase())
  );

  const basePrice = matchedPrice ? matchedPrice[1] : 5;
  const unitQuantity = unit === 'g' ? quantity / 1000 : quantity;
  
  return basePrice * unitQuantity;
}

// Update the main calculation function to use guidelines
function calculateQuantity(ingredient: string, duration: string, people: number, mealTypes: string[] = ['breakfast', 'lunch', 'dinner', 'snack']): string {
  return calculateQuantityFromGuidelines(ingredient, duration, people, mealTypes, 0).quantity;
}

// Add function to generate meal suggestions
function generateMealSuggestion(
  mealType: string,
  day: number,
  preferences: {
    dietaryPreferences: DietaryPreference[];
    additionalNotes?: string;
    kidsNotes?: string;
  }
): string {
  // Parse additional notes for special requirements
  const hasKids = preferences.kidsNotes && preferences.kidsNotes.length > 0;
  const dietaryRestrictions = preferences.dietaryPreferences.map(p => p.type.toLowerCase());
  
  if (mealType === 'breakfast') {
    const base = MEAL_PLAN_GUIDELINES.breakfast.base[day % MEAL_PLAN_GUIDELINES.breakfast.base.length];
    const beverage = MEAL_PLAN_GUIDELINES.breakfast.beverages[day % MEAL_PLAN_GUIDELINES.breakfast.beverages.length];
    
    // Adjust for dietary restrictions
    let items = [...base.items];
    if (dietaryRestrictions.includes('vegan')) {
      items = items.filter(item => !item.match(/eggs|yogurt|milk/i));
      items.push('Plant-Based Yogurt (200g)', 'Almond Milk (250ml)');
    }
    if (dietaryRestrictions.includes('gluten-free')) {
      items = items.map(item => item.replace('Bread', 'Gluten-Free Bread'));
    }
    
    // Adjust for kids if needed
    if (hasKids) {
      items.push('Kid-Friendly Portion Sizes', 'Fun Fruit Arrangements');
    }
    
    return `${base.name}: ${items.join(', ')}. Served with ${beverage}.`;
  }
  
  if (mealType === 'snacks') {
    const combo = MEAL_PLAN_GUIDELINES.snacks.combinations[day % MEAL_PLAN_GUIDELINES.snacks.combinations.length];
    let items = [...combo.items];
    
    // Adjust for dietary restrictions
    if (dietaryRestrictions.includes('gluten-free')) {
      items = items.map(item => item.replace('Bread', 'Gluten-Free Bread'));
    }
    if (dietaryRestrictions.includes('vegan')) {
      items = items.map(item => item.replace('Yogurt', 'Plant-Based Yogurt'));
    }
    
    // Add kid-friendly options if needed
    if (hasKids) {
      items.push('Kid-Friendly Snack Options');
    }
    
    return `${combo.name}: ${items.join(', ')}.`;
  }
  
  return '';
}

// Add function to extract unique ingredients from meal plan
function extractUniqueIngredients(mealPlan: any[]): Set<string> {
  const uniqueIngredients = new Set<string>();
  
  mealPlan.forEach(day => {
    day.meals.forEach((meal: any) => {
      const ingredients = extractIngredientsFromMeal(meal.suggestion);
      ingredients.forEach(ingredient => uniqueIngredients.add(ingredient));
    });
  });
  
  return uniqueIngredients;
}

// Helper function to extract ingredients from a meal description
function extractIngredientsFromMeal(mealDescription: string): string[] {
  const ingredients: string[] = [];
  const words = mealDescription.toLowerCase().split(/[,.]?\s+/);
  
  let currentIngredient = '';
  words.forEach(word => {
    if (word.match(/^(and|with|served|including|or|the|a|an)$/)) return;
    
    if (word.match(/^(fresh|organic|premium|gluten-free|free-range)$/)) {
      currentIngredient = word;
    } else if (currentIngredient) {
      ingredients.push(`${currentIngredient} ${word}`.trim());
      currentIngredient = '';
    } else {
      ingredients.push(word);
    }
  });
  
  return ingredients;
} 