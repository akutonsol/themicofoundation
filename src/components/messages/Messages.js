'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const imgArrowPrev = "/images/home-static/prev-icon.png"
const imgArrowNext = "/images/home-static/next-icon.png"
const imgBgPattern = "/images/home-static/com-sparkle.png"

const inter = { fontFamily: "'Inter', sans-serif" }

// SVG arrow replacing the missing button-icon.png
function ArrowIcon({ size = 24, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Messages() {
  const router = useRouter()
  const [messagesData, setMessagesData] = useState(null)
  const [sectionData,  setSectionData]  = useState(null)
  const [loading,      setLoading]      = useState(true)
  const [current,      setCurrent]      = useState(0)
  const [direction,    setDirection]    = useState(1)

  useEffect(() => {
    async function fetchMessages() {
      try {
        const [messages, section] = await Promise.all([
          client.fetch(queries.messages),
          client.fetch(queries.messagesSection),
        ])
        setMessagesData(messages)
        setSectionData(section)
      } catch (error) {
        console.error('Error fetching messages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  if (loading) return (
    <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>Loading messages...</p>
    </section>
  )

  if (!messagesData || messagesData.length === 0 || !sectionData) return (
    <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>No messages available. Please add Team Messages and Messages Section Settings in Sanity Studio.</p>
    </section>
  )

  const people = messagesData.map(msg => ({
    id:          msg.order,
    photo:       urlFor(msg.photo).width(800).url(),
    role:        msg.role,
    name:        msg.name,
    quote:       msg.quote,
    fullMessage: msg.fullMessage,
    slug:        msg.slug,
  }))

  if (!people || people.length === 0) return (
    <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>No team members found. Please add Team Messages in Sanity Studio.</p>
    </section>
  )

  const safeCurrent = Math.min(Math.max(0, current), people.length - 1)

  const goTo = (index) => {
    setDirection(index > safeCurrent ? 1 : -1)
    setCurrent(index)
  }
  const prev     = () => goTo((safeCurrent - 1 + people.length) % people.length)
  const next     = () => goTo((safeCurrent + 1) % people.length)
  const getIndex = (offset) => (safeCurrent + offset + people.length) % people.length

  const goToDetail = (person) => {
    if (person?.slug) router.push(`/messagesdetail/${person.slug}`)
  }

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .msg-desktop { display: flex; padding: 80px clamp(24px, 8vw, 165px); }
        .msg-mobile  { display: none; }
        @media (max-width: 768px) {
          .msg-desktop { display: none !important; }
          .msg-mobile  { display: flex !important; }
        }
      `}</style>

      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgBgPattern}')`, backgroundSize:'679px 96px', backgroundRepeat:'repeat', opacity:0.08 }} />

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="msg-desktop" style={{ position:'relative', zIndex:1, flexDirection:'column', gap:'48px' }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
          <h2 style={{ ...inter, fontSize:'75px', fontWeight:600, color:'#040617', letterSpacing:'-0.75px', lineHeight:'90px', margin:0, whiteSpace:'nowrap' }}>
            {sectionData.heading}
          </h2>
          <div style={{ borderRight:'1px solid #E5E6EB', paddingRight:'16px', maxWidth:'463px' }}>
            <p style={{ ...inter, fontSize:'20px', fontWeight:400, color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
              {sectionData.description}
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ display:'flex', flexDirection:'column', gap:'42px', alignItems:'center' }}>

          {/* 3-person row */}
          <div style={{ display:'flex', alignItems:'center', gap:'24px', width:'100%', justifyContent:'center' }}>

            {/* Prev button */}
            <button onClick={prev} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', flexShrink:0, outline:'none' }}>
              <p style={{ ...inter, fontSize:'20px', color:'#040617', letterSpacing:'0.2px', lineHeight:'30px', margin:0, whiteSpace:'nowrap' }}>Last Message</p>
              <div style={{ width:'44px', height:'44px', border:'2px solid #040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <img src={imgArrowPrev} alt="" style={{ width:'24px', height:'24px', objectFit:'contain' }} />
              </div>
            </button>

            {/* Left — faded */}
            <motion.div
              key={`left-${getIndex(-1)}`}
              initial={{ opacity:0, x:-30 }} animate={{ opacity:0.4, x:0 }} transition={{ duration:0.4 }}
              onClick={() => goToDetail(people[getIndex(-1)])}
              style={{ width:'360px', display:'flex', flexDirection:'column', gap:'16px', cursor:'pointer', flexShrink:0 }}
            >
              <div style={{ width:'360px', height:'422px', borderRadius:'20px', overflow:'hidden', border:'1px solid #E5E6EB', position:'relative' }}>
                <img src={people[getIndex(-1)].photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)' }} />
              </div>
              <div>
                <p style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>{people[getIndex(-1)].role}</p>
                <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{people[getIndex(-1)].name}</p>
              </div>
            </motion.div>

            {/* Center — active */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`center-${safeCurrent}`}
                initial={{ opacity:0, scale:0.95, y:20 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95, y:-20 }} transition={{ duration:0.4 }}
                onClick={() => goToDetail(people[safeCurrent])}
                style={{ width:'510px', display:'flex', flexDirection:'column', gap:'16px', flexShrink:0, cursor:'pointer' }}
              >
                <div style={{ width:'510px', height:'501px', borderRadius:'20px', overflow:'hidden', border:'1px solid #E5E6EB', position:'relative' }}>
                  <img src={people[safeCurrent].photo} alt="" style={{ width:'100%', height:'108%', objectFit:'cover', objectPosition:'top' }} />
                </div>
                <div>
                  <p style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>{people[safeCurrent].role}</p>
                  <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{people[safeCurrent].name}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right — faded */}
            <motion.div
              key={`right-${getIndex(1)}`}
              initial={{ opacity:0, x:30 }} animate={{ opacity:0.4, x:0 }} transition={{ duration:0.4 }}
              onClick={() => goToDetail(people[getIndex(1)])}
              style={{ width:'360px', display:'flex', flexDirection:'column', gap:'16px', cursor:'pointer', flexShrink:0 }}
            >
              <div style={{ width:'360px', height:'422px', borderRadius:'20px', overflow:'hidden', border:'1px solid #E5E6EB', position:'relative' }}>
                <img src={people[getIndex(1)].photo} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)' }} />
              </div>
              <div>
                <p style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>{people[getIndex(1)].role}</p>
                <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{people[getIndex(1)].name}</p>
              </div>
            </motion.div>

            {/* Next button */}
            <button onClick={next} style={{ display:'flex', alignItems:'center', gap:'16px', background:'none', border:'none', cursor:'pointer', flexShrink:0, outline:'none' }}>
              <div style={{ width:'44px', height:'44px', backgroundColor:'#040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <img src={imgArrowNext} alt="" style={{ width:'24px', height:'24px', objectFit:'contain' }} />
              </div>
              <p style={{ ...inter, fontSize:'20px', color:'#040617', letterSpacing:'0.2px', lineHeight:'30px', margin:0, whiteSpace:'nowrap' }}>Next Message</p>
            </button>
          </div>

          {/* Quote + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${safeCurrent}`}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}
              style={{ display:'flex', flexDirection:'column', gap:'24px', alignItems:'center', maxWidth:'784px', textAlign:'center' }}
            >
              <p style={{ ...inter, fontSize:'24px', fontWeight:400, color:'#040617', letterSpacing:'0.24px', lineHeight:'38px', margin:0 }}>
                {people[safeCurrent].quote}
              </p>
              <a
                href={people[safeCurrent]?.slug ? `/messagesdetail/${people[safeCurrent].slug}` : '#'}
                style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'12px', backgroundColor:'#FFD900', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'240px', justifyContent:'center' }}
              >
                {sectionData.buttonText}
                <ArrowIcon size={20} color="#040617" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="msg-mobile" style={{ flexDirection:'column', gap:'32px', alignItems:'center', padding:'60px 24px', position:'relative', zIndex:1 }}>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px', alignItems:'center', textAlign:'center', width:'100%' }}>
          <h2 style={{ ...inter, fontSize:'64px', fontWeight:600, color:'#040617', letterSpacing:'-0.64px', lineHeight:'69px', margin:0 }}>{sectionData.heading}</h2>
          <p style={{ ...inter, fontSize:'20px', fontWeight:400, color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{sectionData.description}</p>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-card-${safeCurrent}`}
              initial={{ opacity:0, x: direction > 0 ? 40 : -40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x: direction > 0 ? -40 : 40 }} transition={{ duration:0.35 }}
              onClick={() => goToDetail(people[safeCurrent])}
              style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%', cursor:'pointer' }}
            >
              <div style={{ width:'100%', aspectRatio:'342/401', borderRadius:'20px', overflow:'hidden', border:'1px solid #E5E6EB', position:'relative' }}>
                <img src={people[safeCurrent].photo} alt="" style={{ width:'100%', height:'108%', objectFit:'cover', objectPosition:'top' }} />
              </div>
              <div>
                <p style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>{people[safeCurrent].role}</p>
                <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', margin:0, textTransform:'capitalize' }}>{people[safeCurrent].name}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
            <button onClick={prev} style={{ width:'44px', height:'44px', border:'2px solid #E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', opacity:0.6, flexShrink:0, outline:'none' }}>
              <img src={imgArrowPrev} alt="" style={{ width:'24px', height:'24px', objectFit:'contain' }} />
            </button>
            <div style={{ display:'flex', gap:'8px' }}>
              {people.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width:'52px', height:'12px', borderRadius:'90px', backgroundColor: i === safeCurrent ? '#FFD900' : '#d9d9d9', opacity: i === safeCurrent ? 1 : 0.4, border:'none', cursor:'pointer', padding:0, transition:'all 0.3s', outline:'none' }} />
              ))}
            </div>
            <button onClick={next} style={{ width:'44px', height:'44px', backgroundColor:'#E5E6EB', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', flexShrink:0, outline:'none' }}>
              <img src={imgArrowNext} alt="" style={{ width:'24px', height:'24px', objectFit:'contain' }} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-quote-${safeCurrent}`}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }} transition={{ duration:0.35 }}
            style={{ display:'flex', flexDirection:'column', gap:'24px', alignItems:'center', width:'100%', textAlign:'center' }}
          >
            <p style={{ ...inter, fontSize:'20px', fontWeight:400, color:'#040617', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
              {people[safeCurrent].quote}
            </p>
            <a
              href={people[safeCurrent]?.slug ? `/messagesdetail/${people[safeCurrent].slug}` : '#'}
              style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', backgroundColor:'#FFD900', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', textDecoration:'none', width:'100%' }}
            >
              {sectionData.buttonText}
              <ArrowIcon size={18} color="#040617" />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}