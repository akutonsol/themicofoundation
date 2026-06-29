'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, queries } from '@/sanity/lib/sanity'

const FALLBACK_LOGO = '/images/mico-190-years.png'
const inter = { fontFamily: "'Inter', sans-serif" }

const DEFAULT = {
  pageEyebrow: '190 Years · 1836–2026',
  pageHeading: '190 Years of Excellence',
  pageBody:
    'For 190 years, The Mico University College has stood as a beacon of educational excellence, leadership, and nation-building across Jamaica and the wider Caribbean.\n\nAs we celebrate this remarkable milestone, we honour the generations of educators, students, alumni, and partners whose dedication has shaped our enduring legacy — and we look ahead with renewed commitment to the future of education.',
}

export default function AnniversaryPage() {
  const [data, setData] = useState(null)
  const [imgOk, setImgOk] = useState(true)

  useEffect(() => {
    async function load() {
      try { const d = await client.fetch(queries.anniversaryPopup); if (d) setData(d) } catch (_) {}
    }
    load()
  }, [])

  const logo    = data?.logoUrl || FALLBACK_LOGO
  const eyebrow = data?.pageEyebrow || DEFAULT.pageEyebrow
  const heading = data?.pageHeading || DEFAULT.pageHeading
  const body    = (data?.pageBody || DEFAULT.pageBody).split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
  const image   = data?.pageImageUrl

  return (
    <main style={{ background: '#000000', color: '#fff', minHeight: '70vh' }}>
      <style>{`
        .anniv-wrap { max-width: 1100px; margin: 0 auto; padding: clamp(56px,8vw,110px) clamp(24px,6vw,64px); }
        .anniv-body p { font-family: 'Inter', sans-serif; font-size: clamp(17px,1.5vw,20px); line-height: 1.85; color: rgba(255,255,255,0.78); margin: 0 0 26px; }
      `}</style>

      <div className="anniv-wrap">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}
        >
          {imgOk ? (
            <img src={logo} alt="The Mico University College — 190 Years"
              onError={() => setImgOk(false)}
              style={{ width: 'clamp(220px,40vw,340px)', height: 'auto', objectFit: 'contain', margin: '0 auto 28px', display: 'block' }} />
          ) : (
            <div style={{ margin: '0 auto 28px', width: 'fit-content' }}>
              <p style={{ ...inter, fontSize: '90px', fontWeight: 800, color: '#FFD900', lineHeight: 1, margin: 0 }}>190</p>
              <p style={{ ...inter, fontSize: '22px', fontWeight: 700, color: '#FFD900', letterSpacing: '0.2em', margin: '4px 0 0' }}>YEARS</p>
            </div>
          )}
          <p style={{ ...inter, fontSize: '13px', fontWeight: 700, color: '#F5B700', letterSpacing: '0.24em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            {eyebrow}
          </p>
          <h1 style={{ ...inter, fontSize: 'clamp(38px,6vw,72px)', fontWeight: 800, color: '#fff', letterSpacing: '-1.5px', lineHeight: 1.05, margin: 0 }}>
            {heading}
          </h1>
        </motion.div>

        {/* Optional image */}
        {image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: 'clamp(40px,6vw,56px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <img src={image} alt={heading} style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
          </motion.div>
        )}

        {/* Body */}
        <motion.div
          className="anniv-body"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 'clamp(36px,5vw,52px)' }}
        >
          {body.map((para, i) => <p key={i}>{para}</p>)}
        </motion.div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '40px' }}>
          <a href="/donate" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFD900', color: '#040617', fontSize: '15px', fontWeight: 700, padding: '15px 32px', borderRadius: '12px', textDecoration: 'none' }}>
            Support The Mico
          </a>
          <a href="/" style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 600, padding: '15px 26px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.18)', textDecoration: 'none' }}>
            Back to Home
          </a>
        </div>
      </div>
    </main>
  )
}
