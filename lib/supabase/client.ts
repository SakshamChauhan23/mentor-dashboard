import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    // Get environment variables with fallback for build-time
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

    // Warn if using placeholder values (in development/client-side only)
    if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
        console.warn('Supabase environment variables are not configured. Authentication features will not work.')
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
