'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const imgPartnerPhoto =
  'https://www.figma.com/api/mcp/asset/bb48f1b3-fa44-450b-98e6-19d65cda0999'

const imgArrowPrev =
  'https://www.figma.com/api/mcp/asset/353f5fdd-41c7-4d19-ac43-81bc61862462'

const imgArrowNext =
  'https://www.figma.com/api/mcp/asset/9ea114fa-dc39-42ad-95ba-92beed07b471'

const inter = { fontFamily: "'Inter', sans-serif" }

const partners = [
  {
    id: 0,
    name: 'Cari-Med',
    donation: '5 million USD towards Buxton College restoration project.',
    photo: imgPartnerPhoto,
  },
  {
    id: 1,
    name: 'GraceKennedy',
    donation: '2 million USD towards the Smart Classroom initiative at Mico.',
    photo: imgPartnerPhoto,
  },
  {
    id: 2,
    name: 'Scotiabank Jamaica',
    donation: '3.5 million USD supporting student scholarships and bursaries.',
    photo: imgPartnerPhoto,
  },
  {
    id: 3,
    name: 'Digicel Foundation',
    donation: '1.2 million USD for digital infrastructure across campuses.',
    photo: imgPartnerPhoto,
  },
]

export default function PartnerSupportSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => goTo((current - 1 + partners.length) % partners.length)
  const next = () => goTo((current + 1) % partners.length)

  const p = partners[current]

  return (
    <section
      style={{
        backgroundColor: '#2C2A1A',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '860px',
      }}
    >
      <style>{`
        .partner-inner {
          display: grid;
          grid-template-columns: 881px 1fr;
          align-items: stretch;
          height: 860px;
        }

        @media (max-width: 1024px) {
          .partner-inner {
            grid-template-columns: 1fr;
            height: auto;
          }

          .partner-photo-col {
            height: 400px !important;
          }
        }

        @media (max-width: 768px) {
          .partner-photo-col {
            height: 300px !important;
          }

          .partner-text-col {
            padding: 40px 24px !important;
          }
        }
      `}</style>

      <div
        className="partner-inner"
        style={{
          maxWidth: '1920px',
          margin: '0 auto',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`photo-${current}`}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="partner-photo-col"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={p.photo}
              alt={p.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(0,0,0,0) 70%, rgba(44,42,26,0.8) 100%)',
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div
          className="partner-text-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '80px 80px 80px 60px',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              ...inter,
              fontSize: '75px',
              fontWeight: 600,
              color: '#FFFFFF',
              letterSpacing: '-0.75px',
              lineHeight: '85px',
              margin: 0,
            }}
          >
            Partners Support
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderLeft: '1px solid #E5E6EB',
                paddingLeft: '16px',
              }}
            >
              <p
                style={{
                  ...inter,
                  fontSize: '32px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '-0.32px',
                  lineHeight: '46px',
                  margin: 0,
                  textTransform: 'capitalize',
                }}
              >
                {p.name}
              </p>

              <p
                style={{
                  ...inter,
                  fontSize: '24px',
                  color: '#FFFFFF',
                  letterSpacing: '0.24px',
                  lineHeight: '38px',
                  margin: 0,
                }}
              >
                {p.donation}
              </p>
            </motion.div>
          </AnimatePresence>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
            }}
          >
            <button
              type="button"
              onClick={prev}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.6,
              }}
            >
              <span
                style={{
                  ...inter,
                  fontSize: '20px',
                  color: '#FFFFFF',
                  letterSpacing: '0.2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Last Partner
              </span>

              <div
                style={{
                  width: '44px',
                  height: '44px',
                  border: '2px solid #E5E6EB',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={imgArrowPrev}
                  alt=""
                  style={{
                    width: '24px',
                    height: '24px',
                    transform: 'rotate(180deg)',
                    filter: 'invert(1)',
                  }}
                />
              </div>
            </button>

            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              {partners.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  style={{
                    width: '52px',
                    height: '12px',
                    borderRadius: '90px',
                    backgroundColor: i === current ? '#FFD900' : '#D9D9D9',
                    opacity: i === current ? 1 : 0.4,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s',
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#E5E6EB',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src={imgArrowNext}
                  alt=""
                  style={{
                    width: '24px',
                    height: '24px',
                  }}
                />
              </div>

              <span
                style={{
                  ...inter,
                  fontSize: '20px',
                  color: '#FFFFFF',
                  letterSpacing: '0.2px',
                  whiteSpace: 'nowrap',
                }}
              >
                Next Partner
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}