'use client'
import { motion } from 'framer-motion'
import DonateButton from '@/components/ui/DonateButton'

const imgArrow       = "https://www.figma.com/api/mcp/asset/fc8bbfd2-b326-4762-829b-7eaf0bb62093"
const foundationLogo = "/images/home/the_mico_foundation.png"

const values = [
  { iconKey: 'commitment',   accent: 'green', title: 'Commitment',        desc: "Loyal to our mission and dedicated to the Foundation's long-term goals." },
  { iconKey: 'truth',        accent: 'gold',  title: 'Truth',             desc: 'Transparent and honest in all our communications and decisions.' },
  { iconKey: 'integrity',    accent: 'green', title: 'Integrity & Ethics', desc: 'Upholding the highest standards of moral conduct in everything we do.' },
  { iconKey: 'transparency', accent: 'gold',  title: 'Transparency',      desc: 'Open and accountable in how we manage and report on our activities.' },
  { iconKey: 'innovation',   accent: 'green', title: 'Innovation',        desc: 'Embracing new ideas and approaches to advance our mission.' },
  { iconKey: 'partnership',  accent: 'gold',  title: 'Partnership',       desc: 'Building strong relationships with stakeholders to achieve shared goals.' },
  { iconKey: 'service',      accent: 'green', title: 'Service',           desc: 'Dedicated to serving our community with excellence and care.' },
  { iconKey: 'respect',      accent: 'gold',  title: 'Respect',           desc: 'Valuing the dignity and worth of every individual we serve.' },
]

// Jamaican-inspired palette — vibrant green + gold accents
const ACCENTS = {
  green: { bar: '#1A8C4A', badgeBg: 'linear-gradient(135deg, #2BA85C 0%, #137A3E 100%)', badgeIcon: '#FFFFFF', glow: 'rgba(26,140,74,0.14)' },
  gold:  { bar: '#F5B700', badgeBg: 'linear-gradient(135deg, #FFE36B 0%, #F5B700 100%)', badgeIcon: '#040617', glow: 'rgba(245,183,0,0.16)' },
}

const inter = { fontFamily: "'Inter', sans-serif" };

function ValueIcon({ name, size = 26 }) {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'commitment':   return <svg {...c}><path d="M12 21s7-3.5 7-9V6l-7-3-7 3v6c0 5.5 7 9 7 9z"/><path d="M9 11.5l2 2 4-4.5"/></svg>
    case 'truth':        return <svg {...c}><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>
    case 'integrity':    return <svg {...c}><path d="M12 4v17"/><path d="M8 21h8"/><path d="M4 7h16"/><path d="M4 7l-2 5h4z"/><path d="M20 7l-2 5h4z"/></svg>
    case 'transparency': return <svg {...c}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>
    case 'innovation':   return <svg {...c}><path d="M9.5 18h5"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.7 10.7c.6.5 1.2 1.3 1.2 2.3h5c0-1 .6-1.8 1.2-2.3A6 6 0 0 0 12 3z"/></svg>
    case 'partnership':  return <svg {...c}><path d="M10 13a4 4 0 0 0 5.7 0l2-2a4 4 0 1 0-5.7-5.7l-1 1"/><path d="M14 11a4 4 0 0 0-5.7 0l-2 2a4 4 0 1 0 5.7 5.7l1-1"/></svg>
    case 'service':      return <svg {...c}><path d="M12 20s-6.5-4.2-8.7-8.4A4.2 4.2 0 0 1 12 6.5a4.2 4.2 0 0 1 8.7 5.1C18.5 15.8 12 20 12 20z"/></svg>
    case 'respect':      return <svg {...c}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6"/><path d="M18.5 19a5.5 5.5 0 0 0-2.6-4.7"/></svg>
    default:             return <svg {...c}><circle cx="12" cy="12" r="8"/></svg>
  }
}

function ValueCard({ value, style = {} }) {
  const a = ACCENTS[value.accent] || ACCENTS.gold
  return (
    <div className="value-card" style={{ position: 'relative', backgroundColor: '#FFFFFF', border: '1px solid #ECEDF1', borderRadius: '22px', padding: '30px 28px', display: 'flex', flexDirection: 'column', gap: '20px', overflow: 'hidden', minHeight: '250px', boxShadow: '0 2px 6px rgba(10,13,18,0.05)', transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease', ...style }}>
      {/* Jamaican accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: a.bar }} />
      {/* Soft accent glow */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '160px', height: '160px', borderRadius: '50%', background: `radial-gradient(circle, ${a.glow} 0%, rgba(0,0,0,0) 70%)`, pointerEvents: 'none' }} />
      <div className="value-icon-badge" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '62px', height: '62px', borderRadius: '18px', background: a.badgeBg, color: a.badgeIcon, flexShrink: 0, boxShadow: '0 6px 16px rgba(10,13,18,0.12)', transition: 'transform 0.25s ease' }}>
        <ValueIcon name={value.iconKey} size={32} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ ...inter, fontSize: '25px', fontWeight: 700, color: '#040617', letterSpacing: '-0.4px', lineHeight: '31px', margin: 0, textTransform: 'capitalize' }}>{value.title}</p>
        <p style={{ ...inter, fontSize: '16px', fontWeight: 400, color: '#5A5C6B', letterSpacing: '0.1px', lineHeight: '25px', margin: 0 }}>{value.desc}</p>
      </div>
    </div>
  )
}

export default function Mission() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&family=inter:wght@400&display=swap');

        .mission-desktop, .mission-mobile { position: relative; z-index: 1; }

        /* ── DESKTOP ── */
        .mission-desktop {
          display: flex;
          flex-direction: column;
          gap: clamp(18px, 1.8vw, 26px);
          max-width: 1860px;
          margin: 0 auto;
          padding: clamp(56px, 7vw, 80px) clamp(24px, 4vw, 64px);
        }
        .mission-top {
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
          gap: clamp(18px, 1.8vw, 26px);
          align-items: start;
        }
        .mission-panel { background: #FAF7EF; border-radius: 28px; }
        .mission-text-panel { display: flex; flex-direction: column; justify-content: center; gap: 26px; padding: clamp(28px, 3vw, 44px); }
        .mission-top-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(16px, 1.4vw, 22px); padding: clamp(18px, 1.8vw, 24px); }
        .mission-bottom-cards { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: clamp(12px, 1.1vw, 18px); padding: clamp(18px, 1.8vw, 24px); }
        .mission-mobile { display: none; }

        /* ── TABLET / small laptop (769–1100px) ── */
        @media (max-width: 1100px) {
          .mission-top { grid-template-columns: 1fr; }
          .mission-bottom-cards { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        /* ── Premium value-card hover ── */
        .value-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px rgba(10,13,18,0.10);
          border-color: rgba(255,217,0,0.6);
        }
        .value-card:hover .value-icon-badge { transform: scale(1.06); }

        /* ── MOBILE (≤768px) ── */
        @media (max-width: 768px) {
          .mission-desktop { display: none !important; }
          .mission-mobile  { display: flex !important; }
          .scroll-row::-webkit-scrollbar { display: none; }
          .scroll-row { -ms-overflow-style: none; scrollbar-width: none; }
        }
      `}</style>

      {/* Jamaican-vibe decorative glows */}
      <div style={{ position: 'absolute', top: '-140px', left: '-120px', width: '440px', height: '440px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,140,74,0.12) 0%, rgba(26,140,74,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-160px', right: '-130px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,183,0,0.14) 0%, rgba(245,183,0,0) 70%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* ════════════════════════════════
          DESKTOP — your existing layout
      ════════════════════════════════ */}
      <div className="mission-desktop">

        {/* TOP — text panel + first three value cards */}
        <div className="mission-top">

          {/* Left — text panel */}
          <motion.div
            className="mission-panel mission-text-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFFFFF', border: '1px solid #ECEDF1', borderRadius: '100px', padding: '8px 18px', boxShadow: '0 2px 8px rgba(10,13,18,0.05)', marginBottom: '20px' }}>
                <span style={{ display: 'inline-flex', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#1A8C4A' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F5B700' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#040617' }} />
                </span>
                <span style={{ ...inter, fontSize: '13px', fontWeight: 700, color: '#040617', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Rooted in Jamaican Heritage
                </span>
              </div>
              <h2 style={{ ...inter, fontSize: 'clamp(40px, 4.6vw, 62px)', fontWeight: 700, color: '#040617', letterSpacing: '-0.75px', lineHeight: 1.08, margin: 0 }}>
                Our Mission <span style={{ color: '#1A8C4A' }}>&amp;</span> Values
              </h2>
            </div>
            <div style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '16px' }}>
              <p style={{ ...inter, fontSize: 'clamp(17px, 1.1vw, 19px)', fontWeight: 400, color: '#6F7181', letterSpacing: '0.2px', lineHeight: 1.55, margin: 0 }}>
                We manage and grow Mico Foundation's assets and infrastructure to support the university's needs, benefit students and staff, and preserve the legacy of the Lady Mico Trust.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <DonateButton text="Read Our Story" href="/about" />
              <a href="/endowments" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFF7CC', color: '#040617', fontSize: '14px', fontWeight: 600, height: '46px', padding: '0 24px', borderRadius: '14px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Become Endowment
              </a>
            </div>
          </motion.div>

          {/* Right — first three value cards */}
          <div className="mission-panel mission-top-cards">
            {values.slice(0, 3).map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <ValueCard value={value} style={{ minHeight: '230px', height: '100%' }} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM — value cards with the foundation logo in the middle */}
        <div className="mission-panel mission-bottom-cards">
          {/* Transparency, Innovation */}
          {[values[3], values[4]].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <ValueCard value={value} style={{ minHeight: '230px', height: '100%' }} />
            </motion.div>
          ))}

          {/* Foundation logo card — centre */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
            style={{ background: 'linear-gradient(160deg, #040617 0%, #11152e 100%)', border: '1px solid #040617', borderRadius: '22px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '230px', height: '100%', boxShadow: '0 12px 30px rgba(4,6,23,0.18)' }}
          >
            <img src={foundationLogo} alt="The Mico Foundation" style={{ width: '86%', objectFit: 'contain' }} />
          </motion.div>

          {/* Partnership, Service, Respect */}
          {[values[5], values[6], values[7]].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i + 3) * 0.07 }}
            >
              <ValueCard value={value} style={{ minHeight: '230px', height: '100%' }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE — from Figma 374:33738 + 376:33979
      ════════════════════════════════ */}
      <div className="mission-mobile" style={{ flexDirection: 'column', gap: '40px', padding: '48px 24px' }}>

        {/* Text + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', backgroundColor: '#FFFFFF', border: '1px solid #ECEDF1', borderRadius: '100px', padding: '8px 16px', boxShadow: '0 2px 8px rgba(10,13,18,0.05)', marginBottom: '18px' }}>
              <span style={{ display: 'inline-flex', gap: '4px' }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#1A8C4A' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#F5B700' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#040617' }} />
              </span>
              <span style={{ ...inter, fontSize: '12px', fontWeight: 700, color: '#040617', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Rooted in Jamaican Heritage
              </span>
            </div>
            <h2 style={{ ...inter, fontSize: '56px', fontWeight: 700, color: '#040617', letterSpacing: '-0.75px', lineHeight: '62px', margin: 0 }}>
              Our Mission <span style={{ color: '#1A8C4A' }}>&amp;</span> Values
            </h2>
          </div>
          <div style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '16px' }}>
            <p style={{ ...inter, fontSize: '24px', color: '#6F7181', letterSpacing: '0.24px', lineHeight: '38px', margin: 0 }}>
              We manage and grow Mico Foundation's assets and infrastructure to support the university's needs, benefit students and staff, and preserve the legacy of the Lady Mico Trust.
            </p>
          </div>
          {/* Full-width stacked buttons — Figma 374:33738 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="/about" style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#FFD900', color: '#040617', fontSize: '14px', fontWeight: 600, height: '46px', borderRadius: '14px', textDecoration: 'none', width: '100%' }}>
              Read Our Story
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
                <img src={imgArrow} alt="" style={{ width: '14px', height: '14px' }} />
              </span>
            </a>
            <a href="/endowments" style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF7CC', color: '#040617', fontSize: '14px', fontWeight: 600, height: '46px', borderRadius: '14px', textDecoration: 'none', width: '100%' }}>
              Become Endowment
            </a>
          </div>
        </motion.div>

        {/* Values — 2 horizontal scroll rows — Figma 376:33979 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
          {/* Row 1 — starts at left edge */}
          <div className="scroll-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
            {values.slice(0, 4).map((v, i) => (
              <div key={i} style={{ flexShrink: 0, width: '270px' }}>
                <ValueCard value={v} />
              </div>
            ))}
          </div>
          {/* Row 2 — offset right by ~48px matching Figma stagger */}
          <div className="scroll-row" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', paddingLeft: '48px' }}>
            {values.slice(4).map((v, i) => (
              <div key={i} style={{ flexShrink: 0, width: '270px' }}>
                <ValueCard value={v} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}