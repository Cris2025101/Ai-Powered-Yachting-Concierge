import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  // Debug logging for production
  if (typeof window !== 'undefined') {
    console.log('Supabase URL:', supabaseUrl)
    console.log('Supabase Key:', supabaseKey ? 'Present' : 'Missing')
  }
  
  return createBrowserClient(supabaseUrl, supabaseKey)
} 