"use client";

import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import { Mail, Smartphone, MapPin } from "lucide-react";

interface FeeItem {
  type: string;
  early: string;
  normal: string;
}

interface FeesContent {
  description?: string;
  rates?: FeeItem[];
}

export default function RegistrationSection({ feesData }: { feesData?: FeesContent }) {
  const defaultRates = [
    { type: "Presenter (Local)", early: "MYR 500", normal: "MYR 600" },
    { type: "Presenter (International)", early: "USD 150", normal: "USD 200" },
    { type: "Participant (Local)", early: "MYR 300", normal: "MYR 400" },
    { type: "Participant (International)", early: "USD 100", normal: "USD 120" }
  ];

  const rates = feesData?.rates || defaultRates;

  return (
    <div className="registration-wrapper">
      {/* ── Registration Fees ── */}
      <section className="fees-section">
        <div className="section-label">PARTICIPATION</div>
        <h2 className="section-title">Registration Fees</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
           {rates.map((rate, idx) => (
             <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">{rate.type}</h3>
                   <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center text-[#9b1d20] font-black text-xs">
                      {idx + 1}
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:bg-red-50/50 transition-colors">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Early Bird Rate</span>
                      <span className="text-xl font-black text-[#9b1d20]">{rate.early}</span>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                      <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Normal Rate</span>
                      <span className="text-xl font-black text-gray-900">{rate.normal}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Publication Information */}
        <div className="publication-info mt-12 bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-gray-100 max-w-3xl mx-auto shadow-inner text-left">
          <p className="publication-text font-medium text-gray-600 leading-relaxed italic">
            "The extended versions of the selected papers presented at the conference will be published (if accepted after review) in high-impact international journals."
          </p>
        </div>
      </section>

      {/* ── Venue & Contact ── */}
      <section className="contact-section">
        <div className="contact-inner">
          {/* Left: Text */}
          <div className="contact-text">
            <div className="section-label crimson">VENUE &amp; CONTACT</div>
            <h2 className="contact-title">Get in Touch</h2>
            <p className="contact-description">
              Summit Hotel Subang USJ, Malaysia. Join us in the heart of
              Selangor&apos;s academic and industrial hub.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <Mail size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="contact-item-label">EMAIL INQUIRY</p>
                  <a
                    href="mailto:icetmtshs@lincoln.edu.my"
                    className="contact-item-value"
                  >
                    icetmtshs@lincoln.edu.my
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <Smartphone size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="contact-item-label">CONFERENCE SECRETARIAT</p>
                  <p className="contact-item-value">
                    +60 123 456 789 / +60 987 654 321
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map placeholder */}
          <div className="map-wrap">
            <div
              className="map-bg shadow-inner bg-gray-200"
              aria-label="Map showing Summit Hotel Subang USJ"
            >
              <div className="map-grid h-full" />
              <div className="map-pin-card shadow-2xl border border-gray-100">
                <MapPin size={28} className="map-pin-icon" strokeWidth={1.8} />
                <p className="map-hotel font-black text-[#9b1d20]">Summit Hotel Subang USJ</p>
                <p className="map-city text-[10px] font-black uppercase tracking-widest text-gray-400">SUBANG JAYA, MALAYSIA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── Base ── */
        .registration-wrapper {
          font-family: "Plus Jakarta Sans", sans-serif;
          background: #fdfdfc;
          color: #1a1a1a;
        }

        /* ── Section Label ── */
        .section-label {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: #8c1010;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        /* ── Fees Section ── */
        .fees-section {
          padding: 100px 5% 120px;
          text-align: center;
          background: #fdfdfc;
        }

        .section-title {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: #111;
          margin: 0 0 4rem;
        }

        /* ── Contact Section ── */
        .contact-section {
          padding: 120px 5%;
          background: #fff;
          border-top: 1px solid #f0f0f0;
        }

        .contact-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .contact-title {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          color: #111;
          margin: 0 0 1.5rem;
          line-height: 1;
        }

        .contact-description {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: #666;
          line-height: 1.7;
          margin: 0 0 3.5rem;
          max-width: 450px;
        }

        .contact-items {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .contact-icon-wrap {
          width: 50px;
          height: 50px;
          border: 1.5px solid #f0f0f0;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9b1d20;
          flex-shrink: 0;
          background: #fdfdfd;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
        }

        .contact-item-label {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: #aaa;
          text-transform: uppercase;
          margin: 0 0 6px;
        }

        .contact-item-value {
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1rem;
          font-weight: 900;
          color: #111;
          text-decoration: none;
          display: block;
          transition: all 0.3s;
        }

        a.contact-item-value:hover {
          color: #9b1d20;
          transform: translateX(4px);
        }

        /* ── Map ── */
        .map-wrap {
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.15);
          aspect-ratio: 1 / 1;
        }

        .map-bg {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .map-grid {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        .map-pin-card {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border-radius: 24px;
          padding: 30px;
          text-align: center;
          min-width: 260px;
        }

        .map-pin-icon {
          color: #9b1d20;
          margin-bottom: 12px;
          margin-inline: auto;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .contact-inner {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .map-wrap {
            aspect-ratio: 16 / 9;
            border-radius: 30px;
          }

          .contact-description {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}