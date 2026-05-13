 'use client'
import { motion } from 'framer-motion'

// ── Your existing assets ──
const imgDownloadIcon = "/images/home-static/dwn-icon.svg"
const imgArrow        =  "/images/home-static/button-icon.png"
const imgStarDark     =  "/images/home-static/gspot.png"
const imgStarLight    = "/images/home-static/bspot.svg"
const imgSparkle      = "/images/home-static/sparkle-pub.png"

// ── Mobile assets from Figma 388:43268 ──
const imgMobileDownload =  "/images/home-static/dwn-icon.svg"
const imgMobileArrow    =  "/images/home-static/button-icon.png"
const imgMobileStarDark = "/images/home-static/bspot.svg"
const imgMobileStarGrey = "/images/home-static/yspot.svg"
const imgMobileSparkle  = "/images/home-static/sparkle-pub.png"


const inter    = { fontFamily: "'inter', sans-serif" }
 

// Desktop publications — your existing data
const publications = [
  {
    id: 0, bg: '#040617', textColor: '#E5E6EB',
    bannerBg: '#6F7181', bannerText: '#5EDA71', cornerBg: '#4a4c5d',
    topLabel: 'STUDENT', bottomLabel: 'SCHOLARSHIP',
    topSize: '65px', bottomSize: '45px', star: imgStarDark,
    date: '04 July 2025 12:13', title: 'Student Scholarship',
    desc: 'Short description about publication.',
  },
  {
    id: 1, bg: '#FFF7CC', textColor: '#332B00',
    bannerBg: '#FFD900', bannerText: '#040617', cornerBg: '#CCAD00',
    topLabel: 'ANNUAL', bottomLabel: 'REPORT',
    topSize: '75px', bottomSize: '84px', star: imgStarLight,
    date: '08 July 2025 12:21', title: 'The 31st Annual General Report 2025',
    desc: 'Short description about publication.',
  },
  {
    id: 2, bg: '#D6F5DA', textColor: '#0A290E',
    bannerBg: '#5EDA71', bannerText: '#040617', cornerBg: '#26A639',
    topLabel: 'FINANCIAL', bottomLabel: 'STATEMENT',
    topSize: '58px', bottomSize: '57px', star: imgStarLight,
    date: '16 June 2025 12:21', title: 'The 31st Annual General Report 2024',
    desc: 'Short description about publication.',
  },
  {
    id: 3, bg: '#6F7181', textColor: '#E5E6EB',
    bannerBg: '#040617', bannerText: '#FFD900', cornerBg: '#4a4c5d',
    topLabel: 'LOAN', bottomLabel: 'APPLICATION',
    topSize: '80px', bottomSize: '49px', star: imgStarDark,
    date: '04 July 2025 12:13', title: 'Loan Application Form',
    desc: 'Short description about publication.',
  },
]

// Mobile publications — from Figma 388:43268 (3 cards, exact order)
const mobilePubs = [
  {
    id: 0, bg: '#FFF7CC', textColor: '#332B00',
    bannerBg: '#FFD900', bannerText: '#040617', cornerBg: '#CCAD00',
    topLabel: 'ANNUAL', topSize: '62px',
    bottomLabel: 'REPORT', bottomSize: '69px',
    star: imgMobileStarDark,
    date: '08 July 2025 12:21', title: 'The 31st Annual General Report 2025',
    desc: 'Short descriprion about publicartion.',
  },
  {
    id: 1, bg: '#D6F5DA', textColor: '#0A290E',
    bannerBg: '#5EDA71', bannerText: '#040617', cornerBg: '#26A639',
    topLabel: 'FINANCIAL', topSize: '48px',
    bottomLabel: 'STATEMENT', bottomSize: '46px',
    star: imgMobileStarDark,
    date: '16 June 2025 12:21', title: 'The 31st Annual General Report 2024',
    desc: 'Short descriprion about publicartion.',
  },
  {
    id: 2, bg: '#040617', textColor: '#E5E6EB',
    bannerBg: '#6F7181', bannerText: '#5EDA71', cornerBg: '#4a4c5d',
    topLabel: 'STUDENT', topSize: '57px',
    bottomLabel: 'SCHOLARSHIP', bottomSize: '36px',
    star: imgMobileStarGrey,
    date: '04 July 2025 12:13', title: 'Loan Application Form',
    desc: 'Short descriprion about publicartion.',
  },
]

// Shared thumbnail component — works for both desktop and mobile
function PubThumb({ pub, width = '355px', height = '230px' }) {
  return (
    <div style={{ width, height, borderRadius: '8px', overflow: 'hidden', backgroundColor: pub.bg, position: 'relative', flexShrink: 0 }}>
      <p style={{ ...inter, position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)', fontSize: pub.topSize, fontWeight: 800, color: pub.textColor, opacity: 0.23, letterSpacing: '-0.02em', lineHeight: '90px', textAlign: 'center', width: '350px', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
        {pub.topLabel}
      </p>
      <p style={{ ...inter, position: 'absolute', bottom: '74px', left: '50%', transform: 'translate(-50%, 100%)', fontSize: pub.bottomSize, fontWeight: 800, color: pub.textColor, opacity: 0.23, letterSpacing: '-0.02em', lineHeight: '90px', textAlign: 'center', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
        {pub.bottomLabel}
      </p>
      <div style={{ position: 'absolute', left: '-19px', top: '140px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '27px', height: '27px', backgroundColor: pub.cornerBg, transform: 'rotate(-45deg)' }} />
      </div>
      <div style={{ position: 'absolute', top: '70px', left: 0, width: '294px', backgroundColor: pub.bannerBg, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', height: '90px', boxShadow: '0px 27px 27px 0px rgba(0,0,0,0.13),0px 7px 15px 0px rgba(0,0,0,0.15)' }}>
        <img src={pub.star} alt="" style={{ width: '45px', height: '45px', flexShrink: 0 }} />
        <span style={{ ...inter, fontSize: '75px', fontWeight: 800, color: pub.bannerText, letterSpacing: '-0.75px', lineHeight: '90px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>TMF</span>
      </div>
    </div>
  )
}

export default function Publications() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&family=inter:wght@400&display=swap');
        .pub-card { transition: all 0.2s ease; }
        .pub-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }

        /* ── DESKTOP ── */
        .pub-desktop { display: block; padding: 80px 165px; }
        .pub-mobile  { display: none; }

        /* ── MOBILE (≤768px) — Figma 388:43268 ── */
        @media (max-width: 768px) {
          .pub-desktop { display: none !important; }
          .pub-mobile  { display: flex !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════
          DESKTOP — your existing layout
      ═══════════════════════════════════ */}
      <div className="pub-desktop">
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'48px' }}>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{ ...inter, fontSize:'75px', fontWeight:600, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', margin:0 }}>
            Last Publications
          </motion.h2>
          <a href="/publications" style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'4px', backgroundColor:'#FFF7CC', color:'#040617', fontSize:'14px', fontWeight:400, height:'38px', padding:'0 20px', borderRadius:'10px', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>
            View All Publications
            <img src={imgArrow} alt="" style={{ width:'24px', height:'24px' }} />
          </a>
        </div>

        {/* Cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:'30px' }}>
          {publications.map((pub, i) => (
            <motion.div key={pub.id} className="pub-card"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
              style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'26px', padding:'24px', display:'flex', gap:'30px', alignItems:'center', position:'relative', overflow:'hidden' }}>
              <img src={imgSparkle} alt="" style={{ position:'absolute', right:'-100px', top:'-116px', width:'523px', pointerEvents:'none', opacity:0.25, zIndex:0 }} />
              <PubThumb pub={pub} />
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'64px', position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                    <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{pub.date}</p>
                    <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', margin:0, textTransform:'capitalize' }}>{pub.title}</p>
                  </div>
                  <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'16px' }}>
                    <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{pub.desc}</p>
                  </div>
                </div>
                <a href="#" style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none', width:'fit-content' }}>
                  Download
                  <img src={imgDownloadIcon} alt="" style={{ width:'24px', height:'24px' }} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          MOBILE — Figma 388:43268
          • Heading: 52px SemiBold centered
          • "View All" button right-aligned below
          • 3 full-width stacked cards:
            - 230px coloured banner thumb on top
            - date 20px + title 26px + desc below
            - full-width yellow Download button
          • gap: 32px outer, 30px between cards
      ═══════════════════════════════════ */}
      <div className="pub-mobile" style={{ flexDirection:'column', gap:'32px', alignItems:'center', padding:'48px 24px 60px' }}>

        {/* Header — heading centered, button right-aligned below */}
        <div style={{ display:'flex', flexDirection:'column', gap:'24px', alignItems:'flex-end', width:'100%' }}>
          <h2 style={{ ...inter, fontSize:'52px', fontWeight:600, color:'#040617', letterSpacing:'-0.52px', lineHeight:'67px', textAlign:'center', margin:0, width:'100%' }}>
            Last Publications
          </h2>
          <a href="/publications" style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'4px', backgroundColor:'#FFF7CC', color:'#040617', fontSize:'14px', fontWeight:400, height:'38px', padding:'0 20px', borderRadius:'10px', textDecoration:'none', whiteSpace:'nowrap' }}>
            View All Publications
            <img src={imgMobileArrow} alt="" style={{ width:'24px', height:'24px' }} />
          </a>
        </div>

        {/* Publication cards — stacked full width */}
        <div style={{ display:'flex', flexDirection:'column', gap:'30px', width:'100%' }}>
          {mobilePubs.map((pub, i) => (
            <motion.div key={pub.id} className="pub-card"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
              style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', padding:'24px', display:'flex', flexDirection:'column', gap:'30px', position:'relative', overflow:'hidden' }}>

              {/* Sparkle bg */}
              <img src={imgMobileSparkle} alt="" style={{ position:'absolute', left:'384px', top:'-116px', width:'523px', pointerEvents:'none', opacity:0.25, zIndex:0 }} />

              {/* Banner thumbnail — full width, 230px tall */}
              <PubThumb pub={pub} width="100%" height="230px" />

              {/* Content */}
              <div style={{ display:'flex', flexDirection:'column', gap:'64px', position:'relative', zIndex:1 }}>
                <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                  <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                    <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{pub.date}</p>
                    <p style={{ ...inter, fontSize:'26px', fontWeight:600, color:'#040617', letterSpacing:'-0.26px', lineHeight:'36px', margin:0, textTransform:'capitalize' }}>{pub.title}</p>
                  </div>
                  <div style={{ borderLeft:'1px solid #E5E6EB', paddingLeft:'8px' }}>
                    <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>{pub.desc}</p>
                  </div>
                </div>

                {/* Full-width Download button */}
                <a href="#" style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', borderRadius:'14px', textDecoration:'none', width:'100%' }}>
                  Download
                  <img src={imgMobileDownload} alt="" style={{ width:'24px', height:'24px' }} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}