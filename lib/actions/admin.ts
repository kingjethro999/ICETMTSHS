"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

// 1. Manage Registration Status
import { sendApprovalEmail } from "@/lib/emails";

/**
 * Professional Auth Gate
 * Ensures only authenticated admins can perform these actions.
 */
async function checkAuth() {
  const supabase = await createClient();

  // Get user with better error handling
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Auth error in checkAuth:", authError);
    throw new Error("Authentication failed. Please log in again.");
  }

  if (!user) {
    throw new Error("Unauthorized: Administrative access required.");
  }

  // Verify admin role in profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Profile fetch error:", profileError);
    // SECURITY FALLBACK: If profile fetch fails but the email is the primary admin email, allow access
    if (user.email === "idrisahmed@lincoln.edu.my") {
      return supabase;
    }
    throw new Error(
      "Failed to verify admin privileges. Please contact support.",
    );
  }

  if (!profile || profile.role !== "admin") {
    // SECURITY FALLBACK: If profile is missing but the email is the primary admin email, allow access
    if (user.email === "idrisahmed@lincoln.edu.my") {
      return supabase;
    }

    throw new Error(
      `Forbidden: Insufficient privileges. User role: ${profile?.role || "none"}`,
    );
  }

  return supabase;
}

export async function updateRegistrationStatus(
  id: string,
  status: "Paid" | "Rejected" | "Pending",
) {
  const supabase = await checkAuth();

  // 1. Update the status
  const { data: updatedData, error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id)
    .select("full_name, email")
    .single();

  if (error) throw error;

  // 2. If status is Paid (Approved), send approval email
  if (status === "Paid" && updatedData) {
    await sendApprovalEmail(updatedData.email, updatedData.full_name);
  }

  revalidatePath("/admin/registrations");
  return { success: true };
}

// 2. Update Homepage Content
export async function updateHomepageContent(section: string, content: unknown) {
  const supabase = await checkAuth();
  const { error } = await supabase
    .from("homepage_content")
    .upsert({ section_name: section, content }, { onConflict: "section_name" });

  if (error) return { success: false, error: error.message };

  // Bust the unstable_cache so the live homepage shows changes immediately
  revalidateTag("homepage_content", "max");
  revalidatePath("/", "layout");
  revalidatePath("/admin/content-manager", "page");
  return { success: true };
}

export async function getGalleryItems() {
  const supabase = await createClient(); // Reading gallery items is okay for authenticated users
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

export async function deleteGalleryItem(id: string, storagePath: string) {
  const supabase = await checkAuth();

  // 1. Delete from Storage
  const { error: storageError } = await supabase.storage
    .from("gallery")
    .remove([storagePath]);

  if (storageError) return { success: false, error: storageError.message };

  // 2. Delete from DB
  const { error: dbError } = await supabase
    .from("gallery_items")
    .delete()
    .eq("id", id);

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath("/admin/gallery", "page");
  revalidatePath("/", "layout");
  revalidateTag("gallery_items", "max");
  return { success: true };
}

export async function uploadGalleryItem(formData: FormData) {
  const supabase = await checkAuth();
  const file = formData.get("file") as File;
  const title = formData.get("title") as string;
  const year = formData.get("year") as string;

  const fileName = `${Date.now()}-${file.name}`;
  const { data: storageData, error: storageError } = await supabase.storage
    .from("gallery")
    .upload(fileName, file);

  if (storageError) return { success: false, error: storageError.message };

  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(fileName);

  const { error: dbError } = await supabase.from("gallery_items").insert({
    caption: title,
    year_tag: year,
    image_url: publicUrl,
  });

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath("/admin/gallery", "page");
  revalidatePath("/", "layout");
  revalidateTag("gallery_items", "max");
  return { success: true };
}

export async function updateGalleryItem(
  id: string,
  caption: string,
  year_tag: string,
) {
  const supabase = await checkAuth();

  const { error } = await supabase
    .from("gallery_items")
    .update({ caption, year_tag })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/gallery", "page");
  revalidateTag("gallery_items", "max");
  return { success: true };
}

export async function migrateLegacyGallery(filenames: string[]) {
  const supabase = await checkAuth();
  const baseUrl = "https://admin.icshsm.org/wp-content/uploads/2026/01/";
  let successCount = 0;
  const errors: string[] = [];

  for (const filename of filenames) {
    try {
      // 1. Fetch from WP
      const wpResponse = await fetch(`${baseUrl}${filename}`);
      if (!wpResponse.ok)
        throw new Error(`WP Fetch Failed: ${wpResponse.statusText}`);
      const blob = await wpResponse.blob();

      // 2. Upload to Supabase
      const storagePath = `migrated/${Date.now()}-${filename}`;
      const { error: storageError } = await supabase.storage
        .from("gallery")
        .upload(storagePath, blob, {
          contentType: "image/jpeg",
          upsert: true,
        });

      if (storageError) throw storageError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("gallery").getPublicUrl(storagePath);

      // 3. Insert Record
      const { error: dbError } = await supabase.from("gallery_items").insert({
        caption: "ICSHSM 2026 Archive",
        year_tag: "2024",
        image_url: publicUrl,
      });

      if (dbError) throw dbError;
      successCount++;
    } catch (err: any) {
      console.error(`Migration Failed for ${filename}:`, err);
      errors.push(`${filename}: ${err.message}`);
    }
  }

  revalidatePath("/admin/gallery", "page");
  revalidateTag("gallery_items", "max");
  return { success: true, migrated: successCount, errors };
}

// 3. Delete Registration
export async function deleteRegistration(id: string) {
  const supabase = await checkAuth();
  const { error } = await supabase.from("registrations").delete().eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/registrations");
  return { success: true };
}

// 4. Update Abstract Status
export async function updateAbstractStatus(
  id: string,
  status: "Paid" | "Rejected" | "Pending",
) {
  const supabase = await checkAuth();

  // 1. Update the status
  const { data: updatedData, error } = await supabase
    .from("abstract_submissions")
    .update({ status })
    .eq("id", id)
    .select("full_name, email")
    .single();

  if (error) throw error;

  // 2. If status is Paid (Approved), send approval email
  if (status === "Paid" && updatedData) {
    await sendApprovalEmail(updatedData.email, updatedData.full_name);
  }

  revalidatePath("/admin/abstracts");
  return { success: true };
}

// 5. Delete Abstract
export async function deleteAbstract(id: string) {
  const supabase = await checkAuth();
  const { error } = await supabase
    .from("abstract_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/abstracts");
  return { success: true };
}

// 4. Newsletter Broadcast
import { sendBulkNewsletter } from "@/lib/emails";

export async function getNewsletterSubscribers() {
  const supabase = await checkAuth();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function sendNewsletterToAll(subject: string, content: string) {
  try {
    const supabase = await checkAuth();

    // 1. Fetch all active subscribers
    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("status", "active");

    if (error) {
      console.error("Database error fetching subscribers:", error);
      return { success: false, error: `Database error: ${error.message}` };
    }

    if (!subscribers || subscribers.length === 0) {
      return { success: false, error: "No active subscribers found." };
    }

    const emails = subscribers.map((s) => s.email);

    // 2. Send emails in batches (Gmail has rate limits)
    const batchSize = 50;
    let totalSuccess = 0;
    let totalFail = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const result = await sendBulkNewsletter(subject, content, batch);

      if (result.success) {
        totalSuccess += result.successCount || 0;
        totalFail += result.failCount || 0;
      } else {
        console.error("Batch send failed:", result.error);
        return {
          success: false,
          error: `Email sending failed: ${result.error}`,
        };
      }
    }

    return {
      success: true,
      count: totalSuccess,
      failed: totalFail,
      message:
        totalFail > 0
          ? `Sent to ${totalSuccess} subscribers, ${totalFail} failed`
          : undefined,
    };
  } catch (error: any) {
    console.error("Newsletter send error:", error);
    return {
      success: false,
      error:
        error.message ||
        "An unexpected error occurred while sending the newsletter.",
    };
  }
}

/**
 * Updates the current admin's password
 */
export async function updatePassword(newPassword: string) {
  try {
    await checkAuth();
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: "Password updated successfully." };
  } catch (error: any) {
    return { error: error.message };
  }
}
