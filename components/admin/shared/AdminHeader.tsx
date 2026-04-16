"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, User, Key, Settings, CreditCard, LogOut, ShieldCheck, Mail, Calendar, HelpCircle, Activity, Layout, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { signOut } from "@/app/admin/actions";

export function AdminHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format breadcrumb based on URL
  const pathParts = pathname.split('/').filter(Boolean);
  const pageTitle = pathParts[pathParts.length - 1] === 'admin' 
    ? 'Dashboard' 
    : pathParts[pathParts.length - 1].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return (
    <header className={cn(
      "h-20 lg:h-24 sticky top-0 bg-white border-b border-gray-100 flex items-center justify-between px-8 z-10 transition-all duration-300",
      scrolled && "shadow-md h-18 lg:h-20 backdrop-blur-md bg-white/90"
    )}>
      {/* Search & Breadcrumb Area */}
      <div className="flex items-center gap-10 w-full lg:w-auto">
        <div className="hidden lg:flex items-center gap-3">
          <div className="p-2 bg-red-50 text-[#9b1d20] rounded-xl shadow-sm border border-red-100/50">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-gray-400">ICSHSM 2026 Panel</span>
              <div className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#9b1d20]">Official Admin Control</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold tracking-tight text-gray-900 group flex items-center gap-2">
              {pageTitle}
              <div className="h-1.5 w-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            </h2>
          </div>
        </div>

        {/* Universal Search Pod */}
        <div className="relative group flex-1 lg:w-96">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors duration-200" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 focus:bg-white transition-all duration-300"
            placeholder="Search documents, IDs, tags..."
          />
        </div>
      </div>

      {/* Right Side - Actions & Profile */}
      <div className="flex items-center gap-4">


        {/* Profile Integrated Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={cn(
              "flex items-center gap-3 pl-3 pr-4 py-2 rounded-2xl transition-all duration-300 border border-transparent",
              isDropdownOpen ? "bg-white shadow-xl border-gray-100 ring-4 ring-gray-50 Scale-102" : "hover:bg-gray-50 hover:shadow-sm"
            )}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9b1d20] to-[#cb2226] border-2 border-white shadow-md flex items-center justify-center font-bold text-white text-xs overflow-hidden">
                <ShieldCheck className="w-5 h-5 opacity-40 absolute" />
                AD
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm" />
            </div>
            
            <div className="hidden sm:block text-left mr-2">
              <p className="text-sm font-bold text-gray-900 leading-none">Super Admin</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wide">Main Server</p>
            </div>
            <ChevronRight className={cn("w-4 h-4 text-gray-300 transition-transform duration-300", isDropdownOpen ? "rotate-90 text-[#9b1d20]" : "")} />
          </button>

          {isDropdownOpen && (
             <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-2xl border border-gray-50 p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
               <div className="p-4 bg-gray-50 rounded-2xl mb-2 flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-red-100 text-[#9b1d20] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
                   A
                 </div>
                 <div>
                   <p className="font-bold text-gray-900 leading-tight">Administrator</p>
                   <p className="text-xs text-gray-500 truncate w-40 font-medium">chimezietchris@gmail.com</p>
                 </div>
               </div>
               
               <div className="space-y-1">
                 {[
                   { icon: User, label: "My Profile", color: "text-blue-500" },
                   { icon: Key, label: "Api Credentials", color: "text-amber-500" },
                   { icon: ShieldCheck, label: "Security Audit", color: "text-green-500" },
                   { icon: HelpCircle, label: "Developer Docs", color: "text-purple-500" }
                 ].map((item) => (
                    <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors group">
                      <item.icon className={cn("w-4 h-4 group-hover:scale-110 transition-transform", item.color)} />
                      {item.label}
                    </button>
                 ))}
               </div>
               
               <div className="h-px bg-gray-100 my-2 mx-2" />
               
               <button 
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-sm font-bold text-red-600 group transition-colors"
               >
                 <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                 Sign Out Session
               </button>
             </div>
          )}
        </div>
      </div>
    </header>
  );
}
