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
    <section style={{ position:'relative', overflow:'hidden', backgroundColor:'#FAF9F6', paddingTop:'80px', paddingBottom:'80px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        .legacy-wrap  { display: flex; min-height: 640px; }
        .legacy-left  { flex: 0 0 50%; position: relative; overflow: hidden; min-height: 600px; }
        .legacy-right { flex: 1; display: flex; align-items: center; padding: 80px 80px 80px 72px; position: relative; }

        @media (max-width: 1100px) { .legacy-right { padding: 64px 48px; } }
        @media (max-width: 768px) {
          .legacy-wrap  { flex-direction: column; }
          .legacy-left  { flex: none; height: 360px; }
          .legacy-right { padding: 52px 28px; }
          .legacy-headline { font-size: 44px !important; }
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
          border: 1px solid #E5E6EB;
          padding: 15px 28px; border-radius: 14px;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .legacy-secondary-btn:hover { border-color: #040617; background: rgba(4,6,23,0.04); }

        .legacy-stat-link { text-decoration: none; display: block; }
        .legacy-stat-link:hover .legacy-stat-val { color: #040617; }
        .legacy-stat-link:hover .legacy-stat-box { background: #040617; }

        .legacy-payment-badge {
          display: inline-flex; align-items: center; justify-content: center;
          background: white; border: 1px solid #E5E6EB;
          border-radius: 8px; padding: 6px 14px; height: 36px;
        }
      `}</style>

      <div className="legacy-wrap">

        {/* LEFT - photo */}
        <div className="legacy-left">
          <img
            src={heroImageUrl}
            alt="Mico Foundation legacy"
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
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

          {/* Floating mini card */}
          <motion.div
            initial={{ opacity:0, y:16, rotate:-2 }}
            whileInView={{ opacity:1, y:0, rotate:-2 }}
            viewport={{ once:true }}
            transition={{ duration:0.7, delay:0.3 }}
            style={{ position:'absolute', top:'38%', left:'50%', transform:'translate(-50%,-50%) rotate(-2deg)', zIndex:10, width:'210px', backgroundColor:'rgba(4,6,23,0.88)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:'16px', padding:'18px', backdropFilter:'blur(10px)' }}
          >
            <p style={{ ...inter, fontSize:'16px', fontWeight:700, color:'white', margin:'0 0 6px', lineHeight:1.2 }}>Be Part of the Legacy</p>
            <p style={{ ...inter, fontSize:'11px', color:'rgba(255,255,255,0.5)', margin:'0 0 12px', lineHeight:1.5 }}>Support education in Jamaica</p>
            <div style={{ display:'flex', gap:'6px', alignItems:'center' }}>
              <div style={{ height:'26px', background:'#FFD900', borderRadius:'6px', padding:'0 10px', display:'flex', alignItems:'center' }}>
                <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#040617' }}>Donate</span>
              </div>
              <img src="/images/home-static/visa.png" alt="Visa" style={{ height:'14px', opacity:0.5 }} />
              <img src="/images/home-static/mastercard.png" alt="MC" style={{ height:'14px', opacity:0.5 }} />
            </div>
          </motion.div>
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
              style={{ ...inter, fontSize:'clamp(2.5rem, 5vw, 7rem)', fontWeight:700, color:'#040617', lineHeight:'0.92', letterSpacing:'-0.06em', margin:'0 0 28px' }}
            >
              {headline}
            </h2>

            {/* Divider */}
            <div style={{ height:'1px', backgroundColor:'#E5E6EB', marginBottom:'28px' }} />

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
            <div style={{ height:'1px', backgroundColor:'#E5E6EB', marginBottom:'28px' }} />

            {/* Stats row - unchanged */}
            <div style={{ display:'flex', gap:'0', marginBottom:'32px' }}>
              {stats.map((stat, i) => {
                const link = STAT_LINKS[i] || { href:'/', external:false }
                const inner = (
                  <div style={{ paddingRight:'32px', borderRight: i < stats.length - 1 ? '1px solid #E5E6EB' : 'none', paddingLeft: i > 0 ? '32px' : '0' }}>
                    <p className="legacy-stat-val" style={{ ...inter, fontSize:'36px', fontWeight:900, color:'#040617', margin:'0 0 4px', letterSpacing:'-2px', transition:'color 0.2s' }}>
                      {stat.value}
                    </p>
                    <p style={{ ...inter, fontSize:'12px', color:'#6F7181', margin:0, lineHeight:1.4, maxWidth:'110px' }}>
                      {stat.label}
                    </p>
                  </div>
                )
                return link.external
                  ? <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" className="legacy-stat-link">{inner}</a>
                  : <Link key={i} href={link.href} className="legacy-stat-link">{inner}</Link>
              })}
            </div>

            {/* Payment badges */}
            <div>
              <p style={{ ...inter, fontSize:'11px', color:'#9CA3AF', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 12px' }}>
                Secure Global Giving
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
                {[
                  { src:'/images/home-static/visa.png',       alt:'Visa'       },
                  { src:'/images/home-static/mastercard.png', alt:'Mastercard' },
                  { src:'/images/home-static/keycard.png',    alt:'KeyCard'    },
                  { src:'/images/home-static/3dsecure.png',   alt:'3D Secure'  },
                ].map(p => (
                  <div key={p.alt} className="legacy-payment-badge">
                    <img src={p.src} alt={p.alt} style={{ height:'18px', objectFit:'contain' }} />
                  </div>
                ))}
                <div className="legacy-payment-badge">
                  <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#6F7181' }}>AMEX</span>
                </div>
              </div>
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
                      <div style={{ width:'100%', maxWidth:'100%', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', alignItems:'start' }}>

                        {/* LEFT: image sticky */}
                        <div style={{ position:'sticky', top:0 }}>
                          <div style={{ borderRadius:'20px', overflow:'hidden', position:'relative', aspectRatio:'4/5' }}>
                            <img
                              src={heroImageUrl}
                              alt="Mico Foundation legacy"
                              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }}
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

                        {/* RIGHT: full article text - all lines end at same right edge */}
                        <div>
                          {/* Eyebrow */}
                          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px' }}>
                            <div style={{ width:'20px', height:'2px', backgroundColor:'#FFD900' }} />
                            <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', letterSpacing:'0.18em', textTransform:'uppercase' }}>
                              {badge}
                            </span>
                          </div>

                          {/* Headline */}
                          <h3 style={{ ...inter, fontSize:'clamp(1.8rem,2.8vw,2.6rem)', fontWeight:800, color:'white', letterSpacing:'-1.5px', lineHeight:'1.0', margin:'0 0 20px' }}>
                            {headline}
                          </h3>

                          {/* Divider */}
                          <div style={{ height:'1px', backgroundColor:'rgba(255,255,255,0.1)', marginBottom:'24px' }} />

                          {/* Article paragraphs - width:100% ensures consistent right edge */}
                          <p style={{ ...inter, fontSize:'17px', color:'rgba(255,255,255,0.82)', lineHeight:'1.85', margin:'0 0 20px', width:'100%', display:'block' }}>
                            {paragraph1}
                          </p>
                          <p style={{ ...inter, fontSize:'17px', color:'rgba(255,255,255,0.65)', lineHeight:'1.85', margin:'0 0 32px', width:'100%', display:'block' }}>
                            {paragraph2}
                          </p>

                          {/* Quote */}
                          <div style={{ borderLeft:'3px solid #FFD900', paddingLeft:'20px', marginBottom:'36px' }}>
                            <p style={{ ...inter, fontSize:'18px', fontWeight:500, color:'rgba(255,255,255,0.75)', fontStyle:'italic', lineHeight:'1.65', margin:0 }}>
                              "{bottomQuote}"
                            </p>
                          </div>

                          {/* CTAs */}
                          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
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