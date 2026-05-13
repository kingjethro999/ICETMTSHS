"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  // Parallelize all Supabase calls
  const [
    { count: totalRegistrations, error: regError },
    { count: paidSubmissions, error: paidError },
    { count: totalAbstracts, error: absError },
    { count: totalGallery, error: galError },
    { data: recentRegistrations },
    { count: irregularityCount, error: secError },
    { data: recentIrregularities }
  ] = await Promise.all([
    // 1. Total Registrations
    supabase.from("registrations").select("*", { count: "exact", head: true }),
    // 2. Paid Submissions
    supabase.from("registrations").select("*", { count: "exact", head: true }).eq("status", "Paid"),
    // 3. Abstracts (Presenters)
    supabase.from("registrations").select("*", { count: "exact", head: true }).eq("submission_type", "Presenter"),
    // 4. Gallery Items
    supabase.from("gallery_items").select("*", { count: "exact", head: true }),
    // 5. Recent Registrations
    supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(5),
    // 6. Security Irregularities
    supabase.from("security_events").select("*", { count: "exact", head: true }).eq("event_type", "IrregularityDetected"),
    // 7. Recent Irregularities
    supabase.from("security_events").select("*").eq("event_type", "IrregularityDetected").order("created_at", { ascending: false }).limit(5)
  ]);

  return {
    stats: {
      totalRegistrations: totalRegistrations || 0,
      paidSubmissions: paidSubmissions || 0,
      totalAbstracts: totalAbstracts || 0,
      totalGallery: totalGallery || 0,
      irregularityCount: irregularityCount || 0,
    },
    recentRegistrations: recentRegistrations || [],
    recentIrregularities: recentIrregularities || [],
    errors: { regError, paidError, absError, galError, secError }
  };
}

export async function getConferenceSettings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conference_settings")
    .select("*");
  
  return data || [];
}
