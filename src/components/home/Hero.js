'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DonateButton from '@/components/ui/DonateButton'
import Image from 'next/image'

// ══════════════════════════════════════════════════════════════
// IMAGE COLLECTIONS FOR AUTO-ROTATION
// ══════════════════════════════════════════════════════════════

const imageCollections = {
  leftColumn: [
    "/images/home/banner4.png",
    "/images/home/banner2.png",
     "/images/home/banner3.png",
  ],
  centerVideo: [
    "/images/home-hero/campus-building.png",
    "/images/home-hero/students-classroom.png",
    "/images/home-hero/children-smiling.png",
  ],
  rightColumn: [
    "/images/home/banner3.png",
    "/images/home/banner1.png",
     "/images/home/banner2.png",
  ],
  buxtonCard: [
     "/images/home/banner4.png",
    "/images/home/banner2.png",
  ],
  mobileTop: [
    "/images/home/banner4.png",
    "/images/home/banner2.png",
     "/images/home/banner3.png",
  ],
  mobileBottom: [
     "/images/home/banner4.png",
    "/images/home/banner2.png",
  ]
}

// STATIC DECORATIVE ELEMENTS
const staticAssets = {
  avatars: {
    one: "/images/home-static/avatar-1.svg",
    two: "/images/home-static/avatar-2.svg",
    three: "/images/home-static/avatar-3.svg",
  },
  icons: {
    location: "/images/home-static/location-pin.svg",
    arrow: "/images/home-static/button-icon.png",
  },
  decorations: {
    lineLeft: "/images/home-static/line-left.png",
    lineRight: "/images/home-static/line-right.png",
    corner1: "/images/home-static/corner-1.png",
    corner2: "/images/home-static/corner-2.svg",
  }
}

const FILLED = 26, TOTAL = 40

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // Image rotation states
  const [leftIndex, setLeftIndex] = useState(0)
  const [centerIndex, setCenterIndex] = useState(0)
  const [rightIndex, setRightIndex] = useState(0)
  const [buxtonIndex, setBuxtonIndex] = useState(0)
  const [mobileTopIndex, setMobileTopIndex] = useState(0)
  const [mobileBottomIndex, setMobileBottomIndex] = useState(0)

  const openVideo = () => setIsVideoOpen(true)
  const closeVideo = () => setIsVideoOpen(false)

  // Auto-rotate images every 5 seconds with different offsets
  useEffect(() => {
    const interval1 = setInterval(() => {
      setLeftIndex(prev => (prev + 1) % imageCollections.leftColumn.length)
    }, 5000)

    const interval2 = setInterval(() => {
      setCenterIndex(prev => (prev + 1) % imageCollections.centerVideo.length)
    }, 6000) // Slightly different timing

    const interval3 = setInterval(() => {
      setRightIndex(prev => (prev + 1) % imageCollections.rightColumn.length)
    }, 7000) // Different timing

    const interval4 = setInterval(() => {
      setBuxtonIndex(prev => (prev + 1) % imageCollections.buxtonCard.length)
    }, 8000)

    const interval5 = setInterval(() => {
      setMobileTopIndex(prev => (prev + 1) % imageCollections.mobileTop.length)
    }, 5500)

    const interval6 = setInterval(() => {
      setMobileBottomIndex(prev => (prev + 1) % imageCollections.mobileBottom.length)
    }, 7500)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      clearInterval(interval3)
      clearInterval(interval4)
      clearInterval(interval5)
      clearInterval(interval6)
    }
  }, [])

  return (
    <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&display=swap');
        @keyframes rotateSlow  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)} }
        @keyframes rotateSlowR { from{transform:rotate(0deg)}  to{transform:rotate(-360deg)} }

        .hero-desktop { display: block; }
        .hero-mobile  { display: none;  }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          align-items: start;
        }

        @media (max-width: 768px) {
          .hero-desktop { display: none !important; }
          .hero-mobile  { display: flex !important; }
        }
      `}</style>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeVideo}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'pointer'
            }}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '48px',
                height: '48px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                zIndex: 10001
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '1200px',
                aspectRatio: '16/9',
                backgroundColor: '#000',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                cursor: 'default'
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Mico Foundation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP LAYOUT */}
      <div className="hero-desktop" style={{ paddingBottom: '120px' }}>

        {/* Sparkle backgrounds */}
        {[{ l:'118px', t:'270px' }, { l:'698px', t:'410px' }, { l:'1289px', t:'140px' }].map((pos, i) => (
          <div key={i} style={{ position:'absolute', left:pos.l, top:pos.t, width:'523px', height:'523px', overflow:'hidden', pointerEvents:'none', zIndex:0, opacity:0.3 }}>
            <Image src={staticAssets.decorations.corner1} alt="" width={523} height={523} style={{ width:'100%', height:'100%', objectFit:'contain' }} />
          </div>
        ))}

        {/* Vertical lines */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'90px', width:'1px', pointerEvents:'none', zIndex:0 }}>
          <Image src={staticAssets.decorations.lineLeft} alt="" width={1} height={1000} style={{ width:'1px', height:'100%' }} />
        </div>
        <div style={{ position:'absolute', top:0, bottom:0, right:'90px', width:'1px', pointerEvents:'none', zIndex:0 }}>
          <Image src={staticAssets.decorations.lineRight} alt="" width={1} height={1000} style={{ width:'1px', height:'100%' }} />
        </div>

        {/* Corner decorations */}
        <Image src={staticAssets.decorations.corner1} alt="" width={30} height={30} style={{ position:'absolute', top:'90px',    left:'75px',  width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner1} alt="" width={30} height={30} style={{ position:'absolute', top:'90px',    right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner1} alt="" width={30} height={30} style={{ position:'absolute', bottom:'90px', left:'75px',  width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner2} alt="" width={30} height={30} style={{ position:'absolute', bottom:'90px', right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />

        <div style={{ maxWidth:'1920px', margin:'0 auto', position:'relative', zIndex:2 }}>

          {/* Headline */}
          <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.7}}
            style={{ textAlign:'center', padding:'148px 175px 0' }}>
            <h1 style={{ fontFamily:"'inter',sans-serif", fontSize:'clamp(2.5rem,5.5vw,6.25rem)', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96.93%', margin:'0 0 16px', textTransform:'capitalize' }}>
              Together For Better Education
            </h1>
            <p style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#6F7181', letterSpacing:'0.16px', lineHeight:'24px', margin:'0 auto', maxWidth:'680px' }}>
              Your support helps Mico empower students, uplift communities, and shape the future through learning.
            </p>
          </motion.div>

          {/* Donate + avatars */}
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.2}}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'16px', marginTop:'32px', paddingBottom:'48px' }}>
            <DonateButton text="Donate Now" href="/donate" />
            <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
              <div style={{ position:'relative', width:'84px', height:'36px', flexShrink:0 }}>
                <Image src={staticAssets.avatars.one} alt="" width={36} height={36} style={{ position:'absolute', left:0,     top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <Image src={staticAssets.avatars.two} alt="" width={36} height={36} style={{ position:'absolute', left:'24px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <Image src={staticAssets.avatars.three} alt="" width={36} height={36} style={{ position:'absolute', left:'48px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
              </div>
              <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#040617' }}>
                12391+ donation already sented
              </span>
            </div>
          </motion.div>

          {/* Photo grid */}
          <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.8,delay:0.3}}
            style={{ padding:'0 165px' }}>
            <div className="hero-grid">

              {/* Left - Transitioning Images */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={leftIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ position:'absolute', inset:0 }}
                  >
                    <Image src={imageCollections.leftColumn[leftIndex]} alt="Students" fill style={{ objectFit:'cover' }} sizes="33vw" priority />
                  </motion.div>
                </AnimatePresence>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(-0.95deg,rgba(0,0,0,0.6) 0.68%,rgba(0,0,0,0) 23.88%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 35.42%)' }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                  <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#fff' }}>Jamaica, Buxton</span>
                </div>
                <div style={{ position:'absolute', bottom:'24px', right:'24px', backgroundColor:'#D6F5DA', borderRadius:'16px', padding:'16px' }}>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'42px', fontWeight:600, color:'#13531D', lineHeight:1, margin:0 }}>$34M</p>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#1D7C2B', margin:0, whiteSpace:'nowrap' }}>Total money donated.</p>
                </div>
              </div>

              {/* Center */}
              <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'139px' }}>
                {/* Video with YouTube Background */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'344px', cursor:'pointer' }} onClick={openVideo}>
                  {/* YouTube iframe background */}
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&modestbranding=1"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '177.77%',
                      height: '177.77%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      border: 'none'
                    }}
                    allow="autoplay; encrypted-media"
                    title="Background Video"
                  />
                  <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.3)' }} />
                  <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                    <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                    <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#fff' }}>Jamaica, Buxton</span>
                  </div>
                  
                  {/* GOLD TRANSPARENT PLAY BUTTON */}
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'220px', height:'220px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {/* Rotating text circle - larger text */}
                    <svg viewBox="0 0 220 220" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlow 10s linear infinite' }}>
                      <defs>
                        <path 
                          id="circlePath" 
                          d="M 110, 110 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" 
                          fill="none" 
                        />
                      </defs>
                      <text 
                        fill="white" 
                        fontSize="15" 
                        fontWeight="600" 
                        letterSpacing="2"
                        fontFamily="'Inter', sans-serif"
                      >
                        <textPath href="#circlePath" startOffset="23%">
                       THE MICOFOUNDATION CELEBRATING 180YEARS
                        </textPath>
                      </text>
                    </svg>
                    
                    {/* Transparent button with gold play icon */}
                    <button 
                      onClick={openVideo}
                      style={{ 
                        width:'110px', 
                        height:'110px', 
                        backgroundColor:'transparent',
                        borderRadius:'50%', 
                        border:'none', 
                        cursor:'pointer', 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center', 
                        position:'relative', 
                        zIndex:1,
                        transition:'transform 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <svg width="48" height="56" viewBox="0 0 48 56" fill="none" style={{ marginLeft:'4px', filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
                        <path d="M2 0.5V55.5L47 28L2 0.5Z" fill="#FFD900"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Buxton card with Transitioning Background */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'271px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={buxtonIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      style={{ position:'absolute', inset:0 }}
                    >
                      <Image src={imageCollections.buxtonCard[buxtonIndex]} alt="Buxton College" fill style={{ objectFit:'cover' }} sizes="33vw" />
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.45)' }} />
                  <div style={{ position:'absolute', top:'24px', left:'24px' }}>
                    <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#d1d1d1', lineHeight:'38px', margin:0 }}>Current target</p>
                    <p style={{ fontFamily:"'inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#fff', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>Bruxton College</p>
                  </div>
                  <div style={{ position:'absolute', bottom:'20px', left:'24px', right:'24px' }}>
                    <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#5EDA71', textAlign:'center', margin:'0 0 8px' }}>65%</p>
                    <div style={{ display:'flex', gap:'4px' }}>
                      {Array.from({length:TOTAL}).map((_,i) => (
                        <div key={i} style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor:i<FILLED?'#5EDA71':'#d9d9d9', opacity:i<FILLED?1:0.4 }} />
                      ))}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
                      <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'rgba(255,255,255,0.6)' }}>$0</span>
                      <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#5EDA71' }}>$6.5M</span>
                      <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'rgba(255,255,255,0.6)' }}>$10M</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Transitioning Images */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={rightIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ position:'absolute', inset:0 }}
                  >
                    <Image src={imageCollections.rightColumn[rightIndex]} alt="Volunteer" fill style={{ objectFit:'cover' }} sizes="33vw" />
                  </motion.div>
                </AnimatePresence>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 29.7%)' }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                  <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#fff' }}>Jamaica, Buxton</span>
                </div>
                <div style={{ position:'absolute', bottom:'24px', right:'24px', backgroundColor:'#FFF7CC', borderRadius:'16px', padding:'16px' }}>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'42px', fontWeight:600, color:'#665700', lineHeight:1, margin:0 }}>45+</p>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#998200', margin:0, whiteSpace:'nowrap' }}>Completed Projects.</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="hero-mobile" style={{ flexDirection:'column', gap:'26px', padding:'32px 24px 48px', alignItems:'center' }}>

        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.6}}
          style={{ display:'flex', flexDirection:'column', gap:'36px', alignItems:'center', width:'100%' }}>

          <div style={{ display:'flex', flexDirection:'column', gap:'16px', textAlign:'center' }}>
            <h1 style={{ fontFamily:"'inter',sans-serif", fontSize:'60px', fontWeight:800, color:'#040617', letterSpacing:'-0.6px', lineHeight:1.12, margin:0, textTransform:'capitalize' }}>
              Together for better education
            </h1>
            <p style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#6F7181', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>
              Help students around the globe get better opportunities.
            </p>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'16px', alignItems:'center' }}>
            <a href="/donate" style={{ fontFamily:"'inter',sans-serif", display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none' }}>
              Donate Now
              <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'24px', height:'24px', flexShrink:0 }}>
                <Image src={staticAssets.icons.arrow} alt="" width={14} height={14} style={{ objectFit:'contain' }} />
              </span>
            </a>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', width:'100%' }}>
              <div style={{ position:'relative', width:'84px', height:'36px', flexShrink:0 }}>
                <Image src={staticAssets.avatars.one} alt="" width={36} height={36} style={{ position:'absolute', left:0,     top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <Image src={staticAssets.avatars.two} alt="" width={36} height={36} style={{ position:'absolute', left:'24px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <Image src={staticAssets.avatars.three} alt="" width={36} height={36} style={{ position:'absolute', left:'48px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
              </div>
              <span style={{ fontFamily:"'inter',sans-serif", fontSize:'14px', color:'#040617' }}>12391+ donation already sented</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}
          style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>

          {/* Top photo with video and YouTube Background */}
          <div style={{ width:'100%', height:'312px', borderRadius:'12px', overflow:'hidden', position:'relative', cursor:'pointer' }} onClick={openVideo}>
            {/* YouTube iframe background */}
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&modestbranding=1"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '177.77%',
                height: '177.77%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                border: 'none'
              }}
              allow="autoplay; encrypted-media"
              title="Background Video"
            />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.3)' }} />
            <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'4px', whiteSpace:'nowrap' }}>
              <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
              <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'white', letterSpacing:'-0.16px' }}>Jamaica, Buxton</span>
            </div>
            
            {/* GOLD TRANSPARENT PLAY BUTTON - MOBILE */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'220px', height:'220px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 220 220" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlowR 10s linear infinite' }}>
                <defs>
                  <path 
                    id="circlePathMobile" 
                    d="M 110, 110 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" 
                    fill="none" 
                  />
                </defs>
                <text 
                  fill="white" 
                  fontSize="15" 
                  fontWeight="600" 
                  letterSpacing="2"
                  fontFamily="'Inter', sans-serif"
                >
                  <textPath href="#circlePathMobile" startOffset="23%">
                    play a video • play a video
                  </textPath>
                </text>
              </svg>
              
              <button 
                onClick={openVideo}
                style={{ 
                  width:'110px', 
                  height:'110px', 
                  backgroundColor:'transparent',
                  borderRadius:'50%', 
                  border:'none', 
                  cursor:'pointer', 
                  display:'flex', 
                  alignItems:'center', 
                  justifyContent:'center', 
                  zIndex:1, 
                  position:'relative'
                }}
              >
                <svg width="48" height="56" viewBox="0 0 48 56" fill="none" style={{ marginLeft:'4px', filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
                  <path d="M2 0.5V55.5L47 28L2 0.5Z" fill="#FFD900"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Bottom photo with Transitioning Background */}
          <div style={{ width:'100%', height:'271px', borderRadius:'12px', overflow:'hidden', position:'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileBottomIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                style={{ position:'absolute', inset:0 }}
              >
                <Image src={imageCollections.mobileBottom[mobileBottomIndex]} alt="Campus" fill style={{ objectFit:'cover' }} sizes="100vw" />
              </motion.div>
            </AnimatePresence>
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.45)' }} />
            <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', textAlign:'center', width:'262px' }}>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#d1d1d1', lineHeight:'38px', margin:0 }}>Current target</p>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'32px', fontWeight:600, color:'white', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>Bruxton College</p>
            </div>
            <div style={{ position:'absolute', left:'12px', right:'12px', bottom:'12px' }}>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'20px', color:'#5EDA71', letterSpacing:'-0.2px', margin:'0 0 4px', textAlign:'right', paddingRight:'30%' }}>65%</p>
              <div style={{ display:'flex', gap:'3px', height:'16px' }}>
                {Array.from({length:32}).map((_,i) => (
                  <div key={i} style={{ flex:1, height:'100%', borderRadius:'20px', backgroundColor:i<19?'#5EDA71':'#d9d9d9', opacity:i<19?1:0.5 }} />
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ fontFamily:"'inter',sans-serif", fontSize:'14px', color:'rgba(255,255,255,0.6)', letterSpacing:'-0.14px' }}>$0</span>
                <span style={{ fontFamily:"'inter',sans-serif", fontSize:'14px', color:'#5EDA71', letterSpacing:'-0.14px' }}>$6.5M</span>
                <span style={{ fontFamily:"'inter',sans-serif", fontSize:'14px', color:'rgba(255,255,255,0.6)', letterSpacing:'-0.14px' }}>$10M</span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div style={{ display:'flex', gap:'16px', width:'100%' }}>
            <div style={{ flex:1, backgroundColor:'#FFF7CC', borderRadius:'12px', padding:'8px', textAlign:'center' }}>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#665700', lineHeight:'46px', letterSpacing:'-0.32px', margin:0 }}>45+</p>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'18px', color:'#998200', letterSpacing:'-0.18px', margin:0 }}>Completed Projects.</p>
            </div>
            <div style={{ flex:1, backgroundColor:'#D6F5DA', borderRadius:'12px', padding:'8px', textAlign:'center' }}>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#13531D', lineHeight:'46px', letterSpacing:'-0.32px', margin:0 }}>$34M</p>
              <p style={{ fontFamily:"'inter',sans-serif", fontSize:'18px', color:'#1D7C2B', letterSpacing:'-0.18px', margin:0 }}>Total money donated.</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}