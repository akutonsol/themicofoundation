'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { client, urlFor, queries } from '@/sanity/lib/sanity'

// Static assets
const imgLocation  = "/images/home-static/location-pin.svg"
const imgArrowBtn  = "/images/home-static/button-icon.png"
const imgSparkle   = "/images/home-static/sparkle-large.png"

const inter = { fontFamily: "'Inter', sans-serif" }

const AMOUNTS_MONTHLY = ['$5/Month', '$10/Month', '$30/Month', '$100/Month', '$50/Month', '$20/Month']
const AMOUNTS_ONCE    = ['$10', '$25', '$30', '$100', '$50', '$250']
const TOTAL_DESKTOP = 40
const TOTAL_MOBILE = 24

// Helper function to format currency (same as Projects section)
const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `$${Math.round(amount / 1000000)}M`
  }
  if (amount >= 1000) {
    return `$${Math.round(amount / 1000)}K`
  }
  return `$${amount}`
}

const steps = [
  { num: 1, title: 'Donate Amount', sub: 'Choose your donation target and amount.' },
  { num: 2, title: 'Personal Info', sub: 'Fill required fields about you to continue.' },
  { num: 3, title: 'Donate Method', sub: 'Choose best option for you to send donation.' },
]

function StepIndicator({ currentStep, mobile = false }) {
  if (mobile) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'16px', width:'100%' }}>
        {steps.map((step, i) => (
          <div key={step.num}>
            <div style={{ display:'flex', gap:'16px', alignItems:'flex-start', opacity: step.num === currentStep ? 1 : 0.5 }}>
              <div
                style={{
                  width:'60px',
                  height:'60px',
                  borderRadius:'12px',
                  backgroundColor: step.num === currentStep ? '#FFD900' : 'transparent',
                  border: step.num === currentStep ? 'none' : '1px solid #E5E6EB',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  flexShrink:0
                }}
              >
                <span style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px' }}>
                  {step.num}
                </span>
              </div>
              <div style={{ flex:1 }}>
                <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0 }}>
                  {step.title}
                </p>
                <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
                  {step.sub}
                </p>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'24px', marginTop:'4px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'32px', maxWidth:'1320px', margin:'0 auto 36px' }}>
      {steps.map((step, i) => (
        <div key={step.num} style={{ display:'flex', flex:1, alignItems:'center', gap:'16px', opacity: step.num === currentStep ? 1 : 0.5 }}>
          <div
            style={{
              width:'60px',
              height:'60px',
              borderRadius:'12px',
              backgroundColor: step.num === currentStep ? '#FFD900' : 'transparent',
              border: step.num === currentStep ? 'none' : '1px solid #E5E6EB',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              flexShrink:0
            }}
          >
            <span style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617' }}>
              {step.num}
            </span>
          </div>
          <div style={{ flex:1 }}>
            <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0 }}>
              {step.title}
            </p>
            <p style={{ ...inter, fontSize:'20px', color:'#6F7181', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
              {step.sub}
            </p>
          </div>
          {i < steps.length - 1 && (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="#6F7181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ projects, currentProject, onPrev, onNext, mobile = false }) {
  if (!projects || projects.length === 0) {
    return (
      <div style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', padding:'24px', textAlign:'center' }}>
        <p style={{ ...inter, fontSize:'20px', color:'#6F7181' }}>No active projects available</p>
      </div>
    )
  }

  const project = projects[currentProject]
  
  // Calculate percentage (same as Projects section)
  const percentage = project.targetAmount > 0 
    ? Math.round((project.amountDonated / project.targetAmount) * 100) 
    : 0
  
  const filled = Math.round((percentage / 100) * (mobile ? TOTAL_MOBILE : TOTAL_DESKTOP))

  if (mobile) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'20px', width:'100%', position:'relative', overflow:'hidden' }}>
        <img src={imgSparkle} alt="" style={{ position:'absolute', left:'-96px', top:'62px', width:'523px', pointerEvents:'none', opacity:0.25, zIndex:0 }} />

        <div style={{ width:'100%', aspectRatio:'16/9', borderRadius:'12px', overflow:'hidden', position:'relative', zIndex:1 }}>
          <img src={project.photo} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6) 42%, rgba(0,0,0,0) 100%)' }} />
          <div style={{ position:'absolute', top:'12px', left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:'8px', whiteSpace:'nowrap' }}>
            <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
            <span style={{ ...inter, fontSize:'16px', color:'white', letterSpacing:'-0.16px' }}>{project.location}</span>
          </div>
        </div>

        <div style={{ position:'relative', zIndex:1 }}>
          <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
            {project.title}
          </p>
          <a href={`/projectdetail?slug=${project.slug}`} style={{ ...inter, fontSize:'24px', color:'#6F7181', letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline' }}>
            Learn more
          </a>
        </div>

        <div style={{ position:'relative', zIndex:1 }}>
          <p style={{ ...inter, fontSize:'32px', color:'#5EDA71', textAlign:'center', letterSpacing:'-0.32px', lineHeight:'46px', margin:'0 0 4px' }}>
            {percentage}%
          </p>
          <div style={{ display:'flex', gap:'3px' }}>
            {Array.from({ length: TOTAL_MOBILE }).map((_,i) => (
              <div key={i} style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor: i < filled ? '#5EDA71' : '#6F7181', opacity: i < filled ? 1 : 0.2 }} />
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
            <span style={{ ...inter, fontSize:'24px', color:'#6F7181', opacity:0.6 }}>$0</span>
            <span style={{ ...inter, fontSize:'24px', color:'#5EDA71' }}>{project.raised}</span>
            <span style={{ ...inter, fontSize:'24px', color:'#6F7181', opacity:0.6 }}>{project.goal}</span>
          </div>
        </div>

        {projects.length > 1 && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'32px', position:'relative', zIndex:1 }}>
            <button onClick={onPrev} style={{ width:'44px', height:'44px', border:'2px solid #040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', opacity:0.6, outline:'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div style={{ display:'flex', flex:1, gap:'8px' }}>
              {projects.map((_,i) => (
                <div key={i} style={{ flex:1, height:'12px', borderRadius:'90px', backgroundColor: i === currentProject ? '#FFD900' : '#6F7181', opacity: i === currentProject ? 1 : 0.2 }} />
              ))}
            </div>
            <button onClick={onNext} style={{ width:'44px', height:'44px', backgroundColor:'#040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', outline:'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', padding:'16px', display:'flex', flexDirection:'column', gap:'32px', position:'relative', overflow:'hidden' }}>
      <img src={imgSparkle} alt="" style={{ position:'absolute', top:'132px', left:'50%', transform:'translateX(-50%)', width:'523px', pointerEvents:'none', opacity:0.3 }} />
      
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', position:'relative', zIndex:1 }}>
        <div>
          <p style={{ ...inter, fontSize:'32px', fontWeight:600, color:'#040617', letterSpacing:'-0.32px', lineHeight:'46px', margin:0, textTransform:'capitalize' }}>
            {project.title}
          </p>
          <a href={`/projectdetail?slug=${project.slug}`} style={{ ...inter, fontSize:'24px', color:'#6F7181', letterSpacing:'0.24px', lineHeight:'38px', textDecoration:'underline' }}>
            Learn more
          </a>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <img src={imgLocation} alt="" style={{ width:'24px', height:'24px' }} />
          <span style={{ ...inter, fontSize:'16px', color:'#6F7181' }}>{project.location}</span>
        </div>
      </div>

      <div style={{ borderRadius:'12px', overflow:'hidden', aspectRatio:'16/9', position:'relative', zIndex:1 }}>
        <img src={project.photo} alt={project.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:'8px', position:'relative', zIndex:1 }}>
        <p style={{ ...inter, fontSize:'32px', fontWeight:400, color:'#5EDA71', textAlign:'center', letterSpacing:'-0.32px', margin:0 }}>
          {percentage}%
        </p>
        <div style={{ display:'flex', gap:'4px' }}>
          {Array.from({ length: TOTAL_DESKTOP }).map((_,i) => (
            <div key={i} style={{ flex:1, height:'20px', borderRadius:'20px', backgroundColor: i < filled ? '#5EDA71' : '#d9d9d9', opacity: i < filled ? 1 : 0.4 }} />
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between' }}>
          <span style={{ ...inter, fontSize:'24px', color:'#6F7181', opacity:0.8 }}>$0</span>
          <span style={{ ...inter, fontSize:'24px', color:'#5EDA71' }}>{project.raised}</span>
          <span style={{ ...inter, fontSize:'24px', color:'#6F7181', opacity:0.8 }}>{project.goal}</span>
        </div>
      </div>

      {projects.length > 1 && (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', opacity:0.6 }}>
            <span style={{ ...inter, fontSize:'20px', color:'#040617' }}>Last Project</span>
            <button onClick={onPrev} style={{ width:'44px', height:'44px', border:'2px solid #040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', background:'none', cursor:'pointer', outline:'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div style={{ display:'flex', gap:'8px' }}>
            {projects.map((_,i) => (
              <div key={i} style={{ width:'52px', height:'12px', borderRadius:'90px', backgroundColor: i === currentProject ? '#FFD900' : '#d9d9d9', opacity: i === currentProject ? 1 : 0.4 }} />
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
            <button onClick={onNext} style={{ width:'44px', height:'44px', backgroundColor:'#040617', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center', border:'none', cursor:'pointer', outline:'none' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span style={{ ...inter, fontSize:'20px', color:'#040617' }}>Next Project</span>
          </div>
        </div>
      )}
    </div>
  )
}

function InputField({ label, placeholder = 'Start Typing...', value, onChange, error }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
      <label style={{ ...inter, fontSize:'16px', color:'#414651', letterSpacing:'0.16px', lineHeight:'24px' }}>
        {label}
      </label>
      <div style={{ backgroundColor:'#FFFDF9', border:`1px solid ${error ? '#EF4444' : '#E5E6EB'}`, borderRadius:'8px', padding:'10px 14px', boxShadow:'0px 1px 2px rgba(10,13,18,0.05)' }}>
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...inter, width:'100%', border:'none', outline:'none', backgroundColor:'transparent', fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px' }}
        />
      </div>
      {error && <span style={{ ...inter, fontSize:'14px', color:'#EF4444' }}>{error}</span>}
    </div>
  )
}

function AmountStep({ tab, setTab, selected, setSelected, custom, setCustom, mobile = false, onNext, error }) {
  const amounts = tab === 'monthly' ? AMOUNTS_MONTHLY : AMOUNTS_ONCE

  if (mobile) {
    return (
      <div style={{ width:'100%', backgroundColor:'#FFFDF9', borderRadius:'16px', overflow:'hidden', border:'1px solid #E5E6EB', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', borderBottom:'1px solid #E5E6EB' }}>
          <button style={{ flex:1, padding:'10px', ...inter, fontSize:'24px', lineHeight:'38px', letterSpacing:'0.24px', color:'#040617', background:'none', border:'none', borderBottom: tab === 'once' ? '1px solid #FFD900' : '1px solid transparent', cursor:'pointer', opacity: tab === 'once' ? 1 : 0.8 }} onClick={() => { setTab('once'); setSelected('$50') }}>
            Once
          </button>
          <button style={{ flex:1, padding:'10px', ...inter, fontSize:'24px', lineHeight:'38px', letterSpacing:'0.24px', color:'#040617', background:'none', border:'none', borderBottom: tab === 'monthly' ? '1px solid #FFD900' : '1px solid transparent', cursor:'pointer', opacity: tab === 'monthly' ? 1 : 0.8 }} onClick={() => { setTab('monthly'); setSelected('$50/Month') }}>
            Monthly
          </button>
        </div>

        <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'24px' }}>
          <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px' }}>
              {amounts.map(amt => (
                <button key={amt} className={`m-amt-btn${selected === amt ? ' active' : ''}`} onClick={() => setSelected(amt)}>
                  {amt}
                </button>
              ))}
            </div>

            <button className={`m-amt-btn${selected === 'custom' ? ' active' : ''}`} style={{ gridColumn:'1/-1', width:'100%' }} onClick={() => setSelected('custom')}>
              Custom
            </button>

            {selected === 'custom' && (
              <div>
                <input
                  type="text"
                  placeholder="Enter amount"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ''))}
                  style={{ ...inter, width:'100%', border:`1px solid ${error ? '#EF4444' : '#FFD900'}`, borderRadius:'12px', padding:'12px 16px', fontSize:'18px', color:'#040617', outline:'none', boxSizing:'border-box' }}
                />
                {error && <p style={{ ...inter, fontSize:'14px', color:'#EF4444', margin:'4px 0 0' }}>{error}</p>}
              </div>
            )}

            <p style={{ ...inter, fontSize:'16px', color:'#6F7181', textAlign:'center', letterSpacing:'0.16px', lineHeight:'24px', margin:0 }}>
              *All donations over $2 are tax deductible
            </p>
          </div>

          <button onClick={onNext} style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', backgroundColor:'#FFD900', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', border:'none', cursor:'pointer', width:'100%' }}>
            Continue to Personal Info
            <img src={imgArrowBtn} alt="" style={{ width:'24px', height:'24px' }} />
          </button>
        </div>

        <div style={{ backgroundColor:'#E8E9EB', padding:'24px', borderRadius:'16px' }}>
          <p style={{ ...inter, fontSize:'20px', color:'#636473', letterSpacing:'0.2px', lineHeight:'30px', margin:0, textAlign:'center' }}>
            Your <strong style={{ color:'#040617' }}>{selected === 'custom' ? (custom || '$50') : selected}</strong> donation can help equip up to <strong style={{ color:'#040617' }}>20</strong> students with school supplies, access to technology, and a safe learning environment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', overflow:'hidden', display:'flex', flexDirection:'column', position:'relative' }}>
      <img src={imgSparkle} alt="" style={{ position:'absolute', top:'105px', left:'138px', width:'523px', pointerEvents:'none', opacity:0.2, zIndex:0 }} />
      <div style={{ display:'flex', borderBottom:'1px solid #E5E6EB', position:'relative', zIndex:1 }}>
        <button className={`tab-btn${tab === 'once' ? ' active' : ''}`} onClick={() => { setTab('once'); setSelected('$50') }}>
          Donate Once
        </button>
        <button className={`tab-btn${tab === 'monthly' ? ' active' : ''}`} onClick={() => { setTab('monthly'); setSelected('$50/Month') }}>
          Donate Monthly
        </button>
      </div>

      <div style={{ padding:'24px', display:'flex', flexDirection:'column', justifyContent:'space-between', flex:1, gap:'24px', position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px' }}>
            {amounts.map(amt => (
              <button key={amt} className={`amt-btn${selected === amt ? ' active' : ''}`} onClick={() => setSelected(amt)}>
                {amt}
              </button>
            ))}
          </div>

          <div>
            <input
              type="text"
              placeholder="Custom"
              value={custom}
              onChange={e => { setCustom(e.target.value.replace(/[^0-9.]/g, '')); setSelected('custom') }}
              style={{ ...inter, width:'100%', border:`1px solid ${error ? '#EF4444' : (selected === 'custom' ? '#FFD900' : '#E5E6EB')}`, borderRadius:'20px', padding:'10px 32px', fontSize:'24px', lineHeight:'38px', letterSpacing:'0.24px', color:'#040617', backgroundColor:'#FFFDF9', outline:'none', textAlign:'center', boxSizing:'border-box' }}
            />
            {error && <p style={{ ...inter, fontSize:'14px', color:'#EF4444', textAlign:'center', margin:'4px 0 0' }}>{error}</p>}
          </div>
          <p style={{ ...inter, fontSize:'16px', color:'#6F7181', letterSpacing:'0.16px', lineHeight:'24px', textAlign:'center', margin:0 }}>
            *All donations over $2 are tax deductible
          </p>
        </div>

        <button onClick={onNext} style={{ ...inter, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', backgroundColor:'#FFD900', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', border:'none', cursor:'pointer', width:'100%' }}>
          Continue to Personal Info
          <img src={imgArrowBtn} alt="" style={{ width:'24px', height:'24px' }} />
        </button>
      </div>

      <div style={{ backgroundColor:'#E8E9EB', padding:'24px', position:'relative', zIndex:1 }}>
        <p style={{ ...inter, fontSize:'20px', color:'#636473', letterSpacing:'0.2px', lineHeight:'30px', margin:0 }}>
          Your <strong style={{ color:'#040617' }}>{selected === 'custom' ? (custom || '$50') : selected}</strong> donation can help equip up to <strong style={{ color:'#040617' }}>20</strong> students with school supplies, access to technology, and a safe learning environment — giving them the chance to thrive and build a better future.
        </p>
      </div>
    </div>
  )
}

function PersonalInfoStep({ form, setForm, errors, mobile = false, onBack, onNext }) {
  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const content = (
    <>
      <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
        <InputField label="First Name" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
        <InputField label="Last Name" value={form.lastName} onChange={update('lastName')} error={errors.lastName} />
      </div>

      <InputField 
        label="Email Address" 
        value={form.email} 
        onChange={update('email')} 
        error={errors.email}
        placeholder="your.email@example.com"
      />

      <InputField label="Address Line 1" value={form.address1} onChange={update('address1')} error={errors.address1} />
      <InputField label="Address Line 2 (Optional)" value={form.address2} onChange={update('address2')} />

      <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
        <InputField label="Country" value={form.country} onChange={update('country')} error={errors.country} />
        <InputField label="City" value={form.city} onChange={update('city')} error={errors.city} />
      </div>

      <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
       <InputField label="ZIP/Postal Code" value={form.zip} onChange={update('zip')} error={errors.zip} />
        <InputField label="State/Province" value={form.state} onChange={update('state')} error={errors.state} />
      </div>

      <div style={{ display:'flex', gap:'16px', flexDirection: mobile ? 'column' : 'row' }}>
        <button onClick={onBack} style={{ ...inter, background:'none', border:'1px solid #E5E6EB', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', cursor:'pointer', flex:1 }}>
          Go Back
        </button>
        <button onClick={onNext} style={{ ...inter, background:'#FFD900', border:'none', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', cursor:'pointer', flex:1 }}>
          Continue to Donate Method
        </button>
      </div>
    </>
  )

  return (
    <div style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{ borderBottom:'1px solid #E5E6EB', padding:'20px 24px', textAlign:'center' }}>
        <h3 style={{ ...inter, fontSize: mobile ? '28px' : '40px', fontWeight:500, color:'#040617', margin:0 }}>
          Personal Info
        </h3>
      </div>
      <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'20px' }}>
        {content}
      </div>
    </div>
  )
}

function PaymentField({ label, placeholder = 'Start Typing...', value, onChange, error, type = 'text' }) {
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const formatCVC = (value) => {
    return value.replace(/[^0-9]/gi, '').substring(0, 3)
  }

  const handleChange = (e) => {
    let formatted = e.target.value
    if (type === 'cardNumber') {
      formatted = formatCardNumber(e.target.value)
    } else if (type === 'expiry') {
      formatted = formatExpiry(e.target.value)
    } else if (type === 'cvc') {
      formatted = formatCVC(e.target.value)
    }
    onChange({ target: { value: formatted } })
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
      <label style={{ ...inter, fontSize:'16px', color:'#414651', letterSpacing:'0.16px', lineHeight:'24px' }}>
        {label}
      </label>
      <div style={{ backgroundColor:'#FFFDF9', border:`1px solid ${error ? '#EF4444' : '#E5E6EB'}`, borderRadius:'8px', padding:'10px 14px', boxShadow:'0px 1px 2px rgba(10,13,18,0.05)' }}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          maxLength={type === 'cardNumber' ? 19 : type === 'expiry' ? 5 : type === 'cvc' ? 3 : undefined}
          style={{ ...inter, width:'100%', border:'none', outline:'none', backgroundColor:'transparent', fontSize:'16px', color:'#040617', letterSpacing:'0.16px', lineHeight:'24px' }}
        />
      </div>
      {error && <span style={{ ...inter, fontSize:'14px', color:'#EF4444' }}>{error}</span>}
    </div>
  )
}

function DonateMethodStep({ paymentMethod, setPaymentMethod, payment, setPayment, errors, donationLabel, projectTitle, mobile = false, onBack, onDonate, isProcessing, paymentSuccess }) {
  const update = (field) => (e) => setPayment({ ...payment, [field]: e.target.value })

  return (
    <div style={{ backgroundColor:'#FFFDF9', border:'1px solid #E5E6EB', borderRadius:'20px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'flex', borderBottom:'1px solid #E5E6EB' }}>
        {['card', 'paypal', 'inperson'].map((method) => (
          <button
            key={method}
            onClick={() => setPaymentMethod(method)}
            style={{
              ...inter,
              flex:1,
              padding:'16px 10px',
              background:'none',
              border:'none',
              borderBottom: paymentMethod === method ? '2px solid #FFD900' : '2px solid transparent',
              fontSize: mobile ? '20px' : '24px',
              color:'#040617',
              cursor:'pointer',
              opacity: paymentMethod === method ? 1 : 0.75,
              textTransform:'capitalize'
            }}
          >
            {method === 'inperson' ? 'In Person' : method}
          </button>
        ))}
      </div>

      <div style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'24px' }}>
        <button onClick={onBack} style={{ ...inter, alignSelf:'flex-start', background:'none', border:'none', color:'#040617', fontSize:'20px', cursor:'pointer', padding:0, display:'flex', alignItems:'center', gap:'8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#040617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Go Back
        </button>

        {paymentMethod === 'card' && (
          <>
            <PaymentField 
              label="Credit Card Number" 
              placeholder="1234 5678 9012 3456" 
              value={payment.cardNumber} 
              onChange={update('cardNumber')} 
              error={errors.cardNumber}
              type="cardNumber"
            />
            <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap:'20px' }}>
              <PaymentField 
                label="Date of Expire" 
                placeholder="MM/YY"
                value={payment.expiry} 
                onChange={update('expiry')} 
                error={errors.expiry}
                type="expiry"
              />
              <PaymentField 
                label="CVC / CVV" 
                placeholder="123"
                value={payment.cvc} 
                onChange={update('cvc')} 
                error={errors.cvc}
                type="cvc"
              />
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:'16px', margin:'8px 0' }}>
              <div style={{ height:'1px', background:'#E5E6EB', flex:1 }} />
              <span style={{ ...inter, color:'#6F7181', fontSize:'18px' }}>or</span>
              <div style={{ height:'1px', background:'#E5E6EB', flex:1 }} />
            </div>

            <div>
              <h4 style={{ ...inter, fontSize: mobile ? '26px' : '30px', fontWeight:600, color:'#040617', margin:'0 0 10px' }}>
                Bank Deposit
              </h4>
              <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:'0 0 20px' }}>
                Buxton Restoration Banking Details
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'14px' }}>
                <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:0 }}>
                  <strong>Recipient / Beneficiary Name:</strong> Mico Heritage Enterprise, BNS New Kingston
                </p>
                <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:0 }}>
                  <strong>Account Number:</strong> 10006017
                </p>
                <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:0 }}>
                  <strong>SWIFT/BIC Code:</strong> NOSCJMKN
                </p>
                <p style={{ ...inter, fontSize:'18px', color:'#040617', margin:0 }}>
                  <strong>Bank Transit Number:</strong> 50575
                </p>
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'paypal' && (
          <div style={{ textAlign:'center', padding:'30px 0' }}>
            <p style={{ ...inter, fontSize:'24px', color:'#040617', margin:'0 0 20px' }}>
              Continue with PayPal to complete your donation.
            </p>
            <button style={{ ...inter, background:'#FFD900', border:'none', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', cursor:'pointer' }}>
              Continue with PayPal
            </button>
          </div>
        )}

        {paymentMethod === 'inperson' && (
          <div style={{ padding:'10px 0' }}>
            <h4 style={{ ...inter, fontSize: mobile ? '26px' : '30px', fontWeight:600, color:'#040617', margin:'0 0 10px' }}>
              In Person Donation
            </h4>
            <p style={{ ...inter, fontSize:'20px', lineHeight:'1.5', color:'#636473', margin:'0 0 20px' }}>
              Please contact our team to arrange an in-person donation handoff for {projectTitle}. We will guide you through the next steps.
            </p>
            <button style={{ ...inter, background:'#FFD900', border:'none', color:'#040617', fontSize:'16px', fontWeight:600, padding:'16px 24px', borderRadius:'18px', cursor:'pointer' }}>
              Contact Team
            </button>
          </div>
        )}

        {paymentSuccess && (
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            style={{ 
              backgroundColor:'#F0FDF4', 
              border:'2px solid #5EDA71', 
              borderRadius:'16px', 
              padding:'32px', 
              textAlign:'center',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              gap:'16px'
            }}
          >
            <div style={{ 
              width:'80px', 
              height:'80px', 
              borderRadius:'50%', 
              backgroundColor:'#5EDA71',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 style={{ ...inter, fontSize: mobile ? '28px' : '32px', fontWeight:600, color:'#040617', margin:'0 0 8px' }}>
                Payment Successful!
              </h3>
              <p style={{ ...inter, fontSize:'20px', color:'#636473', margin:0 }}>
                Thank you for your generous donation of <strong style={{ color:'#040617' }}>{donationLabel}</strong> to {projectTitle}.
              </p>
            </div>
            <p style={{ ...inter, fontSize:'16px', color:'#6F7181', margin:0 }}>
              A confirmation email has been sent to your address.
            </p>
          </motion.div>
        )}

        {!paymentSuccess && (
          <div style={{ display:'flex', flexDirection: mobile ? 'column' : 'row', justifyContent:'space-between', alignItems: mobile ? 'stretch' : 'flex-end', gap:'20px', marginTop:'10px' }}>
            <div>
              <p style={{ ...inter, fontSize:'18px', color:'#6F7181', margin:'0 0 8px' }}>
                Your Donation to {projectTitle}:
              </p>
              <p style={{ ...inter, fontSize: mobile ? '28px' : '32px', color:'#040617', margin:0 }}>
                {donationLabel} <span style={{ color:'#2F8A45', fontSize:'18px' }}>+1% to total target</span>
              </p>
            </div>

            <button 
              onClick={onDonate} 
              disabled={isProcessing}
              style={{ 
                ...inter, 
                background: isProcessing ? '#E5E6EB' : '#FFF0A8', 
                border:'none', 
                color:'#040617', 
                fontSize:'16px', 
                fontWeight:600, 
                padding:'16px 24px', 
                borderRadius:'18px', 
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                gap:'8px',
                minWidth:'160px',
                opacity: isProcessing ? 0.7 : 1
              }}
            >
              {isProcessing ? (
                <>
                  <span>Processing</span>
                  <span style={{ display:'flex', gap:'4px' }}>
                    <span className="dot-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#040617', animation:'pulse 1.4s infinite' }} />
                    <span className="dot-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#040617', animation:'pulse 1.4s infinite 0.2s' }} />
                    <span className="dot-pulse" style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#040617', animation:'pulse 1.4s infinite 0.4s' }} />
                  </span>
                </>
              ) : (
                'Donate Now'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DonationForm() {
  const [projectsData, setProjectsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentProject, setCurrentProject] = useState(0)
  
  const [tab, setTab] = useState('monthly')
  const [selected, setSelected] = useState('$50/Month')
  const [custom, setCustom] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    country: '',
    city: '',
    zip: '',
    state: '',
  })

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await client.fetch(queries.projects)
        
        const activeProjects = projects
          .filter(p => p.status === 'active')
          .map(project => {
            const percentage = project.targetAmount > 0
              ? Math.round((project.amountDonated / project.targetAmount) * 100)
              : 0
            
            return {
              id: project._id,
              slug: project.slug,
              title: project.title,
              location: project.location,
              photo: urlFor(project.image).width(1200).url(),
              targetAmount: project.targetAmount,
              amountDonated: project.amountDonated,
              percentage,
              goal: formatCurrency(project.targetAmount),
              raised: formatCurrency(project.amountDonated)
            }
          })
        
        setProjectsData(activeProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + (projectsData?.length || 1)) % (projectsData?.length || 1))
  }

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % (projectsData?.length || 1))
  }

  const validateStep1 = () => {
    if (selected === 'custom') {
      if (!custom || parseFloat(custom) <= 0) {
        setErrors({ amount: 'Please enter a valid donation amount' })
        return false
      }
    }
    setErrors({})
    return true
  }

  const validateStep2 = () => {
    const newErrors = {}
    
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!form.address1.trim()) newErrors.address1 = 'Address is required'
    if (!form.country.trim()) newErrors.country = 'Country is required'
    if (!form.city.trim()) newErrors.city = 'City is required'
    if (!form.zip.trim()) newErrors.zip = 'ZIP/Postal code is required'
    if (!form.state.trim()) newErrors.state = 'State/Province is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    if (paymentMethod !== 'card') return true
    
    const newErrors = {}
    
    const cleanCardNumber = payment.cardNumber.replace(/\s/g, '')
    
    if (!payment.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!/^\d{13,19}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = 'Invalid card number (13-19 digits)'
    }
    
    if (!payment.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required'
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(payment.expiry)) {
      newErrors.expiry = 'Format: MM/YY'
    } else {
      const [month, year] = payment.expiry.split('/')
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      const now = new Date()
      if (expiry < now) {
        newErrors.expiry = 'Card has expired'
      }
    }
    
    if (!payment.cvc.trim()) {
      newErrors.cvc = 'CVC is required'
    } else if (!/^\d{3}$/.test(payment.cvc)) {
      newErrors.cvc = 'Invalid CVC (3 digits)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submitDonation = async () => {
    try {
      setIsProcessing(true)
      setErrors({})
      
      const amount = selected === 'custom' 
        ? parseFloat(custom) 
        : parseFloat(selected.replace(/[^0-9.]/g, ''))
      
      
      const donationPayload = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        address1: form.address1,
        address2: form.address2,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        amount: amount,
        donationType: tab,
        projectId: projectsData[currentProject].id,
        projectTitle: projectsData[currentProject].title,
        paymentMethod: paymentMethod
      }
      
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donationPayload)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process donation')
      }
      
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentSuccess(true)
      }, 1500)
      

    } catch (error) {
      console.error('Donation error:', error)
      setErrors({ submit: error.message })
      setIsProcessing(false)
    }
  }

  const handleStep1Next = (e) => {
    e.preventDefault()
    if (validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handleStep2Next = () => {
    if (validateStep2()) {
      setCurrentStep(3)
    }
  }

  const donationLabel = selected === 'custom' ? (`$${custom}` || '$50') : selected
  const selectedProject = projectsData && projectsData[currentProject]

  if (loading) {
    return (
      <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>Loading donation form...</p>
      </section>
    )
  }

  if (!projectsData || projectsData.length === 0) {
    return (
      <section style={{ backgroundColor:'#FFFDF9', padding:'80px 0', minHeight:'600px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <p style={{ ...inter, color:'#040617', fontSize:'24px' }}>No active projects available for donation at this time.</p>
      </section>
    )
  }

  return (
    <section style={{ backgroundColor:'#FFFDF9', position:'relative', overflow:'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .don-desktop { display: block; padding: 80px 165px; }
        .don-mobile  { display: none; }
        .don-grid    { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; max-width: 1590px; margin: 0 auto; }

        .amt-btn {
          cursor: pointer;
          border: 1px solid #E5E6EB;
          background: #FFFDF9;
          border-radius: 20px;
          padding: 10px 32px;
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          line-height: 38px;
          letter-spacing: 0.24px;
          color: #040617;
          text-align: center;
          transition: all 0.2s;
          width: 100%;
        }
        .amt-btn:hover { border-color: #FFD900; }
        .amt-btn.active { background: #FFD900; border-color: #FFD900; }

        .tab-btn {
          flex: 1;
          padding: 16px 10px;
          background: none;
          border: none;
          font-family: 'Inter', sans-serif;
          font-size: 24px;
          line-height: 38px;
          letter-spacing: 0.24px;
          color: #040617;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 2px solid transparent;
          opacity: 0.8;
        }
        .tab-btn.active { border-bottom: 2px solid #FFD900; opacity: 1; }

        .m-amt-btn {
          cursor: pointer;
          border: 1px solid #E5E6EB;
          background: #FFFDF9;
          border-radius: 12px;
          padding: 10px 32px;
          font-family: 'Inter', sans-serif;
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 0.2px;
          color: #040617;
          text-align: center;
          transition: all 0.2s;
        }
        .m-amt-btn:hover { border-color: #FFD900; }
        .m-amt-btn.active { background: #FFD900; border-color: #FFD900; border: none; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }

        @media (max-width: 768px) {
          .don-desktop { display: none !important; }
          .don-mobile  { display: flex !important; }
        }

        @media (max-width: 1024px) {
          .don-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="don-desktop">
        <motion.h2
          initial={{ opacity:0, y:20 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true }}
          transition={{ duration:0.6 }}
          style={{ ...inter, fontSize:'75px', fontWeight:600, color:'#040617', letterSpacing:'-0.75px', lineHeight:'85px', textAlign:'center', margin:'0 0 42px' }}
        >
          Donation Form
        </motion.h2>

        <StepIndicator currentStep={currentStep} />

        <div className="don-grid">
          <ProjectCard 
            projects={projectsData} 
            currentProject={currentProject} 
            onPrev={prevProject} 
            onNext={nextProject} 
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity:0, y:20 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-20 }}
              transition={{ duration:0.3 }}
            >
              {currentStep === 1 && (
                <AmountStep
                  tab={tab}
                  setTab={setTab}
                  selected={selected}
                  setSelected={setSelected}
                  custom={custom}
                  setCustom={setCustom}
                  onNext={handleStep1Next}
                  error={errors.amount}
                />
              )}

              {currentStep === 2 && (
                <PersonalInfoStep
                  form={form}
                  setForm={setForm}
                  errors={errors}
                  onBack={() => { setCurrentStep(1); setErrors({}) }}
                  onNext={handleStep2Next}
                />
              )}

              {currentStep === 3 && (
                <DonateMethodStep
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                  payment={payment}
                  setPayment={setPayment}
                  errors={errors}
                  donationLabel={donationLabel}
                  projectTitle={selectedProject?.title || 'this project'}
                  onBack={() => { setCurrentStep(2); setErrors({}) }}
                  onDonate={() => {
                    if (validateStep3()) {
                      submitDonation()
                    }
                  }}
                  isProcessing={isProcessing}
                  paymentSuccess={paymentSuccess}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="don-mobile" style={{ flexDirection:'column', gap:'24px', padding:'48px 24px', position:'relative', zIndex:1 }}>
        <h2 style={{ ...inter, fontSize:'71px', fontWeight:600, color:'#040617', letterSpacing:'-0.71px', lineHeight:'74px', textAlign:'center', margin:0, width:'100%' }}>
          Donation Form
        </h2>

        <StepIndicator currentStep={currentStep} mobile />

        <ProjectCard 
          projects={projectsData} 
          currentProject={currentProject} 
          onPrev={prevProject} 
          onNext={nextProject} 
          mobile 
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-step-${currentStep}`}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-20 }}
            transition={{ duration:0.3 }}
            style={{ width:'100%' }}
          >
            {currentStep === 1 && (
              <AmountStep
                tab={tab}
                setTab={setTab}
                selected={selected}
                setSelected={setSelected}
                custom={custom}
                setCustom={setCustom}
                mobile
                onNext={handleStep1Next}
                error={errors.amount}
              />
            )}

            {currentStep === 2 && (
              <PersonalInfoStep
                form={form}
                setForm={setForm}
                errors={errors}
                mobile
                onBack={() => { setCurrentStep(1); setErrors({}) }}
                onNext={handleStep2Next}
              />
            )}

            {currentStep === 3 && (
              <DonateMethodStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                payment={payment}
                setPayment={setPayment}
                errors={errors}
                donationLabel={donationLabel}
                projectTitle={selectedProject?.title || 'this project'}
                mobile
                onBack={() => { setCurrentStep(2); setErrors({}) }}
                onDonate={() => {
                  if (validateStep3()) {
                    submitDonation()
                  }
                }}
                isProcessing={isProcessing}
                paymentSuccess={paymentSuccess}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}