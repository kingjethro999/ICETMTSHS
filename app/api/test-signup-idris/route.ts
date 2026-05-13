import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const supabase = await createClient();
  const email = "idrisahmed@lincoln.edu.my";
  const password = "AdminAccess2026!";
  const fullName = "Super Admin";

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
    const errorLog = JSON.stringify(error, null, 2);
    fs.writeFileSync(path.join(process.cwd(), "scratch", "signup_error_idris.json"), errorLog);
    return NextResponse.json({ error: error.message, details: error }, { status: 400 });
  }

  return NextResponse.json({ message: "Signup successful", user: data.user });
}
