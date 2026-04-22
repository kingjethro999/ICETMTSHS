"use client";
import React from "react";
import { Target, Lightbulb, Users, Globe, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const objectives = [
  {
    icon: Lightbulb,
    text: "To promote innovative and sustainable healthcare practices.",
  },
  {
    icon: Target,
    text: "To explore advancements in health systems management and policy.",
  },
  {
    icon: Users,
    text: "To foster collaboration between academia, industry, and healthcare institutions.",
  },
  {
    icon: Globe,
    text: "To address global challenges in healthcare accessibility, quality, and equity.",
  },
  {
    icon: BookOpen,
    text: "To provide a platform for sharing cutting-edge research and practical solutions.",
  },
];

export const ConferenceObjectives: React.FC = () => {
  return (
    <section className="objectives-section bg-[#fdfdfc] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-[#9b1d20] font-black text-xs uppercase tracking-[0.3em] mb-4">
            MISSION & VISION
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 uppercase tracking-tighter">
            Conference Objectives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((obj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-[#9b1d20] mb-6 group-hover:scale-110 transition-transform">
                <obj.icon size={28} />
              </div>
              <p className="text-gray-700 font-bold leading-relaxed">
                {obj.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
