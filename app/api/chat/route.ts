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

export async function POST(req: Request) {
  try {
    console.log('API route called');
    console.log('OpenAI API Key available:', !!process.env.OPENAI_API_KEY);
    console.log('OpenAI API Key length:', process.env.OPENAI_API_KEY?.length);
    
    // Validate request
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is missing');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const { message, history = [] } = await req.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log('Message received:', message);
    console.log('API Key available:', !!process.env.OPENAI_API_KEY);

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

    console.log('Calling OpenAI API...');
    console.log('Messages being sent:', JSON.stringify(messages, null, 2));
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages,
      temperature: 0.3,
      max_tokens: 150,
      presence_penalty: 0.2,
      frequency_penalty: 0.1,
      top_p: 0.8,
    });
    console.log('OpenAI API response received');
    console.log('Response content:', completion.choices[0]?.message?.content);

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Detailed error in chat API:', error);
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'OpenAI API key is invalid' },
          { status: 500 }
        );
      }
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