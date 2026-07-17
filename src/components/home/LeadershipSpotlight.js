'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }
const imgSparkle = "/images/home-static/com-sparkle.png"

function ArrowIcon({ size = 18, color = "#040617" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Static fallback members in case CMS data isn't available
const FALLBACK_MEMBERS = [
  { name: 'Board of Trustees', role: 'Leadership & Governance', group: 'trustees', photo: null },
  { name: 'Executive Team',    role: 'Strategic Direction',     group: 'team',     photo: null },
]

const GROUP_LINKS = {
  trustees: '/trustees',
  team:     '/team',
}

export default function LeadershipSpotlight() {
  const [members,  setMembers]  = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    async function fetchLeadership() {
      try {
        // Fetch team members and trustees from Sanity
        const [teamData, trusteesData] = await Promise.all([
          client.fetch(`*[_type == "teamMember"] | order(order asc) [0...4] {
            _id, name, role, "photo": photo.asset->url, order
          }`),
          client.fetch(`*[_type == "trustee"] | order(order asc) [0...4] {
            _id, name, role, "photo": photo.asset->url, order
          }`),
        ])

        const combined = [
          ...(trusteesData || []).map(m => ({ ...m, group: 'trustees' })),
          ...(teamData     || []).map(m => ({ ...m, group: 'team' })),
        ]
        setMembers(combined.slice(0, 8))
      } catch (err) {
        console.error('Error fetching leadership:', err)
        setMembers([])
      } finally {
        setLoading(false)
      }
    }
    fetchLeadership()
  }, [])

  return (
    <section style={{ backgroundColor: '#040617', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        .ls-desktop { display: block; padding: 80px clamp(24px, 8vw, 165px); }
        .ls-mobile  { display: none; }
        .ls-grid    { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 52px; }
        .ls-card    {
          display: flex; flex-direction: column; align-items: center;
          gap: 14px; cursor: pointer; text-decoration: none;
          transition: transform 0.25s;
        }
        .ls-card:hover { transform: translateY(-6px); }
        .ls-card:hover .ls-name { color: #FFD900; }
        .ls-avatar-ring {
          width: 160px; height: 160px; border-radius: 50%;
          border: 2px solid rgba(255,217,0,0.2);
          overflow: hidden; flex-shrink: 0;
          background: #1A1600;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.25s;
        }
        .ls-card:hover .ls-avatar-ring { border-color: #FFD900; }
        .ls-cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px; border-radius: 16px;
          font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
          text-decoration: none; transition: opacity 0.2s;
        }
        .ls-cta-btn:hover { opacity: 0.85; }
        @media (max-width: 1200px) { .ls-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .ls-desktop { display: none !important; }
          .ls-mobile  { display: flex !important; }
        }
      `}</style>

      {/* Background sparkle */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundImage:`url('${imgSparkle}')`, backgroundSize:'679px 96px', backgroundRepeat:'repeat', opacity:0.04 }} />

      {/* -- DESKTOP ----------------------------------------------------------- */}
      <div className="ls-desktop" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'24px' }}>
          <div>
            <p style={{ ...inter, fontSize:'15px', fontWeight:600, color:'#FFD900', display:'inline-block', padding:'4px 16px', border:'1px solid rgba(255,217,0,0.3)', borderRadius:'100px', margin:'0 0 16px', letterSpacing:'0.05em' }}>
              Who Leads Us
            </p>
            <h2 style={{ ...inter, fontSize:'clamp(3rem,5vw,5rem)', fontWeight:800, color:'white', letterSpacing:'-1px', lineHeight:'96%', margin:0 }}>
              Board &amp; Leadership
            </h2>
          </div>
          <p style={{ ...inter, fontSize:'20px', color:'rgba(255,255,255,0.55)', lineHeight:'1.7', maxWidth:'400px', margin:0 }}>
            The Mico Foundation is guided by dedicated trustees and leaders committed to educational advancement and community impact across the Caribbean.
          </p>
        </motion.div>

        {/* Member grid */}
        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'60px 0' }}>
            <p style={{ ...inter, color:'rgba(255,255,255,0.4)', fontSize:'18px' }}>Loading leadership...</p>
          </div>
        ) : members.length > 0 ? (
          <div className="ls-grid">
            {members.map((m, i) => (
              <motion.a key={m._id || i} href={GROUP_LINKS[m.group] || '/team'} className="ls-card"
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ duration:0.45, delay: i * 0.08 }}>
                <div className="ls-avatar-ring">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name}
                      style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                  ) : (
                    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#1A1600,#2a2000)' }}>
                      <span style={{ ...inter, fontSize:'36px', fontWeight:700, color:'#FFD900', opacity:0.6 }}>
                        {m.name?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                <div style={{ textAlign:'center' }}>
                  <p className="ls-name" style={{ ...inter, fontSize:'18px', fontWeight:600, color:'white', margin:'0 0 4px', transition:'color 0.25s', lineHeight:'1.3' }}>
                    {m.name}
                  </p>
                  <p style={{ ...inter, fontSize:'14px', color:'rgba(255,255,255,0.45)', margin:0 }}>
                    {m.role}
                  </p>
                  <p style={{ ...inter, fontSize:'12px', color:'#FFD900', opacity:0.7, margin:'4px 0 0', letterSpacing:'0.05em', fontWeight:500 }}>
                    {m.group === 'trustees' ? 'Trustee' : 'Team Member'}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* No CMS data - show two category cards instead */
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginTop:'52px' }}>
            {[
              { title:'Board of Trustees', desc:'Meet the trustees who oversee the foundation\'s governance, strategy, and long-term vision.', href:'/trustees', count:'View All Trustees' },
              { title:'Executive Team',    desc:'Meet the team leading day-to-day operations and driving the foundation\'s mission forward.', href:'/team',     count:'View Full Team' },
            ].map((card, i) => (
              <motion.a key={i} href={card.href}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay: i * 0.15 }}
                style={{ display:'flex', flexDirection:'column', gap:'16px', padding:'36px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'24px', textDecoration:'none', background:'rgba(255,255,255,0.03)', boxShadow:'var(--shadow-dark-3)', transition:'border-color 0.25s, background 0.25s, transform var(--dur-base) var(--ease-emphasized), box-shadow var(--dur-base) var(--ease-emphasized)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,217,0,0.4)'; e.currentTarget.style.background='rgba(255,217,0,0.04)'; e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='var(--shadow-dark-4), var(--glow-gold-soft)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='var(--shadow-dark-3)'; }}>
                <div style={{ width:'56px', height:'56px', borderRadius:'16px', backgroundColor:'rgba(255,217,0,0.1)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {i === 0 ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FFD900" strokeWidth="2" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#FFD900" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="9" cy="7" r="4" stroke="#FFD900" strokeWidth="2"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#FFD900" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>
                <div>
                  <h3 style={{ ...inter, fontSize:'28px', fontWeight:700, color:'white', margin:'0 0 10px', letterSpacing:'-0.5px' }}>{card.title}</h3>
                  <p style={{ ...inter, fontSize:'17px', color:'rgba(255,255,255,0.5)', lineHeight:'1.65', margin:0 }}>{card.desc}</p>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginTop:'auto' }}>
                  <span style={{ ...inter, fontSize:'15px', fontWeight:600, color:'#FFD900' }}>{card.count}</span>
                  <ArrowIcon size={16} color="#FFD900" />
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* CTA row */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'16px', marginTop:'52px', flexWrap:'wrap' }}>
          <a href="/trustees" className="ls-cta-btn" style={{ backgroundColor:'#FFD900', color:'#040617' }}>
            Board of Trustees <ArrowIcon size={16} color="#040617" />
          </a>
          <a href="/team" className="ls-cta-btn" style={{ backgroundColor:'transparent', color:'white', border:'1px solid rgba(255,255,255,0.2)' }}>
            Executive Team <ArrowIcon size={16} color="white" />
          </a>
        </motion.div>
      </div>

      {/* -- MOBILE ------------------------------------------------------------ */}
      <div className="ls-mobile" style={{ flexDirection:'column', gap:'32px', padding:'60px 24px', position:'relative', zIndex:1 }}>

        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
          style={{ textAlign:'center' }}>
          <p style={{ ...inter, fontSize:'13px', fontWeight:600, color:'#FFD900', display:'inline-block', padding:'4px 14px', border:'1px solid rgba(255,217,0,0.3)', borderRadius:'100px', margin:'0 0 14px', letterSpacing:'0.05em' }}>
            Who Leads Us
          </p>
          <h2 style={{ ...inter, fontSize:'48px', fontWeight:800, color:'white', letterSpacing:'-1px', lineHeight:'96%', margin:'0 0 16px' }}>
            Board &amp; Leadership
          </h2>
          <p style={{ ...inter, fontSize:'17px', color:'rgba(255,255,255,0.5)', lineHeight:'1.65', margin:0 }}>
            Guided by dedicated trustees and leaders committed to educational advancement across the Caribbean.
          </p>
        </motion.div>

        {loading ? (
          <p style={{ ...inter, color:'rgba(255,255,255,0.4)', fontSize:'16px', textAlign:'center' }}>Loading...</p>
        ) : members.length > 0 ? (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px', width:'100%' }}>
            {members.slice(0, 6).map((m, i) => (
              <motion.a key={m._id || i} href={GROUP_LINKS[m.group] || '/team'}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4, delay: i * 0.07 }}
                style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', textDecoration:'none' }}>
                <div style={{ width:'100px', height:'100px', borderRadius:'50%', border:'2px solid rgba(255,217,0,0.2)', overflow:'hidden', background:'#1A1600', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top' }} />
                  ) : (
                    <span style={{ ...inter, fontSize:'28px', fontWeight:700, color:'#FFD900', opacity:0.6 }}>{m.name?.charAt(0) || '?'}</span>
                  )}
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ ...inter, fontSize:'14px', fontWeight:600, color:'white', margin:'0 0 2px', lineHeight:'1.3' }}>{m.name}</p>
                  <p style={{ ...inter, fontSize:'12px', color:'rgba(255,255,255,0.4)', margin:0 }}>{m.role}</p>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'12px', width:'100%' }}>
            {[
              { title:'Board of Trustees', href:'/trustees', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#FFD900" strokeWidth="2" strokeLinejoin="round"/></svg> },
              { title:'Executive Team',    href:'/team',     icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#FFD900" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#FFD900" strokeWidth="2"/></svg> },
            ].map((item, i) => (
              <a key={i} href={item.href}
                style={{ display:'flex', alignItems:'center', gap:'14px', padding:'20px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', textDecoration:'none', background:'rgba(255,255,255,0.03)', boxShadow:'var(--shadow-dark-2)' }}>
                <div style={{ width:'44px', height:'44px', borderRadius:'12px', backgroundColor:'rgba(255,217,0,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {item.icon}
                </div>
                <span style={{ ...inter, fontSize:'18px', fontWeight:600, color:'white', flex:1 }}>{item.title}</span>
                <ArrowIcon size={16} color="#FFD900" />
              </a>
            ))}
          </div>
        )}

        <div style={{ display:'flex', flexDirection:'column', gap:'10px', width:'100%' }}>
          <a href="/trustees" style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', backgroundColor:'#FFD900', color:'#040617', fontSize:'15px', fontWeight:600, padding:'14px 20px', borderRadius:'14px', textDecoration:'none' }}>
            Board of Trustees <ArrowIcon size={15} color="#040617" />
          </a>
          <a href="/team" style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', backgroundColor:'transparent', color:'white', fontSize:'15px', fontWeight:600, padding:'14px 20px', borderRadius:'14px', textDecoration:'none', border:'1px solid rgba(255,255,255,0.2)' }}>
            Executive Team <ArrowIcon size={15} color="white" />
          </a>
        </div>
      </div>
    </section>
  )
}
