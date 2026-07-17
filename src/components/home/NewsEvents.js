'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, queries } from '@/sanity/lib/sanity'

const imgFeatured = "/images/home/newsman.png"
const imgThumb    = "/images/home/newsthumb.png"
const imgSparkle  = "/images/home-static/sparkle-impact.png"
const imgLocation = "/images/home-static/location-pin-black.png"
const imgStar     = "/images/home-static/marquee-spot.png"

const inter = { fontFamily: "'Inter', sans-serif" }

function ArrowIcon({ size = 24, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function getItemHref(item) {
  if (!item?.slug) return '/news'
  if (item.badge === 'upcoming'     || item.type === 'upcoming')     return `/upcomingevents/${item.slug}`
  if (item.badge === 'announcement' || item.type === 'announcement') return `/announcement/${item.slug}`
  return `/newsdetail/${item.slug}`
}

function Badge({ type, small = false, starSrc }) {
  const typeMap = { upcoming:'Upcoming', newsroom:'Newsroom', event:'Event', announcement:'Announcement' }
  const displayType = typeMap[type] || type
  const isNewsroom  = type === 'newsroom'
  const src         = starSrc || imgStar
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'5px 20px', backgroundColor: isNewsroom ? '#5EDA71' : '#FFD900', position:'relative' }}>
      <img src={src} alt="" style={{ width:'25px', height:'25px', flexShrink:0 }} />
      <span style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', whiteSpace:'nowrap', textTransform:'capitalize' }}>
        {displayType}
      </span>
      <div style={{ position:'absolute', bottom:'-10px', left:'-8px', width:0, height:0, borderLeft:'10px solid transparent', borderRight:'10px solid transparent', borderTop:`10px solid ${isNewsroom ? '#1D7C2B' : '#998200'}` }} />
    </div>
  )
}

const staticFeatured = {
  id: '0', date: '04 July 2025', location: 'Jamaica, Kingston',
  title: 'The Lady Mico Charity - Breaks its Historical',
  desc: "Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.",
  badge: 'upcoming', image: imgFeatured, slug: null,
}

const staticSideArticles = [
  { id:'1', date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean.", badge:'newsroom', image:imgThumb, slug:null },
  { id:'2', date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean.", badge:'newsroom', image:imgThumb, slug:null },
  { id:'3', date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean.", badge:'newsroom', image:imgThumb, slug:null },
]

export default function NewsEvents() {
  const [featured,      setFeatured]      = useState(staticFeatured)
  const [sideArticles,  setSideArticles]  = useState(staticSideArticles)
  const [loading,       setLoading]       = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const [featuredData, sideData] = await Promise.all([
          client.fetch(queries.newsEventsFeatured),
          client.fetch(queries.newsEventsSide),
        ])
        if (featuredData) {
          setFeatured({
            id:       featuredData._id,
            date:     new Date(featuredData.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }),
            location: featuredData.location || null,
            title:    featuredData.title,
            desc:     featuredData.excerpt,
            badge:    featuredData.type,
            image:    featuredData.featuredImage,
            slug:     featuredData.slug,
          })
        }
        if (sideData && sideData.length > 0) {
          setSideArticles(sideData.map(article => ({
            id:    article._id,
            date:  new Date(article.date).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }),
            title: article.title,
            desc:  article.excerpt,
            badge: article.type,
            image: article.thumbnailImage,
            slug:  article.slug,
          })))
        }
      } catch (error) {
        console.error('Error fetching news, using static data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  if (loading) return (
    <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>Loading news &amp; events...</p>
    </section>
  )

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        .news-desktop { display: block; padding: 60px clamp(24px, 8vw, 165px) 80px; }
        .news-mobile  { display: none; }
        .news-grid    { display: grid; grid-template-columns: 780px 1fr; gap: 30px; align-items: start; }
        .article-row  { display: flex; gap: 24px; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(225,225,225,0.3); cursor: pointer; transition: opacity 0.2s; text-decoration: none; }
        .article-row:hover { opacity: 0.8; }
        @media (max-width: 1200px) { .news-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .news-desktop { display: none !important; }
          .news-mobile  { display: flex !important; }
        }
      `}</style>

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="news-desktop">
        <img src={imgSparkle} alt="" style={{ position:'absolute', top:'53px', left:'75%', width:'523px', pointerEvents:'none', opacity:0.3, zIndex:0 }} />
        <img src={imgSparkle} alt="" style={{ position:'absolute', top:'713px', left:'-22px', width:'523px', pointerEvents:'none', opacity:0.3, zIndex:0 }} />

        <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ ...inter, fontSize:'clamp(3rem,6vw,6.25rem)', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96.93%', textAlign:'center', margin:'0 0 60px', textTransform:'capitalize', position:'relative', zIndex:1 }}>
          Live News &amp; Events
        </motion.h2>

        <div className="news-grid" style={{ position:'relative', zIndex:1 }}>

          {/* Featured */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', height:'642px' }}>
              <div style={{ flex:1, position:'relative', borderRadius:'12px', overflow:'hidden', minHeight:0, boxShadow:'var(--shadow-3)' }}>
                <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'32px', left:0 }}><Badge type={featured.badge} /></div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'30px' }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px' }}>{featured.date}</span>
                  {featured.location && (
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                      <span style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'-0.16px' }}>{featured.location}</span>
                    </div>
                  )}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
                    {featured.title}
                  </h3>
                  <div style={{ paddingLeft:'8px' }}>
                    <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px', height:'90px', overflow:'hidden' }}>
                      <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
                        {featured.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href={getItemHref(featured)}
              style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none', width:'240px', justifyContent:'center' }}>
              Read Full
              <ArrowIcon size={18} color="#040617" />
            </a>
          </motion.div>

          {/* Side articles */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}
            style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            {sideArticles.map(article => (
              <a key={article.id} href={getItemHref(article)} className="article-row">
                <div style={{ width:'242px', flexShrink:0, borderRadius:'8px', overflow:'hidden', position:'relative', alignSelf:'stretch', boxShadow:'var(--shadow-2)' }}>
                  <img src={article.image} alt={article.title} style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:'160px' }} />
                  <div style={{ position:'absolute', bottom:'16px', left:0 }}><Badge type={article.badge} /></div>
                </div>
                <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'8px', minWidth:0 }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', whiteSpace:'nowrap' }}>{article.date}</span>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{article.title}</h3>
                  <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{article.desc}</p>
                </div>
              </a>
            ))}
            <a href="/news" style={{ ...inter, fontSize:'24px', color:'#6F7181', letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline', textAlign:'center', display:'block' }}>
              Show More
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="news-mobile" style={{ flexDirection:'column', gap:'18px', alignItems:'center', padding:'48px 24px 60px', position:'relative', zIndex:1 }}>
        <h2 style={{ ...inter, fontSize:'75px', fontWeight:700, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', textAlign:'center', margin:0, width:'100%' }}>
          Live News &amp; Events
        </h2>

        <div style={{ display:'flex', flexDirection:'column', gap:'30px', width:'100%' }}>

          {/* Featured mobile */}
          <div style={{ display:'flex', flexDirection:'column', gap:'24px', width:'100%' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', height:'642px', width:'100%' }}>
              <div style={{ flex:1, position:'relative', borderRadius:'12px', overflow:'hidden', minHeight:0, boxShadow:'var(--shadow-3)' }}>
                <img src={featured.image} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'33px', left:0 }}>
                  <Badge type={featured.badge} starSrc={imgStar} />
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'30px' }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px' }}>{featured.date}</span>
                  {featured.location && (
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                      <span style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'-0.16px', whiteSpace:'nowrap' }}>{featured.location}</span>
                    </div>
                  )}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
                    {featured.title}
                  </h3>
                  <div style={{ paddingLeft:'8px' }}>
                    <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px' }}>
                      <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
                        {featured.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href={getItemHref(featured)}
              style={{ ...inter, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none', width:'240px', alignSelf:'flex-start' }}>
              Read Full
              <ArrowIcon size={18} color="#040617" />
            </a>
          </div>

          {/* Side articles mobile */}
          <div style={{ display:'flex', flexDirection:'column', gap:'24px', width:'100%' }}>
            {sideArticles.map(article => (
              <a key={article.id} href={getItemHref(article)}
                style={{ display:'flex', flexDirection:'column', gap:'24px', paddingBottom:'16px', borderBottom:'1px solid rgba(225,225,225,0.3)', textDecoration:'none', cursor:'pointer' }}>
                <div style={{ width:'100%', height:'200px', borderRadius:'8px', overflow:'hidden', position:'relative', flexShrink:0 }}>
                  <img src={article.image} alt={article.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', bottom:'16px', left:0 }}>
                    <Badge type={article.badge} starSrc={imgStar} />
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', whiteSpace:'nowrap' }}>{article.date}</span>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>{article.title}</h3>
                  <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0, overflow:'hidden', display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical' }}>{article.desc}</p>
                </div>
              </a>
            ))}
            <a href="/news" style={{ ...inter, fontSize:'24px', color:'#6F7181', letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline', textAlign:'center', display:'block' }}>
              Show More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}