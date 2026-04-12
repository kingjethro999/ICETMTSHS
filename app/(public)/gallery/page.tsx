import React from "react";
import { Metadata } from "next";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { Camera, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Gallery | ICETMTSHS 2026",
  description: "View the gallery of ICETMTSHS 2024 and our organizing committee events.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("created_at", { ascending: false });

  const galleryItems = items || [];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <Camera className="text-[#9b1d20] w-8 h-8" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-[#9b1d20]">
                Event Archives
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#9b1d20] mb-6 tracking-tight">
              Multimedia Gallery
            </h1>
            <SquigglyLine />
            <p className="mt-8 text-gray-500 max-w-2xl text-lg font-bold uppercase tracking-widest leading-relaxed">
              Explore the highlights of ICETMTSHS 2024 & Beyond
            </p>
          </div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        {galleryItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-gray-50 shadow-sm border border-gray-100 transition-all duration-700 hover:shadow-2xl hover:shadow-red-900/20 hover:-translate-y-2 cursor-zoom-in"
              >
                <img
                  src={item.image_url}
                  alt={item.caption}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 brightness-95 group-hover:brightness-100"
                />
                
                {/* Meta Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#9b1d20]/90 via-[#9b1d20]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                   <span className="text-[10px] font-black uppercase text-red-200 tracking-widest mb-2 italic">{item.year_tag} Event</span>
                   <h3 className="text-white text-xl font-black leading-tight uppercase tracking-tighter">{item.caption}</h3>
                </div>
                
                {/* ID Badge */}
                <div className="absolute top-6 right-6 px-4 py-1 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full text-[9px] font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   REF-{(index + 1).toString().padStart(3, '0')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center space-y-6 animate-in fade-in duration-1000">
             <div className="p-8 bg-gray-50 rounded-full w-fit mx-auto">
               <ImageIcon className="w-12 h-12 text-gray-200" />
             </div>
             <div>
               <h3 className="text-2xl font-black text-gray-900 tracking-tight">Gallery is currently offline</h3>
               <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Digital archives will be updated shortly</p>
             </div>
          </div>
        )}
      </section>

      {/* Participation CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-40">
         <div className="bg-[#9b1d20] rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-red-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Captured the moment?</h2>
            <p className="text-red-100/70 font-bold uppercase tracking-[0.2em] text-xs mb-10">Join the upcoming ICETMTSHS 2026 conference</p>
            <a 
             href="/registration-as-participant"
             className="inline-block px-12 py-5 bg-white text-[#9b1d20] rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Secure Your Seat
            </a>
         </div>
      </section>
    </div>
  );
}
