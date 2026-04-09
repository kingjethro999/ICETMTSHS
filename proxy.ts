import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run auth logic for admin routes — skip it entirely for public pages
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isAdminRoute) {
    // Public routes: pass through immediately with no Supabase round-trip
    return NextResponse.next({ request: { headers: request.headers } });
  }

  // Admin routes: verify Supabase session
  let response = NextResponse.next({ request: { headers: request.headers } });

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
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  const { data: { user: u }, error: userError } = await supabase.auth.getUser();

  if (userError) {
    if (userError.message.includes("refresh_token_already_used")) {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user || null;
    }
  } else {
    user = u;
  }

  // Redirect unauthenticated users away from /admin (except /admin/login)
  if (!pathname.startsWith("/admin/login") && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Redirect logged-in users away from /admin/login
  if (pathname.startsWith("/admin/login") && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico
     * - public assets (.svg, .png, .jpg, .pdf, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf|ico)$).*)",
  ],
};
