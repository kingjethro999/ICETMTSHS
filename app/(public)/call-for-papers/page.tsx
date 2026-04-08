import React from "react";
import { CallForPapersContent } from "@/components/features/call-for-papers/CallForPapersContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call For Papers | ICETMTSHS 2026",
  description: "Invitation to researchers for submission of abstracts for the 3rd International Conference on Management, Technology, Social and Health Sciences.",
};

export default function CallForPapersPage() {
  return (
    <div className="min-h-screen bg-white">
      <CallForPapersContent />
    </div>
  );
}
