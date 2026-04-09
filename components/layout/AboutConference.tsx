"use client"
import Image from "next/image";

interface AboutData {
  heading?: string;
  description?: string;
  partnerTitle?: string;
  partnerDescription?: string;
  year?: string;
}

export default function AboutConference({ data }: { data?: AboutData }) {
  const defaults = {
    heading: "Reimagining the Future: Innovation, Sustainability, and Human-Centric Development.",
    description: "ICETMTSHS 2026 serves as a prestigious global platform for researchers, academicians, and industry leaders. We aim to foster a collaborative ecosystem where interdisciplinary boundaries are crossed to address the pressing challenges of our era.",
    partnerTitle: "Lincoln University College & Lincoln Institute of Higher Education",
    partnerDescription: "Through a strategic partnership between Lincoln University College Malaysia and the Lincoln Institute of Higher Education Australia, this conference bridges the best of Asian and Australian academic excellence to provide a truly international discourse.",
    year: "2026"
  };

  const content = { ...defaults, ...data };

  return (
    <section className="about-section">
      <div className="about-inner">
        {/* Left Column */}
        <div className="about-left">
          <p className="about-eyebrow">ABOUT THE CONFERENCE</p>

          <h1 className="about-heading tracking-tight font-black uppercase text-gray-950">
            {content.heading}
          </h1>

          <p className="about-body font-bold text-gray-600 leading-relaxed text-sm">
            {content.description}
          </p>

          <div className="about-card bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
            <p className="about-card-title font-black text-[#9b1d20] uppercase text-xs tracking-widest mb-4">
              {content.partnerTitle}
            </p>
            <p className="about-card-body font-bold text-gray-500 text-xs leading-relaxed italic">
              {content.partnerDescription}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="about-right">
          <div className="about-image-wrapper">
            <Image
              src="/home-about.png"
              alt="Conference venue"
              fill
              className="about-image object-cover rounded-[3rem] shadow-2xl brightness-90 grayscale-[20%]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="about-year-badge bg-[#9b1d20] shadow-2xl p-10 rounded-3xl border-4 border-white/20 backdrop-blur-xl">
              <span className="about-year-number font-black text-6xl tracking-tighter text-white">{content.year}</span>
              <span className="about-year-label font-bold text-[10px] text-red-200 mt-2 uppercase tracking-[0.3em]">The Global Edition</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-section {
          background-color: #fdfdfc;
          padding: 120px 64px;
        }

        .about-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        /* ── Left ── */
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-eyebrow {
          font-family: inherit;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.3em;
          color: #9b1d20;
          text-transform: uppercase;
          margin: 0;
        }

        .about-heading {
          font-size: clamp(2.5rem, 4.5vw, 3.5rem);
          line-height: 1;
          margin: 0;
        }

        /* ── Right ── */
        .about-right {
          position: relative;
        }

        .about-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
        }

        .about-year-badge {
          position: absolute;
          bottom: -40px;
          left: -40px;
          display: flex;
          flex-direction: column;
          z-index: 10;
          min-width: 240px;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .about-section {
            padding: 80px 32px;
          }

          .about-inner {
            grid-template-columns: 1fr;
            gap: 80px;
          }

          .about-year-badge {
            left: 20px;
            bottom: -20px;
          }
        }
      `}</style>
    </section>
  );
}