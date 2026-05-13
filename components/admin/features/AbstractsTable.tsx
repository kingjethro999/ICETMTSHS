"use client";

import React, { useState } from "react";
import { 
  Search, 
  Download, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Trash2,
  FileText,
  User,
  Mail
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { updateAbstractStatus, deleteAbstract } from "@/lib/actions/admin";

interface AbstractSubmission {
  id: string;
  full_name: string;
  email: string;
  institution: string;
  paper_title: string;
  abstract_url: string;
  status: string;
  created_at: string;
}

export function AbstractsTable({ initialData }: { initialData: AbstractSubmission[] }) {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredData = data.filter(item => 
    item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.paper_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusUpdate = async (id: string, status: any) => {
    setLoadingId(id);
    try {
      await updateAbstractStatus(id, status);
      setData(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    } catch (error) {
      alert("Failed to update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return;
    try {
      await deleteAbstract(id);
      setData(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      alert("Failed to delete submission");
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
      {/* Search Header */}
      <div className="p-8 border-b border-gray-50">
        <div className="relative max-w-xl group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#9b1d20] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search abstracts by author, email or paper title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] text-sm font-bold placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Author & Contact</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Research Title</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Manuscript</th>
              <th className="px-6 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Review Status</th>
              <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredData.map((abs) => (
              <tr key={abs.id} className="hover:bg-gray-50/50 transition-all group/row">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center font-black text-[#9b1d20] shadow-inner">
                      {abs.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 leading-none">{abs.full_name}</p>
                      <p className="text-xs text-gray-400 mt-1.5 font-bold flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {abs.email}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{abs.institution}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <p className="text-xs font-bold text-gray-600 leading-relaxed max-w-[300px] line-clamp-2 italic">
                    "{abs.paper_title || "Untitled Research"}"
                  </p>
                </td>
                <td className="px-6 py-6 text-center">
                  {abs.abstract_url ? (
                    <a 
                      href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gallery/${abs.abstract_url}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-[#9b1d20] hover:text-white transition-all shadow-sm text-[10px] font-black uppercase tracking-widest"
                    >
                       <FileText className="w-3.5 h-3.5" />
                       View Abstract
                    </a>
                  ) : (
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No File</span>
                  )}
                </td>
                <td className="px-6 py-6">
                  <div className={cn(
                    "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm",
                    abs.status === 'Paid' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                    abs.status === 'Rejected' ? "bg-red-50 text-red-600 border border-red-100" :
                    "bg-amber-50 text-amber-600 border border-amber-100"
                  )}>
                    {abs.status === 'Paid' ? 'Approved' : abs.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover/row:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => handleStatusUpdate(abs.id, 'Paid')}
                      disabled={loadingId === abs.id}
                      className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                      title="Approve for Conference"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleStatusUpdate(abs.id, 'Rejected')}
                      disabled={loadingId === abs.id}
                      className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-500 hover:text-white transition-all shadow-sm"
                      title="Reject/Revision"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(abs.id)}
                      className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Remove Submission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="w-12 h-12 text-gray-100" />
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">No matching abstract submissions found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
