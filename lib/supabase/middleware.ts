import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
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
          cookiesToSet.forEach(({ name, value, options }) =>
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

  // Optimized user fetch
  let user = null;
  const { data: { user: u }, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    // If the token was already used, it means another concurrent request refreshed it.
    // In this case, we can try to get the session which should be valid now.
    if (userError.message.includes("refresh_token_already_used")) {
      const { data: { session } } = await supabase.auth.getSession();
      user = session?.user || null;
    }
  } else {
    user = u;
  }

  // Protected route logic
  // If accessing /admin and not logged in (unless it's /admin/login)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login") &&
    !user
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If logged in and accessing login page, go to dashboard
  if (request.nextUrl.pathname.startsWith("/admin/login") && user) {
     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}
