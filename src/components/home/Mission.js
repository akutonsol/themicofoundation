'use client'
import { motion } from 'framer-motion'
import DonateButton from '@/components/ui/DonateButton'

const imgArrow      = "https://www.figma.com/api/mcp/asset/fc8bbfd2-b326-4762-829b-7eaf0bb62093"
const imgCardBg     = "https://www.figma.com/api/mcp/asset/335e95eb-2453-4f90-829c-a3cc1301d68a"
const imgCommitment = "https://www.figma.com/api/mcp/asset/e274b69f-ea21-4617-af07-87d8ebd90b02"

const values = [
  { icon: imgCommitment, title: 'Commitment',      desc: "Loyal to our mission and dedicated to the Foundation's long-term goals." },
  { icon: imgCommitment, title: 'Truth',            desc: 'Transparent and honest in all our communications and decisions.' },
  { icon: imgCommitment, title: 'Integrity & Ethics', desc: 'Upholding the highest standards of moral conduct in everything we do.' },
  { icon: imgCommitment, title: 'Transparency',    desc: 'Open and accountable in how we manage and report on our activities.' },
  { icon: imgCommitment, title: 'Innovation',      desc: 'Embracing new ideas and approaches to advance our mission.' },
  { icon: imgCommitment, title: 'Partnership',     desc: 'Building strong relationships with stakeholders to achieve shared goals.' },
  { icon: imgCommitment, title: 'Service',         desc: 'Dedicated to serving our community with excellence and care.' },
  { icon: imgCommitment, title: 'Respect',         desc: 'Valuing the dignity and worth of every individual we serve.' },
]

const inter = { fontFamily: "'Inter', sans-serif" };

function ValueCard({ value, style = {} }) {
  return (
    <div style={{ position: 'relative', backgroundColor: '#FFFDF9', border: '1px solid #E5E6EB', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden', minHeight: '190px', ...style }}>
      <div style={{ border: '1px solid rgba(229,230,235,0.4)', borderRadius: '8px', padding: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', flexShrink: 0 }}>
        <img src={value.icon} alt="" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p style={{ ...inter, fontSize: '20px', fontWeight: 600, color: '#040617', letterSpacing: '-0.2px', lineHeight: '28px', margin: 0, textTransform: 'capitalize' }}>{value.title}</p>
        <p style={{ ...inter, fontSize: '14px', fontWeight: 400, color: '#6F7181', letterSpacing: '0.14px', lineHeight: '22px', margin: 0 }}>{value.desc}</p>
      </div>
      {/* Sparkle bg */}
      <img src={imgCardBg} alt="" style={{ position: 'absolute', top: '-2px', right: '-40px', width: '60%', opacity: 0.5, pointerEvents: 'none' }} />
    </div>
  )
}

export default function Mission() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&family=inter:wght@400&display=swap');

        /* ── DESKTOP ── */
        .mission-desktop {
          display: grid;
          grid-template-columns: 643px 1fr;
          gap: 31px;
          align-items: center;
          padding: 80px 165px;
        }
        .values-grid-desktop {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .mission-mobile { display: none; }

        /* ── MOBILE (≤768px) ── */
        @media (max-width: 768px) {
          .mission-desktop { display: none !important; }
          .mission-mobile  { display: flex !important; }
          .scroll-row::-webkit-scrollbar { display: none; }
          .scroll-row { -ms-overflow-style: none; scrollbar-width: none; }
        }
      `}</style>

      {/* ════════════════════════════════
          DESKTOP — your existing layout
      ════════════════════════════════ */}
      <div className="mission-desktop">

        {/* Left — text panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <h2 style={{ ...inter, fontSize: '75px', fontWeight: 600, color: '#040617', letterSpacing: '-0.75px', lineHeight: '85px', margin: 0, whiteSpace: 'nowrap' }}>
            Our Mission
          </h2>
          <div style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '16px' }}>
            <p style={{ ...inter, fontSize: '24px', fontWeight: 400, color: '#6F7181', letterSpacing: '0.24px', lineHeight: '38px', margin: 0 }}>
              We manage and grow Mico Foundation's assets and infrastructure to support the university's needs, benefit students and staff, and preserve the legacy of the Lady Mico Trust.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <DonateButton text="Read Our Story" href="/about" />
            <a href="/endowments" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFF7CC', color: '#040617', fontSize: '14px', fontWeight: 600, height: '46px', padding: '0 24px', borderRadius: '14px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Become Endowment
            </a>
          </div>
        </motion.div>

        {/* Right — values grid 3x3 with logo in center */}
        <div>
          <div className="values-grid-desktop">
           {values.map((value, i) => {
  const isCenterSlot = i === 4;

  return isCenterSlot ? (
    <motion.div
      key={`mission-group-${i}`}
      className="contents"
    >
      {/* Logo card in center */}
      <motion.div
        key="logo"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        style={{
          backgroundColor: '#FFFDF9',
          border: '1px solid #E5E6EB',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '230px'
        }}
      >
        <img
          src={imgCardBg}
          alt="MICO Foundation"
          style={{
            width: '80%',
            objectFit: 'contain'
          }}
        />
      </motion.div>

      <motion.div
        key={`value-${i}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: i * 0.07
        }}
      >
        <ValueCard
          value={value}
          style={{ minHeight: '230px' }}
        />
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      key={`value-${i}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: i * 0.07
      }}
    >
      <ValueCard
        value={value}
        style={{ minHeight: '230px' }}
      />
    </motion.div>
  );
})}
          </div>
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
          <h2 style={{ ...inter, fontSize: '75px', fontWeight: 600, color: '#040617', letterSpacing: '-0.75px', lineHeight: '85px', margin: 0, textAlign: 'center' }}>
            Our Mission
          </h2>
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