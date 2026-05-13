'use client'
import { motion } from 'framer-motion'
import DonateButton from '@/components/ui/DonateButton'

// ── Desktop image assets (your existing URLs) ──
const imgFrame2    = "https://www.figma.com/api/mcp/asset/760a0900-0a56-4330-8b72-bfc4891c6d62"
const imgFrame3    = "https://www.figma.com/api/mcp/asset/59d04c7e-a0f1-4b98-a06d-7e069be86f6a"
const imgFrame5    = "https://www.figma.com/api/mcp/asset/ad4c6308-673b-4fcc-a2a8-040f590e9455"
const imgFrame6    = "https://www.figma.com/api/mcp/asset/0ca39ec7-9bc6-44bb-828b-193871520daf"
const imgEllipse1  = "https://www.figma.com/api/mcp/asset/a02930b8-90e6-4a4e-bee9-6eec6ee33217"
const imgEllipse2  = "https://www.figma.com/api/mcp/asset/cbe83b40-a6f0-4cac-b3cf-22105df28b60"
const imgEllipse3  = "https://www.figma.com/api/mcp/asset/89017968-3416-4f5e-a323-74c665273163"
const imgPlay      = "https://www.figma.com/api/mcp/asset/f51b3425-2ecb-4870-92a1-7c729213b637"
const imgArrow     = "https://www.figma.com/api/mcp/asset/fa2f1b70-95eb-45db-8490-845fe4992b19"
const imgLocation  = "https://www.figma.com/api/mcp/asset/46bab80b-5c87-418d-b431-66ed68c82f22"
const imgMaskGroup = "https://www.figma.com/api/mcp/asset/2d0fc26a-3e12-49e0-82e3-f9f5085ddae1"
const imgLineLeft  = "https://www.figma.com/api/mcp/asset/8c0687c3-769a-4968-a884-8633c5623f71"
const imgLineRight = "https://www.figma.com/api/mcp/asset/1dfd2619-a298-4fc4-9d8c-db657df685f8"
const imgSubtract  = "https://www.figma.com/api/mcp/asset/8ae937b9-8a3d-4c94-881b-b8561e52babc"
const imgSubtract1 = "https://www.figma.com/api/mcp/asset/deff1c54-824a-4da8-a0f0-7a759b9050e6"

// ── Mobile image assets (from Figma node 372:30458) ──
const imgMobileTop    = "https://www.figma.com/api/mcp/asset/66e4070f-b051-463d-bfdb-79f9da765b5d"
const imgMobileBottom = "https://www.figma.com/api/mcp/asset/f931c90d-06d4-416e-89e0-d16f9baae1f9"
const imgMobilePlay   = "https://www.figma.com/api/mcp/asset/ac81e730-5d27-43bb-bb07-c676784b3664"
const imgMobileLoc    = "https://www.figma.com/api/mcp/asset/1184a7a1-a00c-49d0-bbb1-cf7d0359cea7"

const FILLED = 26, TOTAL = 40

export default function Hero() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=inter:wght@400;600;800&family=inter:wght@400&display=swap');
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

      {/* ═══════════════════════════════════════
          DESKTOP LAYOUT
      ═══════════════════════════════════════ */}
      <div className="hero-desktop" style={{ paddingBottom: '120px' }}>

        {/* Sparkle backgrounds */}
        {[{ l:'118px', t:'270px' }, { l:'698px', t:'410px' }, { l:'1289px', t:'140px' }].map((pos, i) => (
          <div key={i} style={{ position:'absolute', left:pos.l, top:pos.t, width:'523px', height:'523px', overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <img src={imgMaskGroup} alt="" style={{ width:'120%', height:'130%', objectFit:'cover' }} />
          </div>
        ))}

        {/* Vertical lines */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'90px', width:'1px', pointerEvents:'none', zIndex:0 }}>
          <img src={imgLineLeft} alt="" style={{ width:'1px', height:'100%' }} />
        </div>
        <div style={{ position:'absolute', top:0, bottom:0, right:'90px', width:'1px', pointerEvents:'none', zIndex:0 }}>
          <img src={imgLineRight} alt="" style={{ width:'1px', height:'100%' }} />
        </div>

        {/* Corner decorations */}
        <img src={imgSubtract}  alt="" style={{ position:'absolute', top:'90px',    left:'75px',  width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <img src={imgSubtract}  alt="" style={{ position:'absolute', top:'90px',    right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <img src={imgSubtract}  alt="" style={{ position:'absolute', bottom:'90px', left:'75px',  width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />
        <img src={imgSubtract1} alt="" style={{ position:'absolute', bottom:'90px', right:'75px', width:'30px', height:'30px', zIndex:1, pointerEvents:'none' }} />

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
                <img src={imgEllipse1} alt="" style={{ position:'absolute', left:0,     top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <img src={imgEllipse2} alt="" style={{ position:'absolute', left:'24px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <img src={imgEllipse3} alt="" style={{ position:'absolute', left:'48px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
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

              {/* Left tall */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <img src={imgFrame2} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(-0.95deg,rgba(0,0,0,0.6) 0.68%,rgba(0,0,0,0) 23.88%),linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 35.42%)' }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                  <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#fff' }}>Jamaica, Buxton</span>
                </div>
                <div style={{ position:'absolute', bottom:'24px', right:'24px', backgroundColor:'#D6F5DA', borderRadius:'16px', padding:'16px' }}>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'42px', fontWeight:600, color:'#13531D', lineHeight:1, margin:0 }}>$34M</p>
                  <p style={{ fontFamily:"'inter',sans-serif", fontSize:'24px', color:'#1D7C2B', margin:0, whiteSpace:'nowrap' }}>Total money donated.</p>
                </div>
              </div>

              {/* Center */}
              <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginTop:'139px' }}>
                {/* Video */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'344px' }}>
                  <img src={imgFrame3} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.4)' }} />
                  <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                    <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
                    <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'#fff' }}>Jamaica, Buxton</span>
                  </div>
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'167px', height:'167px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg viewBox="0 0 167 167" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlow 10s linear infinite' }}>
                      <path id="cpth" d="M83.5,83.5 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none" />
                      <text style={{ fontSize:'11px', fill:'white' }}><textPath href="#cpth">Play a video • Play a video • Play a video •</textPath></text>
                    </svg>
                    <button style={{ width:'56px', height:'56px', backgroundColor:'white', borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
                      <img src={imgPlay} alt="Play" style={{ width:'24px', height:'24px' }} />
                    </button>
                  </div>
                </div>
                {/* Buxton card */}
                <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'271px' }}>
                  <img src={imgFrame6} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
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

              {/* Right tall */}
              <div style={{ position:'relative', borderRadius:'16px', overflow:'hidden', height:'638px' }}>
                <img src={imgFrame5} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 29.7%)' }} />
                <div style={{ position:'absolute', top:'24px', left:'24px', display:'flex', alignItems:'center', gap:'8px' }}>
                  <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
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

      {/* ═══════════════════════════════════════
          MOBILE LAYOUT  (≤768px, Figma 372:30458)
      ═══════════════════════════════════════ */}
      <div className="hero-mobile" style={{ flexDirection:'column', gap:'26px', padding:'32px 24px 48px', alignItems:'center' }}>

        {/* Text + CTA */}
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
            {/* Figma mobile button: #FFD900, h-46px, rounded-14px, 14px text, no arrow width constraint */}
            <a href="/donate" style={{ fontFamily:"'inter',sans-serif", display:'inline-flex', alignItems:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'14px', fontWeight:600, height:'46px', padding:'0 24px', borderRadius:'14px', textDecoration:'none' }}>
              Donate Now
              <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:'24px', height:'24px', flexShrink:0 }}>
                <img src={imgArrow} alt="" style={{ width:'14px', height:'14px', objectFit:'contain' }} />
              </span>
            </a>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', width:'100%' }}>
              <div style={{ position:'relative', width:'84px', height:'36px', flexShrink:0 }}>
                <img src={imgEllipse1} alt="" style={{ position:'absolute', left:0,     top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <img src={imgEllipse2} alt="" style={{ position:'absolute', left:'24px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
                <img src={imgEllipse3} alt="" style={{ position:'absolute', left:'48px', top:0, width:'36px', height:'36px', borderRadius:'50%' }} />
              </div>
              <span style={{ fontFamily:"'inter',sans-serif", fontSize:'14px', color:'#040617' }}>12391+ donation already sented</span>
            </div>
          </div>
        </motion.div>

        {/* Photos + stats */}
        <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.2}}
          style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>

          {/* Top photo — children with play button */}
          <div style={{ width:'100%', height:'312px', borderRadius:'12px', overflow:'hidden', position:'relative' }}>
            <img src={imgMobileTop} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            <div style={{ position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.4)' }} />
            <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'4px', whiteSpace:'nowrap' }}>
              <img src={imgMobileLoc} alt="" style={{ width:'24px', height:'24px' }} />
              <span style={{ fontFamily:"'inter',sans-serif", fontSize:'16px', color:'white', letterSpacing:'-0.16px' }}>Jamaica, Buxton</span>
            </div>
            {/* Circular play */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'167px', height:'167px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 167 167" style={{ position:'absolute', width:'100%', height:'100%', animation:'rotateSlowR 10s linear infinite' }}>
                <path id="cpthm" d="M83.5,83.5 m-65,0 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" fill="none" />
                <text style={{ fontSize:'11px', fill:'white' }}><textPath href="#cpthm">Play a video • Play a video • Play a video •</textPath></text>
              </svg>
              <button style={{ width:'56px', height:'56px', backgroundColor:'white', borderRadius:'50%', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1, position:'relative' }}>
                <img src={imgMobilePlay} alt="Play" style={{ width:'24px', height:'24px' }} />
              </button>
            </div>
          </div>

          {/* Bottom photo — Buxton College with progress */}
          <div style={{ width:'100%', height:'271px', borderRadius:'12px', overflow:'hidden', position:'relative' }}>
            <img src={imgMobileBottom} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
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

          {/* Stats cards row */}
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