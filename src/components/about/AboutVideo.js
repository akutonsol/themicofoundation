"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

const inter = { fontFamily: "'Inter', sans-serif" };

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-4%] top-[10%] h-[620px] w-[720px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-7">
          {Array.from({ length: 56 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/[0.08]"
              style={{ borderRadius: "18px" }}
            />
          ))}
        </div>
      </div>

      <div className="absolute left-[5%] bottom-[12%] text-[42px] text-[#FFD900]">
        ✦
      </div>

      <div className="absolute right-[8%] top-[14%] text-[42px] text-[#FFD900]">
        ✦
      </div>
    </div>
  );
}

export default function FoundationVideo() {
  return (
    <section className="relative overflow-hidden bg-[#040617] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1650px]">
        {/* Header */}
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="text-[72px] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-[110px] lg:text-[150px]"
            style={inter}
          >
            About The Foundation
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="border-l border-white/10 pl-6"
          >
            <p
              className="max-w-[760px] text-[22px] leading-[1.6] tracking-[-0.03em] text-white/70 sm:text-[26px] lg:text-[30px]"
              style={inter}
            >
              Discover the legacy, mission, and continued impact of The Mico
              Foundation through education, philanthropy, and community
              transformation across generations.
            </p>
          </motion.div>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10"
        >
          {/* Overlay */}
          <div className="absolute inset-0 z-10 bg-black/30" />

          {/* Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-[760px] w-full object-cover"
          >
            <source src="/videos/foundation-video.mp4" type="video/mp4" />
          </video>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
            {/* Top Label */}
            <div className="flex items-center justify-between">
              <div
                className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[14px] font-medium text-white backdrop-blur-sm"
                style={inter}
              >
                Foundation Story
              </div>

              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD900] text-[#040617] transition hover:scale-[1.04]">
                <Play className="ml-1 h-7 w-7 fill-current" />
              </button>
            </div>

            {/* Bottom Content */}
            <div>
              <h3
                className="max-w-[920px] text-[48px] font-semibold leading-[1] tracking-[-0.06em] text-white sm:text-[68px] lg:text-[92px]"
                style={inter}
              >
                Empowering education and preserving legacy through generations.
              </h3>

              <p
                className="mt-6 max-w-[720px] text-[20px] leading-[1.6] text-white/75 sm:text-[24px]"
                style={inter}
              >
                The Mico Foundation continues to advance educational
                development, institutional sustainability, and community impact
                across Jamaica and beyond.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}