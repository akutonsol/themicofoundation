'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown } from 'lucide-react'
import { client, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" }

const imgDownloadIcon = "/images/home-static/dwn-icon.svg"
const imgArrow        = "/images/home-static/button-icon.png"
const imgStarDark     = "/images/home-static/gspot.png"
const imgStarLight    = "/images/home-static/bspot.svg"
const imgSparkle      = "/images/home-static/sparkle-pub.png"

// Theme map — keeps CMS simple (user picks a theme name)
const THEMES = {
  dark:   { bg: '#040617', textColor: '#E5E6EB', bannerBg: '#6F7181', bannerText: '#5EDA71', cornerBg: '#4a4c5d', star: imgStarDark },
  yellow: { bg: '#FFF7CC', textColor: '#332B00', bannerBg: '#FFD900', bannerText: '#040617', cornerBg: '#CCAD00', star: imgStarLight },
  green:  { bg: '#D6F5DA', textColor: '#0A290E', bannerBg: '#5EDA71', bannerText: '#040617', cornerBg: '#26A639', star: imgStarLight },
  grey:   { bg: '#6F7181', textColor: '#E5E6EB', bannerBg: '#040617', bannerText: '#FFD900', cornerBg: '#4a4c5d', star: imgStarDark },
}

const staticCategories = [
  { id: 'student-loan', theme: 'dark', topLabel: 'STUDENT', bottomLabel: 'LOAN', date: '04 July 2025 12:13', title: 'Student Loan Documents', desc: 'Download student loan application forms and related documents.', files: [{ title: 'Student Loan Application Form', date: '04 July 2025', fileUrl: '#' }, { title: 'Student Loan Requirement Checklist', date: '04 July 2025', fileUrl: '#' }, { title: 'Student Loan Guarantor Form', date: '04 July 2025', fileUrl: '#' }] },
  { id: 'annual-report', theme: 'yellow', topLabel: 'ANNUAL', bottomLabel: 'REPORT', date: '08 July 2025 12:21', title: 'Annual Reports', desc: 'Download annual reports and official Foundation publications.', files: [{ title: 'The 31st Annual General Report 2025', date: '08 July 2025', fileUrl: '#' }, { title: 'The 31st Annual General Report 2024', date: '31 May 2024', fileUrl: '#' }] },
  { id: 'financial-statement', theme: 'green', topLabel: 'FINANCIAL', bottomLabel: 'STATEMENT', date: '16 June 2025 12:21', title: 'Financial Statements', desc: 'Download financial statements, audits, and finance-related reports.', files: [{ title: 'Financial Statement 2025', date: '16 June 2025', fileUrl: '#' }] },
]


function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric'
    })
  } catch { return dateStr }
}

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ ...inter, fontSize: '16px', color: '#414651' }}>{label}</label>
      {children}
    </div>
  )
}

function PubThumb({ pub, width = '355px', height = '230px' }) {
  const theme = THEMES[pub.theme] || THEMES.yellow
  return (
    <div style={{ width, height, borderRadius: '8px', overflow: 'hidden', backgroundColor: theme.bg, position: 'relative', flexShrink: 0 }}>
      <p style={{ ...inter, position: 'absolute', top: '-7px', left: '50%', transform: 'translateX(-50%)', fontSize: '65px', fontWeight: 800, color: theme.textColor, opacity: 0.23, letterSpacing: '-0.02em', lineHeight: '90px', textAlign: 'center', width: '350px', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
        {pub.topLabel}
      </p>
      <p style={{ ...inter, position: 'absolute', bottom: '74px', left: '50%', transform: 'translate(-50%, 100%)', fontSize: '65px', fontWeight: 800, color: theme.textColor, opacity: 0.23, letterSpacing: '-0.02em', lineHeight: '90px', textAlign: 'center', textTransform: 'uppercase', margin: 0, whiteSpace: 'nowrap' }}>
        {pub.bottomLabel}
      </p>
      <div style={{ position: 'absolute', left: '-19px', top: '140px', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '27px', height: '27px', backgroundColor: theme.cornerBg, transform: 'rotate(-45deg)' }} />
      </div>
      <div style={{ position: 'absolute', top: '70px', left: 0, width: '294px', backgroundColor: theme.bannerBg, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', height: '90px', boxShadow: '0px 27px 27px 0px rgba(0,0,0,0.13),0px 7px 15px 0px rgba(0,0,0,0.15)' }}>
        <img src={theme.star} alt="" style={{ width: '45px', height: '45px', flexShrink: 0 }} />
        <span style={{ ...inter, fontSize: '75px', fontWeight: 800, color: theme.bannerText, letterSpacing: '-0.75px', lineHeight: '90px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>TMF</span>
      </div>
    </div>
  )
}

function DownloadRow({ file }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', borderTop: '1px solid #E5E6EB', paddingTop: '18px' }}>
      <div>
        <p style={{ ...inter, fontSize: '18px', fontWeight: 600, color: '#040617', margin: 0 }}>{file.title}</p>
        <p style={{ ...inter, fontSize: '15px', color: '#6F7181', margin: '4px 0 0' }}>{file.date}</p>
      </div>
      <a
        href={file.fileUrl}
        download
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFD900', color: '#040617', fontSize: '13px', fontWeight: 600, height: '38px', padding: '0 16px', borderRadius: '10px', textDecoration: 'none', flexShrink: 0 }}
      >
        Download
        <img src={imgDownloadIcon} alt="" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
      </a>
    </div>
  )
}

function CategoryCard({ pub, index }) {
  const [open, setOpen] = useState(false)
  const visibleFiles = open ? pub.files : pub.files.slice(0, 3)

  return (
    <motion.div
      className="pub-card"
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{ backgroundColor: '#FFFDF9', border: '1px solid #E5E6EB', borderRadius: '26px', padding: '24px', display: 'flex', gap: '30px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
    >
      <img src={imgSparkle} alt="" style={{ position: 'absolute', right: '-100px', top: '-116px', width: '523px', pointerEvents: 'none', opacity: 0.25, zIndex: 0 }} />
      <PubThumb pub={pub} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ ...inter, fontSize: '20px', color: '#6F7181', letterSpacing: '0.2px', lineHeight: '30px', margin: 0 }}>{pub.date}</p>
              <p style={{ ...inter, fontSize: '26px', fontWeight: 600, color: '#040617', letterSpacing: '-0.26px', lineHeight: '36px', margin: 0, textTransform: 'capitalize' }}>{pub.title}</p>
            </div>
            <div style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '16px' }}>
              <p style={{ ...inter, fontSize: '20px', color: '#6F7181', letterSpacing: '0.2px', lineHeight: '30px', margin: 0 }}>{pub.desc}</p>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(!open)}
            style={{ ...inter, width: '46px', height: '46px', borderRadius: '14px', border: 'none', backgroundColor: open ? '#040617' : '#FFD900', color: open ? '#FFFFFF' : '#040617', fontSize: '24px', lineHeight: 1, fontWeight: 500, cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            {open ? '−' : '+'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence initial={false}>
            {visibleFiles.map((file, i) => (
  <motion.div key={`${file.title}-${i}`}  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} style={{ overflow: 'hidden' }}>
                <DownloadRow file={file} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {pub.files.length > 3 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ ...inter, fontSize: '15px', color: '#6F7181', margin: 0 }}>
              {open ? `Showing all ${pub.files.length} files` : `Showing 3 of ${pub.files.length} files`}
            </p>
            <button type="button" onClick={() => setOpen(!open)}
              style={{ ...inter, display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: '#FFF7CC', color: '#040617', fontSize: '14px', fontWeight: 400, height: '38px', padding: '0 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {open ? 'Show Less' : 'Show All'}
              <img src={imgArrow} alt="" style={{ width: '20px', height: '20px' }} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ResourceCenter() {
  const [categories, setCategories] = useState(staticCategories)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sort, setSort] = useState('newest')
  const [typeOpen, setTypeOpen] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(queries.resourceCategories)
        if (data?.length > 0) {
          setCategories(data.map(cat => ({
            id: cat._id,
            theme: cat.theme || 'yellow',
            topLabel: cat.topLabel,
            bottomLabel: cat.bottomLabel,
            date: cat.date || '',
            title: cat.title,
            desc: cat.description,
            files: (cat.files || []).map(f => ({
              title: f.title,
              date: f.date || '',
              fileUrl: f.file?.asset?.url || '#',
            }))
          })))
        }
      } catch (error) {
        console.error('Error fetching resource categories:', error)
      }
    }
    fetchCategories()
  }, [])

  // Filter + sort
  const filtered = categories
    .filter(cat => {
      const matchSearch = search === '' ||
        cat.title.toLowerCase().includes(search.toLowerCase()) ||
        cat.files.some(f => f.title.toLowerCase().includes(search.toLowerCase()))
      const matchType = typeFilter === 'all' || cat.id === typeFilter || cat.title.toLowerCase().includes(typeFilter.toLowerCase())
      return matchSearch && matchType
    })

  const categoryTypes = [{ label: 'All Types', value: 'all' }, ...categories.map(c => ({ label: c.title, value: c.id }))]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');
        .pub-card { transition: all 0.2s ease; }
        .pub-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .rc-padding { padding: 80px 165px; }
        .resource-top-grid { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 80px; align-items: start; }
        .resource-filter-grid { display: grid; grid-template-columns: 1.05fr 1.05fr 1.05fr 240px; gap: 16px; align-items: end; }
        .rc-dropdown { position: relative; }
        .rc-dropdown-menu { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #FFFDF9; border: 1px solid #E5E6EB; border-radius: 8px; z-index: 50; box-shadow: 0 4px 16px rgba(0,0,0,0.08); overflow: hidden; }
        .rc-dropdown-item { padding: 10px 14px; font-family: 'Inter', sans-serif; font-size: 15px; color: #040617; cursor: pointer; transition: background 0.15s; }
        .rc-dropdown-item:hover { background: #FFF7CC; }
        @media (max-width: 1024px) {
          .resource-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .resource-filter-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .rc-padding { padding: 48px 24px !important; }
          .pub-card { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ backgroundColor: '#FAF9F6', width: '100%' }} className="rc-padding">
        <div style={{ maxWidth: '1650px', margin: '0 auto' }}>
          <div className="resource-top-grid">
            <motion.h1
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}
              style={{ ...inter, fontSize: '104px', fontWeight: 600, lineHeight: '0.95', letterSpacing: '-0.075em', color: '#040617', margin: 0 }}
            >
              Resource Center
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
              style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '32px', marginTop: '8px' }}
            >
              <p style={{ ...inter, maxWidth: '660px', fontSize: '28px', lineHeight: '1.45', letterSpacing: '-0.03em', color: '#7A7D8B', margin: 0 }}>
                We make all of The Mico Foundation evaluation and research reports available for public access in accordance with our Accountability Policy. These are available at our Evaluation Library.
              </p>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.12 }} style={{ marginTop: '34px' }}>
            <h2 style={{ ...inter, fontSize: '32px', fontWeight: 600, color: '#040617', margin: '0 0 22px', letterSpacing: '-0.04em' }}>Search Filter</h2>
            <div className="resource-filter-grid">
              <Field label="Report Name (Optional)">
                <div style={{ height: '48px', border: '1px solid #E5E6EB', borderRadius: '8px', backgroundColor: '#FFFDF9', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '10px' }}>
                  <Search size={22} color="#7A7D8B" />
                  <input
                    placeholder="Start typing..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ ...inter, width: '100%', border: 'none', outline: 'none', background: 'transparent', fontSize: '16px', color: '#040617' }}
                  />
                </div>
              </Field>

              <Field label="Report Type">
                <div className="rc-dropdown">
                  <div
                    onClick={() => { setTypeOpen(!typeOpen); setSortOpen(false) }}
                    style={{ height: '48px', border: '1px solid #E5E6EB', borderRadius: '8px', backgroundColor: '#FFFDF9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', cursor: 'pointer' }}
                  >
                    <span style={{ ...inter, fontSize: '16px', color: typeFilter === 'all' ? '#7A7D8B' : '#040617' }}>
                      {typeFilter === 'all' ? 'All Types' : categories.find(c => c.id === typeFilter)?.title || 'All Types'}
                    </span>
                    <ChevronDown size={20} color="#7A7D8B" />
                  </div>
                  {typeOpen && (
                    <div className="rc-dropdown-menu">
                      {categoryTypes.map(t => (
                        <div key={t.value} className="rc-dropdown-item" onClick={() => { setTypeFilter(t.value); setTypeOpen(false) }}>{t.label}</div>
                      ))}
                    </div>
                  )}
                </div>
              </Field>

              <Field label="Sort Reports By">
                <div className="rc-dropdown">
                  <div
                    onClick={() => { setSortOpen(!sortOpen); setTypeOpen(false) }}
                    style={{ height: '48px', border: '1px solid #E5E6EB', borderRadius: '8px', backgroundColor: '#FFFDF9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', cursor: 'pointer' }}
                  >
                    <span style={{ ...inter, fontSize: '16px', color: '#040617' }}>
                      {sort === 'newest' ? 'Newest to Oldest' : 'Oldest to Newest'}
                    </span>
                    <ChevronDown size={20} color="#7A7D8B" />
                  </div>
                  {sortOpen && (
                    <div className="rc-dropdown-menu">
                      <div className="rc-dropdown-item" onClick={() => { setSort('newest'); setSortOpen(false) }}>Newest to Oldest</div>
                      <div className="rc-dropdown-item" onClick={() => { setSort('oldest'); setSortOpen(false) }}>Oldest to Newest</div>
                    </div>
                  )}
                </div>
              </Field>

              <button type="button" onClick={() => { setTypeOpen(false); setSortOpen(false) }}
                style={{ ...inter, height: '48px', border: 'none', borderRadius: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                <Search size={24} />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORMS ── */}
      <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }} className="rc-padding">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', maxWidth: '1650px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <p style={{ ...inter, fontSize: '20px', color: '#6F7181', textAlign: 'center', padding: '40px 0' }}>No results found.</p>
          ) : (
            filtered.map((pub, i) => <CategoryCard key={pub.id} pub={pub} index={i} />)
          )}
        </div>
      </section>
    </>
  )
}
