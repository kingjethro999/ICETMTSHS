import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const email = "idrisahmed@lincoln.edu.my";
  const password = "AdminAccess2026!";
  const fullName = "Super Admin";

  console.log(`[Seed Admin] Attempting to ensure admin exists: ${email}`);

  // Try to sign up
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    console.error("[Seed Admin Error]", error);
    return NextResponse.json({ 
      message: "Signup failed", 
      error: error
    }, { status: 400 });
  }

  return NextResponse.json({ 
    message: "Admin user created successfully", 
    user: data.user 
  });
}
