import React from "react";
import { Upload, Globe } from "lucide-react";
import { getGalleryItems } from "@/lib/actions/admin";
import { GalleryManager } from "@/components/admin/features/GalleryManager";

export default async function GalleryAdminPage() {
  const items = await getGalleryItems();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Gallery Manager</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest leading-relaxed">Public Event Media & Scholarly Archives</p>
        </div>
        <div className="flex items-center gap-3">
           <a 
            href="/gallery" 
            target="_blank"
            className="px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center gap-2"
           >
             <Globe className="w-4 h-4" />
             View Gallery Site
           </a>
        </div>
      </div>

      <GalleryManager initialItems={items} />
    </div>
  );
}
