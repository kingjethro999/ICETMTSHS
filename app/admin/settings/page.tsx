import React from "react";
import { Settings, Shield, Globe, Mail, CreditCard, Bell, Key, Database, Layout, Smartphone, Lock, Eye, Save, Trash2, History, Info, ChevronRight, Activity, Calendar, MapPin, Building2, UserCircle, Users2, Workflow, Terminal, Sparkles, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest leading-relaxed">Configure global parameters and administrative access</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-8 py-4 bg-[#9b1d20] text-white rounded-2xl font-bold text-sm shadow-xl shadow-red-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 group">
             <Save className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
             Save Global Config
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
         <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-4 overflow-hidden">
               <h3 className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 mb-4 flex items-center gap-2">
                 <Terminal className="w-3 h-3" /> Configuration Domains
               </h3>
               <div className="space-y-1">
                 {[
                   { label: "General Config", icon: Globe, active: true },
                   { label: "Administrative Roles", icon: Shield, active: false },
                   { label: "SMTP & Notifications", icon: Mail, active: false },
                   { label: "Payment Gateway", icon: CreditCard, active: false },
                   { label: "Security & API", icon: Lock, active: false },
                   { label: "Data Management", icon: Database, active: false }
                 ].map((item) => (
                    <button key={item.label} className={cn(
                      "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                      item.active ? "bg-red-50 text-[#9b1d20]" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                    )}>
                      <div className="flex items-center gap-4">
                         <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", item.active ? "text-[#9b1d20]" : "text-gray-300")} />
                         <span className="text-sm font-bold tracking-tight">{item.label}</span>
                      </div>
                      {item.active && <ChevronRight className="w-4 h-4 opacity-50" />}
                    </button>
                 ))}
               </div>
               
               <div className="mt-8 p-6 bg-gray-50 rounded-3xl mx-2 border border-gray-100 mb-2">
                  <div className="flex items-center gap-2 mb-4">
                     <Activity className="w-4 h-4 text-[#9b1d20]" />
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">System Activity Status</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                       <span className="text-xs font-bold text-gray-400">Main Server</span>
                       <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                       <span className="text-xs font-bold text-gray-400">Storage API</span>
                       <span className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12 space-y-12 flex flex-col group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-700">
               <div className="flex items-center justify-between border-b border-gray-50 pb-8 group-hover:pb-10 transition-all duration-700">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner border border-blue-100/50">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 leading-tight">General Global Configuration</h2>
                      <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest scale-x-90 origin-left">Basic settings for the ICETMTSHS platform</p>
                    </div>
                  </div>
                  <span className="px-5 py-2 bg-red-50 text-[#9b1d20] rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100 shadow-sm">Updated Today</span>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                           <Layout className="w-3 h-3" /> Event Full Title
                        </label>
                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 transition-all" defaultValue="ICETMTSHS 2026 at Lincoln University" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                           <Calendar className="w-3 h-3" /> Event Main Date
                        </label>
                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" defaultValue="15th - 16th April 2026" />
                     </div>
                  </div>
                  <div className="space-y-6">
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                           <MapPin className="w-3 h-3" /> Official Venue
                        </label>
                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" defaultValue="Lincoln University College, Malaysia" />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                           <Building2 className="w-3 h-3" /> Organizing Institute
                        </label>
                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" defaultValue="Lincoln University College" />
                     </div>
                  </div>
               </div>

               <div className="pt-4 space-y-6">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex items-center gap-2">
                     <Workflow className="w-3 h-3" /> System Control Toggles
                  </h4>
                  <div className="space-y-4">
                     {[
                       { label: "Site-wide Registration Mode", val: "Allow all entries", active: true },
                       { label: "Abstract Upload Feature", val: "Mandatory for presenters", active: true },
                       { label: "Public Gallery Visibility", val: "Live for all visitors", active: true },
                       { label: "Automated Invoice Mailing", val: "Send on payment verification", active: false }
                     ].map((toggle) => (
                       <div key={toggle.label} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100 group/item hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-gray-200/50">
                          <div className="mb-4 md:mb-0">
                            <p className="text-sm font-black text-gray-900 leading-tight uppercase tracking-tight">{toggle.label}</p>
                            <p className="text-[10px] font-bold text-gray-400 mt-2 tracking-widest group-hover/item:text-[#9b1d20] transition-colors">{toggle.val}</p>
                          </div>
                          <div className={cn(
                            "w-14 h-8 rounded-full p-1 shadow-inner relative flex items-center cursor-pointer transition-colors duration-500",
                            toggle.active ? "bg-green-500" : "bg-gray-300"
                          )}>
                            <div className={cn(
                              "w-6 h-6 bg-white rounded-full shadow-lg absolute transition-all duration-300",
                              toggle.active ? "right-1" : "left-1"
                            )} />
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-widest uppercase text-gray-900 leading-none">AI Insight Integration</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-2">Experimental features active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8 w-full md:w-auto">
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 transition-all">
                       <History className="w-4 h-4" /> 
                       History
                     </button>
                     <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-[#9b1d20] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:-translate-y-1 hover:scale-[1.02] active:scale-95 transition-all">
                       <Save className="w-4 h-4" /> 
                       Update General Settings
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-red-50 rounded-[2rem] p-10 border border-red-100/50 flex items-center justify-between group">
               <div className="flex items-center gap-6">
                  <div className="p-4 bg-white rounded-[1.5rem] shadow-sm group-hover:scale-110 transition-transform duration-500">
                    <Trash2 className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 leading-tight">Danger Management Zone</h3>
                    <p className="text-sm font-bold text-red-800/60 mt-2 uppercase tracking-widest">Wipe database, reset keys or archive conference</p>
                  </div>
               </div>
               <button className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-600/10 hover:bg-red-700 transition-all">
                 Enter Zone
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
