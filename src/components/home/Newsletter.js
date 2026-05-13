'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const imgSparkle = "/images/home-static/sparkle-pub.png"

const inter = { fontFamily: "'Inter', sans-serif" };

export default function Newsletter() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({ firstName: '', email: '' })

  const validateForm = () => {
    const newErrors = { firstName: '', email: '' }
    let isValid = true

    // Validate first name
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required'
      isValid = false
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email is required'
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setSubmitted(true)
    }
  }

  return (
    <section className="newsletter-section" style={{ backgroundColor: '#FFFDF9', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        
        /* Mobile first - stacked layout */
        .newsletter-section {
          padding: 80px 24px !important;
        }
        .newsletter-title {
          font-size: 48px !important;
          line-height: 54px !important;
        }
        .newsletter-form {
          flex-direction: column !important;
        }
        .newsletter-fields {
          flex-direction: column !important;
        }
        
        /* Desktop - horizontal layout */
        @media (min-width: 768px) {
          .newsletter-section {
            padding: 80px 165px !important;
          }
          .newsletter-title {
            font-size: 75px !important;
            line-height: 85px !important;
          }
          .newsletter-form {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .newsletter-fields {
            flex-direction: row !important;
            gap: 24px !important;
          }
          .field-wrapper {
            flex: 1 !important;
          }
          .newsletter-submit-wrapper {
            align-self: flex-end !important;
            min-width: 200px !important;
          }
        }
        
        .news-input {
          backdrop-filter: blur(10px);
          background: #FFFDF9;
          border: 1px solid #E5E6EB;
          border-radius: 12px;
          height: 50px;
          padding: 10px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.16px;
          color: #040617;
          width: 100%;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }
        .news-input.error {
          border-color: #EF4444;
        }
        .news-input::placeholder { color: #6F7181; }
        .news-input:focus { border-color: #FFD900; }
        .news-input.error:focus { border-color: #EF4444; }
        .sub-btn { transition: background 0.2s, transform 0.1s; }
        .sub-btn:hover { background: #e6af00 !important; }
        .sub-btn:active { transform: scale(0.98); }
        .error-text {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #EF4444;
          margin-top: 4px;
          min-height: 20px;
        }
      `}</style>

      {/* Heading */}
      <motion.h2
        className="newsletter-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ ...inter, fontSize: '48px', fontWeight: 600, color: '#040617', letterSpacing: '-0.48px', lineHeight: '54px', margin: '0 0 32px', textAlign: 'center' }}
      >
        Subscribe to Our Newsletter
      </motion.h2>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ backgroundColor: '#FFFDF9', border: '1px solid #E5E6EB', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
      >
        {/* Sparkle bg */}
        <img src={imgSparkle} alt="" style={{ position: 'absolute', top: '13px', left: '17px', width: '100%', height: '109px', objectFit: 'cover', pointerEvents: 'none', opacity: 0.2, zIndex: 0 }} />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative', zIndex: 1 }}
          >
            <p style={{ ...inter, fontSize: '24px', fontWeight: 600, color: '#040617', letterSpacing: '-0.24px', textAlign: 'center' }}>
              🎉 You're subscribed! Thank you for joining.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form" style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', alignItems: 'stretch', position: 'relative', zIndex: 1 }}>
            {/* Fields container */}
            <div className="newsletter-fields" style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
              {/* First name */}
              <div className="field-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <label style={{ ...inter, fontSize: '18px', fontWeight: 400, color: '#040617', letterSpacing: '0.18px', lineHeight: '28px' }}>
                  Your name
                </label>
                <input
                  className={`news-input ${errors.firstName ? 'error' : ''}`}
                  type="text"
                  placeholder="Start typing..."
                  value={firstName}
                  onChange={e => {
                    setFirstName(e.target.value)
                    if (errors.firstName) setErrors({ ...errors, firstName: '' })
                  }}
                />
                <div className="error-text">{errors.firstName}</div>
              </div>

              {/* Last name */}
              <div className="field-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <label style={{ ...inter, fontSize: '18px', fontWeight: 400, color: '#040617', letterSpacing: '0.18px', lineHeight: '28px' }}>
                  Your last name (optional)
                </label>
                <input
                  className="news-input"
                  type="text"
                  placeholder="Start typing..."
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
                <div className="error-text"></div>
              </div>

              {/* Email */}
              <div className="field-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                <label style={{ ...inter, fontSize: '18px', fontWeight: 400, color: '#040617', letterSpacing: '0.18px', lineHeight: '28px' }}>
                  Your Email
                </label>
                <input
                  className={`news-input ${errors.email ? 'error' : ''}`}
                  type="email"
                  placeholder="Start typing..."
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                />
                <div className="error-text">{errors.email}</div>
              </div>
            </div>

            {/* Subscribe button wrapper */}
            <div className="newsletter-submit-wrapper">
              <button
                type="submit"
                className="sub-btn"
                style={{ ...inter, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', backgroundColor: '#FFD900', color: '#040617', fontSize: '16px', fontWeight: 600, padding: '16px 24px', borderRadius: '18px', border: 'none', cursor: 'pointer', width: '100%', height: '50px', flexShrink: 0 }}
              >
                Subscribe
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  )
}