import React from "react";
import { SubmissionContent } from "@/components/features/abstracts-submission/SubmissionContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abstract Submission | ICSHSM 2026",
  description: "Abstract Submission Information for the 1st International Conference on Sustainable Healthcare and Health Systems Management.",
};

export default function AbstractsSubmissionPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <SubmissionContent />
    </div>
  );
}
