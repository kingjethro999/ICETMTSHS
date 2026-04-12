"use server";

import { createClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { sendSubmissionConfirmation } from "@/lib/emails";

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

  // File Uploads (Abstract, Proof of Payment & ID)
  const abstractFile = formData.get("AbstractUpload") as File;
  const paymentFile = formData.get("PaymentProofUpload") as File;
  const idFile = formData.get("EmployeeIdUpload") as File;

  let abstractUrl = "";
  let paymentUrl = "";
  let idUrl = "";

  try {
    // 1. Upload Abstract (for presenters)
    if (abstractFile && abstractFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`abstracts/${Date.now()}_${abstractFile.name}`, abstractFile);

      if (error) throw error;
      abstractUrl = data.path;
    }

    // 2. Upload Payment Proof
    if (paymentFile && paymentFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`registrations/payment_${Date.now()}_${paymentFile.name}`, paymentFile);

      if (error) throw error;
      paymentUrl = data.path;
    }

    // 3. Upload ID Proof
    if (idFile && idFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`registrations/id_${Date.now()}_${idFile.name}`, idFile);

      if (error) throw error;
      idUrl = data.path;
    }

    // 4. Save to Database
    const { error: dbError } = await supabase.from("registrations").insert({
      full_name: fullName,
      email: email,
      institution: affiliation,
      submission_type: submissionType,
      paper_title: abstractTitle,
      abstract_url: abstractUrl,
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

    // 5. Send confirmation email
    try {
      await sendSubmissionConfirmation(email, fullName, submissionType);
    } catch (emailErr) {
      console.error("Non-blocking email error:", emailErr);
    }

    revalidatePath("/admin/registrations");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit registration";
    console.error("Registration Error:", err);
    return { error: message };
  }
}

// 2. Submit Contact Form
export async function submitContactForm(formData: FormData) {
  const supabase = createAnonClient();
  
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Professional Validation
  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Invalid email address format." };
  }

  try {
    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      subject,
      message,
    });

    if (error) throw error;
    return { success: true };
  } catch (err) {
    console.error("Contact Form Error:", err);
    return { error: "Failed to send message. Please try again later." };
  }
}

// Internal fetcher — NOT exported, only called via cached wrapper below
async function _fetchHomepageContent() {
  const supabase = createAnonClient();
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
  revalidateTag("homepage_content", "max");
}

