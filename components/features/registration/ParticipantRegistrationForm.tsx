"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitRegistration } from "@/lib/actions/public";

export const ParticipantRegistrationForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    formData.append("SubmissionType", "Participant");

    const result = await submitRegistration(formData);
    
    if (result.success) {
      setStatus("success");
    } else {
      console.error(result.error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-100 text-center">
        <h3 className="text-xl font-bold mb-2">Registration Submitted!</h3>
        <p>Thank you for submitting your registration. We will review your payment proof and confirm your attendance shortly.</p>
        <Button 
          className="mt-6" 
          variant="secondary" 
          onClick={() => setStatus("idle")}
        >
          Submit another registration
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="FullName" className="text-sm font-bold text-gray-800">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="FullName"
              name="FullName"
              maxLength={200}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2 p-5 border border-dashed border-gray-300 rounded-xl bg-gray-50/50">
            <div className="mb-2">
              <label htmlFor="EmployeeIdUpload" className="text-sm font-bold text-gray-800 block">
                Students / Employee ID - Upload
              </label>
              <span className="text-xs text-gray-500 font-medium">
                (For LUC members only) Allowed: PDF/JPG/PNG
              </span>
            </div>
            <div className="relative">
              <input
                type="file"
                id="EmployeeIdUpload"
                name="EmployeeIdUpload"
                accept=".pdf,.png,.jpg,.jpeg"
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9b1d20]/10 file:text-[#9b1d20] hover:file:bg-[#9b1d20]/20 transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="EmailAlt" className="text-sm font-bold text-gray-800">
              Alternative Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="EmailAlt"
              name="EmailAlt"
              maxLength={200}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="backup@email.com"
            />
          </div>

          <div className="space-y-2 p-5 border border-dashed border-[#9b1d20]/30 rounded-xl bg-[#9b1d20]/5">
            <div className="mb-2">
              <label htmlFor="PaymentProofUpload" className="text-sm font-bold text-[#9b1d20] block">
                Payment Proof Upload <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-gray-600 font-medium">
                Please include your receipt for registration as participant or presenter (Allowed: PDF/JPG/PNG)
              </span>
            </div>
            <div className="relative">
              <input
                type="file"
                id="PaymentProofUpload"
                name="PaymentProofUpload"
                accept=".pdf,.png,.jpg,.jpeg"
                required
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9b1d20]/10 file:text-[#9b1d20] hover:file:bg-[#9b1d20]/20 transition-all cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <label htmlFor="Affiliation" className="text-sm font-bold text-gray-800">
              Affiliation (LUC/Other) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="Affiliation"
              name="Affiliation"
              maxLength={300}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="E.g., Lincoln University College"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="Email" className="text-sm font-bold text-gray-800">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              maxLength={200}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="primary@email.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="MobileNo" className="text-sm font-bold text-gray-800">
              Mobile No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="MobileNo"
              name="MobileNo"
              maxLength={50}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="+60 12-345 6789"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-800">
              I will be attending the conference <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-6 items-center">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="AttendanceMode"
                  value="Physically"
                  required
                  className="w-4 h-4 text-[#9b1d20] focus:ring-[#9b1d20] border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Physically
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="AttendanceMode"
                  value="Online"
                  required
                  className="w-4 h-4 text-[#9b1d20] focus:ring-[#9b1d20] border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Online
                </span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="AbstractTitle" className="text-sm font-bold text-gray-800">
              Title of Abstract <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              id="AbstractTitle"
              name="AbstractTitle"
              maxLength={300}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="If applicable"
            />
          </div>

          <div className="pt-6 text-right md:col-span-2 md:text-right">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto min-w-[200px] justify-center gap-2"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Submitting..." : (
                <>
                  Submit Form
                  <Send size={18} />
                </>
              )}
            </Button>
          </div>
          
        </div>
      </div>
    </form>
  );
};
