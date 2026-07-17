"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

// Joe Bartley — Lead Trustee. Shares the same portrait as the hero.
// Drop his photo at /public/images/trustees/joe-bartley.jpg to replace the placeholder.
const joeBartleyImage = "/images/trustees/joe-bartley.jpg";
const joeBartleyFallback = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80";

const staticLeader = {
  name: "Joe Bartley",
  role: "Lead Trustee",
  org: "The Mico Foundation",
  eyebrow: "A Word from Our Lead Trustee",
  headingBefore: "Stewardship, Service",
  headingHighlight: "&",
  headingAfter: "Legacy",
  image: null,
  message: [
    "For nearly two centuries, the Lady Mico Trust has stood as a beacon of educational opportunity across the Caribbean. To serve as a steward of that legacy is both a profound privilege and a serious responsibility — one our trustees carry with deep humility and unwavering commitment.",
    "Our role is to protect what has been entrusted to us, to grow it wisely, and to ensure that the doors of education remain open for the generations still to come. Every decision we make is measured against a single question: does it strengthen and sustain the mission of The Mico?",
    "I am grateful to our fellow trustees, our partners, our donors, and the wider Mico family for walking this journey with us. Together, we continue to honour the past while building a future worthy of those who came before — and those who will follow.",
  ],
};

function getSignature(name) {
  const parts = (name || "").trim().split(" ");
  const first = parts[0]?.[0] || "";
  const last = parts[parts.length - 1] || "";
  return `${first}. ${last}`;
}

export default function TrusteeLeader() {
  const [leader, setLeader] = useState(staticLeader);

  useEffect(() => {
    async function fetchLeader() {
      try {
        const data = await client.fetch(queries.trusteeLeader);
        if (data) {
          setLeader({
            name: data.name || staticLeader.name,
            role: data.role || staticLeader.role,
            org: data.org || staticLeader.org,
            eyebrow: data.eyebrow || staticLeader.eyebrow,
            headingBefore: data.headingBefore || staticLeader.headingBefore,
            headingHighlight: data.headingHighlight || staticLeader.headingHighlight,
            headingAfter: data.headingAfter || staticLeader.headingAfter,
            image: data.portrait ? urlFor(data.portrait).width(900).url() : null,
            message: data.message
              ? data.message.split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
              : staticLeader.message,
          });
        }
      } catch (error) {
        console.error("Error fetching trustee leader content:", error);
      }
    }
    fetchLeader();
  }, []);

  const signature = getSignature(leader.name);
  const portraitSrc = leader.image || joeBartleyImage;

  return (
    <section className="leader-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Syne:wght@400;500;700&family=Playfair+Display:ital@1&display=swap');

        .leader-section { background: #FAFAF7; padding: clamp(80px,10vw,140px) clamp(24px,5vw,80px); position: relative; overflow: hidden; }
        .leader-glow-a { position: absolute; top: -160px; right: -120px; width: 460px; height: 460px; border-radius: 50%; background: radial-gradient(circle, rgba(255,217,0,0.12) 0%, rgba(255,217,0,0) 70%); pointer-events: none; }
        .leader-glow-b { position: absolute; bottom: -180px; left: -140px; width: 480px; height: 480px; border-radius: 50%; background: radial-gradient(circle, rgba(0,31,63,0.06) 0%, rgba(0,31,63,0) 70%); pointer-events: none; }

        .leader-inner { position: relative; z-index: 1; max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 440px 1fr; gap: clamp(48px,6vw,96px); align-items: start; }

        .leader-photo-wrap { position: relative; }
        .leader-accent-bar { position: absolute; left: -4px; top: 0; bottom: 0; width: 4px; border-radius: 4px; background: #FFD900; }
        .leader-photo { width: 100%; height: 560px; object-fit: cover; object-position: top center; border-radius: 0 20px 0 0; display: block; }
        .leader-photo-frame { border-radius: 0 20px 0 20px; overflow: hidden; box-shadow: var(--shadow-4); }
        .leader-name-plate { background: #05080F; padding: 24px 28px; border-radius: 0 0 20px 0; }
        .leader-name-plate h3 { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; color: #fff; margin: 0 0 4px; letter-spacing: -0.02em; }
        .leader-name-plate p { font-family: 'Syne', sans-serif; font-size: 13px; color: rgba(255,255,255,0.55); margin: 0; font-style: italic; }

        .leader-eyebrow { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #8A8E9D; margin: 0 0 18px; display: flex; align-items: center; gap: 12px; }
        .leader-eyebrow::before { content: ''; display: block; width: 32px; height: 1px; background: #FFD900; }
        .leader-heading { font-family: 'Cormorant Garamond', serif; font-size: clamp(38px,4.6vw,64px); font-weight: 600; color: #040617; margin: 0 0 28px; line-height: 1.04; letter-spacing: -0.03em; }
        .leader-heading em { font-style: italic; color: #1A8C4A; }
        .leader-quote-mark { font-family: 'Cormorant Garamond', serif; font-size: 100px; line-height: 0.4; color: rgba(255,217,0,0.4); height: 40px; display: block; }
        .leader-msg p { font-family: 'Syne', sans-serif; font-size: clamp(16px,1.5vw,19px); line-height: 1.85; color: #3A3D4A; margin: 0 0 22px; font-weight: 400; }
        .leader-divider { height: 1px; background: rgba(4,6,23,0.07); margin: 32px 0; }
        .leader-sign-label { font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #9CA3AF; margin: 0 0 8px; }
        .leader-sign { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 36px; color: #040617; margin: 0; letter-spacing: -0.5px; }

        @media (max-width: 900px) {
          .leader-inner { grid-template-columns: 1fr; gap: 40px; }
          .leader-photo { height: clamp(360px, 80vw, 520px); }
        }
      `}</style>

      <div className="leader-glow-a" />
      <div className="leader-glow-b" />

      <div className="leader-inner">

        {/* LEFT — portrait */}
        <motion.div
          className="leader-photo-wrap"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div className="leader-accent-bar" />
          <div className="leader-photo-frame">
            <img
              className="leader-photo"
              src={portraitSrc}
              alt={`${leader.name}, ${leader.role}`}
              onError={(e) => { if (e.currentTarget.src !== joeBartleyFallback) e.currentTarget.src = joeBartleyFallback; }}
            />
            <div className="leader-name-plate">
              <h3>{leader.name}</h3>
              <p>{leader.role} · {leader.org}</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — message */}
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.1 }}
        >
          <p className="leader-eyebrow">{leader.eyebrow}</p>
          <h2 className="leader-heading">
            {leader.headingBefore} <em>{leader.headingHighlight}</em> {leader.headingAfter}
          </h2>

          <span className="leader-quote-mark">&ldquo;</span>
          <div className="leader-msg">
            {leader.message.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="leader-divider" />
          <p className="leader-sign-label">Official Signature</p>
          <p className="leader-sign">{signature}</p>
        </motion.div>

      </div>
    </section>
  );
}
