"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { submitContactForm } from "@/lib/actions/public";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    
    const data = new FormData(e.currentTarget);
    const result = await submitContactForm(data);
    
    if (result.success) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50">
      <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Send us a message</h3>
      <p className="text-gray-400 text-sm font-medium mb-8 uppercase tracking-widest">Typical response time: 24h</p>
      
      {status === "success" && (
        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-5 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          Thank you! Your message has been received successfully.
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-50 border border-red-100 text-red-800 p-5 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5 text-red-500" />
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#9b1d20]/10 focus:border-[#9b1d20] transition-all font-bold text-sm"
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#9b1d20]/10 focus:border-[#9b1d20] transition-all font-bold text-sm"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#9b1d20]/10 focus:border-[#9b1d20] transition-all font-bold text-sm"
            placeholder="What is this about?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#9b1d20]/10 focus:border-[#9b1d20] transition-all resize-none font-bold text-sm"
            placeholder="Your message here..."
          />
        </div>

        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full justify-center gap-3 py-6 rounded-2xl bg-[#9b1d20] hover:bg-[#80181a] shadow-xl shadow-red-900/10 font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          {status === "loading" ? "Transmitting..." : (
            <>
              Submit Inquiry
              <Send size={16} />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};
