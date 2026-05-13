"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { submitRegistration } from "@/lib/actions/public";

export const ParticipantRegistrationForm: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<{ id?: string, payment?: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'id' | 'payment') => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFiles(prev => ({ ...prev, [type]: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append("SubmissionType", "Participant");
    formData.append("AttendanceMode", "Online"); // Auto-set for virtual conference

    const result = await submitRegistration(formData);
    
    if (result.success) {
      setStatus("success");
    } else {
      setErrorMessage(result.error || "Submission failed. Please check your data.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 text-emerald-800 p-12 rounded-3xl border border-emerald-100 text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-3xl font-black mb-2 tracking-tight">Registration Submitted!</h3>
        <p className="max-w-md mx-auto text-sm font-medium leading-relaxed opacity-80">
          Thank you for registering. We will review your payment proof and send a confirmation email shortly.
        </p>
        <Button 
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl transition-all hover:scale-105" 
          variant="secondary" 
          onClick={() => {
            setStatus("idle");
            setSelectedFiles({});
          }}
        >
          Submit another registration
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {status === "error" && (
        <div className="bg-red-50 border border-red-100 text-red-800 p-5 rounded-2xl mb-8 flex items-center gap-4 animate-in slide-in-from-top-4">
          <AlertCircle className="w-6 h-6 text-red-500" />
          <div>
            <p className="font-black text-xs uppercase tracking-widest">Submission Error</p>
            <p className="text-sm font-bold opacity-80">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* ── Payment Guide for Lazy Users ── */}
      <div className="mb-10 bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#9b1d20] mb-6 flex items-center gap-2">
          Registration Protocol
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
          <div className="flex flex-col gap-2">
            <span className="w-6 h-6 rounded-full bg-[#9b1d20] text-white flex items-center justify-center font-black text-xs">1</span>
            <span className="font-bold text-gray-900">TRANSFER</span>
            <span className="text-gray-500 text-xs">Pay registration fee to the official Zenith Bank account.</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-xs">2</span>
            <span className="font-bold text-gray-900">CAPTURE</span>
            <span className="text-gray-500 text-xs">Take a screenshot or photo of your successful payment receipt.</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-xs">3</span>
            <span className="font-bold text-gray-900">REGISTER</span>
            <span className="text-gray-500 text-xs">Upload the receipt below and complete this form.</span>
          </div>
        </div>
        
        <div className="bg-[#9b1d20] text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden group/card max-w-lg mx-auto">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover/card:bg-white/20 transition-all duration-700" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Official Payment Account</p>
           <h3 className="text-xl font-black mb-4 tracking-tight">Zenith Bank</h3>
           <div className="space-y-3">
              <div className="flex justify-between items-center opacity-80 pb-2 border-b border-white/10">
                 <span className="text-[10px] font-bold uppercase opacity-60">Account Name</span>
                 <span className="font-black text-sm uppercase">Lincoln R&D Business LTD</span>
              </div>
               <button 
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText("1311031521");
                  const btn = document.getElementById('copy-btn-reg');
                  if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = 'COPIED!';
                    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
                  }
                }}
                className="w-full flex justify-between items-center bg-white/10 p-3 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all active:scale-[0.98] group/btn"
              >
                 <div className="text-left">
                   <span className="text-[10px] font-bold uppercase opacity-60 block">Account Number</span>
                   <span className="text-xl font-black tracking-tighter">1311031521</span>
                 </div>
                 <div id="copy-btn-reg" className="bg-white/10 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all group-hover/btn:bg-white group-hover/btn:text-[#9b1d20]">
                    Copy
                 </div>
              </button>
           </div>
        </div>
      </div>

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

          <div className="space-y-2">
            <label htmlFor="EmailAlt" className="text-sm font-bold text-gray-800">
              Alternative Email <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="email"
              id="EmailAlt"
              name="EmailAlt"
              maxLength={200}
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
                onChange={(e) => handleFileChange(e, 'payment')}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#9b1d20]/10 file:text-[#9b1d20] hover:file:bg-[#9b1d20]/20 transition-all cursor-pointer"
              />
              {selectedFiles.payment && (
                <div className="mt-2 flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest">
                  <CheckCircle2 className="w-3 h-3" />
                  {selectedFiles.payment}
                </div>
              )}
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
              Mobile No (Contact Number) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="MobileNo"
              name="MobileNo"
              maxLength={50}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1d20]/20 focus:border-[#9b1d20] transition-all"
              placeholder="+234 ..."
            />
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
