"use client";

import React, { useState } from "react";
import { login, signup } from "../actions";
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Layout, 
  Loader2, 
  AlertCircle, 
  CheckCircle2,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [view, setView] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = view === "login" ? await login(formData) : await signup(formData);

    if (result && 'error' in result && result.error) {
      setError(result.error);
      setLoading(false);
    } else if (result && 'success' in result && result.success) {
      setMessage(result.success as string);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#9b1d20]/5 rounded-full blur-[120px] animate-pulse duration-[8000ms]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#9b1d20]/3 rounded-full blur-[100px] animate-pulse duration-[6000ms] delay-1000" />
         
         {/* Subtle Grid Pattern */}
         <div 
           className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#9b1d20 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
         />
      </div>

      <div className="w-full max-w-[850px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100/50 flex flex-col md:flex-row overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700 scale-[0.9] lg:scale-100">
        
         {/* Left Side - Visual Branding */}
        <div className="hidden md:flex md:w-[45%] bg-[#9b1d20] relative p-10 flex-col justify-between overflow-hidden group">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Layout className="w-[600px] h-[600px] text-white rotate-12 -translate-x-1/2 -translate-y-1/2 absolute" />
           </div>
           
           <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 group/home">
                <div className="bg-white p-2 rounded-2xl group-hover/home:scale-110 transition-transform shadow-lg">
                  <div className="w-5 h-5 flex items-center justify-center text-[#9b1d20] font-black text-xl">C</div>
                </div>
                <div className="text-white">
                  <h1 className="text-xl font-bold tracking-tight">ConferenceOS</h1>
                  <p className="text-[9px] text-red-200 mt-0.5 uppercase tracking-widest font-black leading-none">Admin Panel</p>
                </div>
              </Link>
           </div>

           <div className="relative z-10 space-y-4 mt-10">
              <div className="space-y-3">
                 <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20 w-fit backdrop-blur-md">
                   <p className="text-[9px] font-black text-white uppercase tracking-[0.25em]">Admin Portal v2026</p>
                 </div>
                 <h2 className="text-3xl text-white font-black tracking-tight leading-[1.1]">
                   Sustainable <span className="text-red-200">Healthcare</span>
                 </h2>
              </div>
              <p className="text-sm text-red-100 leading-relaxed opacity-80 max-w-sm">
                Secure gateway for authorized administrative staff only. Manage ICSHSM 2026 registrations, gallery, and core settings.
              </p>
           </div>

           <div className="relative z-10 mt-auto pt-6 flex items-center gap-3 text-xs font-bold text-red-200">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                 <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-black uppercase tracking-widest text-[9px]">End-to-End Encrypted</p>
                <p className="opacity-60 text-[8px]">Session validation enabled</p>
              </div>
           </div>
        </div>

        {/* Right Side - Form Control */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
           <div className="mb-8 space-y-2">
              <div className="w-12 h-1 bg-[#9b1d20] rounded-full mb-4" />
              <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                {view === "login" ? "Authentication" : "Enrollment"}
              </h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px] leading-relaxed">
                {view === "login" ? "Authorized Personnel Only" : "Create administrative workstation"}
              </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <p className="text-[11px] font-bold text-red-700">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <p className="text-[11px] font-bold text-emerald-800">{message}</p>
                </div>
              )}

              <div className="space-y-4">
                {view === "signup" && (
                   <div className="space-y-2 group/field">
                      <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                        Clearance Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                          <User className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                        <input
                          name="fullName"
                          type="text"
                          required
                          className="block w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[1rem] text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:bg-white transition-all"
                          placeholder="Your Full Name"
                        />
                      </div>
                   </div>
                )}

                <div className="space-y-2 group/field">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                    Email Identity
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[1rem] text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:bg-white transition-all"
                      placeholder="admin@conference.com"
                    />
                  </div>
                </div>

                <div className="space-y-2 group/field">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                      Access Key
                    </label>
                    {view === "login" && (
                       <Link href="#" className="text-[9px] font-black text-[#9b1d20] uppercase tracking-widest hover:underline">
                         Recover
                       </Link>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Lock className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-gray-100 rounded-[1rem] text-[13px] font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:bg-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center p-4 bg-[#9b1d20] text-white rounded-[1rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-red-900/10 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-70 group/btn"
              >
                {loading ? (
                   <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {view === "login" ? "Verify Identity" : "Launch Enrollment"}
                    <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-4 border-t border-gray-50 flex items-center justify-center">
                 <button 
                   type="button"
                   onClick={() => setView(view === "login" ? "signup" : "login")}
                   className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-[#9b1d20] transition-colors"
                 >
                    {view === "login" ? "Request Enrollment" : "Sign Back In"}
                 </button>
              </div>
           </form>
        </div>
      </div>
          
      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-40">
         <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">© 2026 ICSHSM • Lincoln University College, Nigeria</p>
      </div>
    </div>
  );
}
