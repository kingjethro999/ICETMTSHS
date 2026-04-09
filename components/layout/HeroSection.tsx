import React from "react";

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
    date: "06TH & 07TH MAY 2026",
    title:
      "3rd International Conference on Emerging Trends in Management, Technology, Social and Health Sciences",
    code: "(ICETMTSHS, 2026)",
    organizer: "Lincoln University College Malaysia",
    video_url:
      "https://icetmtshs.lincoln.edu.my/wp-content/uploads/2023/11/Intro1.mp4",
    poster_url: "/hero.png",
  };

  const content = { ...defaults, ...data };

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/*
        Preconnect hint — tells the browser to open a TCP + TLS connection to
        the WordPress origin early, reducing latency for the video and any
        images that come from the same host.
      */}
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          // preload="none" prevents the browser from fetching the video file
          // until after the page is interactive, so it doesn't compete with
          // critical resources during the initial page load.
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          poster={content.poster_url}
        >
          <source src={content.video_url} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-red-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Date */}
          <div className="mb-3">
            <p className="text-sm sm:text-base font-semibold tracking-widest uppercase italic">
              {content.date}
            </p>
          </div>

          {/* Main Title */}
          <div className="mb-3 px-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-2 tracking-tight">
              {content.title}
            </h1>
          </div>

          {/* Conference Code */}
          <div className="mb-6">
            <p className="text-sm sm:text-base font-bold tracking-widest opacity-80">
              {content.code}
            </p>
          </div>

          {/* Organizer */}
          <div className="border-t border-white/30 pt-5 mt-4">
            <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-bold opacity-60">
              ORGANIZED BY
            </p>
            <p className="text-sm sm:text-base font-black mt-2 tracking-wide uppercase">
              {content.organizer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};