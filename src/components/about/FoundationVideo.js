"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticContent = {
  heading: "About The Foundation",
  subheading: "Discover the legacy, mission, and continued impact of The Mico Foundation through education, philanthropy, and community transformation across generations.",
  videoId: "",
  decks: [
    {
      title: "Empowering education and preserving legacy through generations.",
      body: "The Mico Foundation continues to advance educational development, institutional sustainability, and community impact across Jamaica and beyond.",
    },
  ],
};

function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute right-[-4%] top-[10%] h-[620px] w-[720px] opacity-[0.14]">
        <div className="grid h-full w-full grid-cols-8 grid-rows-7">
          {Array.from({ length: 56 }).map((_, i) => (
            <div key={i} className="border border-white/[0.08]" style={{ borderRadius: "18px" }} />
          ))}
        </div>
      </div>
      <div className="absolute left-[5%] bottom-[12%] text-[42px] text-[#FFD900]">✦</div>
      <div className="absolute right-[8%] top-[14%] text-[42px] text-[#FFD900]">✦</div>
    </div>
  );
}

// Deck 1 — hero card, always first, fixed design
function HeroDeck({ deck, videoId, onPlay }) {
  return (
    <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 sm:p-12 lg:p-16">
      <div className="flex items-center justify-between">
        <div className="rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[14px] font-medium text-white backdrop-blur-sm" style={inter}>
          Foundation Story
        </div>
        {videoId && (
          <button
            onClick={onPlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD900] text-[#040617] transition hover:scale-[1.04]"
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
        )}
      </div>
      <div>
        <h3 className="max-w-[920px] text-[48px] font-semibold leading-[1] tracking-[-0.06em] text-white sm:text-[68px] lg:text-[92px]" style={inter}>
          {deck.title}
        </h3>
        <p className="mt-6 max-w-[720px] text-[20px] leading-[1.6] text-white/75 sm:text-[24px]" style={inter}>
          {deck.body}
        </p>
      </div>
    </div>
  );
}

export default function FoundationVideo() {
  const [content, setContent] = useState(staticContent);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.foundationVideo);
        if (data) {
          setContent({
            heading: data.heading || staticContent.heading,
            subheading: data.subheading || staticContent.subheading,
            videoId: data.videoId || "",
            decks: data.decks?.length > 0
              ? [staticContent.decks[0], ...data.decks]
              : staticContent.decks,
          });
        }
      } catch (error) {
        console.error('Error fetching foundation video:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#040617] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      <BackgroundGrid />

      <div className="relative mx-auto max-w-[1650px]">
        {/* Header */}
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65 }}
            className="text-[72px] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-[110px] lg:text-[150px]"
            style={inter}
          >
            {content.heading}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
            className="border-l border-white/10 pl-6"
          >
            <p className="max-w-[760px] text-[22px] leading-[1.6] tracking-[-0.03em] text-white/70 sm:text-[26px] lg:text-[30px]" style={inter}>
              {content.subheading}
            </p>
          </motion.div>
        </div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0d1f]"
          style={{ height: "760px", boxShadow: "var(--shadow-dark-4)" }}
        >
          {/* Static dark background with subtle gradient */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, #0a0d1f 0%, #001432 50%, #040617 100%)"
          }} />

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "radial-gradient(circle, #FFD900 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} />

          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/20" />

          {/* Static hero content — media button + narrative (no slider) */}
          <HeroDeck deck={content.decks[0]} videoId={content.videoId} onPlay={() => setIsPlaying(true)} />
        </motion.div>
      </div>

      {/* Video modal — only opens on play button click */}
      <AnimatePresence>
        {isPlaying && content.videoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[1200px] mx-6"
              onClick={(e) => e.stopPropagation()}
              style={{ aspectRatio: "16/9" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${content.videoId}?autoplay=1&controls=1&rel=0`}
                className="w-full h-full rounded-[16px]"
                style={{ border: "none" }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute -top-4 -right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/40 transition"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}