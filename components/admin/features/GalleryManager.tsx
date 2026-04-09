"use client";

import React, { useState } from "react";
import { ImageIcon, Upload, Trash2, Edit3, Grid, List, Search, Filter, Camera, Info, History, Loader2, Hash, FileImage } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { uploadGalleryItem, deleteGalleryItem } from "@/lib/actions/admin";

interface GalleryItem {
  id: string;
  title: string;
  url: string;
  year: string;
  storage_path: string;
  type: string;
}

export function GalleryManager({ initialItems }: { initialItems: GalleryItem[] }) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("2026");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !newTitle) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", newTitle);
    formData.append("year", newYear);

    const result = await uploadGalleryItem(formData);
    if (result.success) {
      setNewTitle("");
      setSelectedFile(null);
      // For simplicity, we trigger revalidation, but in a real app, 
      // we'd probably update the state or use a router refresh.
      window.location.reload();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, storagePath: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    setLoading(id);
    const result = await deleteGalleryItem(id, storagePath);
    if (result.success) {
      setItems(items.filter(item => item.id !== id));
    }
    setLoading(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Gallery Main Area */}
      <div className="lg:col-span-12 xl:col-span-8 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
           {items.map((img) => (
             <div key={img.id} className="group relative bg-white aspect-[3/4] rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-red-900/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm text-gray-900 border border-white/50">{img.year}</span>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                   <h4 className="text-white text-sm font-black leading-tight mb-4 uppercase tracking-tighter">{img.title}</h4>
                   <div className="flex gap-2">
                      <button 
                       onClick={() => handleDelete(img.id, img.storage_path)}
                       disabled={loading === img.id}
                       className="flex-1 p-3 bg-red-600/20 backdrop-blur-xl border border-red-500/30 rounded-xl text-red-500 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center"
                      >
                         {loading === img.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                   </div>
                </div>
             </div>
           ))}
           
           <div className="aspect-[3/4] rounded-[2.5rem] border-4 border-dashed border-gray-100 flex flex-col items-center justify-center p-8 text-center bg-gray-50/30">
              <p className="text-[10px] font-black uppercase text-gray-300 tracking-[0.2em] mb-4">Repository End</p>
              <ImageIcon className="w-8 h-8 text-gray-200" />
           </div>
        </div>
      </div>

      {/* Editor Panel */}
      <div className="lg:col-span-12 xl:col-span-4 lg:sticky lg:top-32 space-y-6">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-10 space-y-8 animate-in slide-in-from-right-4 duration-1000">
          <div className="space-y-4">
            <div className="p-4 bg-[#9b1d20] w-fit rounded-2xl shadow-xl shadow-red-900/10">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-gray-900 leading-tight">Digital Asset<br/>Publisher</h3>
              <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-[0.2em] leading-relaxed">Broadcast to public gallery</p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Media Title</label>
              <input 
                type="text" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm focus:outline-none focus:ring-4 focus:ring-red-100/30 transition-all" 
                placeholder="e.g. Conference Kickoff" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Cycle</label>
              <div className="grid grid-cols-3 gap-2">
                {["2024", "2025", "2026"].map((y) => (
                  <button 
                    key={y}
                    type="button" 
                    onClick={() => setNewYear(y)}
                    className={cn(
                      "py-3 rounded-xl text-[10px] font-black transition-all",
                      newYear === y ? "bg-[#9b1d20] text-white shadow-lg" : "bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100"
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Source Selection</label>
              <div className="relative group cursor-pointer">
                <input 
                  type="file" 
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                  accept="image/*,video/*"
                />
                <div className="p-8 border-2 border-dashed border-gray-100 rounded-[2rem] bg-gray-50/50 flex flex-col items-center justify-center group-hover:border-[#9b1d20]/30 transition-all">
                  {selectedFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <FileImage className="w-8 h-8 text-[#9b1d20]" />
                      <span className="text-[10px] font-bold text-[#9b1d20] max-w-[200px] truncate uppercase tracking-tighter">Selected: {selectedFile.name}</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="w-8 h-8 text-gray-300 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest leading-relaxed">Select Local Asset</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={uploading || !selectedFile || !newTitle}
              className="w-full py-5 bg-[#9b1d20] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Synchronizing...
                </div>
              ) : "Push to Live Site"}
            </button>
          </form>

          <div className="pt-6 border-t border-gray-50 flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed italic">
            <History className="w-4 h-4 text-[#9b1d20]" />
            Multimedia records are globally reflected post-cache invalidation.
          </div>
        </div>
      </div>
    </div>
  );
}
