"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Image as ImageIcon, 
  Settings,
  ChevronRight,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { signOut } from "@/app/admin/actions";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "Content Manager",
    icon: FileText,
    href: "/admin/content-manager",
  },
  {
    name: "Registrations",
    icon: Users,
    href: "/admin/registrations",
  },
  {
    name: "Gallery Manager",
    icon: ImageIcon,
    href: "/admin/gallery",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-72 bg-[#9b1d20] text-white h-full border-r border-red-900 shadow-xl z-20">
      {/* Branding */}
      <div className="p-8 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 bg-white rounded-xl group-hover:scale-105 transition-transform duration-300">
             <div className="w-8 h-8 flex items-center justify-center text-[#9b1d20] font-black text-xl">C</div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">ConferenceOS</h1>
            <p className="text-[10px] text-red-200 mt-1 uppercase tracking-widest font-semibold">Admin Panel v1.0</p>
          </div>
        </Link>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-white text-[#9b1d20] shadow-lg shadow-black/10 scale-[1.02]" 
                  : "hover:bg-white/10 text-white/70 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3.5">
                <item.icon className={cn("w-5 h-5", isActive ? "text-[#9b1d20]" : "text-white/40 group-hover:text-white")} />
                <span className="font-semibold text-sm tracking-wide">{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 ml-2 opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Branding/User */}
      <div className="p-6 mt-auto border-t border-white/10 bg-black/5">
        <button 
          onClick={() => signOut()}
          className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center border-2 border-white/20 overflow-hidden shadow-inner font-bold text-xs">
               Admin
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-none">Administrator</p>
              <p className="text-[10px] text-red-200 mt-1">Management</p>
            </div>
          </div>
          <LogOut className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
