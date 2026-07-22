'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }

const staticTypes = [
  { id: 0, title: 'Student Support', desc: 'Providing financial assistance to deserving students for tuition, housing, meals, and essential living expenses.', icon: '✦' },
  { id: 1, title: 'Campus Development', desc: 'Building, upgrading, and maintaining classrooms, dormitories, smart facilities, and sports complexes.', icon: '⌂' },
  { id: 2, title: 'Faculty & Research', desc: 'Funding academic research, professional training, and development programs for educators and staff.', icon: '⌘' },
  { id: 3, title: 'Community Programs', desc: 'Supporting outreach initiatives, rural education, inclusive learning, and projects that uplift communities through education.', icon: '▢' },
]

const staticIntro = `An endowment is a long-term gift that helps fund scholarships, programs, and campus improvements at The Mico University College.\n\nBy filling out this form, you're pledging your support to invest in education for future generations. Your name, your family, or your business can be remembered as part of this legacy. Your donation will be securely managed by The Mico Foundation and used exactly as you choose.`

const ENDOWMENT_OPTIONS = [
  'General Endowment Grant',
  'Legacy Endowment Grant',
  'Leadership Legacy Endowment Grant',
  'Corporate Endowment Grant',
]

function TypeCard({ type, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-[16px] border-2 border-[#D6C288] bg-[#FFFDF9] p-6">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#D6C288] text-[22px] text-[#040617]">{type.icon}</div>
      <h3 className="text-[26px] font-bold leading-[1.15] tracking-[-0.04em] text-[#040617]" style={inter}>{type.title}</h3>
      <p className="mt-3 text-[16px] leading-[1.5] tracking-[0.01em] text-[#6F7181]" style={inter}>{type.desc}</p>
    </motion.div>
  )
}

export default function EndowmentTypes() {
  const [types, setTypes] = useState(staticTypes)
  const [heading, setHeading] = useState('Support the Future with an Endowment')
  const [intro, setIntro] = useState(staticIntro)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', endowmentType: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.endowment)
        if (data) {
          if (data.typesHeading) setHeading(data.typesHeading)
          if (data.typesIntro) setIntro(data.typesIntro)
          const valid = (data.endowmentTypes || []).filter(t => t?.title?.trim())
          if (valid.length > 0) {
            setTypes(valid.map((t, i) => ({ id: i, title: t.title, desc: t.desc, icon: t.icon || '✦' })))
          }
        }
      } catch (error) {
        console.error('Error fetching endowment types:', error)
      }
    }
    fetchContent()
  }, [])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/endowment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit')
      setSubmitted(true)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  const introLines = intro.split('\n\n')

  return (
    <section id="endowment-form" className="bg-[#FFFDF9] px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1590px]">
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mb-16 max-w-[1100px] text-[40px] font-extrabold leading-[0.98] tracking-[-0.05em] text-[#040617] sm:text-[56px] lg:text-[72px]" style={inter}>
          {heading}
        </motion.h1>

        <div className="grid gap-20 lg:grid-cols-[1fr_480px] lg:items-start">
          <div className="flex flex-col gap-12">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              {introLines.map((line, i) => (
                <p key={i} className={`max-w-[900px] text-[18px] leading-[1.75] tracking-[0.01em] text-[#6F7181] ${i > 0 ? 'mt-4' : ''}`} style={inter}>{line}</p>
              ))}
            </motion.div>

            <div>
              <p className="mb-10 max-w-[980px] text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#040617] sm:text-[30px] lg:text-[36px]" style={inter}>
                Through your generosity, you create a permanent source of support that enables the University College to nurture talent, embrace new opportunities, and respond to emerging needs.
              </p>
              <h3 className="mb-6 text-[22px] font-bold tracking-[-0.03em] text-[#040617]" style={inter}>Your Endowments Funds Go Towards</h3>
              <div className="grid gap-6 sm:grid-cols-2">
                {types.map((type, i) => <TypeCard key={type.id} type={type} index={i} />)}
              </div>
            </div>
          </div>

          {/* Sticky form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}
            className="sticky top-[120px] rounded-[20px] p-8"
            style={{ background: '#FFFDF9', border: '2px solid #040617', boxShadow: 'inset 0 0 0 5px #FFFDF9, inset 0 0 0 6px #f3af19, var(--shadow-3)' }}>
            <span style={{ ...inter, display: 'inline-block', fontSize: 12, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8860B', marginBottom: 12 }}>Get Involved</span>
            <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.03em]" style={{ ...inter, color: '#040617' }}>Endowment Commitment</h2>
            <p className="mt-4 text-[16px] leading-[1.6] tracking-[0.01em]" style={{ ...inter, color: '#6F7181' }}>
              Thank you for your interest in supporting the Mico University College through your endowment. Please complete this form to indicate your interest. Once your submission is received a member of our team will contact you for the next step.
            </p>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '40px 0', textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#f3af19', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="#141210" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h4 className="text-[22px] font-bold" style={{ ...inter, color: '#040617' }}>Commitment Received!</h4>
                <p className="text-[16px]" style={{ ...inter, color: '#6F7181' }}>We'll be in touch shortly to discuss next steps.</p>
              </motion.div>
            ) : (
              <>
                <p className="mt-5 text-[18px] font-bold" style={{ ...inter, color: '#040617' }}>Complete this form to confirm your commitment.</p>
                <div className="mt-7 flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-[16px]" style={{ ...inter, color: '#040617' }}>First Name</label>
                      <input type="text" placeholder="First name" value={form.firstName} onChange={update('firstName')}
                        className="h-[52px] w-full rounded-[8px] border px-4 text-[16px] outline-none placeholder:text-[#9CA3AF] focus:border-[#f3af19] focus:shadow-[0_0_0_3px_rgba(243,175,25,0.15)]"
                        style={{ ...inter, background: '#FFFDF9', color: '#040617', borderColor: errors.firstName ? '#EF4444' : 'rgba(4,6,23,0.18)' }} />
                      {errors.firstName && <span style={{ ...inter, fontSize: 13, color: '#EF4444' }}>{errors.firstName}</span>}
                    </div>
                    <div>
                      <label className="mb-2 block text-[16px]" style={{ ...inter, color: '#040617' }}>Last Name</label>
                      <input type="text" placeholder="Last name" value={form.lastName} onChange={update('lastName')}
                        className="h-[52px] w-full rounded-[8px] border px-4 text-[16px] outline-none placeholder:text-[#9CA3AF] focus:border-[#f3af19] focus:shadow-[0_0_0_3px_rgba(243,175,25,0.15)]"
                        style={{ ...inter, background: '#FFFDF9', color: '#040617', borderColor: 'rgba(4,6,23,0.18)' }} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-[16px]" style={{ ...inter, color: '#040617' }}>Email</label>
                    <input type="email" placeholder="youremail@mail.com" value={form.email} onChange={update('email')}
                      className="h-[52px] w-full rounded-[8px] border px-4 text-[16px] outline-none placeholder:text-[#9CA3AF] focus:border-[#f3af19] focus:shadow-[0_0_0_3px_rgba(243,175,25,0.15)]"
                      style={{ ...inter, background: '#FFFDF9', color: '#040617', borderColor: errors.email ? '#EF4444' : 'rgba(4,6,23,0.18)' }} />
                    {errors.email && <span style={{ ...inter, fontSize: 13, color: '#EF4444' }}>{errors.email}</span>}
                  </div>
                  <div>
                    <label className="mb-2 block text-[16px]" style={{ ...inter, color: '#040617' }}>Endowment Type</label>
                    <select value={form.endowmentType} onChange={update('endowmentType')}
                      className="h-[52px] w-full rounded-[8px] border px-4 text-[16px] outline-none focus:border-[#f3af19] focus:shadow-[0_0_0_3px_rgba(243,175,25,0.15)]"
                      style={{ ...inter, background: '#FFFDF9', color: form.endowmentType ? '#040617' : '#9CA3AF', borderColor: 'rgba(4,6,23,0.18)' }}>
                      <option value="" disabled>Select an endowment type…</option>
                      {ENDOWMENT_OPTIONS.map(opt => <option key={opt} value={opt} style={{ color: '#040617' }}>{opt}</option>)}
                    </select>
                  </div>
                  {errors.submit && <p style={{ ...inter, fontSize: 14, color: '#EF4444' }}>{errors.submit}</p>}
                  <button type="button" onClick={handleSubmit} disabled={loading}
                    className="mt-1 h-[56px] w-full rounded-[14px] text-[16px] font-bold text-[#141210]"
                    style={{ ...inter, background: loading ? 'rgba(255,255,255,0.2)' : 'linear-gradient(180deg, #FFD54A 0%, #f3af19 100%)', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, boxShadow: '0 12px 30px rgba(243,175,25,0.32)' }}>
                    {loading ? 'Submitting...' : 'Donate Now'}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}