'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const GOLD = '#f3af19'
// Wide splash image for the banner (used for now — the CMS image is ignored
// below because a tall portrait crops badly here; re-enable when a wide one is set).
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1700&q=80'

const DEFAULTS = {
  legacyEyebrow: 'Endowments',
  legacyTitle: 'Create a lasting legacy through education.',
  legacySubtitle: 'Your endowment empowers generations of Jamaican educators and students to learn, lead, and transform our communities.',
  legacyCtaText: 'Explore Endowment Options',
  legacyCtaLink: '#endowment-form',
  legacyCardsHeading: 'A legacy shaped by you',
  legacyCards: [
    { label: 'Family Endowments', icon: 'family' },
    { label: 'Research Endowments', icon: 'research' },
    { label: 'Individual Endowments', icon: 'individual' },
    { label: 'Corporate Endowments', icon: 'corporate' },
  ],
}

const ICONS = {
  family: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="16" r="5" /><circle cx="32" cy="18" r="4" />
      <path d="M8 36c0-5.5 4.5-10 10-10s10 4.5 10 10" /><path d="M30 28c4.4 0 8 3.6 8 8" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 14c-4-3-9-3-14-1v22c5-2 10-2 14 1 4-3 9-3 14-1V13c-5-2-10-2-14 1Z" /><path d="M24 14v22" />
    </svg>
  ),
  individual: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="17" r="6" /><path d="M12 38c0-6.6 5.4-12 12-12s12 5.4 12 12" />
    </svg>
  ),
  corporate: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 8 40 17H8L24 8Z" /><path d="M12 17v18M20 17v18M28 17v18M36 17v18" /><path d="M8 39h32" />
    </svg>
  ),
}

export default function EndowmentLegacy() {
  const [content, setContent] = useState(DEFAULTS)
  const [heroImg, setHeroImg] = useState(FALLBACK_IMG)

  useEffect(() => {
    async function fetchContent() {
      try {
        const d = await client.fetch(queries.endowment)
        if (d) {
          setContent(prev => {
            const merged = { ...prev }
            Object.keys(DEFAULTS).forEach(k => { if (d[k]) merged[k] = d[k] })
            return merged
          })
          // Using a wide splash image for now — ignore the CMS image temporarily.
          // if (d.legacyImage) setHeroImg(urlFor(d.legacyImage).width(1400).url())
        }
      } catch (error) {
        console.error('Error fetching endowment legacy content:', error)
      }
    }
    fetchContent()
  }, [])

  const cards = content.legacyCards?.length ? content.legacyCards : DEFAULTS.legacyCards

  return (
    <section className="el">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap');

        .el { background: #F6F0E2; }

        /* ── HERO BAND — full-width image with a gold/black gradient scrim ── */
        .el-hero { position: relative; min-height: clamp(460px, 58vh, 640px); overflow: hidden; background: #0A0A0C; display: flex; align-items: center; }
        .el-hero-media { position: absolute; inset: 0; z-index: 0; }
        .el-hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        /* two stacked gradients: a warm gold wash on the left, and the dark blend fading to reveal the image on the right */
        /* even warm-dark panel (black with a subtle gold undertone) that fades smoothly to reveal the image */
        .el-hero-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none; background:
          linear-gradient(160deg, rgba(243,175,25,0.09) 0%, rgba(243,175,25,0) 42%),
          linear-gradient(100deg, #12100A 0%, #12100A 32%, rgba(18,16,10,0.86) 44%, rgba(18,16,10,0.46) 56%, rgba(18,16,10,0.12) 66%, rgba(18,16,10,0) 74%); }
        .el-hero-inner { position: relative; z-index: 2; width: 100%; max-width: 1440px; margin: 0 auto; padding: clamp(48px,6vw,88px) clamp(28px,5vw,80px); }
        .el-hero-text { max-width: 620px; }
        .el-eyebrow { font-family:'Inter',sans-serif; font-size:13px; font-weight:800; letter-spacing:0.28em; text-transform:uppercase; color:${GOLD}; margin:0 0 8px; }
        .el-eyebrow-rule { width:56px; height:3px; background:${GOLD}; border-radius:3px; margin:0 0 26px; }
        .el-title { font-family:'Cormorant Garamond', serif; font-size: clamp(42px,5.4vw,76px); font-weight:600; line-height:1.02; letter-spacing:-0.01em; color:#fff; margin:0 0 22px; }
        .el-sub { font-family:'Inter',sans-serif; font-size: clamp(16px,1.4vw,18px); line-height:1.65; color:rgba(255,255,255,0.74); margin:0 0 clamp(28px,4vw,40px); max-width:500px; }
        .el-cta { display:inline-flex; align-items:center; justify-content:center; align-self:flex-start; background:${GOLD}; color:#141210; font-family:'Inter',sans-serif; font-size:16px; font-weight:700; padding:18px 40px; border-radius:6px; text-decoration:none; transition: background .2s, transform .2s; box-shadow:0 14px 34px rgba(243,175,25,0.28); }
        .el-cta:hover { background:#FFD900; transform: translateY(-2px); }

        @media (max-width: 760px) {
          .el-hero { min-height: clamp(520px, 88vw, 640px); align-items: flex-end; }
          .el-hero-media img { object-position: center top; }
          .el-hero-scrim { background: linear-gradient(180deg, rgba(8,8,10,0.35) 0%, rgba(8,8,10,0.55) 40%, rgba(8,8,10,0.92) 100%); }
        }

        /* ── CARDS ── */
        .el-cards-wrap { max-width: 1240px; margin: 0 auto; padding: clamp(44px,5vw,68px) clamp(24px,4vw,48px) clamp(48px,5.5vw,76px); text-align: center; }
        .el-ornament { display:flex; align-items:center; justify-content:center; gap:16px; color:${GOLD}; margin:0 0 22px; }
        .el-ornament::before, .el-ornament::after { content:''; width:clamp(50px,10vw,120px); height:1px; background: linear-gradient(90deg, transparent, rgba(199,154,42,0.6)); }
        .el-ornament::after { background: linear-gradient(90deg, rgba(199,154,42,0.6), transparent); }
        .el-ornament span { font-size:14px; transform: rotate(45deg); display:inline-block; width:12px; height:12px; border:1.5px solid ${GOLD}; }
        .el-cards-heading { font-family:'Cormorant Garamond', serif; font-size: clamp(32px,4vw,52px); font-weight:600; letter-spacing:-0.01em; color:#12130F; margin:0 0 clamp(30px,3.5vw,44px); }

        .el-cards { display:grid; grid-template-columns: repeat(4, 1fr); gap: clamp(14px,1.4vw,20px); }
        @media (max-width: 900px) { .el-cards { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .el-cards { grid-template-columns: 1fr; } }

        .el-card { position:relative; background:#FCF9F0; border:1px solid #E3D8BE; border-radius:12px; min-height: clamp(190px,16vw,224px); padding: clamp(30px,2.6vw,40px) clamp(14px,1.2vw,20px); display:flex; flex-direction:column; align-items:center; justify-content:center; transition: transform .25s ease, box-shadow .25s ease; }
        .el-card::before { content:''; position:absolute; inset:7px; border:1px solid #EADFC6; border-radius:8px; pointer-events:none; }
        .el-card:hover { transform: translateY(-5px); box-shadow: 0 22px 48px rgba(20,19,15,0.13); }
        .el-card-icon { width: clamp(48px,4.4vw,60px); height: clamp(48px,4.4vw,60px); color:#1c1c1a; margin-bottom:20px; }
        .el-card-icon svg { width:100%; height:100%; }
        .el-card-label { font-family:'Cormorant Garamond', serif; font-size: clamp(19px,1.5vw,23px); font-weight:600; color:#12130F; margin:0; line-height:1.2; white-space:nowrap; }
        .el-card-rule { width:38px; height:2px; background:${GOLD}; border-radius:2px; margin-top:14px; }
        @media (max-width: 520px) { .el-card-label { white-space:normal; } }
      `}</style>

      {/* ── HERO ── */}
      <div className="el-hero">
        <div className="el-hero-media"><img src={heroImg} alt="Mico endowments" /></div>
        <div className="el-hero-scrim" />
        <div className="el-hero-inner">
          <motion.div className="el-hero-text"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <p className="el-eyebrow">{content.legacyEyebrow}</p>
            <div className="el-eyebrow-rule" />
            <h1 className="el-title">{content.legacyTitle}</h1>
            <p className="el-sub">{content.legacySubtitle}</p>
            <a href={content.legacyCtaLink} className="el-cta">{content.legacyCtaText}</a>
          </motion.div>
        </div>
      </div>

      {/* ── CARDS ── */}
      <div className="el-cards-wrap">
        <div className="el-ornament"><span /></div>
        <motion.h2 className="el-cards-heading"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          {content.legacyCardsHeading}
        </motion.h2>
        <div className="el-cards">
          {cards.map((c, i) => (
            <motion.div key={i} className="el-card"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="el-card-icon">{ICONS[c.icon] || ICONS.family}</div>
              <p className="el-card-label">{c.label}</p>
              <span className="el-card-rule" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
