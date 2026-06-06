'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const imgLocation     = "/images/home-static/location-pin.svg"
const imgCheck        = "/images/home-static/check.png"
const imgGridBg       = "/images/home-static/grid-background.png"
const imgSparkleLarge = "/images/home-static/sparkle-large.png"
const imgSparkleSmall = "/images/home-static/sparkle-small.png"

const inter     = { fontFamily: "'Inter', sans-serif" }
const TOTAL_BARS  = 40
const MOBILE_BARS = 24

function ArrowIcon({ size = 14, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Projects() {
  const [projectsData, setProjectsData] = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [current,      setCurrent]      = useState(0)
  const [direction,    setDirection]    = useState(1)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(queries.projects)
        setProjectsData(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${Math.round(amount / 1000000)}M`
    if (amount >= 1000)    return `$${Math.round(amount / 1000)}K`
    return `$${amount}`
  }

  const projects = projectsData?.map(project => {
    const percentage   = project.targetAmount > 0 ? Math.round((project.amountDonated / project.targetAmount) * 100) : 0
    const filled       = Math.round((percentage / 100) * TOTAL_BARS)
    const mobileFilled = Math.round((percentage / 100) * MOBILE_BARS)
    const backgroundColor = project.status === 'active' ? '#1A1600' : '#051507'
    return {
      id:             project.order,
      slug:           project.slug,
      type:           project.status,
      bg:             backgroundColor,
      label:          project.label,
      title:          project.title,
      location:       project.location,
      desc:           project.description,
      completedItems: project.completedItems || [],
      photo:          urlFor(project.image).width(1200).url(),
      percent:        percentage,
      filled,
      mobileFilled,
      barColor:     project.status === 'complete' ? '#5EDA71' : '#FFF7CC',
      percentColor: project.status === 'complete' ? '#5EDA71' : '#FFF7CC',
      goal:         formatCurrency(project.targetAmount),
      raised:       formatCurrency(project.amountDonated),
      btnText:      project.buttonText,
      btnBg:        project.status === 'complete' ? '#FFF7CC' : '#FFD900',
      learnColor:   project.status === 'complete' ? '#5EDA71' : '#FFD900',
    }
  }) || []

  const goTo = (idx) => { setDirection(idx > current ? 1 : -1); setCurrent(idx) }
  const prev = () => goTo((current - 1 + projects.length) % projects.length)
  const next = () => goTo((current + 1) % projects.length)

  useEffect(() => {
    if (projects.length === 0) return
    const timer = setInterval(() => next(), 5000)
    return () => clearInterval(timer)
  }, [current, projects.length])

  if (loading) return (
    <section style={{ backgroundColor:'#1A1600', padding:'80px 0', minHeight:'780px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#FFFDF9', fontSize:'24px' }}>Loading projects...</p>
    </section>
  )

  if (projects.length === 0) return (
    <section style={{ backgroundColor:'#1A1600', padding:'80px 0', minHeight:'780px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ color:'#FFFDF9', fontSize:'24px' }}>No projects available</p>
    </section>
  )

  const p = projects[current]

  return (
    <section style={{ backgroundColor:p.bg, position:'relative', overflow:'hidden', transition:'background-color 0.5s ease' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        .proj-desktop { display: block; padding: 80px 85px; min-height: 780px; }
        .proj-mobile  { display: none; }
        .proj-inner   { display: flex; align-items: center; gap: 60px; }
        @media (max-width: 768px) {
          .proj-desktop { display: none !important; }
          .proj-mobile  { display: flex !important; }
        }
      `}</style>

      {/* Background layers */}
      <AnimatePresence mode="wait">
        <motion.div key={`grid-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.5 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
          style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgGridBg}')`, backgroundSize:'100px 100px', backgroundPosition:'0 0', backgroundRepeat:'repeat' }} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={`sparkle-large-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.3 }} exit={{ opacity:0 }} transition={{ duration:0.6, delay:0.1 }}
          style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkleLarge}')`, backgroundSize:'1200px auto', backgroundPosition:'0 0', backgroundRepeat:'repeat', filter: p.type === 'complete' ? 'hue-rotate(100deg) saturate(0.8) brightness(0.9)' : 'saturate(0.8) brightness(0.9)' }} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div key={`sparkle-small-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.3 }} exit={{ opacity:0 }} transition={{ duration:0.6, delay:0.2 }}
          style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkleSmall}')`, backgroundSize:'600px auto', backgroundPosition:'300px 100px', backgroundRepeat:'repeat', filter: p.type === 'complete' ? 'hue-rotate(100deg) saturate(0.8) brightness(0.9)' : 'saturate(0.8) brightness(0.9)' }} />
      </AnimatePresence>

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="proj-desktop">
        <div style={{ position:'relative', zIndex:1, maxWidth:'1750px', margin:'0 auto' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={current} custom={direction}
              initial={{ opacity:0, x: direction > 0 ? 80 : -80 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x: direction > 0 ? -80 : 80 }}
              transition={{ duration:0.45, ease:'easeInOut' }}
              className="proj-inner">

              {/* Left — text */}
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

                <div style={{ marginTop:'32px', position:'relative' }}>
                  <div style={{ height:'46px', position:'relative' }}>
                    <span style={{ ...inter, fontSize:'32px', color:p.percentColor, letterSpacing:'-0.32px', lineHeight:'46px', position:'absolute', left:`${p.percent}%`, transform:'translateX(-50%)' }}>{p.percent}%</span>
                  </div>
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

                <a href={p.type === 'active' ? `/projectdetail/${p.slug}` : '/projects'}
                  style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'12px', backgroundColor:p.btnBg, color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'fit-content', marginTop:'8px' }}>
                  {p.btnText}
                  <ArrowIcon size={16} color="#040617" />
                </a>
              </div>

              {/* Right — photo */}
              <div style={{ flex:1, position:'relative', borderRadius:'35px', overflow:'hidden', height:'952px', flexShrink:0 }}>
                <img src={p.photo} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 50%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 55%)' }} />
                <div style={{ position:'absolute', top:'32px', left:'32px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <Image src={imgLocation} alt="" width={20} height={20} style={{ width:'20px', height:'20px', objectFit:'contain' }} />
                  <span style={{ ...inter, fontSize:'16px', color:'#FFF', letterSpacing:'-0.16px' }}>{p.location}</span>
                </div>
                <div style={{ position:'absolute', bottom:'32px', left:'32px', right:'32px', display:'flex', alignItems:'center', justifyContent:'space-between', zIndex:10 }}>
                  <button onClick={prev} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', opacity:0.6, padding:0, outline:'none' }}>
                    <span style={{ ...inter, fontSize:'20px', color:'#FFF', whiteSpace:'nowrap' }}>Last Project</span>
                    <div style={{ width:'44px', height:'44px', border:'2px solid #E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </button>
                  <div style={{ display:'flex', gap:'8px' }}>
                    {projects.map((_,i) => (
                      <button key={i} onClick={() => goTo(i)} style={{ width:'52px', height:'12px', borderRadius:'90px', backgroundColor:i===current?'#FFD900':'#d9d9d9', opacity:i===current?1:0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s', outline:'none' }} />
                    ))}
                  </div>
                  <button onClick={next} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', padding:0, outline:'none' }}>
                    <div style={{ width:'44px', height:'44px', backgroundColor:'#E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ ...inter, fontSize:'20px', color:'#FFF', whiteSpace:'nowrap' }}>Next Project</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="proj-mobile" style={{ flexDirection:'column', gap:'32px', padding:'52px 24px 40px' }}>

        <AnimatePresence mode="wait">
          <motion.div key={`grid-mobile-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.5 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}
            style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgGridBg}')`, backgroundSize:'80px 80px', backgroundPosition:'0 0', backgroundRepeat:'repeat' }} />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={`sparkle-large-mobile-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.3 }} exit={{ opacity:0 }} transition={{ duration:0.6, delay:0.1 }}
            style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkleLarge}')`, backgroundSize:'800px auto', backgroundPosition:'0 0', backgroundRepeat:'repeat', filter: p.type === 'complete' ? 'hue-rotate(100deg) saturate(0.8) brightness(0.9)' : 'saturate(0.8) brightness(0.9)' }} />
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div key={`sparkle-small-mobile-${current}`} initial={{ opacity:0 }} animate={{ opacity:0.3 }} exit={{ opacity:0 }} transition={{ duration:0.6, delay:0.2 }}
            style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkleSmall}')`, backgroundSize:'400px auto', backgroundPosition:'200px 50px', backgroundRepeat:'repeat', filter: p.type === 'complete' ? 'hue-rotate(100deg) saturate(0.8) brightness(0.9)' : 'saturate(0.8) brightness(0.9)' }} />
        </AnimatePresence>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={current} custom={direction}
            initial={{ opacity:0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity:1, x:0 }}
            exit={{ opacity:0, x: direction > 0 ? -60 : 60 }}
            transition={{ duration:0.4, ease:'easeInOut' }}
            style={{ display:'flex', flexDirection:'column', gap:'32px', width:'100%', position:'relative', zIndex:1 }}>

            {/* Text */}
            <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div style={{ paddingBottom:'8px' }}>
                <p style={{ ...inter, fontSize:'24px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.24px', lineHeight:'34px', margin:0, textTransform:'capitalize', textAlign:'center' }}>{p.label}</p>
                <h2 style={{ ...inter, fontSize:'56px', fontWeight:700, color:'#FFFFFF', letterSpacing:'-1.12px', lineHeight:'60px', margin:0, textAlign:'center' }}>{p.title}</h2>
              </div>
              {p.type === 'active' ? (
                <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'8px', marginLeft:'8px' }}>
                  <p style={{ ...inter, fontSize:'20px', color:'#FFFDF9', letterSpacing:'0.2px', lineHeight:'32px', margin:0 }}>{p.desc}</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  {p.completedItems.map((item, i) => (
                    <div key={i} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <img src={imgCheck} alt="" style={{ width:'24px', height:'24px', flexShrink:0 }} />
                      <p style={{ ...inter, fontSize:'18px', color:'#FFFFFF', letterSpacing:'0.18px', lineHeight:'28px', margin:0 }}>{item}</p>
                    </div>
                  ))}
                </div>
              )}
              <a href="/projects" style={{ ...inter, fontSize:'20px', color:p.learnColor, letterSpacing:'0.2px', lineHeight:'32px', textDecoration:'underline' }}>Learn more</a>
            </div>

            {/* Photo */}
            <div style={{ width:'100%', height:'476px', borderRadius:'20px', overflow:'hidden', position:'relative' }}>
              <img src={p.photo} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(0deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 50%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 55.56%)' }} />
              <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'8px', whiteSpace:'nowrap' }}>
                <Image src={imgLocation} alt="" width={20} height={20} style={{ width:'20px', height:'20px', objectFit:'contain' }} />
                <span style={{ ...inter, fontSize:'16px', color:'#FFFFFF', letterSpacing:'-0.16px' }}>{p.location}</span>
              </div>
              <div style={{ position:'absolute', bottom:'0', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', justifyContent:'center', gap:'32px', padding:'16px', width:'318px' }}>
                <button onClick={prev} style={{ width:'44px', height:'44px', border:'2px solid #E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', flexShrink:0, opacity:0.6, outline:'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div style={{ display:'flex', flex:1, gap:'6px' }}>
                  {projects.map((_,i) => (
                    <button key={i} onClick={() => goTo(i)} style={{ flex:1, height:'12px', borderRadius:'90px', backgroundColor:i===current?'#FFD900':'#d9d9d9', opacity:i===current?1:0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s', outline:'none' }} />
                  ))}
                </div>
                <button onClick={next} style={{ width:'44px', height:'44px', backgroundColor:'#E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', flexShrink:0, outline:'none' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ position:'relative' }}>
              <div style={{ height:'46px', position:'relative', padding:'0 16px' }}>
                <span style={{ ...inter, fontSize:'28px', color:p.percentColor, letterSpacing:'-0.28px', lineHeight:'46px', position:'absolute', left: p.percent <= 5 ? '16px' : p.percent >= 95 ? 'calc(100% - 16px)' : `${p.percent}%`, transform: p.percent <= 5 ? 'none' : p.percent >= 95 ? 'translateX(-100%)' : 'translateX(-50%)' }}>{p.percent}%</span>
              </div>
              <div style={{ display:'flex', gap:'3px' }}>
                {Array.from({ length:MOBILE_BARS }).map((_,i) => (
                  <motion.div key={i} initial={{ scaleY:0 }} animate={{ scaleY:1 }} transition={{ duration:0.3, delay:i*0.015 }}
                    style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor:i<p.mobileFilled?p.barColor:'#d9d9d9', opacity:i<p.mobileFilled?1:0.4, transformOrigin:'bottom' }} />
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ ...inter, fontSize:'20px', color:'#E5E6EB', opacity:0.8 }}>$0</span>
                <span style={{ ...inter, fontSize:'20px', color:p.percentColor }}>{p.raised}</span>
                <span style={{ ...inter, fontSize:'20px', color:'#E5E6EB', opacity:0.8 }}>{p.goal}</span>
              </div>
            </div>

            {/* CTA — fixed typo: hhref -> href */}
            <a href={p.type === 'active' ? `/projectdetail/${p.slug}` : '/projects'}
              style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', backgroundColor:p.btnBg, color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'100%' }}>
              {p.btnText}
              <ArrowIcon size={16} color="#040617" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}