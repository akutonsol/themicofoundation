"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { client, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticValues = [
  { word: "COMMITMENT", desc: "As organizational and administrative loyalty and seeks always to be true to the ideals, mission and objectives of the Foundation and its services.", num: "01" },
  { word: "TRUTH", desc: "As fundamental to human dignity and seeks to uphold this in our lives and in works of the Foundation.", num: "02" },
  { word: "INTEGRITY & ETHICS", desc: "As entrenched principles of personal honesty, morals, and standards by which we live.", num: "03" },
  { word: "TRANSPARENCY", desc: "As essential to open and accountable ideals of governance that involve all stakeholders in our decision-making.", num: "04" },
  { word: "RESPECT", desc: "For self, others, the Foundation, and The Mico University College as a critical defining measure, and a source for building and maintaining good relationships.", num: "05" },
  { word: "INNOVATION", desc: "As the key to original thoughts and seeks to bring new and innovative ideas to enhance the work and resources of the Foundation.", num: "06" },
  { word: "PARTNERSHIP", desc: "As an important element in forging mutual relationships and participation among stakeholders.", num: "07" },
  { word: "SERVICE", desc: "As the cornerstone of everything we do — giving back to our community and those we serve with dedication and purpose.", num: "08" },
];

const staticContent = {
  eyebrow: "Our Mission",
  title: "Values That Guide Us",
  subtitle: "The principles that define how we operate, lead, and serve — anchored in a commitment to education, community, and lasting impact.",
  values: staticValues,
  ctaText: "Support Our Mission",
  ctaLink: "/donate",
};

function ValueRow({ value, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "start 40%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.6], [-32, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, x }} className="value-row">
      <span className="value-num">{String(index + 1).padStart(2, '0')}</span>
      <div className="value-divider" />
      <div className="value-body">
        <h3 className="value-word">{value.word}</h3>
        <p className="value-desc">{value.desc}</p>
      </div>
    </motion.div>
  );
}

export default function OurMission() {
  const [content, setContent] = useState(staticContent);
  const sectionRef = useRef(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.ourMission);
        if (data) {
          setContent({
            eyebrow: data.eyebrow || staticContent.eyebrow,
            title: data.title || staticContent.title,
            subtitle: data.subtitle || staticContent.subtitle,
            ctaText: data.ctaText || staticContent.ctaText,
            ctaLink: data.ctaLink || staticContent.ctaLink,
            values: data.values?.length > 0
              ? data.values
              : staticContent.values,
          });
        }
      } catch (error) {
        console.error('Error fetching our mission:', error);
      }
    }
    fetchContent();
  }, []);

  // Split title into two lines for the display format
  const titleParts = content.title.split(' ');
  const midpoint = Math.ceil(titleParts.length / 2);
  const titleLine1 = titleParts.slice(0, midpoint).join(' ');
  const titleLine2 = titleParts.slice(midpoint).join(' ');

  return (
    <section ref={sectionRef} className="mission-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .mission-section { position: relative; background: #040617; overflow: hidden; padding: clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px); }
        .mission-section::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,217,0,0.07) 1px, transparent 1px); background-size: 40px 40px; pointer-events: none; }
        .mission-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; }

        .mission-header { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: end; margin-bottom: clamp(60px, 8vw, 100px); padding-bottom: clamp(40px, 5vw, 60px); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mission-eyebrow { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #FFD900; margin: 0 0 20px; display: flex; align-items: center; gap: 12px; }
        .mission-eyebrow::before { content: ''; display: block; width: 28px; height: 1px; background: #FFD900; }
        .mission-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 7vw, 104px); font-weight: 300; line-height: 0.88; letter-spacing: -0.03em; color: #FFFFFF; margin: 0; }
        .mission-title strong { font-weight: 600; font-style: italic; color: #FFD900; }
        .mission-subtitle { font-family: 'DM Sans', sans-serif; font-size: clamp(16px, 1.6vw, 20px); font-weight: 300; color: rgba(255,255,255,0.4); line-height: 1.75; margin: 0; max-width: 520px; align-self: end; }

        .values-list { display: flex; flex-direction: column; }
        .value-row { display: grid; grid-template-columns: 52px 1px 1fr; gap: 32px; align-items: start; padding: 32px 0; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background 0.3s; cursor: default; }
        .value-row:last-child { border-bottom: none; }
        .value-row:hover { background: rgba(255,217,0,0.03); border-radius: 12px; padding-left: 16px; padding-right: 16px; margin: 0 -16px; }
        .value-num { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 400; color: rgba(255,217,0,0.4); letter-spacing: 0.08em; padding-top: 4px; line-height: 1; align-self: start; }
        .value-divider { width: 1px; height: 100%; min-height: 56px; background: linear-gradient(to bottom, rgba(255,217,0,0.3), transparent); }
        .value-body { display: grid; grid-template-columns: 1fr 1.6fr; gap: 40px; align-items: start; }
        .value-word { font-family: 'Cormorant Garamond', serif; font-size: clamp(22px, 2.8vw, 38px); font-weight: 600; color: #FFFFFF; margin: 0; line-height: 1.05; letter-spacing: -0.02em; padding-top: 2px; }
        .value-desc { font-family: 'DM Sans', sans-serif; font-size: clamp(14px, 1.3vw, 17px); font-weight: 300; color: rgba(255,255,255,0.45); line-height: 1.75; margin: 0; }

        .mission-cta { margin-top: clamp(60px, 8vw, 96px); padding-top: clamp(40px, 5vw, 56px); border-top: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
        .cta-text { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 4vw, 52px); font-weight: 300; color: rgba(255,255,255,0.7); margin: 0; line-height: 1.1; letter-spacing: -0.02em; }
        .cta-text em { font-style: italic; color: #FFD900; }
        .cta-pill { display: inline-flex; align-items: center; gap: 12px; background: #FFD900; color: #040617; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; padding: 16px 28px; border-radius: 100px; text-decoration: none; transition: background 0.2s, transform 0.2s; flex-shrink: 0; }
        .cta-pill:hover { background: #fff; transform: translateY(-2px); }

        @media (max-width: 900px) { .mission-header { grid-template-columns: 1fr; gap: 28px; } .value-body { grid-template-columns: 1fr; gap: 10px; } .mission-cta { flex-direction: column; align-items: flex-start; } }
        @media (max-width: 600px) { .value-row { grid-template-columns: 36px 1px 1fr; gap: 16px; } }
      `}</style>

      <div className="mission-inner">
        <motion.div className="mission-header" initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div>
            <p className="mission-eyebrow">{content.eyebrow}</p>
            <h2 className="mission-title">
              {titleLine1}<br />
              <strong>{titleLine2}</strong>
            </h2>
          </div>
          <p className="mission-subtitle">{content.subtitle}</p>
        </motion.div>

        <div className="values-list">
          {content.values.map((v, i) => (
            <ValueRow key={i} value={v} index={i} />
          ))}
        </div>

        <motion.div className="mission-cta" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="cta-text">
            Guided by purpose,<br />
            <em>driven by service.</em>
          </p>
          <a href={content.ctaLink} className="cta-pill">
            {content.ctaText}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}