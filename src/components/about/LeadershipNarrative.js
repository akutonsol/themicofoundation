"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { client, queries } from "@/sanity/lib/sanity";
import { LEADERSHIP_NARRATIVE_DEFAULTS } from "./leadershipNarrativeDefaults";

const inter = { fontFamily: "'Inter', sans-serif" };

// List items are detected by their "a)" / "1)" markers rather than line breaks,
// because Studio's paste handler joins single line breaks into one paragraph.
const LIST_MARKER_SPLIT = /(?:\n|(?<=[.;:])\s+)(?=(?:[a-h]|\d{1,2})\.?\)\.?\s)/;

function parseBlocks(body) {
  return String(body || "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [lead, ...items] = block.split(LIST_MARKER_SPLIT).map((s) => s.trim());
      return { lead, items };
    });
}

export default function LeadershipNarrative({ section }) {
  const defaults = LEADERSHIP_NARRATIVE_DEFAULTS[section];
  const [content, setContent] = useState(defaults);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    client.fetch(queries.leadershipNarratives)
      .then((data) => {
        const d = data?.[section];
        if (!d) return;
        setContent({
          linkText: d.linkText || defaults.linkText,
          title: d.title || defaults.title,
          body: d.body || defaults.body,
        });
      })
      .catch((error) => console.error("Error fetching leadership narrative:", error));
  }, [section, defaults]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const blocks = parseBlocks(content.body);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-5 inline-flex items-center gap-2 border-b-2 border-[#f3af19] pb-1 text-[17px] font-semibold text-[#040617] transition hover:text-[#b98200]"
        style={inter}
      >
        {content.linkText}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="ln-overlay"
              className="fixed inset-0 z-[1000] flex items-end justify-center bg-[rgba(4,6,23,0.55)] backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={content.title}
                className="relative flex max-h-[88vh] w-full max-w-[920px] flex-col rounded-t-[28px] bg-[#FFFDF9] shadow-[0_-20px_60px_rgba(0,0,0,0.25)]"
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 260 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center pt-3">
                  <span className="h-1.5 w-12 rounded-full bg-[#E5E6EB]" />
                </div>
                <div className="flex items-start justify-between gap-6 border-b border-[rgba(4,6,23,0.07)] px-6 pb-5 pt-4 sm:px-10">
                  <h3 className="text-[26px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#040617] sm:text-[32px]" style={inter}>
                    {content.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F1F3] text-[#040617] transition hover:bg-[#FFD900]"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="overflow-y-auto px-6 pb-12 pt-6 sm:px-10" style={inter}>
                  {blocks.map((block, i) => (
                    <div key={i} className={i > 0 ? "mt-6" : ""}>
                      <p className="text-justify text-[17px] leading-[1.75] text-[#1A1D28] sm:text-[18px]">{block.lead}</p>
                      {block.items.length > 0 && (
                        <ul className="mt-3 space-y-2 pl-6 sm:pl-10">
                          {block.items.map((item, j) => (
                            <li key={j} className="text-[17px] leading-[1.7] text-[#1A1D28] sm:text-[18px]">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
