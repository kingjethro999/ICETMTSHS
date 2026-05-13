import React from "react";
import { AdminSettings } from "@/components/admin/features/AdminSettings";

export default function SettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Settings</h1>
          <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest leading-relaxed">Configure global parameters and administrative access</p>
        </div>
      </div>

      <AdminSettings />
    </div>
  );
}
