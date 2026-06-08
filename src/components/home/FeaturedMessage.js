'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }
const imgSparkle = "/images/home-static/sparkle-large.png"

function ArrowIcon({ size = 18, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Large opening quote mark
function QuoteMark({ size = 80, color = "#FFD900", opacity = 0.15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ flexShrink:0 }}>
      <text x="0" y="72" fontSize="96" fontFamily="Georgia, serif" fill={color} fillOpacity={opacity}>"</text>
    </svg>
  )
}

export default function FeaturedMessage() {
  const [featured, setFeatured] = useState(null)
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function fetchFeatured() {
      try {
        // Fetch the first/featured message from the messages query
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
      <p style={{ ...inter, color:'#040617', fontSize:'20px' }}>Loading...</p>
    </section>
  )

  if (!featured) return null

  const slug    = featured.slug?.current || featured.slug || ''
  const href    = slug ? `/messagesdetail/${slug}` : '/messages'
  const excerpt = featured.quote || ''

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .fm-desktop { display: flex; padding: 80px 165px; }
        .fm-mobile  { display: none; }
        @media (max-width: 768px) {
          .fm-desktop { display: none !important; }
          .fm-mobile  { display: flex !important; }
        }
      `}</style>

      {/* -- DESKTOP ----------------------------------------------------------- */}
      <div className="fm-desktop" style={{ alignItems:'stretch', gap:'64px', maxWidth:'1760px', margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Left - Photo */}
        <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          style={{ flex:'0 0 480px', position:'relative' }}>

          {/* Photo */}
          <div style={{ width:'100%', height:'620px', borderRadius:'24px', overflow:'hidden', position:'relative' }}>
            {featured.photo ? (
              <img src={featured.photo} alt={featured.name}
                style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
            ) : (
              <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#F5F3EE,#E5E6EB)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ ...inter, fontSize:'72px', fontWeight:800, color:'#040617', opacity:0.15 }}>
                  {featured.name?.charAt(0)}
                </span>
              </div>
            )}
            {/* Gradient overlay at bottom */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.7) 0%, rgba(4,6,23,0) 50%)' }} />

            {/* Name badge on photo */}
            <div style={{ position:'absolute', bottom:'28px', left:'28px', right:'28px' }}>
              <p style={{ ...inter, fontSize:'13px', fontWeight:600, color:'#FFD900', letterSpacing:'0.08em', margin:'0 0 6px', textTransform:'uppercase' }}>
                {featured.role}
              </p>
              <h3 style={{ ...inter, fontSize:'32px', fontWeight:700, color:'white', letterSpacing:'-0.5px', lineHeight:'1.15', margin:0, textTransform:'capitalize' }}>
                {featured.name}
              </h3>
            </div>
          </div>

          {/* Decorative sparkle */}
          <img src={imgSparkle} alt="" style={{ position:'absolute', top:'-40px', left:'-60px', width:'400px', pointerEvents:'none', opacity:0.18, zIndex:-1 }} />
        </motion.div>

        {/* Right - Message */}
        <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }}
          style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center', gap:'32px' }}>

          {/* Label */}
          <div>
            <p style={{ ...inter, fontSize:'15px', fontWeight:600, color:'#FFD900', backgroundColor:'#040617', display:'inline-block', padding:'4px 18px', borderRadius:'100px', margin:'0 0 20px', letterSpacing:'0.05em' }}>
              A Word From Our Leadership
            </p>
            <h2 style={{ ...inter, fontSize:'clamp(2.5rem,4vw,4rem)', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96%', margin:0 }}>
              Message from the<br/>Foundation
            </h2>
          </div>

          {/* Quote block */}
          <div style={{ position:'relative', borderLeft:'3px solid #FFD900', paddingLeft:'28px' }}>
            <QuoteMark size={64} color="#FFD900" opacity={0.2} />
            <p style={{ ...inter, fontSize:'22px', fontWeight:400, color:'#040617', lineHeight:'1.75', margin:'-20px 0 0', letterSpacing:'0.01em' }}>
              {excerpt}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height:'1px', backgroundColor:'#E5E6EB', width:'100%' }} />

          {/* Footer row */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'20px', flexWrap:'wrap' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              {/* Avatar thumbnail */}
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', overflow:'hidden', border:'2px solid #FFD900', flexShrink:0 }}>
                {featured.photo ? (
                  <img src={featured.photo} alt={featured.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                ) : (
                  <div style={{ width:'100%', height:'100%', backgroundColor:'#F5F3EE', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ ...inter, fontSize:'20px', fontWeight:700, color:'#040617' }}>{featured.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div>
                <p style={{ ...inter, fontSize:'16px', fontWeight:600, color:'#040617', margin:0 }}>{featured.name}</p>
                <p style={{ ...inter, fontSize:'14px', color:'#6F7181', margin:0 }}>{featured.role}</p>
              </div>
            </div>

            <div style={{ display:'flex', gap:'12px' }}>
              <a href={href}
                style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', backgroundColor:'#FFD900', color:'#040617', fontSize:'15px', fontWeight:600, padding:'14px 28px', borderRadius:'16px', textDecoration:'none' }}>
                Read Full Message
                <ArrowIcon size={16} color="#040617" />
              </a>
              <a href="/messages"
                style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', backgroundColor:'transparent', color:'#040617', fontSize:'15px', fontWeight:600, padding:'14px 28px', borderRadius:'16px', textDecoration:'none', border:'1px solid #E5E6EB' }}>
                All Messages
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* -- MOBILE ------------------------------------------------------------ */}
      <div className="fm-mobile" style={{ flexDirection:'column', gap:'28px', padding:'60px 24px', position:'relative', zIndex:1 }}>

        {/* Label + heading */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:'center' }}>
          <p style={{ ...inter, fontSize:'13px', fontWeight:600, color:'#FFD900', backgroundColor:'#040617', display:'inline-block', padding:'4px 16px', borderRadius:'100px', margin:'0 0 14px', letterSpacing:'0.05em' }}>
            A Word From Our Leadership
          </p>
          <h2 style={{ ...inter, fontSize:'40px', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96%', margin:0 }}>
            Message from the Foundation
          </h2>
        </motion.div>

        {/* Photo */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
          style={{ width:'100%', height:'380px', borderRadius:'20px', overflow:'hidden', position:'relative' }}>
          {featured.photo ? (
            <img src={featured.photo} alt={featured.name}
              style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
          ) : (
            <div style={{ width:'100%', height:'100%', background:'#F5F3EE', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <span style={{ ...inter, fontSize:'64px', fontWeight:800, color:'#040617', opacity:0.15 }}>{featured.name?.charAt(0)}</span>
            </div>
          )}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,6,23,0.7) 0%, rgba(4,6,23,0) 50%)' }} />
          <div style={{ position:'absolute', bottom:'20px', left:'20px', right:'20px' }}>
            <p style={{ ...inter, fontSize:'12px', fontWeight:600, color:'#FFD900', letterSpacing:'0.08em', margin:'0 0 4px', textTransform:'uppercase' }}>{featured.role}</p>
            <h3 style={{ ...inter, fontSize:'26px', fontWeight:700, color:'white', letterSpacing:'-0.3px', margin:0, textTransform:'capitalize' }}>{featured.name}</h3>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
          style={{ borderLeft:'3px solid #FFD900', paddingLeft:'20px' }}>
          <p style={{ ...inter, fontSize:'19px', color:'#040617', lineHeight:'1.75', margin:0 }}>
            {excerpt}
          </p>
        </motion.div>

        {/* CTAs */}
        <div style={{ display:'flex', flexDirection:'column', gap:'10px', width:'100%' }}>
          <a href={href}
            style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', backgroundColor:'#FFD900', color:'#040617', fontSize:'15px', fontWeight:600, padding:'15px 20px', borderRadius:'14px', textDecoration:'none' }}>
            Read Full Message <ArrowIcon size={16} color="#040617" />
          </a>
          <a href="/messages"
            style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', backgroundColor:'transparent', color:'#040617', fontSize:'15px', fontWeight:600, padding:'15px 20px', borderRadius:'14px', textDecoration:'none', border:'1px solid #E5E6EB' }}>
            All Messages
          </a>
        </div>
      </div>
    </section>
  )
}
