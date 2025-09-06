import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test direct OpenAI API call without SDK
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello from OpenAI" and nothing else.'
          }
        ],
        max_tokens: 10,
        temperature: 0
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({
        success: false,
        error: 'OpenAI API call failed',
        status: response.status,
        statusText: response.statusText,
        errorText: errorText,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: "Direct OpenAI API call successful",
      response: data.choices[0]?.message?.content || "No response",
      model: data.model,
      usage: data.usage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Direct OpenAI API call failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
