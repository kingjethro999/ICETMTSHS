import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { Camera, ImageOff } from "lucide-react";
import { getGalleryItems } from "@/lib/actions/public";

export const metadata: Metadata = {
  title: "Gallery | ICSHSM 2026",
  description: "View the gallery of previous ICSHSM events and our organizing committee.",
};

export default async function GalleryPage() {
  const images = await getGalleryItems();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <Camera className="text-[#9b1d20]" size={24} />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#9b1d20]">
                Photos
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#9b1d20] mb-2">
              Gallery
            </h1>
            <SquigglyLine />
            <p className="mt-4 text-gray-600 max-w-2xl text-lg font-medium">
              ICSHSM Official Gallery & Scholarly Archives
            </p>
          </div>
        </div>
      </section>

      {/* Grid Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((img: any, index: number) => (
              <div 
                key={img.id} 
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Image
                  src={img.image_url}
                  alt="Accreditation and ranking logos for international standards and research excellence"
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  unoptimized
                  priority={index < 8}
                />
                {/* Overlay with Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                   <p className="text-white text-[10px] font-black uppercase tracking-wider mb-1">{img.year_tag}</p>
                   <p className="text-white/90 text-xs font-bold line-clamp-2 leading-relaxed tracking-tight">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="p-6 bg-gray-50 rounded-full">
              <ImageOff className="w-12 h-12 text-gray-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">No images found</h3>
              <p className="text-gray-500 max-w-xs mt-2">The official gallery is currently being curated. Please check back later.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
