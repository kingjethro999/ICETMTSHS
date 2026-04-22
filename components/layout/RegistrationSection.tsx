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
    { type: "Delegates (Nigeria)", early: "₦100,000", normal: "₦100,000" },
    { type: "Delegates (International)", early: "USD 100", normal: "USD 100" },
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
        {/* Payment Details Card */}
        <div className="mt-8 max-w-xl mx-auto bg-[#9b1d20] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all duration-700" />
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-4">Official Payment Account</p>
           <h3 className="text-2xl font-black mb-6 tracking-tight">Zenith Bank</h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/20 pb-2">
                 <span className="text-[10px] font-bold uppercase opacity-60">Account Name</span>
                 <span className="font-black text-sm">Lincoln ODL</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-bold uppercase opacity-60">Account Number</span>
                 <span className="text-2xl font-black tracking-tighter">1227957953</span>
              </div>
           </div>
        </div>

      </section>

      {/* ── Venue & Contact ── */}
      <section className="contact-section">
        <div className="contact-inner">
          {/* Left: Text */}
          <div className="contact-text">
            <div className="section-label crimson">VENUE &amp; CONTACT</div>
            <h2 className="contact-title">Virtual Platform</h2>
            <p className="contact-description">
              Organized by Lincoln University College, Nigeria. Join us from anywhere in the world on our interactive global virtual platform.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-icon-wrap">
                  <Mail size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="contact-item-label">EMAIL INQUIRY</p>
                  <a
                    href="mailto:idrisahmed@lincoln.edu.my"
                    className="contact-item-value"
                  >
                    idrisahmed@lincoln.edu.my
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
                    Contact: Prof. Dr. Idris A. Ahmed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map placeholder */}
          <div className="map-wrap flex items-center justify-center bg-gray-50 border border-gray-100">
             <div className="text-center p-12">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <MapPin size={32} className="text-[#9b1d20]" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Virtual Platform</h3>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Abuja, Nigeria Focal Point</p>
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
