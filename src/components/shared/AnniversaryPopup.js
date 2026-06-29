'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 190th anniversary logo — drop the artwork at /public/images/mico-190-years.png
const anniversaryLogo = '/images/mico-190-years.png'

export default function AnniversaryPopup() {
  const [open, setOpen]       = useState(false)
  const [imgOk, setImgOk]     = useState(true)

  useEffect(() => {
    // Show once per browser session, ~5s after entering the site
    let seen = false
    try { seen = sessionStorage.getItem('mf_190_seen') === '1' } catch (_) {}
    if (seen) return
    const t = setTimeout(() => setOpen(true), 5000)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    try { sessionStorage.setItem('mf_190_seen', '1') } catch (_) {}
  }

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  const inter = { fontFamily: "'Inter', sans-serif" }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="anniv-backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(4,6,23,0.78)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px,4vw,40px)' }}
        >
          <motion.div
            key="anniv-card"
            initial={{ opacity: 0, scale: 0.9, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative', width: '100%', maxWidth: '520px',
              background: 'linear-gradient(165deg, #FFFDF9 0%, #FFF7E6 100%)',
              borderRadius: '24px', padding: 'clamp(32px,5vw,48px) clamp(24px,4vw,44px)',
              textAlign: 'center', boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              border: '1px solid rgba(245,183,0,0.4)',
            }}
          >
            {/* Close */}
            <button onClick={close} aria-label="Close"
              style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #E5E6EB', background: '#fff', color: '#040617', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </button>

            {/* Logo */}
            {imgOk ? (
              <img
                src={anniversaryLogo}
                alt="The Mico University College — 190 Years"
                onError={() => setImgOk(false)}
                style={{ width: 'clamp(180px,42vw,240px)', height: 'auto', objectFit: 'contain', margin: '0 auto 24px', display: 'block' }}
              />
            ) : (
              <div style={{ margin: '0 auto 24px', width: 'fit-content' }}>
                <p style={{ ...inter, fontSize: '64px', fontWeight: 800, color: '#040617', lineHeight: 1, margin: 0 }}>190</p>
                <p style={{ ...inter, fontSize: '18px', fontWeight: 700, color: '#B8860B', letterSpacing: '0.2em', margin: '4px 0 0' }}>YEARS</p>
              </div>
            )}

            <p style={{ ...inter, fontSize: '12px', fontWeight: 700, color: '#B8860B', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Honouring Our Legacy · 1836–2026
            </p>

            <h2 style={{ ...inter, fontSize: 'clamp(26px,4vw,34px)', fontWeight: 800, color: '#040617', letterSpacing: '-0.5px', lineHeight: 1.15, margin: '0 0 16px' }}>
              190 Years of Excellence
            </h2>

            <p style={{ ...inter, fontSize: 'clamp(15px,1.4vw,17px)', color: '#5A5C6B', lineHeight: 1.7, margin: '0 0 28px' }}>
              Join us as Mico University College proudly celebrates 190 years of excellence in education, leadership, and nation-building.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/donate" onClick={close}
                style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFD900', color: '#040617', fontSize: '15px', fontWeight: 700, padding: '14px 30px', borderRadius: '12px', textDecoration: 'none' }}>
                Celebrate With Us
              </a>
              <button onClick={close}
                style={{ ...inter, backgroundColor: 'transparent', color: '#6F7181', fontSize: '15px', fontWeight: 600, padding: '14px 22px', borderRadius: '12px', border: '1px solid #E5E6EB', cursor: 'pointer' }}>
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
