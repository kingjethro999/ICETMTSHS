import React from "react";
import { Layout, Globe, Search, PlusCircle, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ContentManagerEditor } from "@/components/admin/features/ContentManagerEditor";

export default async function ContentManagerPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("homepage_content")
    .select("section_name, content")
    .order("section_name", { ascending: true });

  if (error) {
    console.error("Error fetching homepage content:", error);
  }

  const sections = data || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Content Manager</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Global Live Site Editor & Headless CMS</p>
        </div>
        <div className="flex items-center gap-3">
           <a 
            href="/" 
            target="_blank"
            className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
           >
             <Globe className="w-4 h-4" />
             View Site
           </a>
        </div>
      </div>

      <ContentManagerEditor initialSections={sections} />
    </div>
  );
}
