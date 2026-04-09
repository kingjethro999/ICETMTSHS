"use client";

import React, { useState } from "react";
import { Loader2, Globe, Activity, ShieldCheck, Mail, Calendar, HelpCircle, Layout } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/supabase/client";

interface SystemToggleProps {
  initialRegistrationActive: boolean;
  initialMaintenanceMode: boolean;
}

export function SystemToggles({ initialRegistrationActive, initialMaintenanceMode }: SystemToggleProps) {
  const [regActive, setRegActive] = useState(initialRegistrationActive);
  const [maintMode, setMaintMode] = useState(initialMaintenanceMode);
  const [loading, setLoading] = useState<string | null>(null);

  const supabase = createClient();

  const handleToggle = async (key: string, value: boolean, setter: (v: boolean) => void) => {
    setLoading(key);
    try {
      const { error } = await supabase
        .from("conference_settings")
        .upsert({ key, value: JSON.stringify(value) }, { onConflict: "key" });
      
      if (!error) setter(value);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
     <div className="lg:col-span-4 space-y-8 animate-in slide-in-from-right-4 duration-1000 delay-200">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10 group/pod relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5 group-hover/pod:opacity-10 transition-opacity">
              <Activity className="w-24 h-24 text-[#9b1d20]" />
           </div>
           
           <div className="space-y-2 border-l-4 border-[#9b1d20] pl-6">
              <h3 className="text-xl font-black text-gray-900 leading-none">System Controls</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Active Site Configuration</p>
           </div>
           
           <div className="space-y-6">
              <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 flex items-center justify-between group/row hover:bg-white hover:shadow-lg transition-all duration-300">
                 <div className="space-y-1">
                    <p className="text-xs font-black text-gray-900 group-hover/row:text-[#9b1d20] transition-colors">Registration Site</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Turn on/off all forms</p>
                 </div>
                 <button 
                  onClick={() => handleToggle('registration_active', !regActive, setRegActive)}
                  disabled={loading === 'registration_active'}
                  className={cn(
                    "w-14 h-8 rounded-full p-1 transition-all duration-500 shadow-inner relative flex items-center",
                    regActive ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "bg-gray-200"
                  )}
                 >
                    {loading === 'registration_active' ? (
                       <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                    ) : (
                      <div className={cn(
                        "w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform",
                        regActive ? "translate-x-6" : "translate-x-0"
                      )} />
                    )}
                 </button>
              </div>

              <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 flex items-center justify-between group/row hover:bg-white hover:shadow-lg transition-all duration-300">
                 <div className="space-y-1">
                    <p className="text-xs font-black text-gray-900 group-hover/row:text-[#9b1d20] transition-colors">Maintenance Mode</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Lock dashboard for users</p>
                 </div>
                 <button 
                  onClick={() => handleToggle('maintenance_mode', !maintMode, setMaintMode)}
                  disabled={loading === 'maintenance_mode'}
                  className={cn(
                    "w-14 h-8 rounded-full p-1 transition-all duration-500 shadow-inner relative flex items-center",
                    maintMode ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]" : "bg-gray-200"
                  )}
                 >
                    {loading === 'maintenance_mode' ? (
                       <Loader2 className="w-4 h-4 animate-spin text-white mx-auto" />
                    ) : (
                      <div className={cn(
                        "w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-500 transform",
                        maintMode ? "translate-x-6" : "translate-x-0"
                      )} />
                    )}
                 </button>
              </div>
           </div>

           <div className="pt-4 border-t border-gray-50 flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
             <ShieldCheck className="w-4 h-4 text-[#9b1d20]" />
             Admin privileges verified for session
           </div>
        </div>

        {/* Support Card */}
        <div className="bg-[#9b1d20] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-red-900/30 group/support relative overflow-hidden">
           <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-3xl animate-pulse" />
           <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-200 mb-6 flex items-center gap-3">
              <Calendar className="w-4 h-4" />
              Deployment Support
           </p>
           <h4 className="text-xl font-black mb-4 leading-tight group-hover:translate-x-2 transition-transform">Need Assistance with Conference Setup?</h4>
           <p className="text-sm font-bold text-red-100/70 mb-8 leading-relaxed">Contact the system architect for database migration or custom form logic.</p>
           <button className="w-full py-4 bg-white text-[#9b1d20] rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all">
             Open Documentation
           </button>
        </div>
     </div>
  );
}
