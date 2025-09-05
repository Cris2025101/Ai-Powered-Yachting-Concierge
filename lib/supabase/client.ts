import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  // Debug logging for production
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Supabase configured for development')
  }
  
  return createBrowserClient(supabaseUrl, supabaseKey)
} 