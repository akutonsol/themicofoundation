'use client'
import { motion } from 'framer-motion'

const inter = { fontFamily: "'Inter', sans-serif" }

const imgSparkle = "/images/home-static/com-sparkle.png"

function ArrowIcon({ size = 20, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink:0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ways = [
  {
    number: "01",
    title:  "Make a Donation",
    tag:    "Card / PayPal / In Person",
    tagBg:  "#FFD900",
    tagColor: "#040617",
    desc:   "Make a one-time or monthly donation directly to The Mico Foundation. Support our projects, scholarships, and community programs with any amount. Accepts card, PayPal, and in-person payments.",
    href:   "/donate",
    btnText: "Donate Now",
    btnBg:  "#FFD900",
    accent: "#FFD900",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="10" width="32" height="22" rx="4" stroke="#040617" strokeWidth="2.2"/>
        <path d="M4 16H36" stroke="#040617" strokeWidth="2.2"/>
        <rect x="8" y="21" width="8" height="4" rx="1.5" fill="#040617"/>
      </svg>
    ),
  },
  {
    number: "02",
    title:  "Make a Pledge",
    tag:    "Commitment Over Time",
    tagBg:  "#040617",
    tagColor: "#FFD900",
    desc:   "Pledge a commitment to give over a period of time. A pledge allows you to plan your giving in installments — monthly, quarterly, or annually — helping us plan and sustain long-term projects.",
    href:   "/pledge",
    btnText: "Make a Pledge",
    btnBg:  "#040617",
    accent: "#040617",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6L24 14L34 15.5L27 22L28.5 32L20 27.5L11.5 32L13 22L6 15.5L16 14L20 6Z" stroke="#040617" strokeWidth="2.2" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title:  "Create an Endowment",
    tag:    "Legacy Giving",
    tagBg:  "#5EDA71",
    tagColor: "#0A3D14",
    desc:   "Establish a named endowment fund that generates ongoing support for The Mico Foundation in perpetuity. An endowment is a lasting legacy — your gift continues to give long after it is made.",
    href:   "/endowments",
    btnText: "Learn About Endowments",
    btnBg:  "#5EDA71",
    accent: "#5EDA71",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="16" r="8" stroke="#040617" strokeWidth="2.2"/>
        <path d="M20 24V34" stroke="#040617" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M14 30H26" stroke="#040617" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M17 16L19 18L23 14" stroke="#040617" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function WaysToDonate() {
  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .wtd-desktop { display: block; padding: 80px clamp(24px, 8vw, 165px); }
        .wtd-mobile  { display: none; }
        .wtd-grid    { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 60px; }
        .wtd-card    { display: flex; flex-direction: column; border: 1px solid rgba(4,6,23,0.07); border-radius: 24px; overflow: hidden; background: #FFFDF9; box-shadow: var(--shadow-2); transition: transform var(--dur-base) var(--ease-emphasized), box-shadow var(--dur-base) var(--ease-emphasized); }
        .wtd-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-4); }
        .wtd-btn     { display: inline-flex; align-items: center; justify-content: center; gap: 10px; border-radius: 16px; padding: 14px 24px; font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 600; text-decoration: none; transition: opacity 0.2s; }
        .wtd-btn:hover { opacity: 0.88; }
        @media (max-width: 1024px) { .wtd-grid { grid-template-columns: 1fr; } }
        @media (max-width: 768px) {
          .wtd-desktop { display: none !important; }
          .wtd-mobile  { display: flex !important; }
        }
      `}</style>

      {/* Background sparkle */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkle}')`, backgroundSize:'679px 96px', backgroundRepeat:'repeat', opacity:0.06 }} />

      {/* DESKTOP */}
      <div className="wtd-desktop" style={{ position:'relative', zIndex:1 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px' }}>
          <div>
            <p style={{ ...inter, fontSize:'18px', fontWeight:500, color:'#FFD900', backgroundColor:'#040617', display:'inline-block', padding:'4px 16px', borderRadius:'100px', margin:'0 0 16px', letterSpacing:'0.05em' }}>
              Support Our Mission
            </p>
            <h2 style={{ ...inter, fontSize:'clamp(3rem,5vw,5rem)', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96%', margin:0 }}>
              Ways to<br/>Give Back
            </h2>
          </div>
          <div style={{ maxWidth:'440px', borderLeft:'1px solid #E5E6EB', paddingLeft:'24px' }}>
            <p style={{ ...inter, fontSize:'20px', color:'#6F7181', lineHeight:'1.7', margin:0 }}>
              Every contribution — large or small — helps us advance education, restore heritage, and build opportunity across Jamaica and the Caribbean.
            </p>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="wtd-grid">
          {ways.map((w, i) => (
            <motion.div key={w.number} className="wtd-card"
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ duration:0.5, delay:i * 0.12 }}>

              {/* Card top stripe */}
              <div style={{ height:'6px', backgroundColor:w.accent }} />

              {/* Card body */}
              <div style={{ padding:'32px', display:'flex', flexDirection:'column', gap:'24px', flex:1 }}>

                {/* Number + icon row */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ ...inter, fontSize:'64px', fontWeight:800, color:'#F0EFE9', letterSpacing:'-2px', lineHeight:1 }}>{w.number}</span>
                  <div style={{ width:'72px', height:'72px', borderRadius:'18px', backgroundColor:'#F5F3EE', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {w.icon}
                  </div>
                </div>

                {/* Tag */}
                <div style={{ display:'inline-flex', alignItems:'center' }}>
                  <span style={{ ...inter, fontSize:'13px', fontWeight:600, backgroundColor:w.tagBg, color:w.tagColor, padding:'4px 14px', borderRadius:'100px', letterSpacing:'0.04em' }}>
                    {w.tag}
                  </span>
                </div>

                {/* Title + desc */}
                <div style={{ flex:1 }}>
                  <h3 style={{ ...inter, fontSize:'32px', fontWeight:700, color:'#040617', letterSpacing:'-0.5px', lineHeight:'1.2', margin:'0 0 14px' }}>
                    {w.title}
                  </h3>
                  <p style={{ ...inter, fontSize:'18px', color:'#6F7181', lineHeight:'1.7', margin:0 }}>
                    {w.desc}
                  </p>
                </div>

                {/* CTA */}
                <a href={w.href} className="wtd-btn"
                  style={{ backgroundColor:w.btnBg, color:w.accent === '#FFD900' ? '#040617' : w.accent === '#040617' ? '#FFD900' : '#0A3D14', marginTop:'8px' }}>
                  {w.btnText}
                  <ArrowIcon size={18} color={w.accent === '#FFD900' ? '#040617' : w.accent === '#040617' ? '#FFD900' : '#0A3D14'} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.4 }}
          style={{ marginTop:'48px', padding:'28px 32px', backgroundColor:'#F5F3EE', borderRadius:'20px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'20px' }}>
          <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:0, fontWeight:500 }}>
            Not sure which option is right for you?
          </p>
          <a href="/contact"
            style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', backgroundColor:'#040617', color:'#FFD900', fontSize:'15px', fontWeight:600, padding:'12px 24px', borderRadius:'14px', textDecoration:'none' }}>
            Talk to Our Team
            <ArrowIcon size={16} color="#FFD900" />
          </a>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="wtd-mobile" style={{ flexDirection:'column', gap:'32px', padding:'60px 24px', position:'relative', zIndex:1 }}>

        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:'center' }}>
          <p style={{ ...inter, fontSize:'14px', fontWeight:600, color:'#FFD900', backgroundColor:'#040617', display:'inline-block', padding:'4px 16px', borderRadius:'100px', margin:'0 0 16px', letterSpacing:'0.05em' }}>
            Support Our Mission
          </p>
          <h2 style={{ ...inter, fontSize:'52px', fontWeight:800, color:'#040617', letterSpacing:'-1px', lineHeight:'96%', margin:'0 0 16px' }}>
            Ways to Give Back
          </h2>
          <p style={{ ...inter, fontSize:'18px', color:'#6F7181', lineHeight:'1.7', margin:0 }}>
            Every contribution helps us advance education and build opportunity across the Caribbean.
          </p>
        </motion.div>

        <div style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>
          {ways.map((w, i) => (
            <motion.div key={w.number} style={{ border:'1px solid #E5E6EB', borderRadius:'20px', overflow:'hidden', backgroundColor:'#FFFDF9' }}
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.45, delay:i*0.1 }}>

              <div style={{ height:'5px', backgroundColor:w.accent }} />

              <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ ...inter, fontSize:'48px', fontWeight:800, color:'#F0EFE9', letterSpacing:'-2px', lineHeight:1 }}>{w.number}</span>
                  <div style={{ width:'60px', height:'60px', borderRadius:'14px', backgroundColor:'#F5F3EE', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    {w.icon}
                  </div>
                </div>
                <span style={{ ...inter, fontSize:'12px', fontWeight:600, backgroundColor:w.tagBg, color:w.tagColor, padding:'3px 12px', borderRadius:'100px', letterSpacing:'0.04em', alignSelf:'flex-start' }}>
                  {w.tag}
                </span>
                <h3 style={{ ...inter, fontSize:'26px', fontWeight:700, color:'#040617', letterSpacing:'-0.5px', lineHeight:'1.2', margin:0 }}>
                  {w.title}
                </h3>
                <p style={{ ...inter, fontSize:'16px', color:'#6F7181', lineHeight:'1.7', margin:0 }}>
                  {w.desc}
                </p>
                <a href={w.href}
                  style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', backgroundColor:w.btnBg, color:w.accent === '#FFD900' ? '#040617' : w.accent === '#040617' ? '#FFD900' : '#0A3D14', fontSize:'15px', fontWeight:600, padding:'14px 20px', borderRadius:'14px', textDecoration:'none' }}>
                  {w.btnText}
                  <ArrowIcon size={16} color={w.accent === '#FFD900' ? '#040617' : w.accent === '#040617' ? '#FFD900' : '#0A3D14'} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ padding:'24px', backgroundColor:'#F5F3EE', borderRadius:'18px', display:'flex', flexDirection:'column', gap:'14px', alignItems:'center', textAlign:'center' }}>
          <p style={{ ...inter, fontSize:'17px', color:'#040617', margin:0, fontWeight:500 }}>
            Not sure which option is right for you?
          </p>
          <a href="/contact"
            style={{ ...inter, display:'inline-flex', alignItems:'center', gap:'10px', backgroundColor:'#040617', color:'#FFD900', fontSize:'15px', fontWeight:600, padding:'12px 24px', borderRadius:'14px', textDecoration:'none' }}>
            Talk to Our Team
            <ArrowIcon size={16} color="#FFD900" />
          </a>
        </div>
      </div>
    </section>
  )
}
