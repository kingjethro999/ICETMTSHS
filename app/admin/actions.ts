"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  let hasError = false;
  let errorMessage = "";

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    console.log(`[Login] Attempting login for ${email}`);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("[Login Action Error] Supabase Auth Error:", error.message, error);
      hasError = true;
      errorMessage = error.message;
    } else {
      console.log(`[Login] Successful login for ${email}`);
    }
  } catch (err: any) {
    console.error("[Login Action Exception] Unexpected error:", err);
    hasError = true;
    errorMessage = "An unexpected error occurred during login.";
  }

  if (hasError) {
    return { error: errorMessage };
  }

  revalidatePath("/admin", "layout");
  redirect("/admin/dashboard");
}

export async function signup(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const supabase = await createClient();

    console.log(`[Signup] Attempting signup for ${email}`);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      console.error("[Signup Action Error] Supabase Auth Error:", error.message, error);
      return { error: error.message };
    }

    console.log(`[Signup] Successful signup for ${email}`);
    revalidatePath("/admin", "layout");
    return { success: "Check your email for confirmation." };
  } catch (err: any) {
    console.error("[Signup Action Exception] Unexpected error:", err);
    return { error: "An unexpected error occurred during signup." };
  }
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
