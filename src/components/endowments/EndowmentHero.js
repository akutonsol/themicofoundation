'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const sora = { fontFamily: "'Sora', sans-serif" }
const manrope = { fontFamily: "'Manrope', sans-serif" }

const FALLBACK_PHOTOS = [
  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
]

const staticStats = [
  { value: 165, label: 'Active Family Endowments' },
  { value: 479, label: 'Active Research Endowments' },
  { value: 1980, label: 'Active Individual Endowments' },
  { value: 174, label: 'Active Corporate Endowments' },
]

function useCounter(end, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const duration = 2000
    let startTime = null
    function animate(currentTime) {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, start])
  return value
}

function StatBlock({ stat, started, index }) {
  const count = useCounter(stat.value, started)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      style={{ textAlign: 'center' }}
    >
      <p style={{ ...sora, fontSize: 'clamp(72px, 10vw, 108px)', fontWeight: 400, color: '#040617', lineHeight: 1, letterSpacing: '-0.04em', margin: '0 0 24px' }}>
        {count.toLocaleString()}+
      </p>
      <p style={{ ...manrope, fontSize: 'clamp(18px, 2.5vw, 25px)', color: '#040617', lineHeight: 1.3, margin: 0 }}>
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function EndowmentsHero() {
  const [countersStarted, setCountersStarted] = useState(false)
  const [content, setContent] = useState({
    heroHeading: 'A legacy shaped by you',
    heroCtaText: 'Fill Endowment Form',
    heroCtaLink: '#endowment-form',
    stats: staticStats,
    photos: FALLBACK_PHOTOS,
  })
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersStarted(true) },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.endowment)
        if (data) {
          setContent({
            heroHeading: data.heroHeading || content.heroHeading,
            heroCtaText: data.heroCtaText || content.heroCtaText,
            heroCtaLink: data.heroCtaLink || content.heroCtaLink,
            stats: data.stats?.length > 0 ? data.stats : staticStats,
            photos: [
              data.photoTopLeft ? urlFor(data.photoTopLeft).width(500).url() : FALLBACK_PHOTOS[0],
              data.photoTopRight ? urlFor(data.photoTopRight).width(500).url() : FALLBACK_PHOTOS[1],
              data.photoBottomLeft ? urlFor(data.photoBottomLeft).width(500).url() : FALLBACK_PHOTOS[2],
              data.photoBottomRight ? urlFor(data.photoBottomRight).width(700).url() : FALLBACK_PHOTOS[3],
            ],
          })
        }
      } catch (error) {
        console.error('Error fetching endowment content:', error)
      }
    }
    fetchContent()
  }, [])

  const sparkles = [
    { left: '4%', top: '2%', color: '#B9BEC8' },
    { right: '4%', top: '2%', color: '#B9BEC8' },
    { left: '8%', top: '48%', color: '#FFD900' },
    { right: '16%', top: '48%', color: '#FFD900' },
    { left: '4%', bottom: '6%', color: '#B9BEC8' },
    { right: '4%', bottom: '6%', color: '#B9BEC8' },
  ]

  return (
    <section ref={sectionRef} style={{ backgroundColor: '#FFFDF9', minHeight: '900px', position: 'relative', overflow: 'hidden', padding: '80px 20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Manrope:wght@400&display=swap');
        .photo-corner { display: none !important; }
        @media (min-width: 1024px) { .photo-corner { display: block !important; } }
      `}</style>

      {/* Background grids */}
      {['left', 'right'].map(side => (
        <div key={side} style={{ position: 'absolute', [side]: '4%', top: 0, width: '30%', height: '100%', opacity: 0.12, pointerEvents: 'none' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(10, 1fr)', gap: '8px', height: '100%' }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <div key={i} style={{ border: '1px solid #040617', borderRadius: '16px', opacity: 0.25 }} />
            ))}
          </div>
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <div key={i} style={{ position: 'absolute', ...s, fontSize: '42px', pointerEvents: 'none', lineHeight: 1 }}>✦</div>
      ))}

      <div style={{ maxWidth: '1720px', margin: '0 auto', position: 'relative', minHeight: '800px' }}>

        {/* Corner photos */}
        {[
          { className: 'photo-corner', style: { position: 'absolute', left: '4%', top: '20px', width: '220px', height: '360px', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-3)' }, src: content.photos[0] },
          { className: 'photo-corner', style: { position: 'absolute', right: '7%', top: '40px', width: '220px', height: '275px', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-3)' }, src: content.photos[1] },
          { className: 'photo-corner', style: { position: 'absolute', left: 0, bottom: '70px', width: '220px', height: '175px', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-3)' }, src: content.photos[2] },
          { className: 'photo-corner', style: { position: 'absolute', right: 0, bottom: '70px', width: '340px', height: '275px', borderRadius: '18px', overflow: 'hidden', boxShadow: 'var(--shadow-3)' }, src: content.photos[3] },
        ].map((photo, i) => (
          <motion.div key={i} className={photo.className} style={photo.style}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 + i * 0.05 }}>
            <img src={photo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}

        {/* Center content */}
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '940px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '800px', textAlign: 'center', padding: '0 20px' }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ ...sora, fontSize: 'clamp(34px, 5vw, 64px)', fontWeight: 700, color: '#040617', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 80px', maxWidth: '900px' }}>
            {content.heroHeading}
          </motion.h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '80px 100px', width: '100%', marginBottom: '60px' }}>
            {content.stats.map((stat, i) => (
              <StatBlock key={i} stat={stat} started={countersStarted} index={i} />
            ))}
          </div>

          <motion.a href={content.heroCtaLink} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}
            style={{ ...sora, display: 'inline-flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '17px', fontWeight: 600, padding: '18px 32px', borderRadius: '18px', textDecoration: 'none', transition: 'transform 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {content.heroCtaText}
            <span style={{ fontSize: '20px', lineHeight: 1 }}>→</span>
          </motion.a>
        </div>
      </div>
    </section>
  )
}