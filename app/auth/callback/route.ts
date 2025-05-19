import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  let response = NextResponse.redirect(new URL('/profile', request.url))

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({
              name,
              value: '',
              ...options,
            })
          },
        },
      }
    )

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      // Successful authentication, redirect to profile
      return response
    } catch (error) {
      // Handle error, redirect to auth with error message
      return NextResponse.redirect(
        new URL('/auth?error=Could not authenticate user', request.url)
      )
    }
  }

  // No code, redirect to auth
  return NextResponse.redirect(new URL('/auth', request.url))
} 