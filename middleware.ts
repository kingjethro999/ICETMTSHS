import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 1. Get User Session
  // Use getUser() but catch the "already used" error to prevent crashes during HMR/Race conditions
  let user = null;
  try {
    const { data: { user: u }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      if (userError.message.includes("refresh_token_already_used")) {
        // Token was rotated by another concurrent request. Get current session instead.
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
      }
    } else {
      user = u;
    }
  } catch (err) {
    console.error("Auth Middleware Error:", err);
  }

  const { pathname } = request.nextUrl;

  // 2. Auth Protection Logic
  if (pathname.startsWith("/admin")) {
    // Skip protection for login page
    if (pathname === "/admin/login") {
      if (user) return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      return response;
    }

    // Protect all other /admin routes
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (static assets like .png, .jpg)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)",
  ],
};
