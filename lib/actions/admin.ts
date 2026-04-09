"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";

// 1. Manage Registration Status
export async function updateRegistrationStatus(id: string, status: "Paid" | "Rejected" | "Pending") {
  const supabase = await createClient();

  const { error } = await supabase
    .from("registrations")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
  
  revalidatePath("/admin/registrations");
  return { success: true };
}

// 2. Update Homepage Content
export async function updateHomepageContent(section: string, content: unknown) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("homepage_content")
    .upsert({ section_name: section, content }, { onConflict: "section_name" });

  if (error) return { success: false, error: error.message };

  // Bust the unstable_cache so the live homepage shows changes immediately
  revalidateTag("homepage_content");
  revalidatePath("/", "layout");
  revalidatePath("/admin/content-manager", "page");
  return { success: true };
}

export async function getGalleryItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (error) return [];
  return data;
}

export async function deleteGalleryItem(id: string, storagePath: string) {
  const supabase = await createClient();
  
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
  return { success: true };
}

export async function uploadGalleryItem(formData: FormData) {
  const supabase = await createClient();
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
      title,
      year,
      url: publicUrl,
      storage_path: fileName,
      type: file.type.startsWith("image") ? "Image" : "Video"
    });

  if (dbError) return { success: false, error: dbError.message };

  revalidatePath("/admin/gallery", "page");
  revalidatePath("/", "layout");
  return { success: true };
}

// 3. Delete Registration
export async function deleteRegistration(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("registrations").delete().eq("id", id);
  
  if (error) throw error;
  revalidatePath("/admin/registrations");
  return { success: true };
}
