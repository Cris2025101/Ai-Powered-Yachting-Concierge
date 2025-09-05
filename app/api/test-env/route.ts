import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables availability
    const envVars = {
      OPENAI_API_KEY: {
        available: !!process.env.OPENAI_API_KEY,
        length: process.env.OPENAI_API_KEY?.length || 0,
        prefix: process.env.OPENAI_API_KEY?.substring(0, 8) + '...' || 'Not set'
      },
      NEXT_PUBLIC_SUPABASE_URL: {
        available: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set',
        isUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.startsWith('https://') || false
      },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: {
        available: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
        prefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 8) + '...' || 'Not set'
      }
    };

    // Check if all required variables are available
    const allAvailable = Object.values(envVars).every(vars => vars.available);

    return NextResponse.json({
      success: true,
      allVariablesAvailable: allAvailable,
      environment: process.env.NODE_ENV,
      variables: envVars,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}