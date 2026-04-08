"use server";

import { createClient } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createClient();

  // 1. Total Registrations
  const { count: totalRegistrations, error: regError } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true });

  // 2. Paid Submissions
  const { count: paidSubmissions, error: paidError } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("status", "Paid");

  // 3. Abstracts (Presenters)
  const { count: totalAbstracts, error: absError } = await supabase
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("submission_type", "Presenter");

  // 4. Gallery Items
  const { count: totalGallery, error: galError } = await supabase
    .from("gallery_items")
    .select("*", { count: "exact", head: true });

  // 5. Recent Registrations
  const { data: recentRegistrations } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

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
