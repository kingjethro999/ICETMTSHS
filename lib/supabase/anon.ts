import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * A stateless, cookie-free Supabase client for reading public data.
 *
 * Use this ONLY for queries that:
 *  - Read public/unauthenticated data (no RLS user context needed)
 *  - Must run inside unstable_cache() — which prohibits cookies()
 *
 * For anything that needs the user session (admin routes, mutations),
 * use the server client in lib/supabase/server.ts instead.
 */
export function createAnonClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  );
}
