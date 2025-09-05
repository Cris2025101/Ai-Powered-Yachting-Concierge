import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

// Add a simple backend validation function before constructing the messages array
function isRelevantAnswer(question: string, answer: string): boolean {
  // Example: if the question is about yacht requirements, and the answer is 'plane', return false
  if (question.toLowerCase().includes('requirements') && answer.toLowerCase().includes('plane')) {
    return false;
  }
  // Add more rules as needed for other questions
  return true;
}

// Enhanced error handling for OpenAI API
function handleOpenAIError(error: any): { message: string; status: number } {
  console.error('OpenAI API Error:', error);
  
  if (error?.status === 401) {
    return { message: 'OpenAI API key is invalid or expired', status: 500 };
  }
  
  if (error?.status === 429) {
    return { message: 'Rate limit exceeded. Please try again later', status: 429 };
  }
  
  if (error?.status === 500) {
    return { message: 'OpenAI service is temporarily unavailable', status: 503 };
  }
  
  if (error?.code === 'insufficient_quota') {
    return { message: 'OpenAI quota exceeded. Please contact support', status: 500 };
  }
  
  if (error?.message?.includes('timeout')) {
    return { message: 'Request timeout. Please try again', status: 408 };
  }
  
  return { message: 'An unexpected error occurred', status: 500 };
}

export async function POST(req: Request) {
  try {
    // Validate OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    const { message, history = [] } = body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Validate history format
    if (!Array.isArray(history)) {
      return NextResponse.json(
        { error: 'History must be an array' },
        { status: 400 }
      );
    }

    // Check if the last question and answer are relevant
    if (history.length > 0) {
      const lastQuestion = history[history.length - 1]?.content || '';
      if (!isRelevantAnswer(lastQuestion, message)) {
        return NextResponse.json({
          content: "It seems your answer may not match the question. For yacht requirements, please specify things like number of cabins, water toys, or accessibility features. Could you clarify your preferences?"
        });
      }
    }

    // Prepare conversation messages
    const messages = [
      {
        role: "system",
        content: `You are a friendly, expert yacht concierge. Always answer warmly, conversationally, and with context. Never sound like a robot or a form. If a user gives an unusual or unclear answer, gently clarify and guide them. Build rapport, show empathy, and make the conversation feel natural and personal. Never just move to the next question—always acknowledge and respond to what the user said.

IMPORTANT: When users ask specific questions about yachts, destinations, or sailing, provide detailed, helpful answers. Don't just ask more questions - give them valuable information and recommendations based on their requests.`
      },
      ...history.map((msg: { content: string; sender: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ];

    // Call OpenAI API with timeout and enhanced error handling
    const completion = await Promise.race([
      openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.3,
        max_tokens: 150,
        presence_penalty: 0.2,
        frequency_penalty: 0.1,
        top_p: 0.8,
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      )
    ]) as any;

    // Validate OpenAI response
    if (!completion?.choices || !Array.isArray(completion.choices) || completion.choices.length === 0) {
      throw new Error('Invalid response structure from OpenAI');
    }

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent || typeof responseContent !== 'string') {
      throw new Error('No valid content in OpenAI response');
    }

    return NextResponse.json({
      content: responseContent
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Use enhanced error handling
    const { message, status } = handleOpenAIError(error);
    
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}