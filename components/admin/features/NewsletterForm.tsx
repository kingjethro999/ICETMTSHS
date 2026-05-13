"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Mail, Type, AlignLeft } from "lucide-react";
import { sendNewsletterToAll } from "@/lib/actions/admin";

export function NewsletterForm() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !content) {
      setStatus("error");
      setMessage("Please fill in both subject and content.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const result = await sendNewsletterToAll(subject, content);
      if (result.success) {
        setStatus("success");
        setCount(result.count || 0);
        setSubject("");
        setContent("");
      } else {
        setStatus("error");
        setMessage(result.error || "Failed to send newsletter.");
      }
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 rounded-[2.5rem] p-12 text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-emerald-900 tracking-tight">Newsletter Transmitted!</h3>
          <p className="text-sm font-bold text-emerald-700/60 mt-2 uppercase tracking-widest">
            Successfully sent to {count} subscribers
          </p>
        </div>
        <button 
          onClick={() => setStatus("idle")}
          className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:scale-105 transition-all"
        >
          Send Another Update
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12 space-y-10 group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-700">
      <div className="flex items-center gap-5 border-b border-gray-50 pb-8">
        <div className="p-4 bg-red-50 text-[#9b1d20] rounded-2xl shadow-inner">
          <Mail className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 leading-tight">Compose Broadcast</h2>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Write your message for the conference community</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
             <Type className="w-3 h-3" /> Subject Line
          </label>
          <input 
            type="text" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Important Update: Abstract Submission Deadline Extended"
            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 shadow-inner transition-all" 
            disabled={status === "loading"}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
             <AlignLeft className="w-3 h-3" /> Email Content (Plain Text/Basic HTML)
          </label>
          <textarea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Dear Subscribers, we are pleased to announce..."
            className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 shadow-inner transition-all resize-none" 
            disabled={status === "loading"}
          />
        </div>

        {status === "error" && (
          <div className="p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in slide-in-from-top-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {message}
          </div>
        )}

        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest max-w-[200px]">
              This will be sent to all active subscribers instantly.
           </p>
           <button 
             type="submit"
             disabled={status === "loading"}
             className="px-10 py-4 bg-[#9b1d20] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
           >
             {status === "loading" ? (
               <>
                 <Loader2 className="w-4 h-4 animate-spin" />
                 Transmitting...
               </>
             ) : (
               <>
                 <Send className="w-4 h-4" />
                 Send Newsletter
               </>
             )}
           </button>
        </div>
      </form>
    </div>
  );
}
