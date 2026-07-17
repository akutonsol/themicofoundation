"use client";

import { useState, useEffect } from 'react'
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }

function ArrowIcon({ size = 18, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CloseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

const STAT_LINKS = [
  { href: "https://themico.edu.jm", external: true  },
  { href: "/contact",               external: false },
  { href: "https://www.mucfa.org",  external: true  },
]

export default function LegacyImpactSection() {
  const [legacyData, setLegacyData] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [panelOpen,  setPanelOpen]  = useState(false)

  useEffect(() => {
    async function fetch_data() {
      try {
        const data = await client.fetch(queries.legacyImpact)
        setLegacyData(data)
      } catch (err) {
        console.error('Error fetching legacy impact data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetch_data()
  }, [])

  const badge         = legacyData?.badge         || 'Our Foundation'
  const headline      = legacyData?.headline      || 'Preserving Legacy. Empowering Futures.'
  const paragraph1    = legacyData?.paragraph1    || 'The Mico Foundation is registered under the Companies Act of Jamaica in 1981 as a Limited Liability Company, Not for Profit.'
  const paragraph2    = legacyData?.paragraph2    || 'Through restoration projects, scholarships, institutional development, and community partnerships, every contribution helps strengthen a legacy that has transformed lives for nearly two centuries.'
  const button1Text   = legacyData?.button1?.text || 'Explore Projects'
  const button1Link   = legacyData?.button1?.link || '/projects'
  const button2Text   = legacyData?.button2?.text || 'Become a Donor'
  const button2Link   = legacyData?.button2?.link || '/donate'
  const locationBadge = legacyData?.locationBadge || 'Est. 1836'
  const bottomQuote   = legacyData?.bottomQuote   || 'Every generation deserves access to educational opportunity.'

  const stats = legacyData?.stats || [
    { value: "1836",   label: "Educational legacy established"   },
    { value: "45+",    label: "Completed and active projects"    },
    { value: "Global", label: "Donor and alumni support network" },
  ]

  const heroImageUrl = legacyData?.heroImage
    ? urlFor(legacyData.heroImage).width(1400).url()
    : '/images/home/holness.jpg'

  if (loading) return (
    <section style={{ backgroundColor:'#FAF9F6', padding:'80px 0', minHeight:'500px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#6F7181', fontSize:'20px' }}>Loading...</p>
    </section>
  )

  return (
    <section style={{ position:'relative', overflow:'hidden', backgroundColor:'#FAF9F6', paddingTop:'100px', paddingBottom:'100px', borderTop:'1px solid rgba(4,6,23,0.07)', borderBottom:'1px solid rgba(4,6,23,0.07)' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .legacy-wrap  { display: flex; min-height: 640px; }
        .legacy-left  { flex: 0 0 50%; position: relative; overflow: hidden; min-height: 600px; background: #040617; }
        .legacy-right { flex: 1; display: flex; align-items: center; padding: 80px 90px 80px 80px; position: relative; }

        @media (max-width: 1100px) { .legacy-right { padding: 64px 48px; } }
        @media (max-width: 768px) {
          .legacy-wrap  { flex-direction: column; }
          .legacy-left  { flex: none; height: 360px; }
          .legacy-right { padding: 52px 28px; }
          .legacy-headline { font-size: 44px !important; }
          .legacy-modal-img { float: none !important; width: 100% !important; margin-right: 0 !important; }
        }

        .legacy-read-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #FFD900; color: #040617;
          font-size: 15px; font-weight: 700;
          padding: 15px 32px; border-radius: 14px;
          border: none; cursor: pointer;
          letter-spacing: -0.1px;
          transition: background 0.2s, transform 0.15s;
          font-family: 'Inter', sans-serif;
        }
        .legacy-read-btn:hover { background: #e6c200; transform: scale(1.02); }

        .legacy-secondary-btn {
          display: inline-flex; align-items: center; gap: 10px;
          color: #040617; font-size: 15px; font-weight: 600;
          text-decoration: none;
          border: 1px solid rgba(4,6,23,0.07);
          padding: 15px 28px; border-radius: 14px;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .legacy-secondary-btn:hover { border-color: #040617; background: rgba(4,6,23,0.04); }

        .legacy-stat-link { text-decoration: none; display: block; transition: transform 0.2s; }
        .legacy-stat-link:hover { transform: translateY(-3px); }
        .legacy-stat-link:hover .legacy-stat-val { color: #FFD900 !important; }
        .legacy-stat-link:hover p { color: #040617 !important; }

        .legacy-jamaica-green-a {
          position: absolute; pointer-events: none;
          top: -10%; left: -5%; width: 55%; height: 75%;
          background: rgba(0, 110, 40, 0.055);
          transform: rotate(-14deg) skewX(-4deg);
          border-radius: 0 40% 60% 0;
          z-index: 0;
        }
        .legacy-jamaica-gold {
          position: absolute; pointer-events: none;
          top: 20%; left: -3%; width: 42%; height: 28%;
          background: rgba(220, 170, 0, 0.07);
          transform: rotate(-14deg);
          z-index: 0;
        }
        .legacy-jamaica-green-b {
          position: absolute; pointer-events: none;
          bottom: -15%; left: 8%; width: 44%; height: 60%;
          background: rgba(0, 100, 35, 0.05);
          transform: rotate(-14deg);
          border-radius: 40% 0 0 20%;
          z-index: 0;
        }
        .legacy-payment-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: white; border: 1px solid rgba(4,6,23,0.07);
          border-radius: 8px; padding: 6px 14px; height: 36px;
        }
      `}</style>

      <div className="legacy-wrap">

        {/* LEFT - photo */}
        <div className="legacy-left">
          <img
            src={heroImageUrl}
            alt="Mico Foundation legacy"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'contain', objectPosition:'center' }}
          />
          {/* Gradient overlay */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.75) 0%, rgba(4,6,23,0) 55%)' }} />

          {/* EST. badge */}
          <div style={{ position:'absolute', bottom:'32px', left:'24px', zIndex:10, backgroundColor:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.3)', backdropFilter:'blur(8px)', borderRadius:'6px', padding:'8px 18px' }}>
            <span style={{ ...inter, fontSize:'12px', fontWeight:700, color:'white', letterSpacing:'0.18em', textTransform:'uppercase' }}>
              {locationBadge}
            </span>
          </div>

          {/* Quote overlay */}
          <div style={{ position:'absolute', bottom:'80px', left:'28px', right:'28px', zIndex:10 }}>
            <p style={{ ...inter, fontSize:'20px', fontWeight:600, color:'white', lineHeight:1.3, letterSpacing:'-0.3px', margin:0, maxWidth:'340px' }}>
              {bottomQuote}
            </p>
          </div>

        </div>

        {/* RIGHT - content */}
        <div className="legacy-right">
          <motion.div
            initial={{ opacity:0, x:30 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.7 }}
            style={{ width:'100%', maxWidth:'560px', position:'relative' }}
          >
            {/* Eyebrow */}
            <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'20px' }}>
              <div style={{ width:'28px', height:'2px', backgroundColor:'#FFD900' }} />
              <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#6F7181', letterSpacing:'0.2em', textTransform:'uppercase' }}>
                {badge}
              </span>
            </div>

            {/* Headline */}
            <h2
              className="legacy-headline"
              style={{ ...inter, fontSize:'clamp(2.8rem,4.5vw,5rem)', fontWeight:900, color:'#040617', lineHeight:'0.95', letterSpacing:'-3px', margin:'0 0 28px', backgroundColor:'transparent', background:'none' }}
            >
              {headline}
            </h2>

            {/* Divider */}
            <div style={{ height:'1px', backgroundColor:'rgba(4,6,23,0.07)', marginBottom:'28px' }} />

            {/* CTA buttons */}
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'36px', flexWrap:'wrap' }}>
              <button onClick={() => setPanelOpen(true)} className="legacy-read-btn">
                Read Full Content
                <ArrowIcon size={16} color="#040617" />
              </button>
              <Link href={button2Link} className="legacy-secondary-btn">
                {button2Text}
              </Link>
            </div>

            {/* Divider */}
            <div style={{ height:'1px', backgroundColor:'rgba(4,6,23,0.07)', marginBottom:'28px' }} />

            {/* Stats row */}
            <div style={{ display:'flex', gap:'0', marginBottom:'44px', paddingTop:'16px', paddingBottom:'16px', borderTop:'1px solid rgba(4,6,23,0.07)', borderBottom:'1px solid rgba(4,6,23,0.07)' }}>
              {stats.map((stat, i) => {
                const link = STAT_LINKS[i] || { href:'/', external:false }
                const inner = (
                  <div style={{ paddingRight:'48px', borderRight: i < stats.length - 1 ? '1px solid rgba(4,6,23,0.07)' : 'none', paddingLeft: i > 0 ? '48px' : '0' }}>
                    <p className="legacy-stat-val" style={{ ...inter, fontSize:'clamp(2rem,2.8vw,3rem)', fontWeight:900, color:'#040617', margin:'0 0 6px', letterSpacing:'-2px', transition:'color 0.2s' }}>
                      {stat.value}
                    </p>
                    <p style={{ ...inter, fontSize:'14px', color:'#6F7181', margin:0, lineHeight:1.4, transition:'color 0.2s' }}>
                      {stat.label}
                    </p>
                  </div>
                )
                return link.external
                  ? <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="legacy-stat-link">{inner}</a>
                  : <Link key={i} href={link.href} className="legacy-stat-link">{inner}</Link>
              })}
            </div>

            {/* Slide-up panel */}
            <AnimatePresence>
              {panelOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    key="backdrop"
                    initial={{ opacity:0 }}
                    animate={{ opacity:1 }}
                    exit={{ opacity:0 }}
                    onClick={() => setPanelOpen(false)}
                    style={{ position:'fixed', inset:0, backgroundColor:'rgba(4,6,23,0.55)', zIndex:9998, backdropFilter:'blur(4px)', cursor:'pointer' }}
                  />

                  {/* Panel */}
                  <motion.div
                    key="panel"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type:'spring', damping:28, stiffness:260 }}
                    style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:9999, backgroundColor:'#040617', borderRadius:'28px 28px 0 0', height:'90vh', display:'flex', flexDirection:'column', boxShadow:'0 -32px 80px rgba(0,0,0,0.5)' }}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setPanelOpen(false)}
                      style={{ position:'absolute', top:'20px', right:'24px', zIndex:10, width:'44px', height:'44px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.8)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    >
                      <CloseIcon size={18} />
                    </button>

                    {/* Scrollable content */}
                    <div style={{ flex:1, overflowY:'auto', display:'flex', justifyContent:'center', padding:'48px 5% 60px' }}>
                      <div style={{ width:'100%', maxWidth:'1200px' }}>

                        {/* Eyebrow */}
                        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                          <div style={{ width:'20px', height:'2px', backgroundColor:'#FFD900' }} />
                          <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', letterSpacing:'0.18em', textTransform:'uppercase' }}>
                            {badge}
                          </span>
                        </div>

                        {/* Headline */}
                        <h3 style={{ ...inter, fontSize:'clamp(2rem,3.4vw,3rem)', fontWeight:800, color:'white', letterSpacing:'-1.5px', lineHeight:'1.05', margin:'0 0 24px' }}>
                          {headline}
                        </h3>

                        {/* Divider */}
                        <div style={{ height:'1px', backgroundColor:'rgba(255,255,255,0.1)', marginBottom:'32px' }} />

                        {/* Floated image — description wraps around it and flows to the end */}
                        <div className="legacy-modal-img" style={{ float:'left', width:'440px', marginRight:'44px', marginBottom:'24px' }}>
                          <div style={{ borderRadius:'20px', overflow:'hidden', position:'relative', aspectRatio:'4/3', background:'#040617' }}>
                            <img
                              src={heroImageUrl}
                              alt="Mico Foundation legacy"
                              style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'center' }}
                            />
                            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.75) 0%, rgba(4,6,23,0) 55%)' }} />
                            <div style={{ position:'absolute', bottom:'24px', left:'24px', right:'24px' }}>
                              <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                                <div style={{ width:'16px', height:'2px', backgroundColor:'#FFD900' }} />
                                <span style={{ ...inter, fontSize:'10px', fontWeight:700, color:'#FFD900', letterSpacing:'0.16em', textTransform:'uppercase' }}>
                                  {locationBadge}
                                </span>
                              </div>
                              <p style={{ ...inter, fontSize:'17px', fontWeight:600, color:'white', lineHeight:1.3, margin:0 }}>
                                {bottomQuote}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Full description — flows around the image and continues to the end */}
                        <p style={{ ...inter, fontSize:'18px', color:'rgba(255,255,255,0.82)', lineHeight:'1.9', margin:'0 0 22px' }}>
                          {paragraph1}
                        </p>
                        <p style={{ ...inter, fontSize:'18px', color:'rgba(255,255,255,0.7)', lineHeight:'1.9', margin:'0 0 28px' }}>
                          {paragraph2}
                        </p>

                        {/* Quote */}
                        <div style={{ borderLeft:'3px solid #FFD900', paddingLeft:'20px', marginBottom:'36px' }}>
                          <p style={{ ...inter, fontSize:'19px', fontWeight:500, color:'rgba(255,255,255,0.78)', fontStyle:'italic', lineHeight:'1.7', margin:0 }}>
                            "{bottomQuote}"
                          </p>
                        </div>

                        <div style={{ clear:'both' }} />

                        {/* CTAs */}
                        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', paddingTop:'8px' }}>
                          <Link href={button1Link} onClick={() => setPanelOpen(false)}
                            style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:700, padding:'14px 28px', borderRadius:'12px', textDecoration:'none' }}>
                            {button1Text}
                            <ArrowIcon size={15} color="#040617" />
                          </Link>
                          <Link href={button2Link} onClick={() => setPanelOpen(false)}
                            style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(255,255,255,0.7)', fontSize:'14px', fontWeight:600, padding:'14px 24px', borderRadius:'12px', textDecoration:'none' }}>
                            {button2Text}
                          </Link>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>


          </motion.div>
        </div>
      </div>
    </section>
  )
}