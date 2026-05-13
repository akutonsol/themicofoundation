'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Your existing assets ──
const imgPersonPhoto =  "/images/home/woman.png"
const imgSparkle     =  "/images/home-static/sparkle-impact.png"
const imgArrowPrev   = "/images/home-static/prev-arr-icon.png"
const imgArrowNext   = "/images/home-static/next-arr-icon.png"
const imgLine        = "/images/home-static/impact-line.png"

// ── Mobile assets from Figma 388:42878 ──
const imgMobileSparkle   =  "/images/home-static/sparkle-impact.png"
const imgMobileLine      = "/images/home-static/impact-line.png"
const imgMobileArrowPrev =  "/images/home-static/prev-arr-icon.png"
const imgMobileArrowNext =  "/images/home-static/next-arr-icon.png"
// Mobile person photo inside the oval
const imgMobilePhoto     = "/images/home/woman.png"

const quotes = [
  {
    id: 0,
    name: 'Carla Morgan',
    role: 'Donor',
    photo: imgPersonPhoto,
    mobilePhoto: imgMobilePhoto,
    quote: "When I gave to the Smart Classroom campaign, I didn't expect to feel so connected. Knowing my donation helps students learn in better conditions makes it all worth it. I'm proud to be part of something that matters.",
  },
  {
    id: 1,
    name: 'James Patterson',
    role: 'Endowment Supporter',
    photo: imgPersonPhoto,
    mobilePhoto: imgMobilePhoto,
    quote: "Supporting the Mico Foundation has been one of the most rewarding decisions I've made. Seeing the direct impact on students and their futures motivates me to continue giving year after year.",
  },
  {
    id: 2,
    name: 'Sandra Williams',
    role: 'Community Partner',
    photo: imgPersonPhoto,
    mobilePhoto: imgMobilePhoto,
    quote: "The Mico Foundation truly embodies the spirit of community. Their transparency and dedication to education reform inspired me to get involved. Together we are building a brighter Jamaica.",
  },
  {
    id: 3,
    name: 'Michael Brown',
    role: 'Alumni Donor',
    photo: imgPersonPhoto,
    mobilePhoto: imgMobilePhoto,
    quote: "As a Mico alumnus, giving back to the institution that shaped me is deeply personal. The foundation ensures that future generations receive the same quality education that changed my life.",
  },
]

const inter = { fontFamily: "'Inter', sans-serif" };

export default function PeopleImpact() {
  const [current, setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (index) => { setDirection(index > current ? 1 : -1); setCurrent(index) }
  const prev = () => goTo((current - 1 + quotes.length) % quotes.length)
  const next = () => goTo((current + 1) % quotes.length)

  const person = quotes[current]

  return (
    <section style={{ backgroundColor: '#FFFDF9', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@600&family=inter:wght@400&display=swap');

        /* ── DESKTOP ── */
        .impact-desktop { display: grid; grid-template-columns: 780px 1fr; gap: 165px; align-items: center; padding: 80px 165px; }
        .impact-mobile  { display: none; }

        @media (max-width: 1200px) {
          .impact-desktop { grid-template-columns: 1fr; gap: 60px; }
        }
        /* ── MOBILE (≤768px) — Figma 388:42878 ── */
        @media (max-width: 768px) {
          .impact-desktop { display: none !important; }
          .impact-mobile  { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════
          DESKTOP — your existing layout
      ═══════════════════════════════════ */}
      <div className="impact-desktop">

        {/* Left — quote */}
        <div style={{ display:'flex', flexDirection:'column', gap:'48px' }}>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ ...inter, fontSize:'75px', fontWeight:600, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', margin:0 }}>
            The People Behind the Impact
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div key={person.id}
              initial={{ opacity:0, x: direction > 0 ? 30 : -30 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x: direction > 0 ? -30 : 30 }}
              transition={{ duration:0.4 }}
              style={{ display:'flex', flexDirection:'column', gap:0 }}>
              <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.32px', lineHeight:'46px', margin:0 }}>"</p>
              <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.32px', lineHeight:'46px', margin:0 }}>{person.quote}</p>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'684px' }}>
            <button onClick={prev} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', opacity:0.6 }}>
              <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', whiteSpace:'nowrap' }}>Last Quote</span>
              <div style={{ width:'44px', height:'44px', border:'2px solid #6F7181', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <img src={imgArrowPrev} alt="" style={{ width:'24px', height:'24px', transform:'rotate(180deg)' }} />
              </div>
            </button>
            <div style={{ display:'flex', gap:'8px' }}>
              {quotes.map((_,i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width:'52px', height:'12px', borderRadius:'90px', backgroundColor: i===current ? '#FFD900' : '#d9d9d9', opacity: i===current ? 1 : 0.4, border:'none', cursor:'pointer', transition:'all 0.3s', padding:0 }} />
              ))}
            </div>
            <button onClick={next} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer' }}>
              <div style={{ width:'44px', height:'44px', backgroundColor:'#040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <img src={imgArrowNext} alt="" style={{ width:'24px', height:'24px', filter:'invert(1)' }} />
              </div>
              <span style={{ ...inter, fontSize:'20px', color:'#040617', letterSpacing:'0.2px', lineHeight:'30px', whiteSpace:'nowrap' }}>Next Quote</span>
            </button>
          </div>
        </div>

        {/* Right — yellow oval */}
        <div style={{ position:'relative', width:'510px', height:'896px', flexShrink:0 }}>
          <img src={imgSparkle} alt="" style={{ position:'absolute', left:'192px', top:0, width:'523px', pointerEvents:'none', opacity:0.4, zIndex:0 }} />
          <div style={{ position:'absolute', left:0, top:'69px', width:'510px', height:'827px', borderRadius:'999px', background:'linear-gradient(180deg, #F9AF03 0%, #FFD900 79.81%, #FFE138 93.75%)', overflow:'hidden', zIndex:1 }}>
            <AnimatePresence mode="wait">
              <motion.img key={person.id} src={person.photo} alt={person.name}
                initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
                transition={{ duration:0.5 }}
                style={{ position:'absolute', width:'134.9%', left:'-18.88%', top:'-19.75%', height:'148.12%', objectFit:'cover', objectPosition:'top center' }} />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={`name-${person.id}`}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.4 }}
              style={{ position:'absolute', left:'-89px', bottom:'100px', backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'12px', padding:'12px 32px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', zIndex:3 }}>
              <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize', whiteSpace:'nowrap' }}>{person.name}</p>
              <img src={imgLine} alt="" style={{ width:'100%', height:'2px', objectFit:'cover' }} />
              <p style={{ ...inter, fontSize:'24px', color:'#6F7181', letterSpacing:'0.24px', lineHeight:'38px', margin:0, textAlign:'center', whiteSpace:'nowrap' }}>{person.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE — Figma 388:42878
          • Heading: 75px centered, stacked
          • Yellow oval 342×547px radius-999px
          • Name pill floats at bottom of oval
          • Quote: 26px SemiBold grey, centered
          • Arrow-only nav + 4 dots at bottom
          • All stacked, px:24px gap:48px
      ═══════════════════════════════════ */}
      <div className="impact-mobile" style={{ flexDirection:'column', gap:'48px', alignItems:'center', padding:'60px 24px', position:'relative', zIndex:1 }}>

        {/* Heading */}
        <h2 style={{ ...inter, fontSize:'75px', fontWeight:600, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', margin:0, textAlign:'center', width:'100%' }}>
          People Behind Impact
        </h2>

        {/* Yellow oval photo card — 342×547px */}
        <div style={{ position:'relative', width:'342px', height:'547px', flexShrink:0 }}>
          {/* Sparkle bg */}
          <img src={imgMobileSparkle} alt="" style={{ position:'absolute', left:'80px', top:'-184px', width:'336px', height:'336px', pointerEvents:'none', opacity:0.3, zIndex:0 }} />

          {/* Oval */}
          <div style={{ position:'absolute', inset:0, borderRadius:'999px', background:'linear-gradient(180deg, #F9AF03 0%, #FFD900 79.81%, #FFE138 93.75%)', overflow:'hidden', zIndex:1 }}>
            <AnimatePresence mode="wait">
              <motion.img key={`mob-photo-${person.id}`}
                src={person.mobilePhoto} alt={person.name}
                initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.97 }}
                transition={{ duration:0.5 }}
                style={{ position:'absolute', width:'134.9%', left:'-18.88%', top:'-19.75%', height:'148.12%', objectFit:'cover', objectPosition:'top center' }} />
            </AnimatePresence>
          </div>

          {/* Name pill — centered, floats at bottom of oval */}
          <AnimatePresence mode="wait">
            <motion.div key={`mob-name-${person.id}`}
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
              transition={{ duration:0.4 }}
              style={{ position:'absolute', bottom:'60px', left:'50%', transform:'translateX(-50%)', backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'12px', padding:'8px 24px', display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', zIndex:3, whiteSpace:'nowrap' }}>
              <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', margin:0, textTransform:'capitalize' }}>
                {person.name}
              </p>
              <img src={imgMobileLine} alt="" style={{ width:'100%', height:'2px', objectFit:'cover' }} />
              <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0, textAlign:'center' }}>
                {person.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quote — 26px SemiBold grey, centered */}
        <AnimatePresence mode="wait">
          <motion.div key={`mob-quote-${person.id}`}
            initial={{ opacity:0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration:0.4 }}
            style={{ textAlign:'center', width:'100%' }}>
            <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.26px', lineHeight:'40px', margin:'0 0 0' }}>"</p>
            <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.26px', lineHeight:'40px', margin:0 }}>
              {person.quote}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Nav — arrows + dots only, no text labels */}
        <div style={{ display:'flex', alignItems:'center', gap:'24px', width:'100%' }}>
          {/* Prev — outlined grey */}
          <button onClick={prev} style={{ width:'44px', height:'44px', border:'2px solid #6F7181', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', opacity:0.6, flexShrink:0 }}>
            <img src={imgMobileArrowPrev} alt="" style={{ width:'24px', height:'24px', transform:'rotate(180deg)' }} />
          </button>

          {/* Dots */}
          <div style={{ display:'flex', flex:1, gap:'8px' }}>
            {quotes.map((_,i) => (
              <button key={i} onClick={() => goTo(i)} style={{ flex:1, height:'12px', borderRadius:'90px', backgroundColor: i===current ? '#FFD900' : '#d9d9d9', opacity: i===current ? 1 : 0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s' }} />
            ))}
          </div>

          {/* Next — filled dark */}
          <button onClick={next} style={{ width:'44px', height:'44px', backgroundColor:'#040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', flexShrink:0 }}>
            <img src={imgMobileArrowNext} alt="" style={{ width:'24px', height:'24px', filter:'invert(1)' }} />
          </button>
        </div>
      </div>
    </section>
  )
}