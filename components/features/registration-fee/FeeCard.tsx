"use client";
import React from "react";
import { Users, GraduationCap, BookOpen, Globe, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface FeeCardProps {
  category: string;
  subCategory?: string;
  localFee: string;
  internationalFee?: string;
  iconType: "delegate" | "scholar" | "student";
}

const iconMap = {
  delegate: Users,
  scholar: GraduationCap,
  student: BookOpen,
};

export const FeeCard: React.FC<FeeCardProps> = ({
  category,
  subCategory,
  localFee,
  internationalFee,
  iconType,
}) => {
  const Icon = iconMap[iconType];

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      {/* Accent Header */}
      <div className="h-2 bg-gradient-to-r from-[#9b1d20] to-red-600" />
      
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#9b1d20] group-hover:scale-110 transition-transform">
            <Icon size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {category}
            </h3>
            {subCategory && (
              <p className="text-sm text-gray-500 font-medium">{subCategory}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {/* Local Fee */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-red-50/30 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              <MapPin size={14} className="text-[#9b1d20]" />
              Local Participant
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              <span className="text-sm font-medium text-gray-500 mr-1">₦</span>
              {localFee}
            </div>
          </div>

          {/* International Fee */}
          {internationalFee && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 group-hover:bg-red-50/30 transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                <Globe size={14} className="text-[#9b1d20]" />
                International
              </div>
              <div className="text-3xl font-extrabold text-gray-900">
                <span className="text-sm font-medium text-gray-500 mr-1">USD</span>
                {internationalFee}
                <span className="text-[#9b1d20] text-lg">*</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
