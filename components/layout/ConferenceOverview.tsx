"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";

export const ConferenceOverview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 80, damping: 20 }
    },
  };

  return (
    <section className="bg-white py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >

          {/* Image */}
          <motion.div variants={itemVariants} className="relative group perspective">
            <div className="absolute -inset-4 bg-gray-100 rounded-2xl transform rotate-2 group-hover:rotate-1 transition-transform duration-500 z-0"></div>
            <Image
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
              alt="Conference overview - professionals engaged in sustainable healthcare"
              width={1024}
              height={682}
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <div className="space-y-8">
            <motion.h2 variants={itemVariants} className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              ICSHSM 2026
            </motion.h2>
            <div className="prose prose-lg text-gray-600 leading-relaxed max-w-none">
              <motion.p variants={itemVariants} className="mb-6 text-xl text-gray-500 font-light">
                The 1st International Conference on Sustainable Healthcare and Health Systems Management (ICSHSM 2026) serves as a premier global platform bringing together academicians, healthcare professionals, policymakers, researchers, and industry experts to explore innovative and sustainable solutions in healthcare delivery and health systems management. In an era marked by rapid technological advancements, increasing healthcare demands, and global health crises, the need for resilient, efficient, and sustainable healthcare systems has become more critical than ever.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg">
                Under the theme <strong>"Advancing Sustainable Healthcare: Innovation, Resilience, and Global Health Systems Transformation,"</strong> the conference will focus on transformative approaches that integrate technology, policy, management, and patient-centered care to strengthen healthcare systems worldwide. The conference emphasizes sustainability, equity, accessibility, and quality in healthcare delivery.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
