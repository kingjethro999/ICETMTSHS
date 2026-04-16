"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitRegistration } from "@/lib/actions/public";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  affiliation: string;
  abstractTitle: string;
  mobileNo: string;
  attendingAs: string;
}

export const SubmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    affiliation: "",
    abstractTitle: "",
    mobileNo: "",
    attendingAs: "Oral Presenter",
  });

  const [files, setFiles] = useState<{
    abstract?: File;
  }>({});

  const [errors, setErrors] = useState<Partial<Record<keyof FormData | "abstract", string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: uploadedFiles } = e.target;
    if (uploadedFiles?.[0]) {
      setFiles((prev) => ({ ...prev, abstract: uploadedFiles[0] }));
      if (name === "AbstractUpload") {
        setErrors((prev) => ({ ...prev, abstract: undefined }));
      }
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData | "abstract", string>> = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.affiliation) newErrors.affiliation = "Affiliation is required";
    if (!formData.abstractTitle) newErrors.abstractTitle = "Abstract Title is required";
    if (!formData.mobileNo) newErrors.mobileNo = "Mobile No. is required";
    if (!files.abstract) newErrors.abstract = "Please upload your abstract file";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    
    if (validate()) {
      setStatus("loading");
      const formDataToSend = new FormData(e.currentTarget);
      formDataToSend.append("SubmissionType", "Presenter");
      
      // Map component field names to what server action expects
      formDataToSend.set("FullName", formData.fullName);
      formDataToSend.set("Email", formData.email);
      formDataToSend.set("Affiliation", formData.affiliation);
      formDataToSend.set("AbstractTitle", formData.abstractTitle);
      formDataToSend.set("MobileNo", formData.mobileNo);
      formDataToSend.set("AttendanceMode", "Online"); // Auto-set for virtual conference
      
      // Files are already in the form since they are input type="file"
      
      const result = await submitRegistration(formDataToSend);
      
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit abstract");
      }
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-12 rounded-3xl border border-emerald-100 text-center space-y-6 mt-12 animate-in zoom-in-95 duration-500">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-black mb-2 tracking-tight">Abstract Submitted Successfully!</h3>
        <p className="max-w-md mx-auto text-sm font-medium leading-relaxed">
          Your abstract has been queued for peer review. You will receive an email confirmation shortly.
        </p>
        <Button 
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-2xl" 
          onClick={() => setStatus("idle")}
        >
          Submit Another Abstract
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-[#9b1d20]">
        Submit Your Abstract:
      </h3>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] outline-none transition-all"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] outline-none transition-all"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] outline-none transition-all"
                />
                {errors.mobileNo && <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>}
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Affiliation (LUC /Other) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] outline-none transition-all"
                />
                {errors.affiliation && <p className="text-red-500 text-xs mt-1">{errors.affiliation}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Abstract Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="abstractTitle"
                  value={formData.abstractTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] outline-none transition-all"
                />
                {errors.abstractTitle && <p className="text-red-500 text-xs mt-1">{errors.abstractTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload your abstract here <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="AbstractUpload"
                  onChange={handleFileChange}
                  accept=".doc,.docx"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[#9b1d20] hover:file:bg-red-100 transition-all cursor-pointer"
                />
                {errors.abstract && <p className="text-red-500 text-xs mt-1">{errors.abstract}</p>}
              </div>
            </div>
          </div>

          <hr className="my-8 border-gray-100" />

          <div className="bg-red-50/50 p-4 rounded-lg border border-red-100">
            <div className="text-[#9b1d20] font-bold mb-2 flex items-center gap-2">
              Note<span className="text-red-500">*</span>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed space-y-1">
              <p>Your abstract will undergo a double-blind peer review by the conference committee within two weeks from its receipt.</p>
              <p>Please make sure you complete the abstract using the template as provided on the website (Template).</p>
              <p className="font-semibold text-[#9b1d20]">Only Microsoft Word (.doc, .docx) file types are allowed to be uploaded.</p>
            </div>
          </div>

          {status === "error" && (
             <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-bold animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {errorMessage}
             </div>
          )}

          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              disabled={status === "loading"}
              className="px-10 py-4 rounded-full bg-[#9b1d20] hover:bg-[#7a1719] text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-950/10 hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {status === "loading" ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Transmitting...
                </div>
              ) : "Submit Abstract"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
