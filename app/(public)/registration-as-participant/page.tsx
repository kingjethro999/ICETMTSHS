import React from "react";
import { Metadata } from "next";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { ClipboardEdit } from "lucide-react";
import { ParticipantRegistrationForm } from "@/components/features/registration/ParticipantRegistrationForm";

export const metadata: Metadata = {
  title: "Participant Registration | ICSHSM 2026",
  description: "Register as a participant for the ICSHSM 2026 conference.",
};

export default function RegistrationAsParticipantPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardEdit className="text-[#9b1d20]" size={24} />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#9b1d20]">
                Participant
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              ICSHSM 2026 <span className="text-[#9b1d20]">Registration</span>
            </h1>
            <SquigglyLine />
            <p className="mt-4 text-gray-600 max-w-2xl text-lg font-medium">
              Registration is now open for Participants.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <ParticipantRegistrationForm />
        </div>
      </section>
    </div>
  );
}
