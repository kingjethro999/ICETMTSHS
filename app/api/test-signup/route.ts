import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const supabase = await createClient();
  const email = `test_${Date.now()}@example.com`;
  const password = "Password123!";
  const fullName = "Test User";

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
    fs.writeFileSync(path.join(process.cwd(), "scratch", "signup_error.json"), errorLog);
    return NextResponse.json({ error: error.message, details: error }, { status: 400 });
  }

  return NextResponse.json({ message: "Signup successful", user: data.user });
}
