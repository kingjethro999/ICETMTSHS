"use client"
const partners = ["MJN", "IJRBT", "IJMHS", "IJAMDR", "IJFDC", "IJEISSAH", "UBB"];

export default function Partners() {
  return (
    <>
      {/* ── Publication Partners ── */}
      <section className="pub-section">
        <div className="pub-inner">
          <p className="section-eyebrow">PUBLICATION PARTNERS</p>

          <div className="partners-grid">
            {partners.map((name) => (
              <div key={name} className="partner-tile">
                <span className="partner-name">{name}</span>
                <span className="partner-underline" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutional Collaborator ── */}
      <section className="collab-section">
        <div className="collab-inner">
          <p className="section-eyebrow collab-eyebrow">INSTITUTIONAL COLLABORATOR</p>

          <div className="collab-card">
            <span className="collab-acronym">LIHE</span>
            <span className="collab-fullname">LINCOLN INSTITUTE OF HIGHER EDUCATION</span>
            <span className="collab-country">AUSTRALIA</span>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* ── Shared ── */
        .section-eyebrow {
          font-family: "Arial", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          color: #6b1010;
          text-transform: uppercase;
          text-align: center;
          margin: 0 0 48px;
        }

        /* ────────────────────────────
           Publication Partners
        ──────────────────────────── */
        .pub-section {
          background-color: #f7f7f5;
          padding: 72px 64px 80px;
        }

        .pub-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
        }

        .partner-tile {
          position: relative;
          flex: 1 1 120px;
          min-width: 100px;
          background-color: #ebebeb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 36px 20px 28px;
          border: 1px solid #e0e0e0;
          cursor: pointer;
          transition: background-color 0.2s ease;
          gap: 0;
        }

        .partner-tile:hover {
          background-color: #e2e2e0;
        }

        .partner-name {
          font-family: "Arial", sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #6b1010;
          text-align: center;
          line-height: 1;
          margin-bottom: 18px;
        }

        .partner-underline {
          display: block;
          width: 100%;
          height: 2px;
          background-color: #8b1a1a;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        /* ────────────────────────────
           Institutional Collaborator
        ──────────────────────────── */
        .collab-section {
          background-color: #e3e3e3;
          padding: 80px 64px 96px;
        }

        .collab-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .collab-eyebrow {
          color: #888;
          letter-spacing: 0.25em;
        }

        .collab-card {
          background-color: #f7f7f5;
          border-radius: 16px;
          width: 100%;
          max-width: 520px;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.06);
        }

        .collab-acronym {
          font-family: "Arial Black", "Arial", sans-serif;
          font-size: 2.8rem;
          font-weight: 900;
          color: #6b1010;
          letter-spacing: 0.06em;
          line-height: 1;
        }

        .collab-fullname {
          font-family: "Arial Black", "Arial", sans-serif;
          font-size: 13px;
          font-weight: 800;
          color: #111;
          letter-spacing: 0.06em;
          text-align: center;
          line-height: 1.4;
          text-transform: uppercase;
        }

        .collab-country {
          font-family: "Arial", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #aaa;
          text-transform: uppercase;
          margin-top: 2px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .pub-section,
          .collab-section {
            padding: 56px 32px;
          }

          .partner-tile {
            flex: 1 1 80px;
            padding: 28px 12px 22px;
          }

          .partner-name {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .pub-section,
          .collab-section {
            padding: 40px 16px;
          }

          .partners-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
          }

          .collab-card {
            padding: 40px 28px;
          }

          .collab-acronym {
            font-size: 2.2rem;
          }
        }
      `}</style>
    </>
  );
}
