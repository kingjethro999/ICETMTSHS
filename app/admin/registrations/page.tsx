import React from "react";
import { Download, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { RegistrationsTable } from "@/components/admin/features/RegistrationsTable";

export default async function RegistrationsPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching registrations:", error);
  }

  const registrations = data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Registrations Manager</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Manage Conference Submissions & Payments</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2">
             <Download className="w-4 h-4" />
             Export CSV
           </button>
           <form action={async () => { "use server"; /* Refresh via server action or just revalidatePath */ }}>
             <button type="submit" className="px-6 py-3 bg-[#9b1d20] text-white rounded-2xl font-bold text-sm shadow-xl shadow-red-900/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
               <RefreshCw className="w-4 h-4" />
               Refresh List
             </button>
           </form>
        </div>
      </div>

      <RegistrationsTable initialData={registrations} />
    </div>
  );
}
