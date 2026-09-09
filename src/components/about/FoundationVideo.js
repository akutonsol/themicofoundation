"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticContent = {
  heading: "About The Foundation",
  headingNarrative: "A limited Liability Company not for profit",
  subheading: "Discover the legacy, mission, and continued impact of The Mico Foundation through education, philanthropy, and community transformation across generations.",
  videoId: "",
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
            headingNarrative: data.headingNarrative || staticContent.headingNarrative,
            subheading: data.subheading || staticContent.subheading,
            videoId: data.videoId || "",
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
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65 }}
              className="text-[72px] font-semibold leading-[0.9] tracking-[-0.08em] text-white sm:text-[110px] lg:text-[150px]"
              style={inter}
            >
              {content.heading}
            </motion.h2>
            {content.headingNarrative && (
              <motion.p
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
                className="mt-4 text-[18px] font-medium tracking-[-0.01em] text-white/50 sm:text-[20px]"
                style={inter}
              >
                {content.headingNarrative}
              </motion.p>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.08 }}
            className="flex flex-col items-center gap-8 text-center"
          >
            {content.videoId && (
              <button
                onClick={() => setIsPlaying(true)}
                aria-label="Watch the Foundation video"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD900] text-[#040617] transition hover:scale-[1.04]"
              >
                <Play className="ml-1 h-7 w-7 fill-current" />
              </button>
            )}
            <p className="max-w-[760px] text-[22px] leading-[1.6] tracking-[-0.03em] text-white/70 sm:text-[26px] lg:text-[30px]" style={inter}>
              {content.subheading}
            </p>
          </motion.div>
        </div>
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
