'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const sora = { fontFamily: "'Sora', sans-serif" }
const manrope = { fontFamily: "'Manrope', sans-serif" }

// Replace with actual Figma photo URLs
const PHOTO_FAMILY = 'https://www.figma.com/api/mcp/asset/58282572-af90-4ca8-b4bf-d1e7e83fa489'
const PHOTO_DESK = 'https://www.figma.com/api/mcp/asset/18129951-6d3e-44c6-a63b-d39145a1e45a'
const PHOTO_DOCS = 'https://www.figma.com/api/mcp/asset/a42a500c-8f65-43a7-8a8d-9d0a945139c7'
const PHOTO_MEETING = 'https://www.figma.com/api/mcp/asset/5ab5b2eb-daf3-4bf3-99e6-7d3e8050197b'

// Counter animation hook
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
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      
      if (progress < 1) requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
  }, [end, start])
  
  return value
}

export default function EndowmentsHero() {
  const [countersStarted, setCountersStarted] = useState(false)
  const sectionRef = useRef(null)
  
  // Start counters when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCountersStarted(true)
      },
      { threshold: 0.3 }
    )
    
    if (sectionRef.current) observer.observe(sectionRef.current)
    
    return () => observer.disconnect()
  }, [])
  
  const count1 = useCounter(165, countersStarted)
  const count2 = useCounter(479, countersStarted)
  const count3 = useCounter(1980, countersStarted)
  const count4 = useCounter(174, countersStarted)
  
  return (
    <section 
      ref={sectionRef}
      style={{
        backgroundColor: '#FFFDF9',
        minHeight: '900px',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 20px',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Manrope:wght@400&display=swap');
      `}</style>

      {/* Background decorative grids - left and right */}
      <div style={{
        position: 'absolute',
        left: '4%',
        top: 0,
        width: '30%',
        height: '100%',
        opacity: 0.12,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          gap: '8px',
          height: '100%',
        }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} style={{
              border: '1px solid #040617',
              borderRadius: '16px',
              opacity: 0.25,
            }} />
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        right: '4%',
        top: 0,
        width: '30%',
        height: '100%',
        opacity: 0.12,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(10, 1fr)',
          gap: '8px',
          height: '100%',
        }}>
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} style={{
              border: '1px solid #040617',
              borderRadius: '16px',
              opacity: 0.25,
            }} />
          ))}
        </div>
      </div>

      {/* Sparkle decorations */}
      {[
        { left: '4%', top: '2%', color: '#B9BEC8', size: '42px' },
        { right: '4%', top: '2%', color: '#B9BEC8', size: '42px' },
        { left: '8%', top: '48%', color: '#FFD900', size: '32px' },
        { right: '16%', top: '48%', color: '#FFD900', size: '32px' },
        { left: '4%', bottom: '6%', color: '#B9BEC8', size: '42px' },
        { right: '4%', bottom: '6%', color: '#B9BEC8', size: '42px' },
      ].map((sparkle, i) => (
        <div key={i} style={{
          position: 'absolute',
          ...sparkle,
          fontSize: sparkle.size,
          pointerEvents: 'none',
          lineHeight: 1,
        }}>
          ✦
        </div>
      ))}

      {/* Container with max-width */}
      <div style={{
        maxWidth: '1720px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '800px',
      }}>

        {/* Four corner photos - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            position: 'absolute',
            left: '4%',
            top: '20px',
            width: '220px',
            height: '360px',
            borderRadius: '18px',
            overflow: 'hidden',
            display: 'none',
          }}
          className="photo-corner"
        >
          <img src={PHOTO_FAMILY} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            position: 'absolute',
            right: '7%',
            top: '40px',
            width: '220px',
            height: '275px',
            borderRadius: '18px',
            overflow: 'hidden',
            display: 'none',
          }}
          className="photo-corner"
        >
          <img src={PHOTO_DOCS} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            position: 'absolute',
            left: 0,
            bottom: '70px',
            width: '220px',
            height: '175px',
            borderRadius: '18px',
            overflow: 'hidden',
            display: 'none',
          }}
          className="photo-corner"
        >
          <img src={PHOTO_DESK} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            position: 'absolute',
            right: 0,
            bottom: '70px',
            width: '340px',
            height: '275px',
            borderRadius: '18px',
            overflow: 'hidden',
            display: 'none',
          }}
          className="photo-corner"
        >
          <img src={PHOTO_MEETING} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        {/* Center content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '940px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '800px',
          textAlign: 'center',
          padding: '0 20px',
        }}>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              ...sora,
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 600,
              color: '#040617',
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              margin: '0 0 80px',
              maxWidth: '900px',
            }}
          >
            Join our community of ative Endowments and change education with other awesome people
          </motion.h1>

          {/* 2×2 Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '80px 100px',
            width: '100%',
            marginBottom: '60px',
          }}>
            
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{
                ...sora,
                fontSize: 'clamp(72px, 10vw, 108px)',
                fontWeight: 400,
                color: '#040617',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                margin: '0 0 24px',
              }}>
                {count1.toLocaleString()}+
              </p>
              <p style={{
                ...manrope,
                fontSize: 'clamp(18px, 2.5vw, 25px)',
                color: '#040617',
                lineHeight: 1.3,
                margin: 0,
              }}>
                Active Family Endowmnets
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{
                ...sora,
                fontSize: 'clamp(72px, 10vw, 108px)',
                fontWeight: 400,
                color: '#040617',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                margin: '0 0 24px',
              }}>
                {count2.toLocaleString()}+
              </p>
              <p style={{
                ...manrope,
                fontSize: 'clamp(18px, 2.5vw, 25px)',
                color: '#040617',
                lineHeight: 1.3,
                margin: 0,
              }}>
                Active Research Endowmnets
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{
                ...sora,
                fontSize: 'clamp(72px, 10vw, 108px)',
                fontWeight: 400,
                color: '#040617',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                margin: '0 0 24px',
              }}>
                {count3.toLocaleString()}+
              </p>
              <p style={{
                ...manrope,
                fontSize: 'clamp(18px, 2.5vw, 25px)',
                color: '#040617',
                lineHeight: 1.3,
                margin: 0,
              }}>
                Active Indivindual Endowmnets
              </p>
            </motion.div>

            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ textAlign: 'center' }}
            >
              <p style={{
                ...sora,
                fontSize: 'clamp(72px, 10vw, 108px)',
                fontWeight: 400,
                color: '#040617',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                margin: '0 0 24px',
              }}>
                {count4.toLocaleString()}+
              </p>
              <p style={{
                ...manrope,
                fontSize: 'clamp(18px, 2.5vw, 25px)',
                color: '#040617',
                lineHeight: 1.3,
                margin: 0,
              }}>
                Active Corporate Endowmnets
              </p>
            </motion.div>

          </div>

          {/* CTA Button */}
          <motion.a
            href="/endowments/form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{
              ...sora,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: '#FFD900',
              color: '#040617',
              fontSize: '17px',
              fontWeight: 600,
              padding: '18px 32px',
              borderRadius: '18px',
              textDecoration: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Fill Endowment Form
            <span style={{ fontSize: '20px', lineHeight: 1 }}>→</span>
          </motion.a>

        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .photo-corner {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}