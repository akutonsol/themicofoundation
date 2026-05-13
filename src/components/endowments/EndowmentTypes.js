'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const inter = { fontFamily: "'Inter', sans-serif" }

const types = [
  {
    id: 0,
    title: 'Student Support',
    desc: 'Providing financial assistance to deserving students for tuition, housing, meals, and essential living expenses.',
    icon: '✦',
  },
  {
    id: 1,
    title: 'Campus Development',
    desc: 'Building, upgrading, and maintaining classrooms, dormitories, smart facilities, and sports complexes.',
    icon: '⌂',
  },
  {
    id: 2,
    title: 'Faculty & Research',
    desc: 'Funding academic research, professional training, and development programs for educators and staff.',
    icon: '⌘',
  },
  {
    id: 3,
    title: 'Community Programs',
    desc: 'Supporting outreach initiatives, rural education, inclusive learning, and projects that uplift communities through education.',
    icon: '▢',
  },
]

function TypeCard({ type, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-[16px] border border-[#E5E6EB] bg-[#FFFDF9] p-6"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E6EB] text-[22px] text-[#040617]">
        {type.icon}
      </div>

      <h3
        className="text-[26px] font-bold leading-[1.15] tracking-[-0.04em] text-[#040617]"
        style={inter}
      >
        {type.title}
      </h3>

      <p
        className="mt-3 text-[16px] leading-[1.5] tracking-[0.01em] text-[#6F7181]"
        style={inter}
      >
        {type.desc}
      </p>
    </motion.div>
  )
}

export default function EndowmentTypes() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    endowmentType: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <section className="bg-[#FFFDF9] px-6 py-24 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1590px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 max-w-[1350px] text-[78px] font-extrabold leading-[0.92] tracking-[-0.07em] text-[#040617] sm:text-[110px] lg:text-[150px]"
          style={inter}
        >
          Support the Future with an Endowment
        </motion.h1>

        <div className="grid gap-20 lg:grid-cols-[1fr_480px] lg:items-start">
          <div className="flex flex-col gap-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-[900px] text-[18px] leading-[1.75] tracking-[0.01em] text-[#6F7181]"
              style={inter}
            >
              An endowment is a long-term gift that helps fund scholarships,
              programs, and campus improvements at The Mico University College.
              <br />
              <br />
              By filling out this form, you're pledging your support to invest in
              education for future generations. Your name, your family, or your
              business can be remembered as part of this legacy. Your donation
              will be securely managed by The Mico Foundation and used exactly as
              you choose.
            </motion.p>

            <div>
              <h3
                className="mb-6 text-[22px] font-bold tracking-[-0.03em] text-[#040617]"
                style={inter}
              >
                Endowments Funds Go Towards
              </h3>

              <div className="grid gap-6 sm:grid-cols-2">
                {types.map((type, i) => (
                  <TypeCard key={type.id} type={type} index={i} />
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="sticky top-[120px] rounded-[20px] border border-[#E5E6EB] bg-[#FFFDF9] p-8"
          >
            <h2
              className="text-[28px] font-bold leading-[1.2] tracking-[-0.03em] text-[#040617]"
              style={inter}
            >
              Endowment Commitment
            </h2>

            <p
              className="mt-4 text-[16px] leading-[1.6] tracking-[0.01em] text-[#6F7181]"
              style={inter}
            >
              Fill out this form to show your interest in supporting The Mico
              Foundation through an endowment or sponsorship. Once submitted, a
              member of our team will contact you via email to discuss the next
              steps and how your support can make an impact.
            </p>

            <p
              className="mt-5 text-[18px] font-bold text-[#040617]"
              style={inter}
            >
              Fill out the form to confirm your commitment.
            </p>

            <div className="mt-7 flex flex-col gap-5">
              <div>
                <label
                  className="mb-2 block text-[16px] text-[#040617]"
                  style={inter}
                >
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Josh..."
                  value={form.name}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 text-[16px] outline-none"
                  style={inter}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-[16px] text-[#040617]"
                  style={inter}
                >
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="youremail@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 text-[16px] outline-none"
                  style={inter}
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-[16px] text-[#040617]"
                  style={inter}
                >
                  Endowment Type
                </label>

                <input
                  type="text"
                  name="endowmentType"
                  placeholder="Family, Corporate, Individual..."
                  value={form.endowmentType}
                  onChange={handleChange}
                  className="h-[52px] w-full rounded-[8px] border border-[#E5E6EB] bg-[#FFFDF9] px-4 text-[16px] outline-none"
                  style={inter}
                />
              </div>

              <button
                type="button"
                className="mt-1 h-[56px] w-full rounded-[14px] bg-[#FFD900] text-[16px] font-bold text-[#040617]"
                style={inter}
              >
                Donate Now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}