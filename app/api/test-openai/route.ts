import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function GET() {
  try {
    // Test OpenAI client initialization
    const testResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello from OpenAI' and nothing else."
        }
      ],
      max_tokens: 10,
      temperature: 0
    });

    return NextResponse.json({
      success: true,
      message: "OpenAI connection successful",
      response: testResponse.choices[0]?.message?.content || "No response",
      model: testResponse.model,
      usage: testResponse.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'OpenAI connection failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
