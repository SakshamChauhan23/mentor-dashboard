import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    // Create a Supabase client configured to use cookies
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // Public paths (Login, etc.)
    if (path.startsWith('/login') || path.startsWith('/auth')) {
        if (user) {
            // If user is already logged in, redirect to dashboard
            // TODO: Implement actual role check from database profile
            // For now, we'll just redirect to a generic dashboard or homepage
            // In a real app, we would fetch the user's role from a 'profiles' table here
            return NextResponse.redirect(new URL('/', request.url))
        }
        return response
    }

    // Protected paths
    // TEMPORARY: Disabled for development without active Supabase credentials
    // if (!user && (path.startsWith('/admin') || path.startsWith('/student') || path.startsWith('/mentor'))) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

    // TODO: Add strict role based access control
    // Example:
    // if (path.startsWith('/admin') && userRole !== 'admin') { ... }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
