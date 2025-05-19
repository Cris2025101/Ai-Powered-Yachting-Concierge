import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(req: Request) {
  try {
    console.log('API route called');
    
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

    // Prepare conversation messages
    const messages = [
      {
        role: "system",
        content: `You are a sophisticated AI yachting concierge and sales expert with extensive knowledge of luxury yachts, charters, and maritime experiences. Your primary goal is to guide users through the yacht rental process while maintaining a luxury-oriented, consultative approach.

Core Objectives:
- Convert interest into yacht rental inquiries
- Guide users through our rental process
- Educate users about yachting options
- Build trust through expertise and personalized service

Response Guidelines:
1. Keep initial responses under 20 words when possible
2. Start with key takeaways before details
3. Use this structure:
   - Main point (1 sentence)
   - Brief explanation (2-3 points)
   - Call to action or follow-up question

Sales Approach:
- Focus on understanding user's needs first
- Emphasize value and experience over price
- Guide users through our rental process
- Recommend human concierge for:
  * Complex requests
  * Detailed pricing
  * Custom itineraries
  * Technical specifications

Conversation Flow:
1. Initial greeting: Understand user's interest
2. Discovery: Ask about preferences and needs
3. Education: Share relevant yacht options
4. Guidance: Explain our rental process
5. Follow-up: Encourage next steps

Format:
- Use bullet points for clarity
- Keep sentences short and direct
- End with engaging questions like:
  * "Would you like to explore available yachts?"
  * "What type of experience are you looking for?"
  * "Shall I guide you through our rental process?"

Remember: Your goal is to convert interest into action while maintaining a luxury, consultative tone.`
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

    console.log('Calling OpenAI API...');
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