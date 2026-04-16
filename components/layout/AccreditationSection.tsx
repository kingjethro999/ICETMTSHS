import React from "react";
import Image from "next/image";

export const AccreditationSection: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <Image
            src="https://icshsm.lincoln.edu.my/wp-content/uploads/2026/02/Logos-1024x100.png"
            alt="Accreditation and ranking logos for international standards and research excellence"
            width={1024}
            height={100}
            className="w-full max-w-4xl h-auto object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};
