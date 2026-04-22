"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

interface HeroData {
  date?: string;
  title?: string;
  code?: string;
  organizer?: string;
  video_url?: string;
  poster_url?: string;
}

export const HeroSection: React.FC<{ data?: HeroData }> = ({ data }) => {
  const defaults = {
    date: "10TH & 11TH NOVEMBER 2026",
    title:
      "1st International Conference on Sustainable Healthcare and Health Systems Management",
    code: "(ICSHSM, 2026)",
    organizer: "Lincoln University College, Nigeria",
    video_url: "", // Removed dead video, utilizing high-end static parallax
    poster_url: "https://images.unsplash.com/photo-1551076805-e1869043e560?auto=format&fit=crop&q=80",
  };

  const content = { ...defaults, ...data };
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Σignal: Motion Vocabulary - Parallax Drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Σignal: Motion Vocabulary - Stagger Cascade
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  return (
    <div ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden bg-gray-900">
      {/*
        Preconnect hint — tells the browser to open a TCP + TLS connection to
        the WordPress origin early, reducing latency for the video and any
        images that come from the same host.
      */}
      {/* Background Media with Parallax Drift */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Static Fallback Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${content.poster_url})` }}
        />
        
        {/* Cinematic Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-doctors-and-nurses-in-a-hospital-41589-large.mp4" 
            type="video/mp4" 
          />
        </video>

        {/* Branding Overlay: Crimson #9b1d20 with mix-blend-multiply */}
        <div className="absolute inset-0 bg-[#9b1d20] mix-blend-multiply opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#9b1d20]/20 to-[#9b1d20]/80"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          {/* Date */}
          <motion.div variants={itemVariants} className="mb-3">
            <p className="text-sm sm:text-base font-semibold tracking-widest uppercase italic">
              {content.date}
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-3 px-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-2 tracking-tight drop-shadow-lg">
              {content.title}
            </h1>
          </motion.div>

          {/* Conference Code */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-sm sm:text-base font-bold tracking-widest opacity-80">
              {content.code}
            </p>
          </motion.div>

          {/* Organizer */}
          <motion.div variants={itemVariants} className="border-t border-white/30 pt-5 mt-4">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold opacity-60">
              ORGANIZED BY
            </p>
            <p className="text-sm sm:text-base font-black mt-2 tracking-wide uppercase">
              {content.organizer}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
