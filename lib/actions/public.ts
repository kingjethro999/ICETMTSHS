"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

// 1. Submit Registration
export async function submitRegistration(formData: FormData) {
  const supabase = await createClient();

  const fullName = formData.get("FullName") as string;
  const email = formData.get("Email") as string;
  const altEmail = formData.get("EmailAlt") as string;
  const affiliation = formData.get("Affiliation") as string;
  const mobileNo = formData.get("MobileNo") as string;
  const attendanceMode = formData.get("AttendanceMode") as string;
  const abstractTitle = formData.get("AbstractTitle") as string;
  const submissionType = (formData.get("SubmissionType") as string) || "Participant";

  // File Uploads (Proof of Payment & ID)
  const paymentFile = formData.get("PaymentProofUpload") as File;
  const idFile = formData.get("EmployeeIdUpload") as File;

  let paymentUrl = "";
  let idUrl = "";

  try {
    // Upload Payment Proof
    if (paymentFile && paymentFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`registrations/payment_${Date.now()}_${paymentFile.name}`, paymentFile);

      if (error) throw error;
      paymentUrl = data.path;
    }

    // Upload ID Proof
    if (idFile && idFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`registrations/id_${Date.now()}_${idFile.name}`, idFile);

      if (error) throw error;
      idUrl = data.path;
    }

    // Save to Database
    const { error: dbError } = await supabase.from("registrations").insert({
      full_name: fullName,
      email: email,
      institution: affiliation,
      submission_type: submissionType,
      paper_title: abstractTitle,
      payment_proof_url: paymentUrl,
      status: "Pending",
      metadata: {
        alt_email: altEmail,
        mobile_no: mobileNo,
        attendance_mode: attendanceMode,
        id_proof_url: idUrl,
      },
    });

    if (dbError) throw dbError;

    revalidatePath("/admin/registrations");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit registration";
    console.error("Registration Error:", err);
    return { error: message };
  }
}

// Internal fetcher — NOT exported, only called via cached wrapper below
async function _fetchHomepageContent() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .eq("is_published", true);

  if (error || !data) return {};

  return data.reduce((acc: Record<string, unknown>, curr: { section_name: string; content: unknown }) => {
    acc[curr.section_name] = curr.content;
    return acc;
  }, {});
}

// 2. Fetch Homepage Content — cached for 5 minutes at the server level.
//    This eliminates the Supabase round-trip on every page load.
//    Call revalidateHomepageCache() in the CMS admin action to bust the cache.
export const getHomepageContent = unstable_cache(
  _fetchHomepageContent,
  ["homepage_content"],
  {
    revalidate: 300, // 5 minutes
    tags: ["homepage_content"],
  }
);

// 3. Bust the homepage cache — call this from admin CMS save actions
export async function revalidateHomepageCache() {
  revalidateTag("homepage_content");
}

