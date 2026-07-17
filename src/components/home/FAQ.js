'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { client, queries } from '@/sanity/lib/sanity'

const imgStar = "/images/home-static/yspot.svg"
const inter = { fontFamily: "'Inter', sans-serif" }

const staticFaqs = [
  { id: 0, q: 'What is the Mico Foundation?', a: 'The Mico Foundation is a non-profit organization dedicated to managing and growing assets and infrastructure to support Mico University College, benefit students and staff, and preserve the legacy of the Lady Mico Trust.' },
  { id: 1, q: 'Where is the Mico Foundation based?', a: "The Mico Foundation is based in Kingston, Jamaica, and supports Mico University College — one of Jamaica's oldest and most respected educational institutions." },
  { id: 2, q: 'How are donations used?', a: 'All donations go directly toward funding educational programs, infrastructure improvements, scholarships, and community initiatives supported by Mico University College. We publish annual financial reports for full transparency.' },
  { id: 3, q: 'Is my donation tax-deductible?', a: 'Yes! All donations over $2 are tax deductible. You will receive a receipt upon donation that can be used for tax purposes.' },
  { id: 4, q: 'Can I choose which project to support?', a: 'Absolutely. When donating, you can select a specific project such as the Buxton College restoration, Smart Classroom campaign, or general foundation fund.' },
  { id: 5, q: 'Can I donate from outside Jamaica?', a: 'Yes, we accept international donations. You can donate using major credit cards and international payment methods through our secure donation form.' },
]

export default function FAQ() {
  const [openId, setOpenId] = useState(null)
  const [faqs, setFaqs] = useState(staticFaqs)

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const data = await client.fetch(queries.faqs)
        if (data && data.length > 0) {
          setFaqs(data.map((item, i) => ({
            id: item._id,
            q: item.question,
            a: item.answer,
          })))
          console.log('✅ Loaded FAQs from CMS:', data.length)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }
    fetchFaqs()
  }, [])

  const toggle = (id) => setOpenId(openId === id ? null : id)

  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] px-4 py-10 md:px-[clamp(24px, 8vw, 165px)] md:pt-[40px] md:pb-[80px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .faq-row { cursor: pointer; transition: background 0.2s var(--ease-standard), padding-left 0.25s var(--ease-standard); border-radius: 12px; }
        .faq-row:hover { background: rgba(243,175,25,0.06); padding-left: 14px; }
        .faq-card { box-shadow: var(--shadow-3); border-color: rgba(4,6,23,0.07) !important; }
      `}</style>

      {/* Decorative ? */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center leading-none">
        <p style={{ ...inter, color: '#FFF099' }} className="text-[120px] md:text-[161px] font-semibold tracking-[-1.61px] m-0">?</p>
      </div>

      {/* Main card */}
      <motion.div
        className="faq-card relative z-0 flex flex-col items-center gap-[30px] rounded-[32px] md:rounded-[40px] border-2 border-[#E5E6EB] bg-[#FFFDF9] p-6 md:p-16"
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 style={{ ...inter }} className="text-[32px] md:text-[75px] font-semibold text-[#040617] tracking-[-0.75px] leading-[40px] md:leading-[85px] m-0">
            Frequently Asked Questions
          </h2>
          <p style={{ ...inter }} className="text-base md:text-[24px] text-[#6F7181] tracking-[0.24px] leading-relaxed md:leading-[38px] m-0">
            Have another question? Email us at{' '}
            <a href="mailto:Mico.help@gmail.com" className="text-[#040617] underline">Mico.help@gmail.com</a>
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full flex flex-col">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-row border-b border-[#E1E1E1]/30 py-6 rounded-lg" onClick={() => toggle(faq.id)}>
              <div className="flex items-center justify-between gap-4">
                <p style={{ ...inter }} className="text-lg md:text-[32px] font-semibold text-[#040617] tracking-[-0.32px] leading-snug md:leading-[46px] m-0">
                  {faq.q}
                </p>
                <motion.div animate={{ rotate: openId === faq.id ? 45 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 w-[24px] h-[24px] md:w-[30px] md:h-[30px]">
                  <img src={imgStar} alt="" className="w-full h-full" />
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
                    <p style={{ ...inter }} className="text-sm md:text-[20px] text-[#6F7181] tracking-[0.2px] leading-relaxed md:leading-[30px] mt-4 pr-6 md:pr-[48px] m-0">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}