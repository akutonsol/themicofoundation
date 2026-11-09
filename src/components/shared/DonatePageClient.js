"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DonateHero from "./DonateHero";
import DonationForm from "./DonationForm";

const inter = { fontFamily: "'Inter', sans-serif" };

export default function DonatePageClient() {
  const [open, setOpen] = useState(false);
  const [navH, setNavH] = useState(108);

  useEffect(() => {
    const measure = () => {
      const nav = document.querySelector("nav");
      if (nav) setNavH(nav.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="dp-stage" style={{ "--dp-nav": `${navH}px` }}>
      <style>{`
        .dp-stage { position:relative; background:#FFFDF9; overflow:hidden; display:flex; flex-direction:column; }
        .dp-hero { min-height:0; }
        .dp-intro { text-align:center; padding: 28px 24px 36px; }
        .dp-badge { ${""}font-size:14px; font-weight:600; color:#FFD900; background:#040617; display:inline-block; padding:4px 18px; border-radius:100px; margin:0 0 12px; letter-spacing:.05em; }
        .dp-h2 { font-size:clamp(34px, min(5.2vw, 7vh), 75px); font-weight:800; color:#040617; letter-spacing:-.02em; line-height:1; margin:0 0 14px; }
        .dp-p { font-size:clamp(15px, min(1.2vw, 2.2vh), 20px); color:#6F7181; line-height:1.6; max-width:680px; margin:0 auto; }
        .dp-btn { margin-top:20px; display:inline-flex; align-items:center; justify-content:center; background:#FFD900; color:#040617; font-weight:600; font-size:16px; padding:14px 40px; border-radius:18px; border:0; cursor:pointer; transition:transform .15s; }
        .dp-btn:hover { transform:translateY(-1px); }
        .dp-sheet { position:absolute; inset:0; z-index:40; background:#FFFDF9; overflow-y:auto; }
        .dp-close { position:sticky; top:16px; float:right; margin:16px 24px 0 0; z-index:5; width:44px; height:44px; border-radius:50%; border:1px solid #E5E6EB; background:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 14px rgba(4,6,23,.12); }
        .dp-close:hover { background:#FFD900; border-color:#FFD900; }
        @media (min-width: 768px) {
          .dp-stage { height: calc(100dvh - var(--dp-nav, 108px)); }
          .dp-hero { flex:1 1 0; }
          .dp-intro { flex:0 0 auto; padding: clamp(14px,2.4vh,32px) 24px clamp(16px,2.8vh,40px); }
          .dp-btn { margin-top:clamp(10px,2vh,20px); }
        }
      `}</style>

      <div className="dp-hero"><DonateHero /></div>

      <div className="dp-intro" style={inter}>
        <p className="dp-badge">Make an Impact</p>
        <h2 className="dp-h2">Your Gift Changes Lives</h2>
        <p className="dp-p">
          Every donation directly supports scholarships, heritage restoration, and community programs across Jamaica and the Caribbean. Choose your amount, tell us about yourself, and complete your gift in minutes.
        </p>
        <button type="button" className="dp-btn" style={inter} onClick={() => setOpen(true)}>Donate Now</button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dp-sheet" role="dialog" aria-modal="true" aria-label="Donation form"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
          >
            <button type="button" className="dp-close" aria-label="Close donation form" onClick={() => setOpen(false)}>
              <X size={22} color="#040617" />
            </button>
            <DonationForm hideIntro />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
