import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

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

interface ChatContext {
  tripDuration: string;
  totalPeople: number;
  dietaryPreferences: DietaryPreference[];
  mealPreferences: string[];
  provisionsList: ProvisionCategory[];
  mealSuggestions: DayMealPlan[];
}

export async function POST(req: Request) {
  try {
    // Validate request
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const { message, context, history = [] } = await req.json();
    const chatContext = context as ChatContext;
    
    if (!message || !chatContext) {
      return NextResponse.json(
        { error: 'Message and context are required' },
        { status: 400 }
      );
    }

    // Prepare the context string
    const contextString = `
Current Trip Details:
- Duration: ${chatContext.tripDuration}
- Total People: ${chatContext.totalPeople}
- Dietary Preferences: ${chatContext.dietaryPreferences.map(p => `${p.count} ${p.type}`).join(', ')}
- Selected Meals: ${chatContext.mealPreferences.join(', ')}

Current Provisions List:
${chatContext.provisionsList.map(category => `
${category.category}:
${category.items.map(item => `- ${item.name}: ${item.quantity}`).join('\n')}`).join('\n')}

Current Meal Plan:
${chatContext.mealSuggestions.map(day => `
${day.day}:
${day.meals.map(meal => `- ${meal.type}: ${meal.suggestion}`).join('\n')}`).join('\n')}
`;

    // Prepare conversation messages
    const messages = [
      {
        role: "system",
        content: `You are an expert yacht provisioning assistant with deep knowledge of:
- Meal planning and recipes
- Food storage and preservation on yachts
- Dietary requirements and restrictions
- Quantity adjustments and scaling
- Alternative ingredients and substitutions
- Yacht kitchen equipment and facilities

You have access to the current provisions list and meal plan. You can explain recipes in detail, suggest adjustments, provide alternatives, and help modify the plan based on user requests.

Always be specific and practical in your advice, considering the yacht environment and limitations.`
      },
      {
        role: "system",
        content: `Current context:\n${contextString}`
      },
      // Include previous conversation history
      ...history.map((msg: { content: string; sender: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      // Add the current message
      {
        role: "user",
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error in provisions chat:', error);
    
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