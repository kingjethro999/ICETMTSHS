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
    { data: recentRegistrations }
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
    supabase.from("registrations").select("*").order("created_at", { ascending: false }).limit(5)
  ]);

  return {
    stats: {
      totalRegistrations: totalRegistrations || 0,
      paidSubmissions: paidSubmissions || 0,
      totalAbstracts: totalAbstracts || 0,
      totalGallery: totalGallery || 0,
    },
    recentRegistrations: recentRegistrations || [],
    errors: { regError, paidError, absError, galError }
  };
}

export async function getConferenceSettings() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("conference_settings")
    .select("*");
  
  return data || [];
}
