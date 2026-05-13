import React from "react";
import { FileText, RefreshCw, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AbstractsTable } from "@/components/admin/features/AbstractsTable";

export default async function AbstractsPage() {
  const supabase = await createClient();
  
  // Fetch from the dedicated abstract_submissions table
  const { data, error } = await supabase
    .from("abstract_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching abstracts:", error);
  }

  const abstracts = data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Abstract Submissions</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Track and Manage Research Submissions</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2">
             <Download className="w-4 h-4" />
             Export List
           </button>
           <button className="px-6 py-3 bg-[#9b1d20] text-white rounded-2xl font-bold text-sm shadow-xl shadow-red-900/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
             <RefreshCw className="w-4 h-4" />
             Refresh
           </button>
        </div>
      </div>

      <AbstractsTable initialData={abstracts} />
    </div>
  );
}
