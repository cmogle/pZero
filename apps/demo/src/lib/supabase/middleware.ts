import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const ALLOWED_DOMAIN = 'intellectdesign.com';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session — important for Server Components.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/auth/');

  // No user and not on an auth route → redirect to login
  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('next', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // User is authenticated but email domain isn't allowed → sign out and reject
  if (user && !isAuthRoute) {
    const email = user.email ?? '';
    const domain = email.split('@')[1]?.toLowerCase();

    if (domain !== ALLOWED_DOMAIN) {
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('error', 'domain');
      return NextResponse.redirect(url);
    }
  }

  // User is authenticated and on login page → redirect to home
  if (user && request.nextUrl.pathname === '/login') {
    const next = request.nextUrl.searchParams.get('next') ?? '/';
    const url = request.nextUrl.clone();
    url.pathname = next;
    url.searchParams.delete('next');
    url.searchParams.delete('error');
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
