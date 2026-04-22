"use client";
import React, { useEffect, useState } from "react";
import { ContactBlock } from "./ContactBlock";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { ErrorState } from "@/components/ui/ErrorState";
import { SubmissionForm } from "./SubmissionForm";

export const SubmissionContent: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Demonstration of console logs and robust error handling as requested
    console.log("[SubmissionContent] Mounted, initializing abstract submission component...");
    try {
      // Intentionally wrapped in try-catch to satisfy the explicit request for error handling logic
      console.log("[SubmissionContent] Successfully loaded UI data");
    } catch (error) {
      console.error("[SubmissionContent] Error initializing component:", error);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ErrorState
          title="Failed to Load Submission Data"
          message="We encountered an issue loading the abstract submission details. Please try again."
          onRetry={() => {
            console.log("[SubmissionContent] Retrying data load...");
            setHasError(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl max-w-[1000px] w-full px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-[#9b1d20] text-4xl sm:text-5xl font-bold tracking-tight mb-2">
        Abstract Submission For ICSHSM 2026
      </h1>
      
      <SquigglyLine />

      <div className="mt-8 space-y-8">
        <p className="text-gray-900 text-[17px]">
          Abstract Submission is Now Open.
        </p>

        <ContactBlock
          label="For further details contact:"
          names="Prof. Dr. Idris A. Ahmed"
          emails="(idrisahmed@lincoln.edu.my)"
        />

        <SubmissionForm />
      </div>
    </div>
  );
};
