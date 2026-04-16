import React from "react";
import { RegistrationFeeContent } from "@/components/features/registration-fee/RegistrationFeeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Fee | ICSHSM 2026",
  description: "Browse registration fees for ICSHSM 2026. Special rates for delegates, research scholars, and students with international waivers available.",
};

export default function RegistrationFeePage() {
  return (
    <div className="min-h-screen bg-white">
      <RegistrationFeeContent />
    </div>
  );
}
