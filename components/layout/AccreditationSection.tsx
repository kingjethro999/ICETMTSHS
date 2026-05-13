import React from "react";
import Image from "next/image";

export const AccreditationSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center relative w-full h-24 max-w-4xl mx-auto">
          <Image
            src="https://icshsm.lincoln.edu.my/wp-content/uploads/2026/02/Logos-1024x100.png"
            alt="Accreditation and ranking logos for international standards and research excellence"
            fill
            sizes="100vw"
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};
