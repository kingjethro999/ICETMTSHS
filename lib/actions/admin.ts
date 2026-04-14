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
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error("Unauthorized: Administrative access required.");
  }
  
  // Verify admin role in profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    throw new Error("Forbidden: Insufficient privileges.");
  }

  return supabase;
}

export async function updateRegistrationStatus(id: string, status: "Paid" | "Rejected" | "Pending") {
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
  revalidateTag("gallery_items");
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

  const { data: { publicUrl } } = supabase.storage
    .from("gallery")
    .getPublicUrl(fileName);

  const { error: dbError } = await supabase
    .from("gallery_items")
    .insert({
      caption: title,
      year_tag: year,
      image_url: publicUrl,
    });

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath("/admin/gallery", "page");
  revalidatePath("/", "layout");
  revalidateTag("gallery_items");
  return { success: true };
}

export async function updateGalleryItem(id: string, caption: string, year_tag: string) {
  const supabase = await checkAuth();

  const { error } = await supabase
    .from("gallery_items")
    .update({ caption, year_tag })
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/gallery", "page");
  revalidateTag("gallery_items");
  return { success: true };
}

export async function migrateLegacyGallery(filenames: string[]) {
  const supabase = await checkAuth();
  const baseUrl = "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2025/05/";
  let successCount = 0;
  let errors = [];

  for (const filename of filenames) {
    try {
      // 1. Fetch from WP
      const wpResponse = await fetch(`${baseUrl}${filename}`);
      if (!wpResponse.ok) throw new Error(`WP Fetch Failed: ${wpResponse.statusText}`);
      const blob = await wpResponse.blob();
      
      // 2. Upload to Supabase
      const storagePath = `migrated/${Date.now()}-${filename}`;
      const { error: storageError } = await supabase.storage
        .from("gallery")
        .upload(storagePath, blob, {
          contentType: "image/jpeg",
          upsert: true
        });

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery")
        .getPublicUrl(storagePath);

      // 3. Insert Record
      const { error: dbError } = await supabase
        .from("gallery_items")
        .insert({
          caption: "ICETMTSHS Archive",
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
  revalidateTag("gallery_items");
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
