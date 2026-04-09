import React from "react";
import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    src: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2025/05/IMG-20250506-WA0018.jpg",
    alt: "Conference gallery image 1",
  },
  {
    src: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2025/05/IMG-20250506-WA0014.jpg",
    alt: "Conference gallery image 2",
  },
  {
    src: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2025/05/IMG-20250506-WA0006.jpg",
    alt: "Conference gallery image 3",
  },
  {
    src: "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2024/02/1F6A2143-scaled.jpg",
    alt: "Conference gallery image 4",
  },
];

export const ImageGallery: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Conference Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore moments from our previous conferences and get a glimpse of
            what to expect at ICETMTSHS 2026
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <div className="aspect-[4/3] relative bg-gray-200">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  unoptimized
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery Button */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-3 bg-red-900 hover:bg-red-800 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View Gallery
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
