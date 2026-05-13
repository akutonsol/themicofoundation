'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const imgDownloadIcon = "https://www.figma.com/api/mcp/asset/3e852b82-db7d-48aa-acb3-b3109f776137"
const imgStarDark     = "https://www.figma.com/api/mcp/asset/ce7e8d80-b8db-4025-b0ff-e38e393dbe5f"
const imgStarLight    = "https://www.figma.com/api/mcp/asset/aee947df-633c-4e94-9fbf-e6c8efbcc2cf"
const imgSparkle      = "https://www.figma.com/api/mcp/asset/ee37f94a-bcf6-4c6b-a3a0-b5be363d5b70"

const inter = { fontFamily: "'Inter', sans-serif" }

const categories = [
  {
    id: 'student-loan',
    bg: '#040617',
    textColor: '#E5E6EB',
    bannerBg: '#6F7181',
    bannerText: '#5EDA71',
    cornerBg: '#4a4c5d',
    topLabel: 'STUDENT',
    bottomLabel: 'LOAN',
    topSize: '65px',
    bottomSize: '75px',
    star: imgStarDark,
    date: '04 July 2025 12:13',
    title: 'Student Loan Documents',
    desc: 'Download student loan application forms and related documents.',
    files: [
      { title: 'Student Loan Application Form', date: '04 July 2025', fileUrl: '#' },
      { title: 'Student Loan Requirement Checklist', date: '04 July 2025', fileUrl: '#' },
      { title: 'Student Loan Guarantor Form', date: '04 July 2025', fileUrl: '#' },
      { title: 'Student Loan Renewal Form', date: '04 July 2025', fileUrl: '#' },
      { title: 'Student Loan Payment Agreement', date: '04 July 2025', fileUrl: '#' },
    ],
  },
  {
    id: 'annual-report',
    bg: '#FFF7CC',
    textColor: '#332B00',
    bannerBg: '#FFD900',
    bannerText: '#040617',
    cornerBg: '#CCAD00',
    topLabel: 'ANNUAL',
    bottomLabel: 'REPORT',
    topSize: '75px',
    bottomSize: '84px',
    star: imgStarLight,
    date: '08 July 2025 12:21',
    title: 'Annual Reports',
    desc: 'Download annual reports and official Foundation publications.',
    files: [
      { title: 'The 31st Annual General Report 2025', date: '08 July 2025', fileUrl: '#' },
      { title: 'The 31st Annual General Report 2024', date: '31 May 2024', fileUrl: '#' },
      { title: 'The 30th Annual General Report 2023', date: '31 May 2023', fileUrl: '#' },
      { title: 'The 29th Annual General Report 2022', date: '31 May 2022', fileUrl: '#' },
      { title: 'The 28th Annual General Report 2021', date: '31 May 2021', fileUrl: '#' },
    ],
  },
  {
    id: 'financial-statement',
    bg: '#D6F5DA',
    textColor: '#0A290E',
    bannerBg: '#5EDA71',
    bannerText: '#040617',
    cornerBg: '#26A639',
    topLabel: 'FINANCIAL',
    bottomLabel: 'STATEMENT',
    topSize: '58px',
    bottomSize: '57px',
    star: imgStarLight,
    date: '16 June 2025 12:21',
    title: 'Financial Statements',
    desc: 'Download financial statements, audits, and finance-related reports.',
    files: [
      { title: 'Financial Statement 2025', date: '16 June 2025', fileUrl: '#' },
      { title: 'Financial Statement 2024', date: '16 June 2024', fileUrl: '#' },
      { title: 'Financial Statement 2023', date: '16 June 2023', fileUrl: '#' },
      { title: 'Financial Statement 2022', date: '16 June 2022', fileUrl: '#' },
      { title: 'Financial Statement 2021', date: '16 June 2021', fileUrl: '#' },
    ],
  },
]

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

      <div style={{ position: 'absolute', top: '70px', left: 0, width: '294px', backgroundColor: pub.bannerBg, display: 'flex', alignItems: 'center', gap: '16px', padding: '0 16px', height: '90px', boxShadow: '0px 27px 27px rgba(0,0,0,0.13), 0px 7px 15px rgba(0,0,0,0.15)' }}>
        <img src={pub.star} alt="" style={{ width: '45px', height: '45px', flexShrink: 0 }} />
        <span style={{ ...inter, fontSize: '75px', fontWeight: 800, color: pub.bannerText, letterSpacing: '-0.75px', lineHeight: '90px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
          TMF
        </span>
      </div>
    </div>
  )
}

function DownloadRow({ file }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      borderTop: '1px solid #E5E6EB',
      paddingTop: '18px',
    }}>
      <div>
        <p style={{ ...inter, fontSize: '18px', fontWeight: 600, color: '#040617', margin: 0 }}>
          {file.title}
        </p>
        <p style={{ ...inter, fontSize: '15px', color: '#6F7181', margin: '4px 0 0' }}>
          {file.date}
        </p>
      </div>

      <a
        href={file.fileUrl}
        download
        style={{
          ...inter,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#FFD900',
          color: '#040617',
          fontSize: '13px',
          fontWeight: 600,
          height: '38px',
          padding: '0 16px',
          borderRadius: '10px',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        Download
       <img
  src={imgDownloadIcon}
  alt=""
  style={{
    width: '16px',
    height: '16px',
    objectFit: 'contain',
  }}
/>
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      style={{
        backgroundColor: '#FFFDF9',
        border: '1px solid #E5E6EB',
        borderRadius: '26px',
        padding: '24px',
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img src={imgSparkle} alt="" style={{ position: 'absolute', right: '-100px', top: '-116px', width: '523px', pointerEvents: 'none', opacity: 0.25, zIndex: 0 }} />

      <PubThumb pub={pub} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '28px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ ...inter, fontSize: '20px', color: '#6F7181', letterSpacing: '0.2px', lineHeight: '30px', margin: 0 }}>
                {pub.date}
              </p>

              <p style={{ ...inter, fontSize: '26px', fontWeight: 600, color: '#040617', letterSpacing: '-0.26px', lineHeight: '36px', margin: 0, textTransform: 'capitalize' }}>
                {pub.title}
              </p>
            </div>

            <div style={{ borderLeft: '1px solid #E5E6EB', paddingLeft: '16px' }}>
              <p style={{ ...inter, fontSize: '20px', color: '#6F7181', letterSpacing: '0.2px', lineHeight: '30px', margin: 0 }}>
                {pub.desc}
              </p>
            </div>
          </div>

         <button
  type="button"
  onClick={() => setOpen(!open)}
  style={{
    ...inter,
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    border: '1px solid #E5E6EB',
    backgroundColor: open ? '#040617' : '#FFD900',
    color: open ? '#FFFFFF' : '#040617',
    fontSize: '22px',
    lineHeight: '1',
    fontWeight: 500,
    cursor: 'pointer',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  }}
>
  {open ? '−' : '+'}
</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <AnimatePresence initial={false}>
            {visibleFiles.map((file) => (
              <motion.div
                key={file.title}
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <DownloadRow file={file} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {pub.files.length > 3 && (
          <p style={{ ...inter, fontSize: '15px', color: '#6F7181', margin: 0 }}>
            {open ? 'Showing all files' : `Showing 3 of ${pub.files.length} files`}
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default function DownloadableForms() {
  return (
    <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

        .pub-card { transition: all 0.2s ease; }
        .pub-card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.06); transform: translateY(-2px); }

        .pub-desktop { display: block; padding: 80px 165px; }

        @media (max-width: 900px) {
          .pub-desktop { padding: 48px 24px; }

          .pub-card {
            flex-direction: column !important;
          }

          .pub-card > div:first-of-type {
            width: 100% !important;
          }
        }
      `}</style>

      <div className="pub-desktop">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {categories.map((pub, i) => (
            <CategoryCard key={pub.id} pub={pub} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}