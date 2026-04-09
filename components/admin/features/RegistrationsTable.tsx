"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ExternalLink, 
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { updateRegistrationStatus, deleteRegistration } from "@/lib/actions/admin";

interface Registration {
  id: string;
  full_name: string;
  email: string;
  institution: string;
  submission_type: string;
  paper_title: string;
  payment_proof_url: string;
  status: string;
  created_at: string;
  metadata?: any;
}

export function RegistrationsTable({ initialData }: { initialData: Registration[] }) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredData = data.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (id: string, status: any) => {
    setLoadingId(id);
    try {
      await updateRegistrationStatus(id, status);
      setData(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRegistration(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      alert("Failed to delete registration");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Full Name", "Email", "Institution", "Submission Type", "Abstract Title", "Status", "Date"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => [
        `"${item.full_name}"`,
        `"${item.email}"`,
        `"${item.institution}"`,
        `"${item.submission_type}"`,
        `"${item.paper_title || ""}"`,
        `"${item.status}"`,
        `"${new Date(item.created_at).toLocaleDateString()}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
      {/* Search & Bulk Actions */}
      <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-gray-50 text-gray-600 rounded-[1.25rem] font-bold text-sm hover:bg-gray-100 transition-all duration-300">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button 
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-6 py-4 bg-[#9b1d20] text-white rounded-[1.25rem] font-bold text-sm shadow-lg shadow-red-900/20 hover:scale-105 transition-all duration-300"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Name & Participant Details</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Affiliation</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Payment Proof</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50/50 transition-all group/row">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center font-black text-[#9b1d20]">
                      {reg.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 leading-none">{reg.full_name}</p>
                      <p className="text-xs text-gray-400 mt-1.5 font-bold tracking-tight">{reg.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                         <span className="px-2 py-0.5 bg-red-50 text-[9px] font-black text-[#9b1d20] rounded-full uppercase tracking-tighter border border-red-100/50">
                           {reg.submission_type}
                         </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed max-w-[200px]">{reg.institution}</p>
                </td>
                <td className="px-6 py-6">
                  <div className="flex justify-center">
                    {reg.payment_proof_url ? (
                      <a 
                        href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${reg.payment_proof_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 bg-red-50 text-[#9b1d20] rounded-2xl hover:bg-[#9b1d20] hover:text-white transition-all shadow-sm group/link"
                      >
                         <Eye className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Missing</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                    reg.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                    reg.status === 'Rejected' ? "bg-red-50 text-red-600 border border-red-100" :
                    "bg-amber-50 text-amber-600 border border-amber-100"
                  )}>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      reg.status === 'Paid' ? "bg-emerald-500" :
                      reg.status === 'Rejected' ? "bg-red-500" : "bg-amber-500"
                    )} />
                    {reg.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleStatusUpdate(reg.id, 'Paid')}
                      disabled={loadingId === reg.id}
                      className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      title="Approve Payment"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(reg.id, 'Rejected')}
                      disabled={loadingId === reg.id}
                      className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                      title="Reject/Flag"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(reg.id)}
                      className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-8 border-t border-gray-50 flex items-center justify-between bg-gray-50/10">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Showing <span className="text-gray-900">{filteredData.length}</span> of <span className="text-gray-900">{data.length}</span> entries
        </p>
        <div className="flex items-center gap-2">
           <button className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all disabled:opacity-30">
             <ChevronLeft className="w-4 h-4" />
           </button>
           <button className="p-3 rounded-xl border border-[#9b1d20]/20 bg-white text-[#9b1d20] font-black text-xs px-5 shadow-sm">1</button>
           <button className="p-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all">
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </div>
  );
}
