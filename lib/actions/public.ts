"use server";

import { createClient } from "@/lib/supabase/server";
import { createAnonClient } from "@/lib/supabase/anon";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { sendSubmissionConfirmation, sendNewsletterWelcome } from "@/lib/emails";
import { headers } from "next/headers";
import crypto from "crypto";

// Security Immune System: Internal helper to guard the body
async function checkRateLimit(type: string, email?: string) {
  const supabase = createAnonClient();
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");
  
  // Look for events in the last 5 minutes
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
  
  const { count, error } = await supabase
    .from("security_events")
    .select("*", { count: "exact", head: true })
    .eq("event_type", "RateLimitAttempt")
    .eq("ip_hash", ipHash)
    .gt("created_at", fiveMinutesAgo);

  if (error) {
    console.error("Security system error:", error);
    return false; // Fail safe (proceed but log)
  }

  // Threshold: Max 5 attempts in 5 minutes
  if (count && count >= 5) {
    await supabase.from("security_events").insert({
      event_type: "IrregularityDetected",
      ip_hash: ipHash,
      severity: "High",
      details: { 
        reason: "Rate limit exceeded (5 requests/5min)", 
        form_type: type,
        email_provided: email || "unknown"
      }
    });
    return true; // Blocked
  }

  // Log this attempt
  await supabase.from("security_events").insert({
    event_type: "RateLimitAttempt",
    ip_hash: ipHash,
    severity: "Low",
    details: { form_type: type, email }
  });

  return false;
}

// 1. Submit Registration
export async function submitRegistration(formData: FormData) {
  // Guard: Protect the heart from spam
  const emailVal = formData.get("Email") as string;
  const isBlocked = await checkRateLimit("Registration", emailVal);
  if (isBlocked) {
    return { error: "Suspicious activity detected. Please try again later. Our security system is monitoring this connection." };
  }

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
      await sendSubmissionConfirmation(email, fullName, false);
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

// 2. Submit Abstract
export async function submitAbstract(formData: FormData) {
  // Guard: Protect the mind of the conference
  const emailVal = formData.get("Email") as string;
  const isBlocked = await checkRateLimit("Abstract", emailVal);
  if (isBlocked) {
    return { error: "Suspicious activity detected. Please try again later." };
  }

  const supabase = await createClient();

  const fullName = formData.get("FullName") as string;
  const email = formData.get("Email") as string;
  const affiliation = formData.get("Affiliation") as string;
  const paperTitle = formData.get("AbstractTitle") as string;
  const mobileNo = formData.get("MobileNo") as string;
  const abstractFile = formData.get("AbstractUpload") as File;

  let abstractUrl = "";

  try {
    // 1. Upload Abstract
    if (abstractFile && abstractFile.size > 0) {
      const { data, error } = await supabase.storage
        .from("gallery")
        .upload(`abstracts/${Date.now()}_${abstractFile.name}`, abstractFile);

      if (error) throw error;
      abstractUrl = data.path;
    }

    // 2. Save to Dedicated Table
    const { error: dbError } = await supabase.from("abstract_submissions").insert({
      full_name: fullName,
      email: email,
      institution: affiliation,
      paper_title: paperTitle,
      abstract_url: abstractUrl,
      mobile_no: mobileNo,
      status: "Pending"
    });

    if (dbError) throw dbError;

    // 3. Send confirmation email
    try {
      await sendSubmissionConfirmation(email, fullName, true);
    } catch (emailErr) {
      console.error("Non-blocking email error:", emailErr);
    }

    revalidatePath("/admin/abstracts");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to submit abstract";
    console.error("Abstract Submission Error:", err);
    return { error: message };
  }
}

// 2. Submit Contact Form
export async function submitContactForm(formData: FormData) {
  // Guard: Protect the voice of the platform
  const emailVal = formData.get("email") as string;
  const isBlocked = await checkRateLimit("Contact", emailVal);
  if (isBlocked) {
    return { error: "Too many messages sent. Please wait before trying again." };
  }

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

// 4. Fetch Gallery Items — cached for performance
async function _fetchGalleryItems() {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export const getGalleryItems = unstable_cache(
  _fetchGalleryItems,
  ["gallery_items"],
  {
    revalidate: 600, // 10 minutes
    tags: ["gallery_items"],
  }
);

// 5. Subscribe to Newsletter
export async function subscribeToNewsletter(email: string) {
  // Guard: Protect from automated spam
  const isBlocked = await checkRateLimit("Newsletter", email);
  if (isBlocked) {
    return { error: "Too many attempts. Please try again later." };
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please provide a valid email address." };
  }

  const supabase = createAnonClient();

  try {
    // 1. Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return { error: "You are already subscribed to our newsletter!" };
    }

    // 2. Insert new subscriber
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (error) throw error;

    // 3. Send welcome email
    try {
      await sendNewsletterWelcome(email);
    } catch (emailErr) {
      console.error("Non-blocking newsletter email error:", emailErr);
    }

    return { success: true };
  } catch (err: any) {
    console.error("Newsletter Subscription Error:", err);
    return { error: "Failed to subscribe. Please try again later." };
  }
}
