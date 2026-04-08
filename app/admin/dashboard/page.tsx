import { Users, FileText, ImageIcon, Activity, TrendingUp, Calendar, Clock, MapPin, Globe, CreditCard, ChevronRight, ArrowUpRight, ArrowDownRight, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { getDashboardStats, getConferenceSettings } from "./actions";
import { SystemToggles } from "@/components/admin/features/SystemToggles";

export default async function DashboardPage() {
  const { stats: dbStats, recentRegistrations } = await getDashboardStats();
  const settings = await getConferenceSettings();

  const isRegistrationActive = settings.find((s: any) => s.key === 'registration_active')?.value === true;
  const isMaintenanceMode = settings.find((s: any) => s.key === 'maintenance_mode')?.value === true;

  const stats = [
    {
      label: "Total Registrations",
      value: dbStats.totalRegistrations.toString(),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
      lightColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Paid Submissions",
      value: dbStats.paidSubmissions.toString(),
      change: "+8.2%",
      trend: "up",
      icon: CreditCard,
      color: "bg-emerald-500",
      lightColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      label: "Abstracts Received",
      value: dbStats.totalAbstracts.toString(),
      change: "-2.4%",
      trend: "down",
      icon: FileText,
      color: "bg-amber-500",
      lightColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      label: "Gallery Assets",
      value: dbStats.totalGallery.toString(),
      change: "+4.1%",
      trend: "up",
      icon: ImageIcon,
      color: "bg-[#9b1d20]",
      lightColor: "bg-red-50",
      textColor: "text-[#9b1d20]",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Greeting */}
      <div className="relative group overflow-hidden bg-[#9b1d20] rounded-[2rem] p-10 md:p-14 text-white shadow-2xl shadow-red-900/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
          <Activity className="w-64 h-64 rotate-12" />
        </div>
        <div className="relative z-10 space-y-6 max-w-2xl">
          <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full w-fit backdrop-blur-md border border-white/20 select-none">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Conference Logic Core Online</span>
          </div>
          <div className="space-y-2">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
               Welcome back, <br/>
               <span className="text-red-200">System Admin</span>
             </h1>
          </div>
          <p className="text-lg md:text-xl text-red-100/80 font-medium leading-relaxed">
            Everything is running smoothly. You have <span className="text-white font-bold underline decoration-red-400/50 underline-offset-4 cursor-help">{dbStats.totalRegistrations} total registrations</span> on the platform.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="px-8 py-4 bg-white text-[#9b1d20] rounded-2xl font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group">
              View New Submissions
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold text-sm backdrop-blur-md hover:bg-white/20 transition-all duration-300">
              Update Site Status
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="group p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer">
            <div className="flex items-center justify-between mb-8">
              <div className={cn("p-4 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-500", stat.lightColor)}>
                <stat.icon className={cn("w-6 h-6", stat.textColor)} />
              </div>
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black tracking-wider uppercase",
                stat.trend === "up" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">{stat.label}</h3>
              <p className="text-4xl font-black text-gray-900 tracking-tight leading-tight group-hover:tracking-normal transition-all duration-500">{stat.value}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between group-hover:translate-x-1 transition-transform">
              <span className="text-[10px] font-bold text-gray-400">Activity monitor</span>
              <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
        {/* Recent Registrations Pod */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group min-h-[400px]">
            <div className="p-10 flex items-center justify-between border-b border-gray-50">
               <div className="flex gap-4 items-center">
                 <div className="p-3 bg-red-50 rounded-2xl flex items-center justify-center">
                   <Users className="w-6 h-6 text-[#9b1d20]" />
                 </div>
                 <div>
                   <h3 className="text-xl font-black text-gray-900 leading-none">Recent Registrations</h3>
                   <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest">Latest conference entries</p>
                 </div>
               </div>
            </div>
            
            <div className="p-4 flex-1">
              <div className="space-y-1">
                {recentRegistrations.length > 0 ? recentRegistrations.map((reg) => (
                   <div key={reg.id} className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-[1.5rem] transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center font-bold text-[#9b1d20] shadow-sm">
                          {reg.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{reg.full_name}</p>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">{reg.submission_type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="hidden sm:block text-right">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{new Date(reg.created_at).toLocaleDateString()}</p>
                           <p className={cn(
                             "text-[10px] font-black uppercase mt-1",
                             reg.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'
                           )}>{reg.status}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#9b1d20] transition-colors" />
                      </div>
                   </div>
                )) : (
                  <div className="p-20 text-center space-y-4">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No registrations yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* System Toggles */}
        <SystemToggles 
          initialRegistrationActive={isRegistrationActive} 
          initialMaintenanceMode={isMaintenanceMode} 
        />
      </div>
    </div>
  );
}
