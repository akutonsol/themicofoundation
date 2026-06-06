'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'
import Image from 'next/image'

const staticAssets = {
  avatars: {
    one:   "/images/home-static/avatar-1.svg",
    two:   "/images/home-static/avatar-2.svg",
    three: "/images/home-static/avatar-3.svg",
  },
  icons: {
    play:     "/images/home-static/play-icon.svg",
    location: "/images/home-static/location-pin.svg",
    arrow:    "/images/home-static/play-icon.svg",
  },
  decorations: {
    lineLeft:     "/images/home-static/Line-left.png",
    lineRight:    "/images/home-static/Line-right.png",
    corner1:      "/images/home-static/corner-1.png",
    corner2:      "/images/home-static/corner-2.svg",
    sparkleSmall: "/images/home-static/sparkle-left.png",
    sparkleLarge: "/images/home-static/sparkle-left.png",
  },
  logo: "/images/home/themicofoundation-logo.png",
}

const TOTAL = 40

export default function Hero() {
  const [heroData,           setHeroData]           = useState(null)
  const [loading,            setLoading]            = useState(true)
  const [currentImageIndex,  setCurrentImageIndex]  = useState(0)
  const [showVideoModal,     setShowVideoModal]     = useState(false)

  useEffect(() => {
    async function fetchHeroData() {
      try {
        const data = await client.fetch(queries.hero)
        setHeroData(data)
      } catch (error) {
        console.error('Error fetching hero data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHeroData()
  }, [])

  const headline              = heroData?.mainHeadline          || 'The Mico Foundation'
  const subheadline           = heroData?.subHeadLine            || 'Together for a Better Future'
  const videoId               = heroData?.videoId                || 'dQw4w9WgXcQ'
  const locationText          = heroData?.locationText           || 'Jamaica, Buxton'
  const totalMoneyDonated     = heroData?.totalMoneyDonated      || '$34M'
  const totalMoneyDonatedText = heroData?.totalMoneyDonatedText  || 'Total money donated.'
  const completedProjects     = heroData?.completedProjects      || '45+'
  const completedProjectsText = heroData?.completedProjectsText  || 'Completed Projects.'
  const currentTargetName     = heroData?.currentTargetName      || 'Bruxton College'
  const targetAmount          = heroData?.targetAmount           || 10000000
  const amountDonated         = heroData?.amountDonated          || 6500000

  const percentage = targetAmount > 0 ? Math.round((amountDonated / targetAmount) * 100) : 0
  const FILLED     = Math.round((percentage / 100) * TOTAL)

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return '$' + (amount / 1000000).toFixed(1) + 'M'
    if (amount >= 1000)    return '$' + (amount / 1000).toFixed(1) + 'K'
    return '$' + amount
  }

  const heroImages = heroData?.heroImages?.map(img => urlFor(img).width(800).url()) || []
  const allImages  = [
    heroImages[0] || "/images/home-hero/banner1.png",
    heroImages[1] || "/images/home-hero/banner2.png",
    heroImages[2] || "/images/home-hero/banner3.png",
    heroImages[3] || "/images/home-hero/banner4.png",
    heroImages[4] || "/images/home-hero/banner1.png",
    heroImages[5] || "/images/home-hero/banner2.png",
  ]

  const mobileImages = { top: allImages[4], bottom: allImages[5] }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % allImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [allImages.length])

  const getImageForPosition = offset => allImages[(currentImageIndex + offset) % allImages.length]

  if (loading) return (
    <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#FFFDF9' }}>
      <p style={{ fontSize:'24px', color:'#040617' }}>Loading...</p>
    </section>
  )

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');
        @keyframes rotateSlow  { from{transform:rotate(0deg)}  to{transform:rotate(360deg)}  }
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
        .video-modal-overlay {
          position: fixed; top:0; left:0; right:0; bottom:0;
          background: rgba(0,0,0,0.9);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .video-modal-content {
          position: relative; width: 100%; max-width: 1200px; aspect-ratio: 16/9;
        }
        .video-modal-close {
          position: absolute; top: -40px; right: 0;
          background: none; border: none; color: white;
          font-size: 32px; cursor: pointer; padding: 0;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          transition: opacity 0.2s;
        }
        .video-modal-close:hover { opacity: 0.7; }
        .video-background {
          position: absolute; top:0; left:0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 0;
        }
        .video-background iframe {
          position: absolute; top: 50%; left: 50%;
          width: 100vw; height: 100vh;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        @media (min-aspect-ratio: 16/9) { .video-background iframe { height: 56.25vw; } }
        @media (max-aspect-ratio: 16/9) { .video-background iframe { width: 177.78vh; } }
      `}</style>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setShowVideoModal(false)}>x</button>
            <iframe width="100%" height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen style={{ borderRadius:'12px' }}
            />
          </div>
        </div>
      )}

      {/* -- DESKTOP ----------------------------------------------------------- */}
      <div className="hero-desktop" style={{ paddingBottom:'120px' }}>

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
        <Image src={staticAssets.decorations.corner2} alt="" width={12} height={12} style={{ position:'absolute', top:'84px',    left:'75px',  width:'30px', height:'30px', zIndex:2, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner1} alt="" width={30} height={30} style={{ position:'absolute', top:'90px',    right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner2} alt="" width={12} height={12} style={{ position:'absolute', top:'84px',    right:'75px', width:'30px', height:'30px', zIndex:2, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner1} alt="" width={30} height={30} style={{ position:'absolute', bottom:'90px', left:'75px',  width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner2} alt="" width={12} height={12} style={{ position:'absolute', bottom:'84px', left:'75px',  width:'30px', height:'30px', zIndex:2, pointerEvents:'none' }} />
        <Image src={staticAssets.decorations.corner2} alt="" width={30} height={30} style={{ position:'absolute', bottom:'90px', right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />

        <div style={{ maxWidth:'1920px', margin:'0 auto', position:'relative', zIndex:2 }}>

          {/* Hero text block */}
          <motion.div
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
            style={{ textAlign:'center', padding:'100px 165px 0' }}
          >
            {/* Headline */}
            <h1 style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      'clamp(2.5rem, 7.5vw, 9rem)',
              fontWeight:    800,
              color:         '#040617',
              letterSpacing: '-2px',
              lineHeight:    '96%',
              margin:        '0 0 24px',
              textTransform: 'capitalize',
              width:         '100%',
              textAlign:     'center',
            }}>
              {headline}
            </h1>

            {/* Subheadline */}
            <p style={{
              fontFamily:    "'Inter', sans-serif",
              fontSize:      'clamp(1.75rem, 3vw, 3.25rem)',
              fontWeight:    600,
              color:         '#6F7181',
              letterSpacing: '-0.5px',
              lineHeight:    '1.2',
              margin:        '0 0 32px',
              textAlign:     'center',
            }}>
              {subheadline}
            </p>

            {/* Logo */}
            <motion.div
              initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
              style={{ display:'flex', justifyContent:'center', marginBottom:'8px' }}
            >
              <Image
                src={staticAssets.logo}
                alt="The Mico Foundation"
                width={200} height={140}
                style={{ objectFit:'contain', height:'140px', width:'auto' }}
              />
            </motion.div>
          </motion.div>

          <div style={{ height:'48px' }} />

          {/* Photo grid */}
          <motion.div
            initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3 }}
            style={{ padding:'0 165px' }}
          >
            <div className="hero-grid">

              {/* Left */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`left-${currentImageIndex}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }} style={{ position:'absolute', inset:0 }}>
                    <Image src={getImageForPosition(0)} alt="Hero" fill style={{ objectFit:'cover' }} sizes="33vw" priority />
                  </motion.div>
                </AnimatePresence>
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(-0.95deg,rgba(0,0,0,0.6) 0.68%,rgba(0,0,0,0) 23.88%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 35.42%)', zIndex:1 }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px', zIndex:2 }}>
                  <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'#fff' }}>{locationText}</span>
                </div>
                <div style={{ position:'absolute', bottom:'24px', right:'24px', backgroundColor:'#D6F5DA', borderRadius:'16px', padding:'16px', zIndex:2 }}>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'42px', fontWeight:600, color:'#13531D', lineHeight:1, margin:0 }}>{totalMoneyDonated}</p>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', color:'#1D7C2B', margin:0, whiteSpace:'nowrap' }}>{totalMoneyDonatedText}</p>
                </div>
              </div>

              {/* Center */}
              <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'139px' }}>
                {/* Video */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'344px' }}>
                  <div className="video-background">
                    <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`} frameBorder="0" allow="autoplay; encrypted-media" style={{ borderRadius:'16px' }} />
                  </div>
                  <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.3)', zIndex:1 }} />
                  <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px', zIndex:3 }}>
                    <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                    <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'#fff' }}>{locationText}</span>
                  </div>
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'167px', height:'167px', display:'flex', alignItems:'center', justifyContent:'center', zIndex:3 }}>
                    <svg viewBox="0 0 167 167" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlow 10s linear infinite' }}>
                      <path id="cpth" d="M83.5,83.5 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none" />
                      <text style={{ fontSize:'20px', fill:'white' }}><textPath href="#cpth">Play a video - Play a video - Play a video -</textPath></text>
                    </svg>
                    <button onClick={() => setShowVideoModal(true)} style={{ width:'56px', height:'56px', backgroundColor:'#ffa801', borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1, boxShadow:'0 0 0 10px rgba(4,6,23,0.55)' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 4L20 12L6 20V4Z" fill="#040617"/></svg>
                    </button>
                  </div>
                </div>

                {/* Buxton card */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'271px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={`buxton-${currentImageIndex}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }} style={{ position:'absolute', inset:0 }}>
                      <Image src={getImageForPosition(3)} alt={currentTargetName} fill style={{ objectFit:'cover' }} sizes="33vw" />
                    </motion.div>
                  </AnimatePresence>
                  <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.45)', zIndex:1 }} />
                  <div style={{ position:'absolute', top:'24px', left:'24px', zIndex:2 }}>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', color:'#d1d1d1', lineHeight:'38px', margin:0 }}>Current target</p>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#fff', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{currentTargetName}</p>
                  </div>
                  <div style={{ position:'absolute', bottom:'20px', left:'24px', right:'24px', zIndex:2 }}>
                    <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', color:'#5EDA71', textAlign:'center', margin:'0 0 8px' }}>{percentage}%</p>
                    <div style={{ display:'flex', gap:'4px' }}>
                      {Array.from({length:TOTAL}).map((_,i) => (
                        <div key={i} style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor:i<FILLED?'#5EDA71':'#d9d9d9', opacity:i<FILLED?1:0.4 }} />
                      ))}
                    </div>
                    <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
                      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'rgba(255,255,255,0.6)' }}>$0</span>
                      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'#5EDA71' }}>{formatCurrency(amountDonated)}</span>
                      <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'rgba(255,255,255,0.6)' }}>{formatCurrency(targetAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <AnimatePresence mode="wait">
                  <motion.div key={`right-${currentImageIndex}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.5 }} style={{ position:'absolute', inset:0 }}>
                    <Image src={getImageForPosition(2)} alt="Volunteer" fill style={{ objectFit:'cover' }} sizes="33vw" />
                  </motion.div>
                </AnimatePresence>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 29.7%)', zIndex:1 }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px', zIndex:2 }}>
                  <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
                  <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'#fff' }}>{locationText}</span>
                </div>
                <div style={{ position:'absolute', bottom:'24px', right:'24px', backgroundColor:'#FFF7CC', borderRadius:'16px', padding:'16px', zIndex:2 }}>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'42px', fontWeight:600, color:'#665700', lineHeight:1, margin:0 }}>{completedProjects}</p>
                  <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', color:'#998200', margin:0, whiteSpace:'nowrap' }}>{completedProjectsText}</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* -- MOBILE ------------------------------------------------------------ */}
      <div className="hero-mobile" style={{ flexDirection:'column', gap:'26px', padding:'32px 24px 48px', alignItems:'center' }}>

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          style={{ display:'flex', flexDirection:'column', gap:'24px', alignItems:'center', width:'100%' }}>

          <div style={{ display:'flex', flexDirection:'column', gap:'12px', textAlign:'center', width:'100%' }}>
            <h1 style={{ fontFamily:"'Inter',sans-serif", fontSize:'52px', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:1.05, margin:0, textTransform:'capitalize', textAlign:'center', width:'100%' }}>
              {headline}
            </h1>
            <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', fontWeight:600, color:'#6F7181', letterSpacing:'-0.3px', lineHeight:'1.3', margin:0, textAlign:'center' }}>
              {subheadline}
            </p>
          </div>

          {/* Logo mobile */}
          <Image src={staticAssets.logo} alt="The Mico Foundation" width={130} height={88} style={{ objectFit:'contain', height:'88px', width:'auto' }} />
        </motion.div>

        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
          style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>

          {/* Video */}
          <div style={{ width:'100%', height:'312px', borderRadius:'12px', overflow:'hidden', position:'relative' }}>
            <div className="video-background">
              <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1&playsinline=1`} frameBorder="0" allow="autoplay; encrypted-media" style={{ borderRadius:'12px' }} />
            </div>
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.3)', zIndex:1 }} />
            <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'4px', whiteSpace:'nowrap', zIndex:3 }}>
              <Image src={staticAssets.icons.location} alt="" width={24} height={24} />
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'16px', color:'white' }}>{locationText}</span>
            </div>
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'167px', height:'167px', display:'flex', alignItems:'center', justifyContent:'center', zIndex:3 }}>
              <svg viewBox="0 0 167 167" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlowR 10s linear infinite' }}>
                <path id="cpthm" d="M83.5,83.5 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none" />
                <text style={{ fontSize:'20px', fill:'white' }}><textPath href="#cpthm">Play a video - Play a video - Play a video -</textPath></text>
              </svg>
              <button onClick={() => setShowVideoModal(true)} style={{ width:'56px', height:'56px', backgroundColor:'#ffa801', borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1, position:'relative', boxShadow:'0 0 0 10px rgba(4,6,23,0.55)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M6 4L20 12L6 20V4Z" fill="#040617"/></svg>
              </button>
            </div>
          </div>

          {/* Bottom photo */}
          <div style={{ width:'100%', height:'271px', borderRadius:'12px', overflow:'hidden', position:'relative' }}>
            <Image src={mobileImages.bottom} alt="Campus" fill style={{ objectFit:'cover' }} sizes="100vw" />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.45)' }} />
            <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', textAlign:'center', width:'262px' }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'24px', color:'#d1d1d1', lineHeight:'38px', margin:0 }}>Current target</p>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'32px', fontWeight:600, color:'white', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{currentTargetName}</p>
            </div>
            <div style={{ position:'absolute', left:'12px', right:'12px', bottom:'12px' }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'20px', color:'#5EDA71', margin:'0 0 4px', textAlign:'right', paddingRight:'30%' }}>{percentage}%</p>
              <div style={{ display:'flex', gap:'3px', height:'16px' }}>
                {Array.from({length:32}).map((_,i) => {
                  const mobileFilled = Math.round((percentage / 100) * 32)
                  return <div key={i} style={{ flex:1, height:'100%', borderRadius:'20px', backgroundColor:i<mobileFilled?'#5EDA71':'#d9d9d9', opacity:i<mobileFilled?1:0.5 }} />
                })}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'14px', color:'rgba(255,255,255,0.6)' }}>$0</span>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'14px', color:'#5EDA71' }}>{formatCurrency(amountDonated)}</span>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:'14px', color:'rgba(255,255,255,0.6)' }}>{formatCurrency(targetAmount)}</span>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div style={{ display:'flex', gap:'16px', width:'100%' }}>
            <div style={{ flex:1, backgroundColor:'#FFF7CC', borderRadius:'12px', padding:'8px', textAlign:'center' }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#665700', lineHeight:'46px', margin:0 }}>{completedProjects}</p>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'18px', color:'#998200', margin:0 }}>{completedProjectsText}</p>
            </div>
            <div style={{ flex:1, backgroundColor:'#D6F5DA', borderRadius:'12px', padding:'8px', textAlign:'center' }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'32px', fontWeight:600, color:'#13531D', lineHeight:'46px', margin:0 }}>{totalMoneyDonated}</p>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:'18px', color:'#1D7C2B', margin:0 }}>{totalMoneyDonatedText}</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}