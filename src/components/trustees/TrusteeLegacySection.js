"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

// Joe Bartley — Lead Trustee. Drop his photo at /public/images/trustees/joe-bartley.jpg
// (falls back to a placeholder portrait until the file is added).
const joeBartleyImage = "/images/trustees/joe-bartley.jpg";
const joeBartleyFallback = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80";

const DEFAULT_LEADER = {
  name: 'Joe Bartley',
  role: 'Lead Trustee',
  image: null,
  message: [
    "For generations, The Mico College has been a beacon of excellence in education, preparing outstanding teachers for Jamaica and the wider Caribbean. Beyond education, Mico graduates have distinguished themselves across numerous professions, making significant contributions to national, regional, and international development.",
    "Today, Mico University College is well positioned to broaden its impact through the expansion of STEM and STEAM education, strategic partnerships in Artificial Intelligence (AI), and stronger collaboration with the public and private sectors. These initiatives will foster innovative programmes that benefit students, faculty, alumni, and the wider community.",
  ],
};

const staticContent = {
  heroEyebrow: 'The Mico Foundation — Trustee Legacy',
  heroTitleLine1: 'Nearly Two',
  heroTitleHighlight: 'Centuries',
  heroTitleLine3: 'of Education',
  heroSubtitle: 'A continuing story of leadership, stewardship, and educational transformation that has shaped generations across the Caribbean.',
  ctaEyebrow: 'Dive Deeper',
  ctaTitle: 'Continue to Learn About Our History',
  ctaButtonText: 'Explore History',
  ctaButtonLink: '/history',
  ctaBodyText: "",
};

export default function TrusteeLegacySection() {
  const [content, setContent] = useState(staticContent);
  const [leader, setLeader] = useState(DEFAULT_LEADER);
  const [showMsg, setShowMsg] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const titleOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.trusteeLegacy);
        if (data) {
          setContent({
            heroEyebrow: data.heroEyebrow || staticContent.heroEyebrow,
            heroTitleLine1: data.heroTitleLine1 || staticContent.heroTitleLine1,
            heroTitleHighlight: data.heroTitleHighlight || staticContent.heroTitleHighlight,
            heroTitleLine3: data.heroTitleLine3 || staticContent.heroTitleLine3,
            heroSubtitle: data.heroSubtitle || staticContent.heroSubtitle,
            ctaEyebrow: data.ctaEyebrow || staticContent.ctaEyebrow,
            ctaTitle: data.ctaTitle || staticContent.ctaTitle,
            ctaButtonText: data.ctaButtonText || staticContent.ctaButtonText,
            ctaButtonLink: data.ctaButtonLink || staticContent.ctaButtonLink,
            ctaBodyText: data.ctaBodyText || staticContent.ctaBodyText,
          });
        }
      } catch (error) {
        console.error('Error fetching trustee legacy content:', error);
      }
    }
    async function fetchLeader() {
      try {
        const d = await client.fetch(queries.trusteeLeader);
        if (d) {
          setLeader({
            name: d.name || DEFAULT_LEADER.name,
            role: d.role || DEFAULT_LEADER.role,
            image: d.portrait ? urlFor(d.portrait).width(1000).url() : null,
            message: d.message
              ? d.message.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
              : DEFAULT_LEADER.message,
          });
        }
      } catch (error) {
        console.error('Error fetching trustee leader:', error);
      }
    }
    fetchContent();
    fetchLeader();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Syne:wght@400;500;700&display=swap');

        .legacy-hero { position: relative; height: 100vh; min-height: 700px; background: #05080F; overflow: hidden; display: flex; align-items: center; padding: clamp(40px,6vw,80px) clamp(24px,5vw,80px); }
        .hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,217,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,217,0,0.04) 1px, transparent 1px); background-size: 72px 72px; }
        .hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,31,63,0.9) 0%, rgba(5,8,15,0.4) 60%, transparent 100%); }
        .hero-year-bg { position: absolute; left: -2%; top: 50%; transform: translateY(-50%); font-family: 'Cormorant Garamond', serif; font-size: clamp(200px, 28vw, 420px); font-weight: 300; color: rgba(255,217,0,0.035); line-height: 1; pointer-events: none; user-select: none; letter-spacing: -0.05em; }
        .hero-content { position: relative; z-index: 2; max-width: 1560px; margin: 0 auto; width: 100%; display: grid; grid-template-columns: 0.86fr 1.14fr; gap: clamp(40px,5vw,72px); align-items: center; }
        .hero-text { min-width: 0; }
        .hero-image-wrap { position: relative; width: 100%; }
        .hero-image { width: 100%; height: clamp(520px, 82vh, 840px); object-fit: cover; object-position: top center; border-radius: 24px; display: block; box-shadow: 0 30px 80px rgba(0,0,0,0.5); }
        .hero-image-cap { position: absolute; left: 20px; bottom: 20px; right: 20px; background: linear-gradient(to top, rgba(5,8,15,0.92), rgba(5,8,15,0)); border-radius: 0 0 24px 24px; padding: 40px 24px 22px; }
        .hero-image-cap .cap-role { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FFD900; margin: 0 0 6px; }
        .hero-image-cap .cap-name { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: #fff; margin: 0; line-height: 1.05; letter-spacing: -0.02em; }
        .hero-eyebrow { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #FFD900; margin: 0 0 28px; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 6.5vw, 100px); font-weight: 300; line-height: 0.92; letter-spacing: -0.03em; color: #FFFFFF; margin: 0; }
        .hero-title em { font-style: italic; color: #FFD900; }
        .hero-sub { font-family: 'Syne', sans-serif; font-size: clamp(15px, 1.4vw, 19px); font-weight: 400; color: rgba(255,255,255,0.4); margin: 32px 0 0; max-width: 560px; line-height: 1.65; letter-spacing: 0.01em; }
        .read-msg-btn { display: inline-flex; align-items: center; gap: 12px; margin-top: 44px; background: #FFD900; color: #040617; font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 16px 28px; border-radius: 100px; border: none; cursor: pointer; transition: background 0.2s, transform 0.2s; }
        .read-msg-btn:hover { background: #fff; transform: translateY(-2px); }
        .read-msg-btn svg { width: 18px; height: 18px; transition: transform 0.2s; }
        .read-msg-btn:hover svg { transform: translateX(3px); }

        .msg-overlay { position: fixed; inset: 0; background: rgba(4,6,23,0.6); backdrop-filter: blur(4px); z-index: 3000; }
        .msg-panel { position: fixed; left: 0; right: 0; bottom: 0; z-index: 3001; max-height: 90vh; background: #05080F; border-radius: 28px 28px 0 0; box-shadow: 0 -30px 80px rgba(0,0,0,0.6); border-top: 1px solid rgba(255,217,0,0.2); overflow-y: auto; }
        .msg-panel::before { content: ''; position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 48px; height: 4px; border-radius: 100px; background: rgba(255,255,255,0.18); }
        .msg-close { position: absolute; top: 20px; right: clamp(20px,4vw,48px); width: 44px; height: 44px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .msg-close:hover { background: rgba(255,255,255,0.1); }
        .msg-close svg { width: 20px; height: 20px; }
        .msg-panel-inner { max-width: 820px; margin: 0 auto; padding: clamp(48px,7vw,72px) clamp(24px,5vw,64px) clamp(56px,8vw,88px); text-align: right; }
        .msg-eyebrow { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #FFD900; margin: 0 0 14px; }
        .msg-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px,5.5vw,68px); font-weight: 600; color: #fff; margin: 0 0 clamp(28px,4vw,40px); line-height: 1; letter-spacing: -0.03em; }
        .msg-body { border-top: 1px solid rgba(255,255,255,0.08); padding-top: clamp(28px,4vw,40px); }
        .msg-p { font-family: 'Syne', sans-serif; font-size: clamp(17px,1.5vw,20px); line-height: 1.85; color: rgba(255,255,255,0.74); margin: 0 0 24px; }
        .msg-p:last-child { margin-bottom: 0; }

        @media (max-width: 980px) {
          .legacy-hero { height: auto; min-height: 0; align-items: stretch; padding-top: clamp(100px,14vw,140px); padding-bottom: clamp(60px,8vw,80px); }
          .hero-content { grid-template-columns: 1fr; gap: 40px; }
          .hero-image { height: clamp(360px, 70vw, 520px); }
          .hero-year-bg { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="legacy-hero" ref={heroRef}>
        <div className="hero-grid-bg" />
        <div className="hero-gradient" />
        <div className="hero-year-bg">1835</div>
        <motion.div className="hero-content" style={{ y: titleY, opacity: titleOpacity }}>
          {/* LEFT — content */}
          <div className="hero-text">
            <p className="hero-eyebrow">{content.heroEyebrow}</p>
            <h1 className="hero-title">
              {content.heroTitleLine1}<br />
              <em>{content.heroTitleHighlight}</em><br />
              {content.heroTitleLine3}
            </h1>
            <p className="hero-sub">{content.heroSubtitle}</p>
            <button type="button" className="read-msg-btn" onClick={() => setShowMsg(true)}>
              Read {leader.name.split(' ')[0]}'s Message
              <svg viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* RIGHT — Lead Trustee portrait (CMS) */}
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src={leader.image || joeBartleyImage}
              alt={`${leader.name}, ${leader.role}`}
              onError={(e) => { if (e.currentTarget.src !== joeBartleyFallback) e.currentTarget.src = joeBartleyFallback; }}
            />
            <div className="hero-image-cap">
              <p className="cap-role">{leader.role}</p>
              <p className="cap-name">{leader.name}</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── LEAD TRUSTEE MESSAGE — slide-up panel ── */}
      <AnimatePresence>
        {showMsg && (
          <>
            <motion.div
              className="msg-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowMsg(false)}
            />
            <motion.div
              className="msg-panel"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 240 }}
            >
              <button type="button" className="msg-close" onClick={() => setShowMsg(false)} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </button>
              <div className="msg-panel-inner">
                <p className="msg-eyebrow">A Message From Our {leader.role}</p>
                <h2 className="msg-name">{leader.name}</h2>
                <div className="msg-body">
                  {leader.message.map((para, i) => (
                    <p key={i} className="msg-p">{para}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}