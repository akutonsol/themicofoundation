'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const imgSparkle = "/images/home-static/sparkle-pub.png"
const inter = { fontFamily: "'Inter', sans-serif" }

export default function Newsletter() {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [email,     setEmail]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [errors,    setErrors]    = useState({ firstName:'', email:'' })

  const validate = () => {
    const e = { firstName:'', email:'' }
    let valid = true
    if (!firstName.trim()) { e.firstName = 'First name is required'; valid = false }
    if (!email.trim())     { e.email = 'Email is required'; valid = false }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { e.email = 'Please enter a valid email'; valid = false }
    setErrors(e)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res  = await fetch('/api/newsletter', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ firstName, lastName, email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe')
      setSubmitted(true)
    } catch (err) {
      setErrors(prev => ({ ...prev, email: err.message }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }} className="nl-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .nl-section { padding: 80px 24px; }
        .nl-title   { font-size: 48px; line-height: 54px; text-align: center; }
        .nl-form    { display: flex; flex-direction: column; gap: 20px; }
        .nl-fields  { display: flex; flex-direction: column; gap: 16px; }
        .nl-btn     { width: 100%; }

        @media (min-width: 768px) {
          .nl-section { padding: 80px 165px; }
          .nl-title   { font-size: 75px; line-height: 85px; }
          .nl-form    { flex-direction: row; align-items: flex-end; gap: 16px; }
          .nl-fields  { flex-direction: row; gap: 16px; flex: 1; }
          .nl-btn     { width: auto; min-width: 160px; flex-shrink: 0; }
        }

        .nl-input {
          background: #FFFDF9; border: 1px solid #E5E6EB; border-radius: 12px;
          height: 50px; padding: 0 16px;
          font-family: 'Inter', sans-serif; font-size: 16px; color: #040617;
          width: 100%; outline: none; box-sizing: border-box; transition: border-color 0.2s;
        }
        .nl-input::placeholder { color: #6F7181; }
        .nl-input:focus  { border-color: #FFD900; }
        .nl-input.error  { border-color: #EF4444; }
        .nl-sub:hover    { background: #e6c200 !important; }
        .nl-sub:active   { transform: scale(0.98); }
        .nl-sub:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

      <motion.h2
        className="nl-title"
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.6 }}
        style={{ ...inter, fontWeight:600, color:'#040617', letterSpacing:'-0.48px', margin:'0 0 32px' }}
      >
        Subscribe to Our Newsletter
      </motion.h2>

      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
        style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', padding:'24px', position:'relative', overflow:'hidden' }}
      >
        <img src={imgSparkle} alt="" style={{ position:'absolute', top:'13px', left:'17px', width:'100%', height:'109px', objectFit:'cover', pointerEvents:'none', opacity:0.2, zIndex:0 }} />

        {submitted ? (
          <motion.div
            initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
            style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', position:'relative', zIndex:1 }}
          >
            <p style={{ ...inter, fontSize:'24px', fontWeight:600, color:'#040617', textAlign:'center' }}>
              You are subscribed! Thank you for joining.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="nl-form" style={{ position:'relative', zIndex:1 }}>

            <div className="nl-fields">

              {/* First name */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', flex:1 }}>
                <label style={{ ...inter, fontSize:'16px', color:'#040617' }}>First Name</label>
                <input
                  className={`nl-input${errors.firstName ? ' error' : ''}`}
                  type="text"
                  placeholder="Start typing..."
                  value={firstName}
                  onChange={e => { setFirstName(e.target.value); if (errors.firstName) setErrors(p => ({...p, firstName:''})) }}
                />
                {errors.firstName && <span style={{ ...inter, fontSize:'13px', color:'#EF4444' }}>{errors.firstName}</span>}
              </div>

              {/* Last name */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', flex:1 }}>
                <label style={{ ...inter, fontSize:'16px', color:'#040617' }}>Last Name <span style={{ color:'#6F7181' }}>(optional)</span></label>
                <input
                  className="nl-input"
                  type="text"
                  placeholder="Start typing..."
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </div>

              {/* Email — fixed: was ttype="text" */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px', flex:1 }}>
                <label style={{ ...inter, fontSize:'16px', color:'#040617' }}>Email Address</label>
                <input
                  className={`nl-input${errors.email ? ' error' : ''}`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({...p, email:''})) }}
                />
                {errors.email && <span style={{ ...inter, fontSize:'13px', color:'#EF4444' }}>{errors.email}</span>}
              </div>
            </div>

            {/* Submit */}
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
              <button
                type="submit"
                disabled={loading}
                className="nl-btn nl-sub"
                style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', backgroundColor:'#FFD900', color:'#040617', fontSize:'16px', fontWeight:600, padding:'0 28px', borderRadius:'14px', border:'none', cursor:'pointer', height:'50px', transition:'background 0.2s, transform 0.1s', whiteSpace:'nowrap' }}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  )
}