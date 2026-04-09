"use client";

import React, { useState } from "react";
import { Save, CheckCircle2, Loader2, AlertCircle, RefreshCw, Layout, Edit3 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { updateHomepageContent } from "@/lib/actions/admin";

interface SectionContent {
  section_name: string;
  content: any;
}

export function ContentManagerEditor({ initialSections }: { initialSections: SectionContent[] }) {
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState(initialSections[0]?.section_name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const currentContent = sections.find(s => s.section_name === activeSection)?.content || {};

  const handleUpdateField = (field: string, value: any) => {
    setSections(prev => prev.map(s => 
      s.section_name === activeSection 
        ? { ...s, content: { ...s.content, [field]: value } } 
        : s
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const section = sections.find(s => s.section_name === activeSection);
      if (!section) return;
      
      await updateHomepageContent(activeSection, section.content);
      setMessage({ type: 'success', text: "Section updated successfully!" });
    } catch (error) {
      setMessage({ type: 'error', text: "Failed to update section." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-4 overflow-hidden">
           <div className="p-4 mb-4 border-b border-gray-50 flex items-center gap-3">
              <Layout className="w-5 h-5 text-[#9b1d20]" />
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">CMS Sections</p>
           </div>
           <div className="space-y-1">
              {sections.map(s => (
                <button
                  key={s.section_name}
                  onClick={() => setActiveSection(s.section_name)}
                  className={cn(
                    "w-full flex items-center justify-between px-5 py-4 rounded-2xl font-bold text-sm transition-all group",
                    activeSection === s.section_name 
                      ? "bg-[#9b1d20] text-white shadow-lg" 
                      : "text-gray-500 hover:bg-gray-50 hover:pl-6"
                  )}
                >
                  <span className="capitalize">{s.section_name}</span>
                  <Edit3 className={cn("w-4 h-4 opacity-0 transition-all", activeSection === s.section_name ? "opacity-100" : "group-hover:opacity-100")} />
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Editor Space */}
      <div className="lg:col-span-9">
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col group min-h-[600px]">
           <div className="p-10 flex items-center justify-between border-b border-gray-50">
             <div>
               <h3 className="text-2xl font-black text-gray-900 leading-none capitalize">{activeSection} Configuration</h3>
               <p className="text-xs text-gray-400 mt-3 font-bold uppercase tracking-widest">Update live site contents for this section</p>
             </div>
             
             <div className="flex items-center gap-4">
                {message && (
                  <div className={cn(
                    "flex items-center gap-2 px-6 py-4 rounded-2xl text-xs font-bold animate-in fade-in slide-in-from-right-4 transition-all duration-500",
                    message.type === 'success' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                  )}>
                    {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {message.text}
                  </div>
                )}
                
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center gap-3 px-8 py-4 bg-[#9b1d20] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-red-900/10 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Commit Changes
                    </>
                  )}
                </button>
             </div>
           </div>

           <div className="p-10 lg:p-16 space-y-10">
              {activeSection === "hero" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="space-y-3 group/field">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 group-focus-within/field:text-[#9b1d20] transition-colors font-sans">
                      Conference Headline (Title)
                    </label>
                    <textarea 
                      value={currentContent.title || ""}
                      onChange={(e) => handleUpdateField("title", e.target.value)}
                      rows={3}
                      className="block w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm font-bold focus:outline-none focus:ring-4 focus:ring-red-100/30 focus:border-red-200/50 focus:bg-white transition-all duration-300 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Target Dates</label>
                       <input 
                         type="text" 
                         value={currentContent.date || ""}
                         onChange={(e) => handleUpdateField("date", e.target.value)}
                         className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-sm font-bold focus:outline-none"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Conference Code</label>
                       <input 
                         type="text" 
                         value={currentContent.code || ""}
                         onChange={(e) => handleUpdateField("code", e.target.value)}
                         className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-sm font-bold focus:outline-none"
                       />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Intro Video URL (Direct MP4)</label>
                    <input 
                      type="text" 
                      value={currentContent.video_url || ""}
                      onChange={(e) => handleUpdateField("video_url", e.target.value)}
                      className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-sm font-bold focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {activeSection === "about" && (
                 <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Section Heading</label>
                       <input 
                         type="text" 
                         value={currentContent.title || ""}
                         onChange={(e) => handleUpdateField("title", e.target.value)}
                         className="block w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-[1.25rem] text-sm font-bold focus:outline-none"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Description (Markdown Support)</label>
                       <textarea 
                        value={currentContent.description || ""}
                        onChange={(e) => handleUpdateField("description", e.target.value)}
                        rows={6}
                        className="block w-full p-6 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm font-bold focus:outline-none"
                       />
                    </div>
                 </div>
              )}

              {activeSection === "fees" && (
                <div className="space-y-8 animate-in fade-in duration-500">
                   <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Pricing Structure Editor</p>
                   {currentContent.rates?.map((rate: any, idx: number) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                         <div className="space-y-1">
                            <p className="text-[10px] font-black text-[#9b1d20]/50 uppercase tracking-tighter">Registration Category</p>
                            <input 
                              type="text" 
                              value={rate.type}
                              disabled
                              className="w-full bg-transparent font-black text-[#9b1d20] border-none focus:outline-none text-sm"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Early Bird</label>
                            <input 
                              type="text" 
                              value={rate.early}
                              onChange={(e) => {
                                const newRates = [...currentContent.rates];
                                newRates[idx].early = e.target.value;
                                handleUpdateField("rates", newRates);
                              }}
                              className="block w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:outline-none"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest pl-1">Normal Rate</label>
                            <input 
                              type="text" 
                              value={rate.normal}
                              onChange={(e) => {
                                const newRates = [...currentContent.rates];
                                newRates[idx].normal = e.target.value;
                                handleUpdateField("rates", newRates);
                              }}
                              className="block w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:outline-none"
                            />
                         </div>
                      </div>
                   ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
