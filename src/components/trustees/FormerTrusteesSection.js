"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

// Decode HTML entities (e.g. &#39; → ') that can come from the CMS
function decode(str = "") {
  return String(str)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const staticFormerTrustees = [
  { id: 1, years: "1821-1836", name: "Sir Stephen Lushington", description: "A British judge, Member of Parliament, and a radical for the abolition of slavery and capital punishment. He was influential in the transfer of the funds of the Lady Mico Charity to establish educational institutions in the West Indies.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80" },
  { id: 2, years: "1836-1845", name: "Sir Thomas Fowell Buxton", description: "The first chairman of the Lady Mico Charity from 1836–1845, and superintendent of the Negro Education Grant. Under his leadership, four teachers' colleges and 300 elementary schools were set up by the charity in the British colonies of Mauritius, the Seychelles, and the West Indies.", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80" },
  { id: 3, years: "1984-2006", name: "Professor The Honourable Errol Miller, OJ CD", description: "The first citizen outside of the United Kingdom to become a Trustee of the Lady Mico Trust. Professor Miller became a Trustee in 1984 and was instrumental in the modern partnership between the Lady Mico Trust and The Mico Foundation.", image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80" },
];

function TrusteeCard({ trustee, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="ft-card"
    >
      <div className="ft-bar" />
      <div className="ft-img-wrap">
        <img src={trustee.image} alt={decode(trustee.name)} className="ft-img" />
      </div>
      <div className="ft-body">
        <span className="ft-years">{trustee.years}</span>
        <h3 className="ft-name" style={inter}>{decode(trustee.name)}</h3>
        <div className="ft-divider" />
        <p className="ft-bio" style={inter}>{decode(trustee.description)}</p>
      </div>
    </motion.article>
  );
}

export default function FormerTrusteesSection() {
  const [trustees, setTrustees] = useState(staticFormerTrustees);

  useEffect(() => {
    async function fetchTrustees() {
      try {
        const data = await client.fetch(queries.formerTrustees);
        if (data?.length > 0) {
          setTrustees(data.map(t => ({
            id: t._id,
            years: t.years,
            name: t.name,
            description: t.description,
            image: t.photo ? urlFor(t.photo).width(900).url() : staticFormerTrustees[0].image,
          })));
        }
      } catch (error) {
        console.error('Error fetching former trustees:', error);
      }
    }
    fetchTrustees();
  }, []);

  return (
    <section className="ft-section">
      <style>{`
        .ft-section { position: relative; overflow: hidden; background: #FAFAF7; padding: clamp(64px,8vw,110px) clamp(24px,5vw,80px); }
        .ft-glow-a { position:absolute; top:-160px; right:-120px; width:460px; height:460px; border-radius:50%; background: radial-gradient(circle, rgba(245,183,0,0.10) 0%, rgba(245,183,0,0) 70%); pointer-events:none; }
        .ft-glow-b { position:absolute; bottom:-180px; left:-140px; width:480px; height:480px; border-radius:50%; background: radial-gradient(circle, rgba(4,6,23,0.05) 0%, rgba(4,6,23,0) 70%); pointer-events:none; }
        .ft-inner { position: relative; z-index: 1; max-width: 1480px; margin: 0 auto; }

        .ft-quote { max-width: 980px; margin: 0 auto; text-align: center; font-family: 'Inter', sans-serif; font-size: clamp(20px,2.4vw,30px); font-weight: 500; line-height: 1.45; letter-spacing: -0.02em; color: #6F7181; font-style: italic; }
        .ft-quote-author { text-align:center; font-family:'Inter',sans-serif; font-size: clamp(15px,1.3vw,18px); font-weight:700; color:#040617; margin: 18px 0 0; }
        .ft-eyebrow { display:flex; align-items:center; justify-content:center; gap:12px; margin: clamp(36px,5vw,56px) 0 14px; }
        .ft-eyebrow span { font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#B8860B; }
        .ft-eyebrow .bar { width:32px; height:2px; background:#f3af19; }
        .ft-title { text-align:center; font-family:'Inter',sans-serif; font-size: clamp(42px,6vw,72px); font-weight:800; letter-spacing:-0.04em; color:#040617; line-height:1; margin:0 0 clamp(40px,6vw,60px); }

        .ft-grid { display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: clamp(20px,2.2vw,32px); align-items: start; }
        @media (max-width: 980px) { .ft-grid { grid-template-columns: 1fr; max-width: 460px; margin: 0 auto; } }

        .ft-card { display:flex; flex-direction:column; background:#fff; border:1px solid #ECEDF1; border-radius:22px; overflow:hidden; box-shadow:0 2px 10px rgba(10,13,18,0.05); transition: transform .28s ease, box-shadow .28s ease; }
        .ft-card:hover { transform: translateY(-6px); box-shadow: 0 28px 56px rgba(10,13,18,0.14); }
        .ft-bar { height:5px; width:100%; background:#f3af19; }
        .ft-img-wrap { width:100%; height: clamp(300px,30vw,360px); overflow:hidden; background:#0d1326; }
        .ft-img { width:100%; height:100%; object-fit:cover; object-position: top center; transition: transform .4s ease; }
        .ft-card:hover .ft-img { transform: scale(1.04); }
        .ft-body { padding: clamp(24px,2vw,30px); display:flex; flex-direction:column; gap:14px; }
        .ft-years { width:fit-content; background:#FFF7CC; color:#8A6D00; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:6px 14px; border-radius:100px; }
        .ft-name { font-family:'Inter',sans-serif; font-size:22px; font-weight:700; line-height:1.2; letter-spacing:-0.02em; color:#040617; margin:0; }
        .ft-divider { height:1px; width:100%; background:#ECEDF1; }
        .ft-bio { font-family:'Inter',sans-serif; font-size:15px; line-height:1.72; color:#5A5C6B; margin:0; }
      `}</style>

      <div className="ft-glow-a" />
      <div className="ft-glow-b" />

      <div className="ft-inner">
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="ft-quote">
            &ldquo;The longer I live, the more I am certain that the great difference between men — between the feeble and the powerful, the great and the insignificant — is energy, invincible determination.&rdquo;
          </p>
          <p className="ft-quote-author">— Sir Thomas Fowell Buxton</p>

          <div className="ft-eyebrow">
            <span className="bar" />
            <span>Honouring Those Who Came Before</span>
            <span className="bar" />
          </div>
          <h2 className="ft-title">Former Trustees</h2>
        </motion.div>

        <div className="ft-grid">
          {trustees.map((trustee, i) => <TrusteeCard key={trustee.id} trustee={trustee} index={i} />)}
        </div>
      </div>
    </section>
  );
}
