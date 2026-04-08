import React from "react";
import { Metadata } from "next";
import { keyMembersData } from "@/lib/data/keyMembersData";
import { MemberCard } from "@/components/features/key-members/MemberCard";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Key Members | ICETMTSHS 2026",
  description:
    "Meet the key members of the ICETMTSHS 2026 organizing committee — distinguished academics and leaders from Lincoln University College, Malaysia.",
};

export default function KeyMembersPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-[#9b1d20]" size={24} />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#9b1d20]">
                ICETMTSHS 2026
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              Key{" "}
              <span className="text-[#9b1d20]">Members</span>
            </h1>
            <SquigglyLine />
            <p className="mt-4 text-gray-600 max-w-2xl leading-relaxed">
              Meet the distinguished academics, leaders, and professionals who
              form the backbone of the ICETMTSHS 2026 organizing committee at
              Lincoln University College, Malaysia.
            </p>
          </div>
        </div>
      </section>

      {/* Members List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="space-y-10">
          {keyMembersData.map((member, index) => (
            <MemberCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
