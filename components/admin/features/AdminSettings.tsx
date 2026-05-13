"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Shield, 
  Mail, 
  CreditCard, 
  Lock, 
  Database, 
  ChevronRight, 
  Save, 
  Terminal, 
  Activity,
  Layout,
  Calendar,
  MapPin,
  Building2,
  Workflow,
  Sparkles,
  History,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Key
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { updatePassword } from "@/lib/actions/admin";

type Tab = "general" | "security" | "roles" | "smtp" | "payment" | "data";

export function AdminSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const result = await updatePassword(newPassword);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-4 overflow-hidden">
          <h3 className="p-6 text-xs font-black uppercase tracking-[0.2em] text-gray-400 border-b border-gray-50 mb-4 flex items-center gap-2">
            <Terminal className="w-3 h-3" /> Configuration Domains
          </h3>
          <div className="space-y-1">
            {[
              { id: "general", label: "General Config", icon: Globe },
              { id: "security", label: "Security & Account", icon: Lock },
              { id: "roles", label: "Administrative Roles", icon: Shield },
              { id: "smtp", label: "SMTP & Notifications", icon: Mail },
              { id: "payment", label: "Payment Gateway", icon: CreditCard },
              { id: "data", label: "Data Management", icon: Database }
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                  activeTab === item.id ? "bg-red-50 text-[#9b1d20]" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                )}
              >
                <div className="flex items-center gap-4">
                   <item.icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", activeTab === item.id ? "text-[#9b1d20]" : "text-gray-300")} />
                   <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </div>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 opacity-50" />}
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

      {/* Main Content Area */}
      <div className="lg:col-span-8 space-y-8">
        {activeTab === "general" && (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner border border-blue-100/50">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">General Global Configuration</h2>
                    <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest scale-x-90 origin-left">Basic settings for the ICSHSM 2026 platform</p>
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
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 transition-all" defaultValue="ICSHSM 2026 at Lincoln University College" />
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
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" defaultValue="Lincoln University College, Nigeria" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                         <Building2 className="w-3 h-3" /> Organizing Institute
                      </label>
                      <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" defaultValue="Lincoln University College" />
                   </div>
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
                <button className="px-10 py-4 bg-[#9b1d20] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:-translate-y-1 hover:scale-[1.02] transition-all flex items-center gap-2">
                   <Save className="w-4 h-4" /> Save General Config
                </button>
             </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12 space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="flex items-center justify-between border-b border-gray-50 pb-8">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-red-50 text-[#9b1d20] rounded-2xl shadow-inner border border-red-100/50">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">Security & Account Access</h2>
                    <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest scale-x-90 origin-left">Manage your administrative credentials</p>
                  </div>
                </div>
             </div>

             <form onSubmit={handlePasswordChange} className="max-w-md space-y-8">
                <div className="space-y-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                         <Key className="w-3 h-3" /> New Secret Password
                      </label>
                      <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 transition-all" 
                        placeholder="••••••••"
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                         <Key className="w-3 h-3" /> Confirm New Password
                      </label>
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 transition-all" 
                        placeholder="••••••••"
                      />
                   </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {error}
                  </div>
                )}
                {message && (
                  <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> {message}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full px-10 py-5 bg-[#9b1d20] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                   {loading ? "Updating..." : "Update Security Password"}
                </button>
             </form>
          </div>
        )}

        {/* Other tabs placeholder */}
        {activeTab !== "general" && activeTab !== "security" && (
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-12 text-center py-20 animate-in fade-in slide-in-from-right-4 duration-500">
             <Sparkles className="w-12 h-12 text-gray-200 mx-auto mb-6" />
             <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Component Under Maintenance</h3>
             <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-widest">This configuration domain is coming in the next update</p>
          </div>
        )}

        {/* Danger Zone */}
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
  );
}
