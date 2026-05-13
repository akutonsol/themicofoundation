'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// ── Your existing assets ──
const imgArrowPrev = "/images/home-static/prev-icon.png"
const imgArrowNext = "/images/home-static/next-icon.png"
const imgArrowBtn  = "/images/home-static/button-icon.png"
const imgBgPattern =  "/images/home-static/com-sparkle.png"

// ── Mobile assets from Figma 383:36680 ──
const imgMobileArrowPrev = "/images/home/karl.png"
const imgMobileArrowNext = "/images/home/tulloch.png"
const imgMobileSparkle   = "/images/home/burchell.png"

// ── Your existing people data ──
const people = [
  {
    id: 0,
    photo: "/images/home/karl.png",
    role: 'Trustee',
    name: 'Dr. R. Karl James CD.',
    quote: 'The Mico Foundation has been instrumental in preserving the legacy and future of Mico University College. Our commitment to education is unwavering and we continue to serve our community with dedication.',
  },
  {
    id: 1,
    photo:"/images/home/burchell.png",
    role: 'Secretary Manager',
    name: 'Mr. Burchell Duhaney J.P.',
    quote: 'I am indeed happy to lead the management team of The Mico Foundation at this time when The Mico University College is on the verge of changing its status to full university...',
  },
  {
    id: 2,
    photo:"/images/home/tulloch.png",
    role: 'Chairman',
    name: 'Dr. Sylvester Tulloch, CD.',
    quote: 'Our foundation stands as a testament to the enduring legacy of Lady Mico. We are committed to ensuring that every student has access to quality education and opportunities for growth.',
  },
]

const inter = { fontFamily: "'Inter', sans-serif" };

export default function Messages() {
  const [current, setCurrent] = useState(1)
  const [direction, setDirection] = useState(1)

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const prev = () => goTo((current - 1 + people.length) % people.length)
  const next = () => goTo((current + 1) % people.length)
  const getIndex = (offset) => (current + offset + people.length) % people.length

  return (
    <section style={{ backgroundColor: '#FFFDF9', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* ── DESKTOP ── */
        .msg-desktop { display: flex; padding: 80px 165px; }
        .msg-mobile  { display: none; }

        /* ── MOBILE (≤768px) — Figma 383:36680 ── */
        @media (max-width: 768px) {
          .msg-desktop { display: none !important; }
          .msg-mobile  { display: flex !important; }
        }
      `}</style>

      {/* Shared bg pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url('${imgBgPattern}')`,
          backgroundSize: '679px 96px',
          backgroundRepeat: 'repeat',
          opacity: 0.08
        }}
      />

      {/* DESKTOP */}
      <div
        className="msg-desktop"
        style={{ position: 'relative', zIndex: 1, flexDirection: 'column', gap: '48px' }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <h2
            style={{
              ...inter,
              fontSize: '75px',
              fontWeight: 600,
              color: '#040617',
              letterSpacing: '-0.75px',
              lineHeight: '90px',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            Messages for you
          </h2>

          <div style={{ borderRight: '1px solid #E5E6EB', paddingRight: '16px', maxWidth: '463px' }}>
            <p
              style={{
                ...inter,
                fontSize: '20px',
                fontWeight: 400,
                color: '#6F7181',
                letterSpacing: '0.2px',
                lineHeight: '30px',
                margin: 0
              }}
            >
              These short notes were shared by members of our team to give you a glimpse into who we are and why we care. We hope they help you feel more connected to our mission.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '42px', alignItems: 'center' }}>
          {/* 3-person row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', justifyContent: 'center' }}>
            {/* Prev button */}
            <button
              onClick={prev}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              <p
                style={{
                  ...inter,
                  fontSize: '20px',
                  color: '#040617',
                  letterSpacing: '0.2px',
                  lineHeight: '30px',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                Last Message
              </p>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  border: '2px solid #040617',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img src={imgArrowPrev} alt="" style={{ width: '24px', height: '24px', transform: 'rotate(180deg)' }} />
              </div>
            </button>

            {/* Left — faded */}
            <motion.div
              key={`left-${getIndex(-1)}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={prev}
              style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div
                style={{
                  width: '360px',
                  height: '422px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E5E6EB',
                  position: 'relative'
                }}
              >
                <img
                  src={people[getIndex(-1)].photo}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    ...inter,
                    fontSize: '16px',
                    color: '#040617',
                    letterSpacing: '0.16px',
                    lineHeight: '24px',
                    margin: 0
                  }}
                >
                  {people[getIndex(-1)].role}
                </p>
                <p
                  style={{
                    ...inter,
                    fontSize: '32px',
                    fontWeight: 600,
                    color: '#040617',
                    letterSpacing: '-0.32px',
                    lineHeight: '46px',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}
                >
                  {people[getIndex(-1)].name}
                </p>
              </div>
            </motion.div>

            {/* Center — active */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`center-${current}`}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ width: '510px', display: 'flex', flexDirection: 'column', gap: '16px', flexShrink: 0 }}
              >
                <div
                  style={{
                    width: '510px',
                    height: '501px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #E5E6EB',
                    position: 'relative'
                  }}
                >
                  <img
                    src={people[current].photo}
                    alt=""
                    style={{ width: '100%', height: '108%', objectFit: 'cover', objectPosition: 'top' }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      ...inter,
                      fontSize: '16px',
                      color: '#040617',
                      letterSpacing: '0.16px',
                      lineHeight: '24px',
                      margin: 0
                    }}
                  >
                    {people[current].role}
                  </p>
                  <p
                    style={{
                      ...inter,
                      fontSize: '32px',
                      fontWeight: 600,
                      color: '#040617',
                      letterSpacing: '-0.32px',
                      lineHeight: '46px',
                      margin: 0,
                      textTransform: 'capitalize'
                    }}
                  >
                    {people[current].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right — faded */}
            <motion.div
              key={`right-${getIndex(1)}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 0.4, x: 0 }}
              transition={{ duration: 0.4 }}
              onClick={next}
              style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '16px', cursor: 'pointer', flexShrink: 0 }}
            >
              <div
                style={{
                  width: '360px',
                  height: '422px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E5E6EB',
                  position: 'relative'
                }}
              >
                <img
                  src={people[getIndex(1)].photo}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    ...inter,
                    fontSize: '16px',
                    color: '#040617',
                    letterSpacing: '0.16px',
                    lineHeight: '24px',
                    margin: 0
                  }}
                >
                  {people[getIndex(1)].role}
                </p>
                <p
                  style={{
                    ...inter,
                    fontSize: '32px',
                    fontWeight: 600,
                    color: '#040617',
                    letterSpacing: '-0.32px',
                    lineHeight: '46px',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}
                >
                  {people[getIndex(1)].name}
                </p>
              </div>
            </motion.div>

            {/* Next button */}
            <button
              onClick={next}
              style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#040617',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <img src={imgArrowNext} alt="" style={{ width: '24px', height: '24px', filter: 'invert(1)' }} />
              </div>
              <p
                style={{
                  ...inter,
                  fontSize: '20px',
                  color: '#040617',
                  letterSpacing: '0.2px',
                  lineHeight: '30px',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}
              >
                Next Message
              </p>
            </button>
          </div>

          {/* Quote + CTA */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`quote-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                alignItems: 'center',
                maxWidth: '784px',
                textAlign: 'center'
              }}
            >
              <p
                style={{
                  ...inter,
                  fontSize: '24px',
                  fontWeight: 400,
                  color: '#040617',
                  letterSpacing: '0.24px',
                  lineHeight: '38px',
                  margin: 0
                }}
              >
                {people[current].quote}
              </p>
              <a
                href="/messages"
                style={{
                  ...inter,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#FFD900',
                  color: '#040617',
                  fontSize: '16px',
                  fontWeight: 600,
                  padding: '16px 24px',
                  borderRadius: '18px',
                  textDecoration: 'none',
                  width: '240px',
                  justifyContent: 'center'
                }}
              >
                Read full message
                <img src={imgArrowBtn} alt="" style={{ width: '24px', height: '24px' }} />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* MOBILE */}
      <div
        className="msg-mobile"
        style={{
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center',
          padding: '60px 24px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          <h2
            style={{
              ...inter,
              fontSize: '64px',
              fontWeight: 600,
              color: '#040617',
              letterSpacing: '-0.64px',
              lineHeight: '69px',
              margin: 0
            }}
          >
            Messages for you
          </h2>
          <p
            style={{
              ...inter,
              fontSize: '20px',
              fontWeight: 400,
              color: '#6F7181',
              letterSpacing: '0.2px',
              lineHeight: '30px',
              margin: 0
            }}
          >
            These short notes were shared by members of our team to give you a glimpse into who we are and why we care.
          </p>
        </div>

        {/* Photo card + nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-card-${current}`}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', position: 'relative' }}
            >
              <img
                src={imgMobileSparkle}
                alt=""
                style={{
                  position: 'absolute',
                  left: '72px',
                  top: '47px',
                  width: '275px',
                  height: '275px',
                  pointerEvents: 'none',
                  opacity: 0.25,
                  zIndex: 0
                }}
              />

              <div
                style={{
                  width: '100%',
                  aspectRatio: '342/401',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid #E5E6EB',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <img
                  src={people[current].photo}
                  alt=""
                  style={{ width: '100%', height: '108%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <p
                  style={{
                    ...inter,
                    fontSize: '16px',
                    color: '#040617',
                    letterSpacing: '0.16px',
                    lineHeight: '24px',
                    margin: 0
                  }}
                >
                  {people[current].role}
                </p>
                <p
                  style={{
                    ...inter,
                    fontSize: '26px',
                    fontWeight: 600,
                    color: '#040617',
                    letterSpacing: '-0.26px',
                    lineHeight: '36px',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}
                >
                  {people[current].name}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <button
              onClick={prev}
              style={{
                width: '44px',
                height: '44px',
                border: '2px solid #E5E6EB',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                cursor: 'pointer',
                opacity: 0.6,
                flexShrink: 0
              }}
            >
              <img
                src={imgMobileArrowPrev}
                alt=""
                style={{ width: '24px', height: '24px', transform: 'rotate(180deg)', filter: 'brightness(0)' }}
              />
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {people.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    width: '52px',
                    height: '12px',
                    borderRadius: '90px',
                    backgroundColor: i === current ? '#FFD900' : '#d9d9d9',
                    opacity: i === current ? 1 : 0.4,
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: '44px',
                height: '44px',
                backgroundColor: '#E5E6EB',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <img src={imgMobileArrowNext} alt="" style={{ width: '24px', height: '24px' }} />
            </button>
          </div>
        </div>

        {/* Quote + CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`mob-quote-${current}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              alignItems: 'center',
              width: '100%',
              textAlign: 'center'
            }}
          >
            <p
              style={{
                ...inter,
                fontSize: '20px',
                fontWeight: 400,
                color: '#040617',
                letterSpacing: '0.2px',
                lineHeight: '30px',
                margin: 0
              }}
            >
              {people[current].quote}
            </p>
            <a
              href="/messages"
              style={{
                ...inter,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                backgroundColor: '#FFD900',
                color: '#040617',
                fontSize: '16px',
                fontWeight: 600,
                padding: '16px 24px',
                borderRadius: '18px',
                textDecoration: 'none',
                width: '100%'
              }}
            >
              Read full message
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  flexShrink: 0
                }}
              >
                <img src={imgArrowBtn} alt="" style={{ width: '14px', height: '14px', objectFit: 'contain' }} />
              </span>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}