'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const GOLD = '#f3af19'
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1700&q=80'

// Card palette: black, green, gold, yellow (cycled by position).
const CARD_COLORS = [
  { bg: '#040617', fg: '#FFFFFF', accent: '#f3af19' },
  { bg: '#1A8C4A', fg: '#FFFFFF', accent: '#FFD900' },
  { bg: '#f3af19', fg: '#141210', accent: '#141210' },
  { bg: '#FFD900', fg: '#141210', accent: '#141210' },
]

const DEFAULTS = {
  legacyEyebrow: 'Endowments',
  legacyTitle: 'Create a lasting legacy through education.',
  legacySubtitle: 'Your endowment empowers generations of Jamaican educators and students to learn, lead, and transform our communities.',
  legacyCtaText: 'Explore Endowment Options',
  legacyCtaLink: '#endowment-form',
  legacyTaxTitle: 'Tax Benefits',
  legacyTaxBody: "All financial contributions to The Mico Foundation's Endowment Programme are tax-deductible in accordance with the applicable laws of Jamaica.",
  legacyCardsHeading: 'Join a community of active endowments united by a shared vision to strengthen and transform The Mico University College community and shape the future of education together.',
  legacyCards: [
    { label: 'General Endowment Grant', icon: 'family', description: 'An unrestricted gift that supports the Foundation’s greatest priorities across The Mico University College — funding scholarships, programmes, and campus needs wherever the impact is greatest.' },
    { label: 'Legacy Endowment Grant', icon: 'research', description: 'A named, enduring fund created in your honour or in memory of a loved one — preserving your legacy while permanently supporting education at The Mico.' },
    { label: 'Leadership Legacy Endowment Grant', icon: 'individual', description: 'A transformational gift that champions leadership development, academic excellence, and the training of outstanding educators for Jamaica and the Caribbean.' },
    { label: 'Corporate Endowment Grant', icon: 'corporate', description: 'A partnership gift from a company or organisation — investing in education, research, and community development while building a lasting corporate legacy at The Mico.' },
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

export default function EndowmentLegacy({ variant = 'both' }) {
  const [content, setContent] = useState(DEFAULTS)
  const [heroImg, setHeroImg] = useState(FALLBACK_IMG)
  const [active, setActive] = useState(null)

  useEffect(() => {
    async function fetchContent() {
      try {
        const d = await client.fetch(queries.endowment)
        if (d) {
          setContent(prev => {
            const merged = { ...prev }
            Object.keys(DEFAULTS).forEach(k => { if (d[k]) merged[k] = d[k] })
            const validCards = (d.legacyCards || []).filter(c => c?.label?.trim())
            if (validCards.length) merged.legacyCards = validCards
            return merged
          })
          if (d.legacyImage) setHeroImg(urlFor(d.legacyImage).width(1700).url())
        }
      } catch (error) {
        console.error('Error fetching endowment legacy content:', error)
      }
    }
    fetchContent()
  }, [])

  useEffect(() => {
    if (!active) return
    const onKey = e => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [active])

  const cards = (content.legacyCards?.length ? content.legacyCards : DEFAULTS.legacyCards)
    .map((c, i) => ({ ...c, color: CARD_COLORS[i % CARD_COLORS.length] }))

  return (
    <section className="el">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap');

        .el { background: #F6F0E2; }

        /* ── HERO BAND ── */
        .el-hero { position: relative; min-height: clamp(460px, 58vh, 640px); overflow: hidden; background: #0A0906; display: flex; align-items: center; }
        .el-hero-media { position: absolute; inset: 0; z-index: 0; }
        .el-hero-media img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
        .el-hero-scrim { position: absolute; inset: 0; z-index: 1; pointer-events: none; background:
          linear-gradient(90deg, rgba(243,175,25,0.40) 0%, rgba(243,175,25,0.12) 30%, rgba(243,175,25,0) 55%),
          linear-gradient(90deg, rgba(4,6,23,0.92) 0%, rgba(4,6,23,0.78) 40%, rgba(4,6,23,0.38) 68%, rgba(4,6,23,0.10) 100%); }
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
        .el-cards-wrap { max-width: 1560px; margin: 0 auto; padding: clamp(52px,6vw,84px) clamp(28px,5vw,72px) clamp(60px,7vw,96px); text-align: center; }
        .el-ornament { display:flex; align-items:center; justify-content:center; gap:16px; color:${GOLD}; margin:0 0 24px; }
        .el-ornament::before, .el-ornament::after { content:''; width:clamp(50px,10vw,120px); height:1px; background: linear-gradient(90deg, transparent, rgba(199,154,42,0.6)); }
        .el-ornament::after { background: linear-gradient(90deg, rgba(199,154,42,0.6), transparent); }
        .el-ornament span { font-size:14px; transform: rotate(45deg); display:inline-block; width:12px; height:12px; border:1.5px solid ${GOLD}; }
        .el-cards-heading { font-family:'Inter', sans-serif; font-size: clamp(22px,2.4vw,34px); font-weight:700; letter-spacing:-0.02em; color:#12130F; max-width:1100px; margin:0 auto clamp(30px,3.5vw,46px); line-height:1.2; }

        .el-cards { display:grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: clamp(18px,1.8vw,26px); }
        @media (max-width: 900px) { .el-cards { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 520px) { .el-cards { grid-template-columns: 1fr; } }

        .el-card { position:relative; border:none; border-radius:16px; min-height: clamp(230px,20vw,280px); padding: clamp(34px,3vw,48px) clamp(20px,1.8vw,28px); display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; cursor:pointer; overflow:hidden; box-shadow: var(--shadow-3); transition: transform .25s var(--ease-emphasized), box-shadow .25s var(--ease-emphasized); }
        .el-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-4); }
        .el-card-icon { width: clamp(52px,4.6vw,66px); height: clamp(52px,4.6vw,66px); margin-bottom:20px; }
        .el-card-icon svg { width:100%; height:100%; }
        .el-card-label { font-family:'Inter', sans-serif; font-size: clamp(18px,1.55vw,23px); font-weight:800; letter-spacing:-0.02em; margin:0; line-height:1.2; }
        .el-card-rule { width:40px; height:3px; border-radius:3px; margin-top:16px; }
        .el-card-more { font-family:'Inter', sans-serif; font-size:12px; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; margin:16px 0 0; opacity:0.85; }

        /* ── POPOVER ── */
        .elm-overlay { position:fixed; inset:0; background:rgba(4,6,23,0.6); backdrop-filter:blur(4px); z-index:5000; }
        .elm-wrap { position:fixed; inset:0; z-index:5001; display:flex; align-items:center; justify-content:center; padding: clamp(16px,4vw,40px); }
        .elm-modal { position:relative; width:100%; max-width:540px; background:#FFFDF9; border-radius:22px; overflow:hidden; box-shadow:0 40px 90px rgba(4,6,23,0.4); }
        .elm-head { padding: clamp(30px,4vw,44px) clamp(26px,3vw,40px); display:flex; flex-direction:column; align-items:flex-start; gap:16px; }
        .elm-head-icon { width:56px; height:56px; }
        .elm-head-icon svg { width:100%; height:100%; }
        .elm-head h3 { font-family:'Inter',sans-serif; font-size: clamp(24px,3vw,32px); font-weight:800; letter-spacing:-0.02em; line-height:1.1; margin:0; }
        .elm-body { padding: clamp(26px,3vw,36px) clamp(26px,3vw,40px) clamp(30px,3.5vw,40px); }
        .elm-desc { font-family:'Inter',sans-serif; font-size: clamp(15px,1.3vw,17px); line-height:1.75; color:#3A3D4A; margin:0 0 22px; }
        .elm-tax { border-top:1px solid rgba(4,6,23,0.09); padding-top:16px; margin:0 0 26px; }
        .elm-tax-title { font-family:'Inter',sans-serif; font-size:15px; font-weight:800; letter-spacing:0.01em; color:#040617; margin:0 0 5px; }
        .elm-tax-body { font-family:'Inter',sans-serif; font-size:14px; line-height:1.6; color:#3A3D4A; margin:0; }
        .elm-cta { display:inline-flex; align-items:center; gap:10px; background:#040617; color:#FFD900; font-family:'Inter',sans-serif; font-size:14px; font-weight:700; padding:14px 26px; border-radius:100px; text-decoration:none; transition: background .2s, transform .2s; }
        .elm-cta:hover { background:#12162b; transform: translateY(-2px); }
        .elm-close { position:absolute; top:16px; right:16px; width:40px; height:40px; border-radius:50%; border:none; background:rgba(255,255,255,0.85); color:#141210; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:22px; line-height:1; }
        .elm-close:hover { background:#fff; }
      `}</style>

      {/* ── HERO ── */}
      {variant !== 'cards' && (
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
      )}

      {/* ── CARDS ── */}
      {variant !== 'hero' && (
      <div className="el-cards-wrap">
        <div className="el-ornament"><span /></div>
        <motion.h2 className="el-cards-heading"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          {content.legacyCardsHeading}
        </motion.h2>
        <div className="el-cards">
          {cards.map((c, i) => (
            <motion.button key={i} type="button" className="el-card"
              onClick={() => setActive(c)}
              style={{ background: c.color.bg, color: c.color.fg }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="el-card-icon" style={{ color: c.color.fg }}>{ICONS[c.icon] || ICONS.family}</div>
              <p className="el-card-label">{c.label}</p>
              <span className="el-card-rule" style={{ background: c.color.accent }} />
              <p className="el-card-more" style={{ color: c.color.accent }}>Learn more</p>
            </motion.button>
          ))}
        </div>
      </div>
      )}

      {/* ── POPOVER ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div className="elm-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setActive(null)} />
            <div className="elm-wrap" onClick={() => setActive(null)}>
              <motion.div className="elm-modal" onClick={e => e.stopPropagation()}
                initial={{ opacity: 0, y: 26, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              >
                <button type="button" className="elm-close" onClick={() => setActive(null)} aria-label="Close">×</button>
                <div className="elm-head" style={{ background: active.color.bg, color: active.color.fg }}>
                  <div className="elm-head-icon">{ICONS[active.icon] || ICONS.family}</div>
                  <h3>{active.label}</h3>
                </div>
                <div className="elm-body">
                  <p className="elm-desc">{active.description || 'Details for this endowment type will be available soon.'}</p>
                  {(content.legacyTaxBody || content.legacyTaxTitle) && (
                    <div className="elm-tax">
                      {content.legacyTaxTitle && <p className="elm-tax-title">{content.legacyTaxTitle}</p>}
                      {content.legacyTaxBody && <p className="elm-tax-body">{content.legacyTaxBody}</p>}
                    </div>
                  )}
                  <a href="#endowment-form" className="elm-cta" onClick={() => setActive(null)}>
                    Start this endowment
                    <svg viewBox="0 0 20 20" width="16" height="16" fill="none"><path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
