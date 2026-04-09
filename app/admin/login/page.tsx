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

      <div className="w-full max-w-[1100px] bg-white rounded-[3rem] shadow-2xl border border-gray-100/50 flex flex-col md:flex-row overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side - Visual Branding */}
        <div className="hidden md:flex md:w-[45%] bg-[#9b1d20] relative p-16 flex-col justify-between overflow-hidden group">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
             <Layout className="w-[800px] h-[800px] text-white rotate-12 -translate-x-1/2 -translate-y-1/2 absolute" />
           </div>
           
           <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 group/home">
                <div className="bg-white p-2.5 rounded-2xl group-hover/home:scale-110 transition-transform shadow-lg">
                  <div className="w-6 h-6 flex items-center justify-center text-[#9b1d20] font-black text-xl">C</div>
                </div>
                <div className="text-white">
                  <h1 className="text-2xl font-bold tracking-tight">ConferenceOS</h1>
                  <p className="text-[10px] text-red-200 mt-0.5 uppercase tracking-widest font-black leading-none">Official Control Center</p>
                </div>
              </Link>
           </div>

           <div className="relative z-10 space-y-8 mt-20">
              <div className="space-y-4">
                 <div className="px-5 py-2.5 bg-white/10 rounded-full border border-white/20 w-fit backdrop-blur-md">
                   <p className="text-[10px] font-black text-white uppercase tracking-[0.25em]">Admin Portal v2026</p>
                 </div>
                 <h2 className="text-4xl text-white font-black tracking-tight leading-[1.1]">
                   Managing the Future of <span className="text-red-200">Global Engineering</span>
                 </h2>
              </div>
              <p className="text-base text-red-100 mt-6 leading-relaxed opacity-80 max-w-sm">
                Secure gateway for authorized administrative staff only. Manage ICETMTSHS 2026 registrations, gallery, and core content settings.
              </p>
           </div>

           <div className="relative z-10 mt-auto pt-10 flex items-center gap-4 text-xs font-bold text-red-200">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                <ShieldCheck className="w-5 h-5 text-white" />
             </div>
             <div>
               <p className="text-white font-black uppercase tracking-widest">End-to-End Encrypted</p>
               <p className="opacity-60">Session validation enabled</p>
             </div>
           </div>
        </div>

        {/* Right Side - Form Control */}
        <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center">
           <div className="mb-12 space-y-4">
              <div className="w-16 h-1 bg-[#9b1d20] rounded-full mb-8 group-hover:w-24 transition-all duration-700" />
              <h3 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {view === "login" ? "System Authentication" : "Administrator Hub Enrollment"}
              </h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] leading-relaxed">
                {view === "login" ? "Authorized Personnel Only — Enter Credentials" : "Create your administrative workstation profile"}
              </p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <div className="p-5 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <p className="text-sm font-bold text-red-700">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-3xl flex items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-bold text-emerald-800">{message}</p>
                </div>
              )}

              <div className="space-y-6">
                {view === "signup" && (
                   <div className="space-y-3 group/field">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] pl-1 group-focus-within/field:text-[#9b1d20] transition-colors">
                        Security Clearance Name
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors" />
                        </div>
                        <input
                          name="fullName"
                          type="text"
                          required
                          className="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 focus:bg-white transition-all duration-300"
                          placeholder="Your Full Name"
                        />
                      </div>
                   </div>
                )}

                <div className="space-y-3 group/field">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] pl-1 group-focus-within/field:text-[#9b1d20] transition-colors">
                    Administrative Email Identity
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors" />
                    </div>
                    <input
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 focus:bg-white transition-all duration-300"
                      placeholder="admin@conference.com"
                    />
                  </div>
                </div>

                <div className="space-y-3 group/field">
                  <div className="flex items-center justify-between px-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] group-focus-within/field:text-[#9b1d20] transition-colors">
                      Secret Access Key phrase
                    </label>
                    {view === "login" && (
                       <Link href="#" className="text-[10px] font-black text-[#9b1d20] uppercase tracking-widest hover:underline underline-offset-4">
                         Recover Access
                       </Link>
                    )}
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors" />
                    </div>
                    <input
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 focus:bg-white transition-all duration-300"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center p-5 bg-[#9b1d20] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
              >
                {loading ? (
                   <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {view === "login" ? "Verify Identity" : "Launch Enrollment"}
                    <ArrowRight className="w-4 h-4 ml-3 group-hover/btn:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>

              <div className="pt-8 border-t border-gray-50 flex items-center justify-center">
                 <button 
                   type="button"
                   onClick={() => setView(view === "login" ? "signup" : "login")}
                   className="flex items-center gap-2 group/switch text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 hover:text-[#9b1d20] transition-colors"
                 >
                    {view === "login" ? (
                      <>
                        <ShieldCheck className="w-4 h-4 group-hover/switch:scale-110 transition-transform" />
                        No authorization code? <span className="text-[#9b1d20] font-black">Request Enrollment</span>
                      </>
                    ) : (
                      <>
                        <ChevronLeft className="w-4 h-4 group-hover/switch:-translate-x-1 transition-transform" />
                        Already have Clearance? <span className="text-[#9b1d20] font-black">Sign Back In</span>
                      </>
                    )}
                 </button>
              </div>
           </form>
        </div>
      </div>
          
      {/* Footer Branding */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-40">
         <Image src="https://icetmtshs.lincoln.edu.my/wp-content/uploads/2026/01/Logo-2026.png" alt="Lincoln" width={120} height={40} className="grayscale brightness-0" unoptimized />
         <div className="w-px h-6 bg-gray-300" />
         <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">© 2026 Conference Hub • Lincoln University College</p>
      </div>
    </div>
  );
}
