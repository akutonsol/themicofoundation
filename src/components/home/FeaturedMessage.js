'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }

function ArrowIcon({ size = 18, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FeaturedMessage() {
  const [featured, setFeatured] = useState(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await client.fetch(`
          *[_type == "teamMessage"] | order(order asc) [0] {
            _id, name, role, quote, fullMessage, slug,
            "photo": photo.asset->url
          }
        `)
        setFeatured(data)
      } catch (err) {
        console.error('Error fetching featured message:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  if (loading) return (
    <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'400px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#6F7181', fontSize:'20px' }}>Loading...</p>
    </section>
  )

  if (!featured) return null

  const slug    = featured.slug?.current || featured.slug || ''
  const href    = slug ? `/messagesdetail/${slug}` : '/messages'
  const excerpt = featured.quote || ''

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* Subtle grid background */
        .fm-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(4,6,23,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(4,6,23,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .fm-desktop { display: flex; padding: 100px 165px; }
        .fm-mobile  { display: none; }

        @media (max-width: 1024px) {
          .fm-desktop { padding: 80px 48px; }
        }
        @media (max-width: 768px) {
          .fm-desktop { display: none !important; }
          .fm-mobile  { display: flex !important; }
        }

        .fm-read-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFD900;
          color: #040617;
          font-size: 14px;
          font-weight: 700;
          padding: 15px 30px;
          border-radius: 14px;
          text-decoration: none;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: transform 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .fm-read-btn:hover { transform: scale(1.02); background: #e6c200; }

        .fm-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          color: #040617;
          font-size: 14px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 14px;
          text-decoration: none;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          border: 1px solid #E5E6EB;
          transition: border-color 0.2s, background 0.2s;
          font-family: 'Inter', sans-serif;
        }
        .fm-all-btn:hover { border-color: #040617; background: rgba(4,6,23,0.04); }

        .fm-img-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
        }
        .fm-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: top;
          transition: transform 0.6s ease;
        }
        .fm-img-wrap:hover img { transform: scale(1.03); }
      `}</style>

      {/* -- DESKTOP ----------------------------------------------- */}
      <div className="fm-section fm-desktop"
        style={{ alignItems:'stretch', gap:'80px', maxWidth:'1760px', margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* LEFT: Photo column */}
        <motion.div
          initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ flex:'0 0 420px', display:'flex', flexDirection:'column', gap:'24px' }}
        >
          {/* Image */}
          <div style={{ flex:1, minHeight:'520px' }}>
            <div className="fm-img-wrap" style={{ height:'100%' }}>
              {featured.photo ? (
                <img src={featured.photo} alt={featured.name} />
              ) : (
                <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ ...inter, fontSize:'80px', fontWeight:800, color:'rgba(255,255,255,0.1)' }}>
                    {featured.name?.charAt(0)}
                  </span>
                </div>
              )}
              {/* Bottom gradient */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.85) 0%, rgba(4,6,23,0) 55%)', borderRadius:'24px' }} />

              {/* Name overlay */}
              <div style={{ position:'absolute', bottom:'28px', left:'28px', right:'28px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
                  <div style={{ width:'24px', height:'2px', backgroundColor:'#FFD900' }} />
                  <p style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', letterSpacing:'0.18em', margin:0, textTransform:'uppercase' }}>
                    {featured.role}
                  </p>
                </div>
                <h3 style={{ ...inter, fontSize:'34px', fontWeight:700, color:'#040617', letterSpacing:'-0.5px', lineHeight:'1.1', margin:0, textTransform:'capitalize' }}>
                  {featured.name}
                </h3>
              </div>
            </div>
          </div>

          {/* Eyebrow label below image */}
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <div style={{ width:'32px', height:'1px', backgroundColor:'rgba(255,217,0,0.6)' }} />
            <span style={{ ...inter, fontSize:'11px', fontWeight:600, color:'#9CA3AF', letterSpacing:'0.18em', textTransform:'uppercase' }}>
              Featured Leadership
            </span>
          </div>
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.7, delay:0.12 }}
          style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'0' }}
        >
          {/* Badge */}
          <div style={{ marginBottom:'28px' }}>
            <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', backgroundColor:'rgba(255,217,0,0.1)', border:'1px solid rgba(255,217,0,0.25)', padding:'6px 16px', borderRadius:'100px', letterSpacing:'0.14em', textTransform:'uppercase' }}>
              A Word From Our Leadership
            </span>
          </div>

          {/* Heading */}
          <h2 style={{ ...inter, fontSize:'clamp(2.8rem,4.5vw,5rem)', fontWeight:800, color:'#040617', letterSpacing:'-2px', lineHeight:'0.95', margin:'0 0 40px' }}>
            Message from<br />
            <span style={{ color:'#FFD900' }}>the Foundation</span>
          </h2>

          {/* Large quote */}
          <div style={{ position:'relative', marginBottom:'36px' }}>
            {/* Giant quote mark */}
            <div style={{ fontSize:'120px', lineHeight:1, color:'#FFD900', opacity:0.12, fontFamily:'Georgia, serif', position:'absolute', top:'-20px', left:'-10px', pointerEvents:'none', userSelect:'none' }}>
              "
            </div>
            <blockquote style={{ ...inter, fontSize:'22px', fontWeight:400, color:'#040617', lineHeight:'1.8', margin:0, paddingLeft:'20px', borderLeft:'3px solid #FFD900', fontStyle:'italic' }}>
              {excerpt}
            </blockquote>
          </div>

          {/* Divider */}
          <div style={{ height:'1px', backgroundColor:'#E5E6EB', marginBottom:'36px' }} />

          {/* Body text (fullMessage preview) */}
          {featured.fullMessage && (
            <p style={{ ...inter, fontSize:'17px', color:'#6F7181', lineHeight:'1.8', margin:'0 0 40px', maxWidth:'640px' }}>
              {typeof featured.fullMessage === 'string'
                ? featured.fullMessage.slice(0, 240) + '...'
                : ''}
            </p>
          )}

          {/* CTAs */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'44px', flexWrap:'wrap' }}>
            <a href={href} className="fm-read-btn">
              Read Full Message
              <ArrowIcon size={16} color="#040617" />
            </a>
            <a href="/messages" className="fm-all-btn">
              View All Messages
            </a>
          </div>

          {/* Divider */}
          <div style={{ height:'1px', backgroundColor:'#E5E6EB', marginBottom:'32px' }} />

          {/* Author signature */}
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <div style={{ width:'52px', height:'52px', borderRadius:'50%', overflow:'hidden', border:'2px solid #FFD900', flexShrink:0 }}>
              {featured.photo ? (
                <img src={featured.photo} alt={featured.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
              ) : (
                <div style={{ width:'100%', height:'100%', backgroundColor:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ ...inter, fontSize:'20px', fontWeight:700, color:'white' }}>{featured.name?.charAt(0)}</span>
                </div>
              )}
            </div>
            <div>
              <p style={{ ...inter, fontSize:'15px', fontWeight:700, color:'#040617', margin:'0 0 2px', letterSpacing:'-0.2px', textTransform:'uppercase' }}>
                {featured.name}
              </p>
              <p style={{ ...inter, fontSize:'13px', color:'#6F7181', margin:0, letterSpacing:'0.05em' }}>
                {featured.role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* -- MOBILE ------------------------------------------------ */}
      <div className="fm-section fm-mobile"
        style={{ flexDirection:'column', gap:'32px', padding:'64px 24px', position:'relative', zIndex:1 }}>

        {/* Badge + heading */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:'center' }}>
          <span style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', backgroundColor:'rgba(255,217,0,0.1)', border:'1px solid rgba(255,217,0,0.25)', padding:'6px 14px', borderRadius:'100px', letterSpacing:'0.12em', textTransform:'uppercase', display:'inline-block', marginBottom:'20px' }}>
            A Word From Our Leadership
          </span>
          <h2 style={{ ...inter, fontSize:'40px', fontWeight:800, color:'#040617', letterSpacing:'-1.5px', lineHeight:'0.95', margin:0 }}>
            Message from<br />
            <span style={{ color:'#FFD900' }}>the Foundation</span>
          </h2>
        </motion.div>

        {/* Photo */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          style={{ width:'100%', height:'380px', borderRadius:'20px', overflow:'hidden', position:'relative' }}>
          {featured.photo ? (
            <img src={featured.photo} alt={featured.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
          ) : (
            <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ ...inter, fontSize:'64px', fontWeight:800, color:'rgba(255,255,255,0.1)' }}>{featured.name?.charAt(0)}</span>
            </div>
          )}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.85) 0%, rgba(4,6,23,0) 50%)' }} />
          <div style={{ position:'absolute', bottom:'20px', left:'20px', right:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'6px' }}>
              <div style={{ width:'18px', height:'2px', backgroundColor:'#FFD900' }} />
              <p style={{ ...inter, fontSize:'11px', fontWeight:700, color:'#FFD900', letterSpacing:'0.16em', margin:0, textTransform:'uppercase' }}>{featured.role}</p>
            </div>
            <h3 style={{ ...inter, fontSize:'28px', fontWeight:700, color:'#040617', letterSpacing:'-0.4px', margin:0, textTransform:'capitalize' }}>{featured.name}</h3>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}>
          <blockquote style={{ ...inter, fontSize:'19px', color:'#040617', lineHeight:'1.8', margin:0, paddingLeft:'20px', borderLeft:'3px solid #FFD900', fontStyle:'italic' }}>
            {excerpt}
          </blockquote>
        </motion.div>

        {/* Divider */}
        <div style={{ height:'1px', backgroundColor:'#E5E6EB' }} />

        {/* CTAs */}
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', width:'100%' }}>
          <a href={href} className="fm-read-btn" style={{ justifyContent:'center' }}>
            Read Full Message
            <ArrowIcon size={16} color="#040617" />
          </a>
          <a href="/messages" className="fm-all-btn" style={{ justifyContent:'center' }}>
            View All Messages
          </a>
        </div>
      </div>
    </section>
  )
}