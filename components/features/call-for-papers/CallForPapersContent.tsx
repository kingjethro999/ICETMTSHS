"use client";
import React, { useEffect, useState } from "react";
import { SquigglyLine } from "@/components/ui/SquigglyLine";
import { ErrorState } from "@/components/ui/ErrorState";
import { DeadlineCard } from "./DeadlineCard";
import { Newspaper, Info, CheckCircle2 } from "lucide-react";

export const CallForPapersContent: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    console.log("[CallForPapersContent] Initializing call-for-papers feature...");
    try {
      // Logic for data loading or external resource checking
      console.log("[CallForPapersContent] UI data initialized");
    } catch (error) {
      console.error("[CallForPapersContent] Initialization error:", error);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ErrorState
          title="Module Error"
          message="There was an issue loading the Call For Papers content. Contact technical support."
          onRetry={() => {
            console.log("[CallForPapersContent] Retrying layout mount...");
            setHasError(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-16 mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight mb-4">
          Call For{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e26955] to-orange-600">
            Papers
          </span>
        </h1>
        <SquigglyLine />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content & Invitation */}
        <div className="lg:col-span-8 space-y-10">
          <section className="relative pl-8 border-l-4 border-[#e26955]">
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Researchers and practitioners are invited to submit their abstracts
              for the upcoming 1st International Conference (ICSHSM 2026).
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm font-semibold text-[#e26955] uppercase tracking-widest">
              <CheckCircle2 size={18} />
              Presentation Mode: Oral (Virtual Platform)
            </div>
          </section>

          {/* Key Dates Grid */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 lowercase">
              <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm">01</span>
              critical submission deadlines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DeadlineCard
                label="Abstract Submission"
                date="30th August 2026"
                description="Final date for abstract submission for review."
              />
              <DeadlineCard
                label="Full Paper Submission"
                date="31st September 2026"
                description="Deadline for full article submission for journal publication track."
              />
            </div>
          </section>

          {/* Journal Policy Box */}
          <section className="bg-gray-50 border border-gray-100 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-orange-600">
                <Newspaper size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Publication Policy & Peer Review
                </h3>
                <div className="prose prose-sm text-gray-600 space-y-4 max-w-none">
                  <p>
                    Extended versions of selected papers presented at <strong>ICSHSM 2026</strong> will be considered for publication (subject to peer review) in the:
                  </p>
                  <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <p className="font-bold text-gray-900">
                      Malaysian Journal of Medical Research (MJMR)
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100 text-[#e26955]">
                    <Info size={20} className="mt-0.5 flex-shrink-0" />
                    <p className="text-sm font-medium">
                      Submission does not guarantee publication; all manuscripts
                      will undergo rigorous peer review and must meet the journal's standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar / Quick Checklist */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                    Quick Checklist
                </h4>
                <ul className="space-y-4">
                    {[
                        "Abstract Word Limit: 250-300 words",
                        "File Type: MS Word (.doc, .docx)",
                        "Double-blind review process",
                      "Plagiarism check required"
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                            <CheckCircle2 size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
      </div>
    </div>
  );
};
