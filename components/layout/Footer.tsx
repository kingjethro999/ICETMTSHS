"use client"
import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Phone, Printer, Mail, MapPin, Smartphone } from "lucide-react";

import { subscribeToNewsletter } from "@/lib/actions/public";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus("success");
      setMessage("Thank you! You've been subscribed.");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
      setMessage(result.error || "Failed to subscribe.");
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Conference Info */}
          <div className="space-y-4 lg:col-span-1">
            {/* Logo */}
            <div className="mb-3">
              <h2 className="text-2xl font-black text-[#9b1d20] tracking-tighter italic">ICSHSM 2026</h2>
            </div>
            <h3 className="text-red-900 font-bold text-sm leading-snug">
              1st International Conference on Sustainable Healthcare and Health Systems Management
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">
              &copy; 2026 ICSHSM. Organized by Lincoln University College Nigeria.
            </p>
          </div>

          {/* Contact Persons */}
          <div className="space-y-4">
            <h4 className="text-red-900 font-bold text-xs tracking-widest uppercase">
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm font-medium">
                Prof. Dr. Idris A. Ahmed
              </li>
            </ul>
            <div className="pt-1 space-y-2">
              <div className="flex items-start gap-2 text-gray-500 text-xs">
                <MapPin size={13} className="mt-0.5 flex-shrink-0 text-red-900" />
                <span className="leading-relaxed">
                  Lincoln University College Nigeria
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Mail size={13} className="flex-shrink-0 text-[#9b1d20]" />
                <a
                  href="mailto:info@icshsm.org"
                  className="hover:text-[#9b1d20] transition-colors duration-200"
                >
                  info@icshsm.org
                </a>
              </div>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="space-y-4">
            <h4 className="text-red-900 font-bold text-xs tracking-widest uppercase">
              Get In Touch
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-gray-500 text-xs">
                <Phone size={13} className="flex-shrink-0 text-[#9b1d20]" />
                <span>Contact via Lincoln University College Nigeria</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500 text-xs">
                <Mail size={13} className="flex-shrink-0 text-[#9b1d20]" />
                <a
                  href="mailto:info@icshsm.org"
                  className="hover:text-[#9b1d20] transition-colors duration-200"
                >
                  info@icshsm.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-red-900 font-bold text-xs tracking-widest uppercase">
              Newsletter
            </h4>
            <p className="text-gray-500 text-xs leading-relaxed">
                Stay updated with the latest news and announcements from ICSHSM 2026.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-2.5 pr-12 text-sm text-gray-700 bg-gray-50 border-none rounded-sm focus:outline-none focus:ring-2 focus:ring-red-900/20 shadow-inner transition-all duration-200"
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1 top-1 bottom-1 bg-red-900 hover:bg-red-800 text-white px-3 rounded-sm transition-colors duration-200 flex items-center justify-center disabled:opacity-50"
                aria-label="Subscribe"
              >
                {status === "loading" ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              </button>
            </form>

            {message && (
              <p className={`text-[10px] font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-1 ${status === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            {/* Policies */}
            <div className="pt-2">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {["Privacy Policy", "Terms of Use", "DPO Contact"].map((policy) => (
                  <li key={policy}>
                    <a
                      href="#"
                      className="text-gray-400 text-xs hover:text-red-900 transition-colors duration-200"
                    >
                      {policy}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
