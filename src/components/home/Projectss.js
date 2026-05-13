'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Project photos — your existing URLs
const imgBuxton    = "https://www.figma.com/api/mcp/asset/37654856-aac7-4496-9e4d-5c95ddbd0269"
const imgClassroom = "https://www.figma.com/api/mcp/asset/a508b729-b5e0-47de-8603-4498a8b38f3d"
const imgComplete1 = "https://www.figma.com/api/mcp/asset/37e16fa6-667d-421f-b3e1-58fad1526118"
const imgComplete2 = "https://www.figma.com/api/mcp/asset/9c25fee3-e6b6-479f-913c-ce4ba4009aee"

// Sparkles — your existing URLs
const imgSparkleTopRight = "https://www.figma.com/api/mcp/asset/5fcf166b-33da-4ec7-acc1-d21e6d859dd5"
const imgSparkleMidRight = "https://www.figma.com/api/mcp/asset/1b2e958e-2d5d-4636-b09f-3ec74a55a7e7"
const imgSparkleTopLeft  = "https://www.figma.com/api/mcp/asset/09403084-c5fd-44c7-9c28-7fdd4dac0cea"

// Mobile sparkles — from Figma 381:34584 (repositioned for 390px canvas)
const imgMobileSparkleTop   = "https://www.figma.com/api/mcp/asset/e34dae32-cf12-42c4-87f3-2bbcdcd45a2a" // top-right
const imgMobileSparkleRight = "https://www.figma.com/api/mcp/asset/cc67bddf-88bb-4ad9-be93-77b253e58bfa" // mid-right
const imgMobileSparkleLeft  = "https://www.figma.com/api/mcp/asset/d30b4501-6e64-463e-8672-ce6ebce1b940" // top-left area

// Grid overlay — your existing URLs
const imgGridPattern = "https://www.figma.com/api/mcp/asset/965c08fa-b6d9-4d61-8bc4-6bd32a9c7175"
const imgGridMask    = "https://www.figma.com/api/mcp/asset/9265ba48-b7d1-4d19-9ac8-e5a2d4a5dbd9"

// Icons — your existing URLs
const imgLocation  = "https://www.figma.com/api/mcp/asset/1592316c-3456-45f5-9462-86f3783cde4a"
const imgArrowPrev = "https://www.figma.com/api/mcp/asset/fc16ab44-2583-4050-b818-8dd83ed6d523"
const imgArrowNext = "https://www.figma.com/api/mcp/asset/9432e520-3c42-438d-83f9-dc16c45b2f67"
const imgArrowBtn  = "https://www.figma.com/api/mcp/asset/9432e520-3c42-438d-83f9-dc16c45b2f67"
const imgCheck     = "https://www.figma.com/api/mcp/asset/76d0a4c4-83fc-43cb-83bb-d7bd0bfdc5cf"

// Mobile icons from Figma
const imgMobileArrowPrev = "https://www.figma.com/api/mcp/asset/a13698dd-2c98-4b10-bfa7-9822d84b7816"
const imgMobileArrowNext = "https://www.figma.com/api/mcp/asset/927d1160-6cfa-466d-91e6-ca2b76f3c3f0"
const imgMobileLoc       = "https://www.figma.com/api/mcp/asset/bb78c92d-6f38-44c9-87b5-59bcf718e8b4"
 
const inter = { fontFamily: "'Inter', sans-serif" };
const TOTAL_BARS = 40
const MOBILE_BARS = 24

const projects = [
  {
    id: 0, type: 'active', bg: '#1A1600',
    label: 'Active Project', title: 'Buxton College',
    location: 'Jamaica, Buxton',
    desc: "You'll be joining a community of dedicated supporters who value the preservation of historic landmarks and are helping restore the iconic Buxton Building.",
    photo: imgBuxton, percent: 65, filled: 26, mobileFilled: 15,
    barColor: '#FFF7CC', percentColor: '#FFF7CC',
    goal: '$20M', raised: '$14M',
    btnText: 'Rebuild College', btnBg: '#FFD900', learnColor: '#FFD900',
  },
  {
    id: 1, type: 'active', bg: '#1A1600',
    label: 'Active Project', title: 'Smart Classroom',
    location: 'Jamaica, Kingston',
    desc: "You'll be joining a community of committed donors who believe in advancing education through technology and are helping build a modern Smart Classroom at Mico.",
    photo: imgClassroom, percent: 35, filled: 14, mobileFilled: 8,
    barColor: '#FFF7CC', percentColor: '#FFF7CC',
    goal: '$200K', raised: '$70K',
    btnText: 'Install Equipment', btnBg: '#FFD900', learnColor: '#FFD900',
  },
  {
    id: 2, type: 'complete', bg: '#051507',
    label: 'Complete Project', title: 'Complete Project №1',
    location: 'Jamaica, Kingston',
    completedItems: ['Completed statement','Completed statement','Completed statement','Completed statement','Completed statement','Completed statement'],
    photo: imgComplete1, percent: 100, filled: 40, mobileFilled: 24,
    barColor: '#5EDA71', percentColor: '#5EDA71',
    goal: '$200K', raised: '$200K',
    btnText: 'Donate to other project', btnBg: '#FFF7CC', learnColor: '#5EDA71',
  },
  {
    id: 3, type: 'complete', bg: '#051507',
    label: 'Complete Project', title: 'Complete Project №2',
    location: 'Jamaica, Buxton',
    completedItems: ['Completed statement','Completed statement','Completed statement','Completed statement'],
    photo: imgComplete2, percent: 100, filled: 40, mobileFilled: 24,
    barColor: '#5EDA71', percentColor: '#5EDA71',
    goal: '$500K', raised: '$500K',
    btnText: 'Donate to other project', btnBg: '#FFF7CC', learnColor: '#5EDA71',
  },
]

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (idx) => { setDirection(idx > current ? 1 : -1); setCurrent(idx) }
  const prev = () => goTo((current - 1 + projects.length) % projects.length)
  const next = () => goTo((current + 1) % projects.length)

  const p = projects[current]

  return (
    <section style={{ backgroundColor: p.bg, position: 'relative', overflow: 'hidden', transition: 'background-color 0.5s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;700;800&family=inter:wght@400&display=swap');

        /* ── DESKTOP ── */
        .proj-desktop { display: block; padding: 80px 85px; min-height: 780px; }
        .proj-mobile  { display: none; }
        .proj-inner   { display: flex; align-items: center; gap: 60px; }

        /* ── MOBILE (≤768px) ── */
        @media (max-width: 768px) {
          .proj-desktop { display: none !important; }
          .proj-mobile  { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════
          DESKTOP LAYOUT
      ═══════════════════════════════════ */}
      <div className="proj-desktop">

        {/* Desktop sparkles */}
        <div style={{ position:'absolute', left:0, top:0, right:0, bottom:0, zIndex:0, opacity:0.20, pointerEvents:'none', backgroundImage:`url('${imgGridPattern}')`, backgroundSize:'2716px 382px', backgroundRepeat:'repeat', maskImage:`url('${imgGridMask}')`, WebkitMaskImage:`url('${imgGridMask}')`, maskSize:'1662px 1025px', maskRepeat:'no-repeat', maskPosition:'-269px -12px' }} />
        <div style={{ position:'absolute', left:0, top:0, right:0, bottom:0, zIndex:0, opacity:0.20, pointerEvents:'none', backgroundImage:`url('${imgGridPattern}')`, backgroundSize:'2716px 382px', backgroundRepeat:'repeat', maskImage:`url('${imgGridMask}')`, WebkitMaskImage:`url('${imgGridMask}')`, maskSize:'1662px 1025px', maskRepeat:'no-repeat', maskPosition:'328px 594px' }} />
        <img src={imgSparkleTopLeft}  alt="" style={{ position:'absolute', left:'calc(16.67% + 60px)', top:'-8px', width:'280px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />
        <img src={imgSparkleTopRight} alt="" style={{ position:'absolute', right:'4%', top:'4px', width:'220px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />
        <img src={imgSparkleMidRight} alt="" style={{ position:'absolute', right:'-1%', top:'54%', width:'240px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />

        <div style={{ position:'relative', zIndex:1, maxWidth:'1750px', margin:'0 auto' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={current} custom={direction}
              initial={{ opacity:0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration:0.45, ease:'easeInOut' }}
              className="proj-inner"
            >
              {/* LEFT — text */}
              <div style={{ flex:'0 0 816px', display:'flex', flexDirection:'column', gap:'16px' }}>
                <div style={{ paddingBottom:'8px' }}>
                  <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{p.label}</p>
                  <h2 style={{ ...inter, fontSize:'100px', fontWeight:800, color:'#FFFFFF', letterSpacing:'-1px', lineHeight:'96.93%', margin:0, textTransform:'capitalize' }}>{p.title}</h2>
                </div>
                {p.type === 'active' ? (
                  <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px', maxWidth:'644px' }}>
                    <p style={{ ...inter, fontSize:'24px', color:'#FFFDF9', letterSpacing:'0.24px', lineHeight:'38px', margin:0 }}>{p.desc}</p>
                  </div>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    {p.completedItems.map((item, i) => (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                        <img src={imgCheck} alt="" style={{ width:'24px', height:'24px', flexShrink:0 }} />
                        <p style={{ ...inter, fontSize:'24px', color:'#FFFFFF', letterSpacing:'0.24px', lineHeight:'38px', margin:0 }}>{item}</p>
                      </div>
                    ))}
                  </div>
                )}
                <a href="/projects" style={{ ...inter, fontSize:'24px', color:p.learnColor, letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline' }}>Learn more</a>
                <div style={{ marginTop:'32px' }}>
                  <p style={{ ...inter, fontSize:'32px', color:p.percentColor, letterSpacing:'-0.32px', lineHeight:'46px', margin:'0 0 8px', paddingLeft:`${p.percent}%`, transform:'translateX(-50%)' }}>{p.percent}%</p>
                  <div style={{ display:'flex', gap:'4px' }}>
                    {Array.from({ length:TOTAL_BARS }).map((_,i) => (
                      <motion.div key={i} initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.3, delay:i*0.01 }}
                        style={{ flex:1, height:'25px', borderRadius:'20px', backgroundColor:i<p.filled?p.barColor:'#d9d9d9', opacity:i<p.filled?1:0.4, transformOrigin:'bottom' }} />
                    ))}
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginTop:'8px' }}>
                    <span style={{ ...inter, fontSize:'24px', color:'#E5E6EB', opacity:0.8 }}>$0</span>
                    <span style={{ ...inter, fontSize:'24px', color:p.percentColor }}>{p.raised}</span>
                    <span style={{ ...inter, fontSize:'24px', color:'#E5E6EB', opacity:0.8 }}>{p.goal}</span>
                  </div>
                </div>
                <a href="/donate" style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'12px', backgroundColor:p.btnBg, color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'fit-content', marginTop:'8px' }}>
                  {p.btnText}
                  <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'24px', height:'24px' }}>
                    <img src={imgArrowBtn} alt="" style={{ width:'14px', height:'14px' }} />
                  </span>
                </a>
              </div>

              {/* RIGHT — photo */}
              <div style={{ flex:1, position:'relative', borderRadius:'35px', overflow:'hidden', height:'952px', flexShrink:0 }}>
                <img src={p.photo} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 50%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 55%)' }} />
                <div style={{ position:'absolute', top:'32px', left:'32px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                  <span style={{ ...inter, fontSize:'16px', color:'#FFF', letterSpacing:'-0.16px' }}>{p.location}</span>
                </div>
                <div style={{ position:'absolute', bottom:'32px', left:'32px', right:'32px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <button onClick={prev} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', opacity:0.6 }}>
                    <span style={{ ...inter, fontSize:'20px', color:'#FFF' }}>Last Project</span>
                    <div style={{ width:'44px', height:'44px', border:'2px solid #E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <img src={imgArrowPrev} alt="" style={{ width:'24px', height:'24px', transform:'rotate(180deg)', filter:'invert(1)' }} />
                    </div>
                  </button>
                  <div style={{ display:'flex', gap:'8px' }}>
                    {projects.map((_,i) => (
                      <button key={i} onClick={() => goTo(i)} style={{ width:'52px', height:'12px', borderRadius:'90px', backgroundColor:i===current?'#FFD900':'#d9d9d9', opacity:i===current?1:0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s' }} />
                    ))}
                  </div>
                  <button onClick={next} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer' }}>
                    <div style={{ width:'44px', height:'44px', backgroundColor:'#E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <img src={imgArrowNext} alt="" style={{ width:'24px', height:'24px' }} />
                    </div>
                    <span style={{ ...inter, fontSize:'20px', color:'#FFF' }}>Next Project</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE LAYOUT — Figma 381:34584
          Layout: text → photo card → progress → CTA
          All stacked vertically, padding 24px
      ═══════════════════════════════════ */}
      <div className="proj-mobile" style={{ flexDirection:'column', gap:'32px', padding:'52px 24px 40px' }}>

        {/* Mobile sparkles — repositioned for 390px canvas */}
        {/* top-right: left:calc(50%+23px) top:4px */}
        <img src={imgMobileSparkleTop} alt="" style={{ position:'absolute', left:'calc(50% + 23px)', top:'4px', width:'180px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />
        {/* mid-right: left:calc(50%+94px) top:709px */}
        <img src={imgMobileSparkleRight} alt="" style={{ position:'absolute', left:'calc(50% + 94px)', top:'709px', width:'180px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />
        {/* top-left area: left:calc(50%+10px) top:-12px */}
        <img src={imgMobileSparkleLeft} alt="" style={{ position:'absolute', left:'calc(50% + 10px)', top:'-12px', width:'200px', height:'auto', pointerEvents:'none', zIndex:0, opacity:0.9 }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={current} custom={direction}
            initial={{ opacity:0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration:0.4, ease:'easeInOut' }}
            style={{ display:'flex', flexDirection:'column', gap:'32px', width:'100%', position:'relative', zIndex:1 }}
          >
            {/* Text block */}
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div style={{ paddingBottom:'8px' }}>
                {/* Label — centered on mobile */}
                <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize', textAlign:'center' }}>{p.label}</p>
                {/* Title — 86px Bold centered, from Figma */}
                <h2 style={{ ...inter, fontSize:'86px', fontWeight:700, color:'#FFFFFF', letterSpacing:'-1.72px', lineHeight:'101px', margin:0, textAlign:'center' }}>{p.title}</h2>
              </div>

              {p.type === 'active' ? (
                <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'8px', marginLeft:'8px' }}>
                  <p style={{ ...inter, fontSize:'24px', color:'#FFFDF9', letterSpacing:'0.24px', lineHeight:'38px', margin:0 }}>{p.desc}</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  {p.completedItems.map((item, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <img src={imgCheck} alt="" style={{ width:'24px', height:'24px', flexShrink:0 }} />
                      <p style={{ ...inter, fontSize:'20px', color:'#FFFFFF', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )}

              <a href="/projects" style={{ ...inter, fontSize:'24px', color:p.learnColor, letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline' }}>Learn more</a>
            </div>

            {/* Photo card — 476px tall, rounded-20px, full width */}
            <div style={{ width:'100%', height:'476px', borderRadius:'20px', overflow:'hidden', position:'relative' }}>
              <img src={p.photo} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 50%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 55.56%)' }} />
              {/* Location badge — centered at top */}
              <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'8px', whiteSpace:'nowrap' }}>
                <img src={imgMobileLoc} alt="" style={{ width:'24px', height:'24px', flexShrink:0 }} />
                <span style={{ ...inter, fontSize:'16px', color:'#FFFFFF', letterSpacing:'-0.16px' }}>{p.location}</span>
              </div>
              {/* Nav controls — bottom of photo, no text labels */}
              <div style={{ position:'absolute', bottom:'0', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', justifyContent:'center', gap:'32px', padding:'16px', width:'318px' }}>
                <button onClick={prev} style={{ width:'44px', height:'44px', border:'2px solid #E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', flexShrink:0, opacity:0.6 }}>
                  <img src={imgMobileArrowPrev} alt="" style={{ width:'24px', height:'24px', transform:'rotate(180deg)', filter:'invert(1)' }} />
                </button>
                <div style={{ display:'flex', flex:1, gap:'6px' }}>
                  {projects.map((_,i) => (
                    <button key={i} onClick={() => goTo(i)} style={{ flex:1, height:'12px', borderRadius:'90px', backgroundColor:i===current?'#FFD900':'#d9d9d9', opacity:i===current?1:0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s' }} />
                  ))}
                </div>
                <button onClick={next} style={{ width:'44px', height:'44px', backgroundColor:'#E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', flexShrink:0 }}>
                  <img src={imgMobileArrowNext} alt="" style={{ width:'24px', height:'24px' }} />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <p style={{ ...inter, fontSize:'32px', color:p.percentColor, letterSpacing:'-0.32px', lineHeight:'46px', margin:'0 0 4px', textAlign:'center' }}>{p.percent}%</p>
              <div style={{ display:'flex', gap:'3px' }}>
                {Array.from({ length:MOBILE_BARS }).map((_,i) => (
                  <motion.div key={i} initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.3, delay:i*0.015 }}
                    style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor:i<p.mobileFilled?p.barColor:'#d9d9d9', opacity:i<p.mobileFilled?1:0.4, transformOrigin:'bottom' }} />
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ ...inter, fontSize:'24px', color:'#E5E6EB', opacity:0.8 }}>$0</span>
                <span style={{ ...inter, fontSize:'24px', color:p.percentColor }}>{p.raised}</span>
                <span style={{ ...inter, fontSize:'24px', color:'#E5E6EB', opacity:0.8 }}>{p.goal}</span>
              </div>
            </div>

            {/* CTA — full width */}
            <a href="/donate" style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', backgroundColor:p.btnBg, color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'100%' }}>
              {p.btnText}
              <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'24px', height:'24px' }}>
                <img src={imgArrowBtn} alt="" style={{ width:'14px', height:'14px' }} />
              </span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}