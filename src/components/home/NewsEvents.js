'use client'
import { motion } from 'framer-motion'



// ── Your existing assets ──
const imgFeatured =  "/images/home/newsman.png"
const imgThumb    =  "/images/home/newsthumb.png"
const imgSparkle  =  "/images/home-static/sparkle-impact.png"
const imgLocation =  "/images/home-static/location-pin-black.png"
const imgArrow    = "/images/home-static/button-icon.png"
const imgStar     =   "/images/home-static/marquee-spot.png"

// ── Mobile assets from Figma 426:52457 ──
const imgMobileFeatured = "/images/home/newsman.png"
const imgMobileThumb    = "/images/home/newsthumb.png"
const imgMobileStar     = "/images/home-static/marquee-spot.png"
const imgMobileLocation =  "/images/home-static/location-pin-black.png"
const imgMobileArrow    = "/images/home-static/button-icon.png"

const inter = { fontFamily: "'Inter', sans-serif" };

function Badge({ type, small = false, starSrc }) {
  const isNewsroom = type === 'Newsroom'
  const src = starSrc || imgStar
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'5px 20px', backgroundColor: isNewsroom ? '#5EDA71' : '#FFD900', position:'relative' }}>
      <img src={src} alt="" style={{ width:'25px', height:'25px', flexShrink:0 }} />
      <span style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', whiteSpace:'nowrap', textTransform:'capitalize' }}>
        {type}
      </span>
      <div style={{ position:'absolute', bottom:'-10px', left:'-8px', width:0, height:0, borderLeft:'10px solid transparent', borderRight:'10px solid transparent', borderTop:`10px solid ${isNewsroom ? '#1D7C2B' : '#998200'}` }} />
    </div>
  )
}

const sideArticles = [
  { id:0, date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.", badge:'Newsroom' },
  { id:1, date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.", badge:'Newsroom' },
  { id:2, date:'08 May 2025', title:'Mico Future Forward Forum', desc:"Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.", badge:'Newsroom' },
]

export default function NewsEvents() {
  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;700;800&family=inter:wght@400&display=swap');

        /* ── DESKTOP ── */
        .news-desktop { display: block; padding: 60px 165px 80px; }
        .news-mobile  { display: none; }
        .news-grid    { display: grid; grid-template-columns: 780px 1fr; gap: 30px; align-items: start; }
        .article-row  { display: flex; gap: 24px; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(225,225,225,0.3); cursor: pointer; transition: opacity 0.2s; text-decoration: none; }
        .article-row:hover { opacity: 0.8; }

        @media (max-width: 1200px) { .news-grid { grid-template-columns: 1fr; } }

        /* ── MOBILE (≤768px) — Figma 426:52457 ── */
        @media (max-width: 768px) {
          .news-desktop { display: none !important; }
          .news-mobile  { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════
          DESKTOP — your existing layout
      ═══════════════════════════════════ */}
      <div className="news-desktop">
        {/* Sparkles */}
        <img src={imgSparkle} alt="" style={{ position:'absolute', top:'53px', left:'75%', width:'523px', pointerEvents:'none', opacity:0.3, zIndex:0 }} />
        <img src={imgSparkle} alt="" style={{ position:'absolute', top:'713px', left:'-22px', width:'523px', pointerEvents:'none', opacity:0.3, zIndex:0 }} />

        <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ ...inter, fontSize:'clamp(3rem,6vw,6.25rem)', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96.93%', textAlign:'center', margin:'0 0 60px', textTransform:'capitalize', position:'relative', zIndex:1 }}>
          Live News & Events
        </motion.h2>

        <div className="news-grid" style={{ position:'relative', zIndex:1 }}>

          {/* Left — featured */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', height:'642px' }}>
              <div style={{ flex:1, position:'relative', borderRadius:'12px', overflow:'hidden', minHeight:0 }}>
                <img src={imgFeatured} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'32px', left:0 }}><Badge type="Upcoming" /></div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'30px' }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px' }}>04 July 2025</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                    <span style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'-0.16px' }}>Jamaica, Kingston</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
                    The Lady Mico Charity – Breaks its Historical
                  </h3>
                  <div style={{ paddingLeft:'8px' }}>
                    <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px', height:'90px', overflow:'hidden' }}>
                      <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
                        Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="/news" style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none', width:'240px', justifyContent:'center' }}>
              Read Full
              <img src={imgArrow} alt="" style={{ width:'24px', height:'24px' }} />
            </a>
          </motion.div>

          {/* Right — list */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.15 }}
            style={{ display:'flex', flexDirection:'column', gap:'24px' }}>
            {sideArticles.map((article) => (
              <a key={article.id} href="/news" className="article-row">
                <div style={{ width:'242px', flexShrink:0, borderRadius:'8px', overflow:'hidden', position:'relative', alignSelf:'stretch' }}>
                  <img src={imgThumb} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:'160px' }} />
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

      {/* ═══════════════════════════════════
          MOBILE — Figma 426:52457
          • Heading: 75px Bold centered
          • Featured: full-width photo (flex-1),
            date+location row, title, desc with
            left border, "Read Full" 240px button
          • Side articles: full-width 200px thumb
            stacked above date+title+desc text
          • gap: 18px outer, 30px between sections
      ═══════════════════════════════════ */}
      <div className="news-mobile" style={{ flexDirection:'column', gap:'18px', alignItems:'center', padding:'48px 24px 60px', position:'relative', zIndex:1 }}>

        {/* Heading — 75px Bold centered */}
        <h2 style={{ ...inter, fontSize:'75px', fontWeight:700, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', textAlign:'center', margin:0, width:'100%' }}>
          Live News & Events
        </h2>

        <div style={{ display:'flex', flexDirection:'column', gap:'30px', width:'100%' }}>

          {/* Featured article */}
          <div style={{ display:'flex', flexDirection:'column', gap:'24px', width:'100%' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:'12px', height:'642px', width:'100%' }}>
              {/* Photo — flex-1, full width */}
              <div style={{ flex:1, position:'relative', borderRadius:'12px', overflow:'hidden', minHeight:0 }}>
                <img src={imgMobileFeatured} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:'33px', left:0 }}>
                  <Badge type="Upcoming" starSrc={imgMobileStar} />
                </div>
              </div>
              {/* Info below photo */}
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:'30px' }}>
                  <span style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px' }}>04 July 2025</span>
                  <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                    <img src={imgMobileLocation} alt="" style={{ width:'24px', height:'24px' }} />
                    <span style={{ ...inter, fontSize:'16px', color:'#040617', letterSpacing:'-0.16px', whiteSpace:'nowrap' }}>Jamaica, Kingston</span>
                  </div>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
                    The Lady Mico Charity – Breaks its Historical
                  </h3>
                  <div style={{ paddingLeft:'8px' }}>
                    <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px' }}>
                      <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
                        Join us for an inspiring day of talks, workshops, and networking focused on the future of education in the Caribbean. Hear from alumni, educators, and partners shaping tomorrow's classrooms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Read Full — 240px centered */}
            <a href="/news" style={{ ...inter, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none', width:'240px', alignSelf:'flex-start' }}>
              Read Full
              <img src={imgMobileArrow} alt="" style={{ width:'24px', height:'24px' }} />
            </a>
          </div>

          {/* Side articles — stacked, full-width thumb above text */}
          <div style={{ display:'flex', flexDirection:'column', gap:'24px', width:'100%' }}>
            {sideArticles.map((article) => (
              <a key={article.id} href="/news" style={{ display:'flex', flexDirection:'column', gap:'24px', paddingBottom:'16px', borderBottom:'1px solid rgba(225,225,225,0.3)', textDecoration:'none', cursor:'pointer' }}>
                {/* Full-width thumbnail — 200px tall */}
                <div style={{ width:'100%', height:'200px', borderRadius:'8px', overflow:'hidden', position:'relative', flexShrink:0 }}>
                  <img src={imgMobileThumb} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', bottom:'16px', left:0 }}>
                    <Badge type={article.badge} starSrc={imgMobileStar} />
                  </div>
                </div>
                {/* Text below */}
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