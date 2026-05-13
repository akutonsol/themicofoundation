'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// ── Your existing assets ──
const imgBgPattern      = "/images/home-static/com-sparkle.png"
const imgArrow          ="/images/home-static/button-icon.png"
const imgPhotoRightBottom = "/images/home/com1.png"
const imgPhotoRightTop    = "/images/home/com2.png"
const imgPhotoLeftBottom  = "/images/home/com3.png"
const imgPhotoLeftTop     ="/images/home/com0.png"

// ── Mobile arrow from Figma 383:35782 ──
const imgMobileArrow = "https://www.figma.com/api/mcp/asset/df17be6b-44d4-4f4d-92c0-868d71e5ccd4"

const inter = { fontFamily: "'Inter', sans-serif" };

function useCountUp(target, duration = 2500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

export default function Community() {
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(98765, 2500, hasStarted)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600&family=inter:wght@400&display=swap');

        /* ── DESKTOP ── */
        .comm-desktop { display: flex; padding: 80px 0; min-height: 760px; }
        .comm-mobile  { display: none; }
        .comm-photo   { display: flex; }

        /* ── MOBILE (≤768px) — Figma 383:35782 ── */
        @media (max-width: 768px) {
          .comm-desktop { display: none !important; }
          .comm-mobile  { display: flex !important; }
        }
      `}</style>

      {/* Shared sparkle background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `url('${imgBgPattern}')`,
        backgroundSize: '679px 96px', backgroundRepeat: 'repeat',
        opacity: 0.12, mixBlendMode: 'multiply',
      }} />

      {/* ═══════════════════════════════════
          DESKTOP — your existing layout
      ═══════════════════════════════════ */}
      <div className="comm-desktop" style={{ alignItems: 'center', justifyContent: 'space-between', maxWidth: '1760px', margin: '0 auto', padding: '80px 80px', gap: '40px', position: 'relative', zIndex: 1 }}>

        {/* Left photos */}
        <motion.div className="comm-photo"
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ flexDirection: 'column', gap: '24px', flexShrink: 0 }}
        >
          <div style={{ width: '240px', height: '402px', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={imgPhotoLeftTop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '240px', height: '191px', borderRadius: '14px', overflow: 'hidden' }}>
            <img src={imgPhotoLeftBottom} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        {/* Center */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', maxWidth: '1050px' }}
        >
          <p style={{ ...inter, fontSize: '32px', fontWeight: 600, color: '#040617', letterSpacing: '-0.32px', lineHeight: '46px', textAlign: 'center', margin: 0 }}>
            Join our community for donating and be a part of a positive changes in education
          </p>
          <p style={{ ...inter, fontSize: 'clamp(80px, 10vw, 150px)', fontWeight: 400, color: '#040617', letterSpacing: '1.5px', lineHeight: 1.221, margin: 0, textAlign: 'center' }}>
            {count.toLocaleString()}+
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '300px' }}>
            <p style={{ ...inter, fontSize: '24px', fontWeight: 400, color: '#040617', letterSpacing: '0.24px', lineHeight: '38px', textAlign: 'center', margin: 0 }}>
              People already joined
            </p>
            <a href="/community" style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, padding: '16px 24px', borderRadius: '18px', textDecoration: 'none', width: '100%' }}>
              Join the community
              <img src={imgArrow} alt="" style={{ width: '24px', height: '24px' }} />
            </a>
          </div>
        </motion.div>

        {/* Right photos */}
        <motion.div className="comm-photo"
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ flexDirection: 'column', gap: '24px', flexShrink: 0, alignItems: 'flex-end' }}
        >
          <div style={{ width: '240px', height: '309px', borderRadius: '20px', overflow: 'hidden', alignSelf: 'flex-end' }}>
            <img src={imgPhotoRightTop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '375px', height: '309px', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={imgPhotoRightBottom} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE — Figma 383:35782
          No side photos. Just centered text,
          counter, subtext, full-width button.
          px:24px gap:36px
      ═══════════════════════════════════ */}
      <div className="comm-mobile" style={{
        flexDirection: 'column', gap: '36px', alignItems: 'center',
        padding: '60px 24px', position: 'relative', zIndex: 1,
      }}>
        {/* Heading — 26px SemiBold, centered, Figma spec */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ ...inter, fontSize: '26px', fontWeight: 600, color: '#040617', letterSpacing: '-0.26px', lineHeight: '36px', textAlign: 'center', margin: 0, textTransform: 'capitalize', width: '100%' }}
        >
          Join our community for donating and be a part of a positive changes in education
        </motion.p>

        {/* Counter — 84px Regular, tracking -1.68px, Figma spec */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ ...inter, fontSize: '84px', fontWeight: 400, color: '#040617', letterSpacing: '-1.68px', lineHeight: 1.221, margin: 0, textAlign: 'center', width: '100%', textTransform: 'capitalize' }}
        >
          {count.toLocaleString()}+
        </motion.p>

        {/* Subtext + full-width button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%' }}
        >
          <p style={{ ...inter, fontSize: '24px', fontWeight: 400, color: '#040617', letterSpacing: '0.24px', lineHeight: '38px', textAlign: 'center', margin: 0 }}>
            People already joined
          </p>
          {/* Full width button — Figma: w-full, rounded-18px */}
          <a href="/community" style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, padding: '16px 24px', borderRadius: '18px', textDecoration: 'none', width: '100%' }}>
            Join the community
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
              <img src={imgMobileArrow} alt="" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}