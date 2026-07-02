'use client'
import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

// ── Your existing assets ──
const imgStarYellow = "/images/home-static/marquee-spot.png"
const imgStarGreen  =  "/images/home-static/marquee-spot.png"

// ── Mobile assets from Figma 383:36024 ──
const imgMobileStarGreen  =  "/images/home-static/marquee-spot.png"
const imgMobileStarYellow =  "/images/home-static/marquee-spot.png"

const TEXT   = 'Together For a Better Future'
const REPEAT = 8

const inter = { fontFamily: "'inter', sans-serif" }

// ── Desktop strip — 32px text, 120px height, 24px gap ──
function MarqueeStrip({ bg, rotation, direction, imgStar, speed = 60, fontSize = '32px', height = '120px', gap = '24px', padding = '24px 0', textColor = '#040617' }) {
  return (
    <div style={{
      transform: `rotate(${rotation}deg)`,
      backgroundColor: bg,
      height,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      width: '120%',
      marginLeft: '-10%',
    }}>
      <style>{`
        @keyframes marquee-left-${speed} {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right-${speed} {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap,
        whiteSpace: 'nowrap',
        padding,
        animation: `${direction === 'left' ? `marquee-left-${speed}` : `marquee-right-${speed}`} ${speed}s linear infinite`,
        willChange: 'transform',
      }}>
        {Array.from({ length: REPEAT * 2 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap, flexShrink: 0 }}>
            <p style={{
              ...inter,
              fontSize,
              fontWeight: 600,
              color: textColor,
              letterSpacing: fontSize === '26px' ? '-0.26px' : '-0.32px',
              lineHeight: fontSize === '26px' ? '36px' : '46px',
              textTransform: 'capitalize',
              margin: 0,
              whiteSpace: 'nowrap',
            }}>
              {TEXT}
            </p>
            <div style={{ width: '25px', height: '25px', flexShrink: 0 }}>
              <img src={imgStar} alt="✦" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeLines() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Scroll parallax — yellow right, green left
  const yellowX = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const greenX  = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={ref} style={{ backgroundColor: '#FFFDF9', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@600&display=swap');

        /* ── DESKTOP ── */
        .marquee-desktop { display: block; height: 300px; padding: 20px 0; }
        .marquee-mobile  { display: none; }

        /* ── MOBILE (≤768px) — Figma 383:36024 ──
           Smaller strips: 26px text, ~80px height, 16px gap, 20px padding
           Section shorter: ~160px tall */
        @media (max-width: 768px) {
          .marquee-desktop { display: none !important; }
          .marquee-mobile  { display: block !important; }
        }
      `}</style>

      {/* ═══════════════════════════════
          DESKTOP — your existing layout
      ═══════════════════════════════ */}
      <div className="marquee-desktop" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Green strip — behind, -5.3deg, scrolls left */}
        <motion.div style={{ x: greenX, position: 'absolute', top: '20px', left: 0, right: 0, zIndex: 1 }}>
          <MarqueeStrip bg="#040617" rotation={-5.3} direction="left"  imgStar={imgStarGreen}  speed={55} textColor="#f3af19" />
        </motion.div>
        {/* Yellow strip — front, +4deg, scrolls right */}
        <motion.div style={{ x: yellowX, position: 'absolute', top: '80px', left: 0, right: 0, zIndex: 2 }}>
          <MarqueeStrip bg="#FFD900" rotation={4}    direction="right" imgStar={imgStarYellow} speed={50} />
        </motion.div>
      </div>

      {/* ═══════════════════════════════
          MOBILE — Figma 383:36024
          Same crossing strips but:
          • 26px text (vs 32px desktop)
          • 80px strip height (vs 120px)
          • 16px gap (vs 24px)
          • 20px padding (vs 24px)
          • Section ~160px tall
          • Scroll parallax preserved
      ═══════════════════════════════ */}
      <div className="marquee-mobile" style={{ height: '160px', position: 'relative' }}>
        {/* Green strip — behind, -5.3deg */}
        <motion.div style={{ x: greenX, position: 'absolute', top: '10px', left: 0, right: 0, zIndex: 1 }}>
          <MarqueeStrip
            bg="#040617"
            rotation={-5.3}
            direction="left"
            imgStar={imgMobileStarGreen}
            speed={45}
            fontSize="26px"
            height="80px"
            gap="16px"
            padding="20px 0"
            textColor="#f3af19"
          />
        </motion.div>
        {/* Yellow strip — front, +4deg */}
        <motion.div style={{ x: yellowX, position: 'absolute', top: '50px', left: 0, right: 0, zIndex: 2 }}>
          <MarqueeStrip
            bg="#FFD900"
            rotation={4}
            direction="right"
            imgStar={imgMobileStarYellow}
            speed={40}
            fontSize="26px"
            height="80px"
            gap="16px"
            padding="20px 0"
          />
        </motion.div>
      </div>
    </section>
  )
}