'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const imgBgPattern = "/images/home-static/com-sparkle.png"
const imgArrow = "/images/home-static/button-icon.png"
const imgMobileArrow = "https://www.figma.com/api/mcp/asset/df17be6b-44d4-4f4d-92c0-868d71e5ccd4"

const inter = { fontFamily: "'Inter', sans-serif" };

function useCountUp(target, duration = 2500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || !target) return
    // FIX: ensure target is a number
    const numTarget = Number(target)
    if (isNaN(numTarget) || numTarget <= 0) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numTarget))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

export default function CommunityImpact() {
  const [communityData, setCommunityData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    async function fetchCommunityImpact() {
      try {
        const data = await client.fetch(queries.communityImpact)
        setCommunityData(data)
      } catch (error) {
        console.error('Error fetching community impact:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCommunityImpact()
  }, [])

  // FIX: lower threshold + guard + runs after data loads
  useEffect(() => {
    if (!communityData) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect() // stop observing once triggered
        }
      },
      { threshold: 0.05 } // FIX: lowered from 0.2 — triggers earlier
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [communityData])

  // FIX: parse target as number
  const target = Number(communityData?.counterTarget) || 0
  const count = useCountUp(target, 2500, hasStarted)

  if (loading) {
    return (
      <section style={{ backgroundColor: '#FFFDF9', padding: '80px 0', minHeight: '760px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...inter, color: '#040617', fontSize: '24px' }}>Loading...</p>
      </section>
    )
  }

  if (!communityData) {
    return (
      <section style={{ backgroundColor: '#FFFDF9', padding: '80px 0', minHeight: '760px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ ...inter, color: '#040617', fontSize: '24px' }}>Community Impact data not available</p>
      </section>
    )
  }

  const photoLeftTop    = urlFor(communityData.photoLeftTop).width(480).url()
  const photoLeftBottom = urlFor(communityData.photoLeftBottom).width(480).url()
  const photoRightTop   = urlFor(communityData.photoRightTop).width(480).url()
  const photoRightBottom = urlFor(communityData.photoRightBottom).width(750).url()

  return (
    <section ref={ref} style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .comm-desktop { display: flex; padding: 80px 0; min-height: 760px; }
        .comm-mobile  { display: none; }
        .comm-photo   { display: flex; }
        @media (max-width: 768px) {
          .comm-desktop { display: none !important; }
          .comm-mobile  { display: flex !important; }
        }
      `}</style>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: `url('${imgBgPattern}')`, backgroundSize: '679px 96px', backgroundRepeat: 'repeat', opacity: 0.12, mixBlendMode: 'multiply' }} />

      {/* DESKTOP */}
      <div className="comm-desktop" style={{ alignItems: 'center', justifyContent: 'space-between', maxWidth: '1760px', margin: '0 auto', padding: '80px 80px', gap: '40px', position: 'relative', zIndex: 1 }}>

        <motion.div className="comm-photo" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ flexDirection: 'column', gap: '24px', flexShrink: 0 }}>
          <div style={{ width: '240px', height: '402px', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={photoLeftTop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '240px', height: '191px', borderRadius: '14px', overflow: 'hidden' }}>
            <img src={photoLeftBottom} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px', maxWidth: '1050px' }}>
          <p style={{ ...inter, fontSize: '32px', fontWeight: 600, color: '#040617', letterSpacing: '-0.32px', lineHeight: '46px', textAlign: 'center', margin: 0 }}>
            {communityData.headline}
          </p>
          <p style={{ ...inter, fontSize: 'clamp(80px, 10vw, 150px)', fontWeight: 400, color: '#040617', letterSpacing: '1.5px', lineHeight: 1.221, margin: 0, textAlign: 'center' }}>
            {count.toLocaleString()}+
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '300px' }}>
            <p style={{ ...inter, fontSize: '24px', fontWeight: 400, color: '#040617', letterSpacing: '0.24px', lineHeight: '38px', textAlign: 'center', margin: 0 }}>
              {communityData.counterLabel}
            </p>
            <a href={communityData.buttonLink} style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, padding: '16px 24px', borderRadius: '18px', textDecoration: 'none', width: '100%' }}>
              {communityData.buttonText}
              <img src={imgArrow} alt="" style={{ width: '24px', height: '24px' }} />
            </a>
          </div>
        </motion.div>

        <motion.div className="comm-photo" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ flexDirection: 'column', gap: '24px', flexShrink: 0, alignItems: 'flex-end' }}>
          <div style={{ width: '240px', height: '309px', borderRadius: '20px', overflow: 'hidden', alignSelf: 'flex-end' }}>
            <img src={photoRightTop} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ width: '375px', height: '309px', borderRadius: '20px', overflow: 'hidden' }}>
            <img src={photoRightBottom} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="comm-mobile" style={{ flexDirection: 'column', gap: '36px', alignItems: 'center', padding: '60px 24px', position: 'relative', zIndex: 1 }}>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ ...inter, fontSize: '26px', fontWeight: 600, color: '#040617', letterSpacing: '-0.26px', lineHeight: '36px', textAlign: 'center', margin: 0, textTransform: 'capitalize', width: '100%' }}>
          {communityData.headline}
        </motion.p>

        <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          style={{ ...inter, fontSize: '84px', fontWeight: 400, color: '#040617', letterSpacing: '-1.68px', lineHeight: 1.221, margin: 0, textAlign: 'center', width: '100%' }}>
          {count.toLocaleString()}+
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%' }}>
          <p style={{ ...inter, fontSize: '24px', fontWeight: 400, color: '#040617', letterSpacing: '0.24px', lineHeight: '38px', textAlign: 'center', margin: 0 }}>
            {communityData.counterLabel}
          </p>
          <a href={communityData.buttonLink} style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, padding: '16px 24px', borderRadius: '18px', textDecoration: 'none', width: '100%' }}>
            {communityData.buttonText}
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', flexShrink: 0 }}>
              <img src={imgMobileArrow} alt="" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}