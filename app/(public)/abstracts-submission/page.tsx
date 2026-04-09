import React from "react";
import { SubmissionContent } from "@/components/features/abstracts-submission/SubmissionContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abstracts Submission | ICETMTSHS 2026",
  description: "Abstract Submission Information for the 3rd International Conference on Emerging Trends in Management, Technology, Social and Health Sciences.",
};

export default function AbstractsSubmissionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <SubmissionContent />
    </div>
  );
}
