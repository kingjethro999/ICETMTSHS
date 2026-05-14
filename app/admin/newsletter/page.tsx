import React from "react";
import {
  Mail,
  Send,
  Users,
  History,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { NewsletterForm } from "@/components/admin/features/NewsletterForm";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function NewsletterPage() {
  // Verify auth directly in the page component to avoid double auth checks
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  // Fetch subscribers directly without going through checkAuth
  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  const subscriberCount = subscribers?.length || 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Newsletter Center
          </h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest leading-relaxed">
            Broadcast updates to all conference subscribers
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
            <Users className="w-5 h-5 text-[#9b1d20]" />
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">
                Subscribers
              </p>
              <p className="text-lg font-black text-gray-900 mt-1">
                {subscriberCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <NewsletterForm />
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 pb-4 flex items-center gap-2">
              <History className="w-3 h-3" /> Broadcast History
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-black text-gray-900">
                  Welcome to ICSHSM 2026
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                  Sent to 42 people • 2 days ago
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-xs font-black text-gray-900">
                  Abstract Deadline Reminder
                </p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">
                  Sent to 38 people • 1 week ago
                </p>
              </div>
            </div>
            <button className="w-full py-4 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-[#9b1d20] transition-colors">
              View All History
            </button>
          </div>

          <div className="bg-[#9b1d20] rounded-[2.5rem] p-8 text-white shadow-xl shadow-red-900/20 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="p-3 bg-white/10 rounded-xl w-fit mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black leading-tight">
                Pro Mailing Tip
              </h3>
              <p className="text-sm font-medium text-red-100/70 mt-3 leading-relaxed">
                Personalize your subject lines to increase open rates by up to
                25%. Ensure your content is concise and valuable.
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
