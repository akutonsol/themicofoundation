"use client";

import { useState, useEffect } from 'react'
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { client, urlFor, queries } from '@/sanity/lib/sanity'

const inter = { fontFamily: "'Inter', sans-serif" };

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-4%] top-[-12%] h-[720px] w-[720px] opacity-[0.16]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.05]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[-5%] bottom-[-18%] h-[620px] w-[620px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-7 grid-rows-7">
          {Array.from({ length: 49 }).map((_, i) => (
            <div
              key={i}
              className="border border-black/[0.05]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[5%] top-[18%] text-[42px] text-[#FFD900]">
        ✦
      </div>

      <div className="absolute right-[8%] bottom-[16%] text-[42px] text-[#FFD900]">
        ✦
      </div>
    </div>
  );
}

export default function LegacyImpactSection() {
  const [legacyData, setLegacyData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLegacyData() {
      try {
        const data = await client.fetch(queries.legacyImpact)
        setLegacyData(data)
      } catch (error) {
        console.error('Error fetching legacy impact data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLegacyData()
  }, [])

  // Use CMS data or fallback to defaults
  const badge = legacyData?.badge || 'Why The Foundation Exists'
  const headline = legacyData?.headline || 'Preserving Legacy. Empowering Futures.'
  const paragraph1 = legacyData?.paragraph1 || 'The Mico Foundation exists to preserve the educational heritage of The Mico University College while advancing opportunities for future generations.'
  const paragraph2 = legacyData?.paragraph2 || 'Through restoration projects, scholarships, institutional development, and community partnerships, every contribution helps strengthen a legacy that has transformed lives for nearly two centuries.'
  const button1Text = legacyData?.button1?.text || 'Explore Projects'
  const button1Link = legacyData?.button1?.link || '/projects'
  const button2Text = legacyData?.button2?.text || 'Become a Donor'
  const button2Link = legacyData?.button2?.link || '/donate'
  const locationBadge = legacyData?.locationBadge || 'Jamaica • Education • Legacy'
  const bottomQuote = legacyData?.bottomQuote || 'Every generation deserves access to educational opportunity.'
  
  // Convert Sanity image to URL
  const heroImageUrl = legacyData?.heroImage 
    ? urlFor(legacyData.heroImage).width(1200).url() 
    : '/images/home/holness.jpg'

  // Stats from CMS or fallback
  const stats = legacyData?.stats || [
    { value: "1836", label: "Educational legacy established" },
    { value: "45+", label: "Completed and active projects" },
    { value: "Global", label: "Donor and alumni support network" }
  ]

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24">
        <p style={{ textAlign: 'center', color: '#6F7181' }}>Loading...</p>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1650px]">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E6EB] bg-white px-5 py-3 text-[15px] font-semibold text-[#040617]"
              style={inter}
            >
              <Sparkles className="h-4 w-4 text-[#FFD900]" />
              {badge}
            </div>

            <h2
              className="max-w-[820px] text-[64px] font-semibold leading-[0.92] tracking-[-0.08em] text-[#040617] sm:text-[88px] lg:text-[118px]"
              style={inter}
            >
              {headline}
            </h2>

            <div className="mt-10 border-l border-[#E5E6EB] pl-6 sm:pl-8">
              <p
                className="max-w-[760px] text-[22px] leading-[1.65] tracking-[-0.03em] text-[#6F7181] sm:text-[26px]"
                style={inter}
              >
                {paragraph1}
              </p>

              <p
                className="mt-6 max-w-[760px] text-[22px] leading-[1.65] tracking-[-0.03em] text-[#6F7181] sm:text-[26px]"
                style={inter}
              >
                {paragraph2}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={button1Link}
                className="inline-flex items-center justify-center gap-3 rounded-[18px] bg-[#FFD900] px-8 py-5 text-[17px] font-semibold text-[#040617] transition hover:scale-[1.02]"
                style={inter}
              >
                {button1Text}
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href={button2Link}
                className="inline-flex items-center justify-center gap-3 rounded-[18px] border border-[#040617] px-8 py-5 text-[17px] font-semibold text-[#040617] transition hover:bg-[#040617] hover:text-white"
                style={inter}
              >
                {button2Text}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[34px] border border-[#E5E6EB] bg-[#040617] shadow-sm">
              <img
                src={heroImageUrl}
                alt="Students and education impact"
                className="h-[720px] w-full object-cover opacity-90"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

              <div className="absolute left-8 top-8 rounded-full bg-white/15 px-5 py-3 text-[15px] font-semibold text-white backdrop-blur-md">
                {locationBadge}
              </div>

              <div className="absolute bottom-8 left-8 right-8">
                <p
                  className="max-w-[760px] text-[38px] font-semibold leading-[1.05] tracking-[-0.06em] text-white sm:text-[52px]"
                  style={inter}
                >
                  {bottomQuote}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                  className="rounded-[24px] border border-[#E5E6EB] bg-white/85 p-6 backdrop-blur-sm"
                >
                  <p
                    className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[#040617]"
                    style={inter}
                  >
                    {stat.value}
                  </p>

                  <p
                    className="mt-3 text-[16px] leading-[1.35] text-[#7A7D8B]"
                    style={inter}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}