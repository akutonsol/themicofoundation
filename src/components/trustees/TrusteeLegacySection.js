"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { client, queries } from "@/sanity/lib/sanity";

const staticBlocks = [
  { year: "1835", label: "Foundation", text: "The Lady Mico Charity was established by an Act of Parliament in England and Wales, with Sir Thomas Fowell Buxton as its first chairman. Under his leadership, the Charity rapidly expanded educational opportunities throughout the British colonies — establishing teachers' colleges and elementary schools across Mauritius, the Seychelles, and the West Indies." },
  { year: "1966", label: "Survival", text: "Today, The Mico University College in Kingston, Jamaica remains the only surviving institution from that original educational movement — the longest sustained educational charity legacy in the West Indies. As the organization evolved into the Lady Mico Trust, its mission continued through sustained support for teacher training and educational advancement." },
  { year: "2000", label: "Custodianship", text: "Professor The Honourable Errol Lawrence Miller, OJ, became the first and only citizen outside the United Kingdom to serve as Trustee of the Lady Mico Trust. In 2000, the Jamaican assets of the Trust were transferred to The Mico Foundation, which now serves as the chief custodian of its enduring mission, history, and institutional legacy." },
];

const staticContent = {
  heroEyebrow: 'The Mico Foundation — Trustee Legacy',
  heroTitleLine1: 'Nearly Two',
  heroTitleHighlight: 'Centuries',
  heroTitleLine3: 'of Education',
  heroSubtitle: 'A continuing story of leadership, stewardship, and educational transformation that has shaped generations across the Caribbean.',
  ctaTitle: 'Continue to Learn About Our History',
  ctaButtonText: 'Explore History',
  ctaButtonLink: '/history',
};

function Block({ block, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 30%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -40 : 40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="block-item">
      <div className="year-col">
        <span className="year-num">{block.year}</span>
        <div className="year-line" />
      </div>
      <div className="content-col">
        <span className="block-label">{block.label}</span>
        <p className="block-text">{block.text}</p>
      </div>
    </motion.div>
  );
}

export default function TrusteeLegacySection() {
  const [content, setContent] = useState(staticContent);
  const [blocks, setBlocks] = useState(staticBlocks);
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
            ctaTitle: data.ctaTitle || staticContent.ctaTitle,
            ctaButtonText: data.ctaButtonText || staticContent.ctaButtonText,
            ctaButtonLink: data.ctaButtonLink || staticContent.ctaButtonLink,
          });
          if (data.timelineBlocks?.length > 0) {
            setBlocks(data.timelineBlocks);
          }
        }
      } catch (error) {
        console.error('Error fetching trustee legacy content:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Syne:wght@400;500;700&display=swap');

        .legacy-hero { position: relative; height: 100vh; min-height: 700px; background: #05080F; overflow: hidden; display: flex; align-items: flex-end; padding: clamp(40px,6vw,80px) clamp(24px,5vw,80px); }
        .hero-grid-bg { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,217,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,217,0,0.04) 1px, transparent 1px); background-size: 72px 72px; }
        .hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,31,63,0.9) 0%, rgba(5,8,15,0.4) 60%, transparent 100%); }
        .hero-year-bg { position: absolute; right: -2%; top: 50%; transform: translateY(-50%); font-family: 'Cormorant Garamond', serif; font-size: clamp(200px, 28vw, 420px); font-weight: 300; color: rgba(255,217,0,0.04); line-height: 1; pointer-events: none; user-select: none; letter-spacing: -0.05em; }
        .hero-content { position: relative; z-index: 2; max-width: 1500px; margin: 0 auto; width: 100%; }
        .hero-eyebrow { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #FFD900; margin: 0 0 28px; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(64px, 10vw, 152px); font-weight: 300; line-height: 0.88; letter-spacing: -0.03em; color: #FFFFFF; margin: 0; }
        .hero-title em { font-style: italic; color: #FFD900; }
        .hero-sub { font-family: 'Syne', sans-serif; font-size: clamp(15px, 1.4vw, 19px); font-weight: 400; color: rgba(255,255,255,0.4); margin: 32px 0 0; max-width: 560px; line-height: 1.65; letter-spacing: 0.01em; }
        .scroll-hint { display: flex; align-items: center; gap: 12px; margin-top: 48px; font-family: 'Syne', sans-serif; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.25); }
        .scroll-line { width: 48px; height: 1px; background: rgba(255,255,255,0.2); }

        .legacy-timeline { background: #FAFAF7; padding: clamp(80px,10vw,140px) clamp(24px,5vw,80px); position: relative; overflow: hidden; }
        .timeline-header { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end; max-width: 1400px; margin: 0 auto 100px; }
        .timeline-header-label { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8E9D; margin: 0 0 18px; display: flex; align-items: center; gap: 12px; }
        .timeline-header-label::before { content: ''; display: block; width: 32px; height: 1px; background: #040617; }
        .timeline-header h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 5vw, 72px); font-weight: 600; color: #040617; margin: 0; line-height: 1.05; letter-spacing: -0.03em; }
        .timeline-header p { font-family: 'Syne', sans-serif; font-size: clamp(15px,1.4vw,18px); color: #7A7D8B; line-height: 1.7; margin: 0; font-weight: 400; }
        .blocks-list { max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 0; position: relative; }
        .blocks-list::before { content: ''; position: absolute; left: 160px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, #E5E6EB 8%, #E5E6EB 92%, transparent); }
        .block-item { display: grid; grid-template-columns: 180px 1fr; gap: 60px; padding: 56px 0; border-bottom: 1px solid rgba(229,230,235,0.5); align-items: start; }
        .block-item:last-child { border-bottom: none; }
        .year-col { display: flex; flex-direction: column; align-items: flex-end; padding-right: 40px; padding-top: 6px; position: relative; }
        .year-num { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; color: #040617; line-height: 1; letter-spacing: -0.03em; }
        .year-line { position: absolute; right: -1px; top: 16px; width: 12px; height: 1px; background: #FFD900; }
        .year-line::before { content: ''; position: absolute; right: -4px; top: 50%; transform: translateY(-50%); width: 9px; height: 9px; border-radius: 50%; background: #FFD900; box-shadow: 0 0 0 3px rgba(255,217,0,0.15); }
        .content-col { display: flex; flex-direction: column; gap: 20px; }
        .block-label { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #000000; background: rgba(255,217,0,0.1); padding: 5px 12px; border-radius: 100px; width: fit-content; }
        .block-text { font-family: 'Syne', sans-serif; font-size: clamp(16px,1.6vw,21px); line-height: 1.75; color: #3A3D4A; margin: 0; font-weight: 400; }

        .legacy-cta { background: #05080F; padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px); position: relative; overflow: hidden; }
        .cta-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center; }
        .cta-label { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin: 0 0 20px; }
        .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px,6vw,88px); font-weight: 300; color: #FFFFFF; margin: 0; line-height: 0.92; letter-spacing: -0.03em; }
        .cta-title em { font-style: italic; color: #FFD900; }
        .cta-btn { display: inline-flex; align-items: center; gap: 16px; background: #FFD900; color: #040617; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 18px 32px; border-radius: 100px; text-decoration: none; transition: background 0.2s, transform 0.2s; flex-shrink: 0; white-space: nowrap; }
        .cta-btn:hover { background: #fff; transform: translateY(-2px); }
        .cta-arrow { width: 20px; height: 20px; transition: transform 0.2s; }
        .cta-btn:hover .cta-arrow { transform: translate(2px, -2px); }

        @media (max-width: 900px) {
          .timeline-header { grid-template-columns: 1fr; }
          .blocks-list::before { left: 80px; }
          .block-item { grid-template-columns: 100px 1fr; gap: 32px; }
          .year-num { font-size: 36px; }
          .cta-inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .blocks-list::before { display: none; }
          .block-item { grid-template-columns: 1fr; gap: 16px; }
          .year-col { align-items: flex-start; padding-right: 0; }
          .year-line { display: none; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="legacy-hero" ref={heroRef}>
        <div className="hero-grid-bg" />
        <div className="hero-gradient" />
        <div className="hero-year-bg">1835</div>
        <motion.div className="hero-content" style={{ y: titleY, opacity: titleOpacity }}>
          <p className="hero-eyebrow">{content.heroEyebrow}</p>
          <h1 className="hero-title">
            {content.heroTitleLine1}<br />
            <em>{content.heroTitleHighlight}</em><br />
            {content.heroTitleLine3}
          </h1>
          <p className="hero-sub">{content.heroSubtitle}</p>
          <div className="scroll-hint">
            <div className="scroll-line" />
            Scroll to explore
          </div>
        </motion.div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="legacy-timeline">
        <div className="timeline-header">
          <div>
            <p className="timeline-header-label">Our History</p>
            <h2>A Legacy<br />Built to Last</h2>
          </div>

        </div>
        <div className="blocks-list">
          {blocks.map((block, i) => (
            <Block key={block.year} block={block} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="legacy-cta">
        <div className="cta-inner">
          <div>
            <p className="cta-label">Dive Deeper</p>
            <h2 className="cta-title">
              {content.ctaTitle}
            </h2>
          </div>
          <a href={content.ctaButtonLink} className="cta-btn">
            {content.ctaButtonText}
            <svg className="cta-arrow" viewBox="0 0 20 20" fill="none">
              <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}