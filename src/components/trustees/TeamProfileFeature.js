"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticTeam = [
  { name: "Mr. Charles Benson", role: "Trustee", email: "", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80", bio: "Charles brings decades of governance and stewardship experience to the Board of Trustees." },
  { name: "Kelly Markus", role: "Trustee", email: "kmarkus@hunterspoint.co", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80", bio: "Kelly most recently served as the VP of Experiential Marketing at Refinery29, growing revenue significantly across two years." },
  { name: "Carin Murphy", role: "Trustee", email: "carin@micofoundation.org", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=80", bio: "Carin leads strategy, partnerships, operations, and stakeholder alignment across foundation initiatives." },
  { name: "Edward Chiquitucto", role: "Trustee", email: "edward@micofoundation.org", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80", bio: "Edward brings creative direction, visual storytelling, and brand experience across design-led campaigns and institutional projects." },
  { name: "Mars Khan", role: "Trustee", email: "mars@micofoundation.org", image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=1000&q=80", bio: "Mars supports production, coordination, community engagement, and project execution across major initiatives." },
];

function TrusteeCard({ member, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(member)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="ct-card"
    >
      <div className="ct-img-wrap">
        <img src={member.image} alt={member.name} className="ct-img" />
        <span className="ct-view">View profile →</span>
      </div>
      <div className="ct-meta">
        <h3 className="ct-name" style={inter}>{member.name}</h3>
        <p className="ct-role" style={inter}>{member.role}</p>
      </div>
    </motion.button>
  );
}

function ProfileModal({ member, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  return (
    <AnimatePresence>
      {member && (
        <>
          <motion.div className="ct-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <div className="ct-modal-wrap" onClick={onClose}>
            <motion.div className="ct-modal"
              initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              onClick={e => e.stopPropagation()}
            >
              <button type="button" className="ct-close" onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </button>
              <div className="ct-modal-img">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="ct-modal-body">
                <p className="ct-modal-eyebrow" style={inter}>Board of Trustees</p>
                <h2 className="ct-modal-name" style={inter}>{member.name}</h2>
                <p className="ct-modal-role" style={inter}>{member.role}</p>
                <div className="ct-modal-divider" />
                <p className="ct-modal-bio" style={inter}>{member.bio}</p>
                {member.email && (
                  <a href={`mailto:${member.email}`} className="ct-modal-email" style={inter}>{member.email}</a>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function TeamProfileFeature() {
  const [team, setTeam] = useState(staticTeam);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function fetchBoardMembers() {
      try {
        const data = await client.fetch(queries.trustees);
        if (data?.length > 0) {
          setTeam(data.map(m => ({
            name: m.name,
            role: m.role,
            email: m.email || '',
            bio: m.bio || '',
            image: m.photo ? urlFor(m.photo).width(800).url() : staticTeam[0].image,
          })));
        }
      } catch (error) {
        console.error('Error fetching board members:', error);
      }
    }
    fetchBoardMembers();
  }, []);

  return (
    <section className="ct-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .ct-section { position: relative; overflow: hidden; background: #05121F; padding: clamp(64px,8vw,110px) clamp(24px,5vw,80px); }
        .ct-section::before { content:''; position:absolute; top:-180px; right:-140px; width:520px; height:520px; border-radius:50%; background: radial-gradient(circle, rgba(255,217,0,0.10) 0%, rgba(255,217,0,0) 70%); pointer-events:none; }
        .ct-inner { position: relative; z-index: 1; max-width: 1440px; margin: 0 auto; }

        .ct-head-row { display:flex; align-items:flex-end; justify-content:space-between; gap:24px; margin: 0 0 clamp(36px,5vw,52px); }
        .ct-head { max-width: 720px; }
        .ct-eyebrow { display:inline-flex; align-items:center; gap:12px; font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#FFD900; margin:0 0 18px; }
        .ct-eyebrow .bar { width:32px; height:2px; background:#FFD900; }
        .ct-title { font-family:'Inter',sans-serif; font-size: clamp(38px,5vw,64px); font-weight:800; letter-spacing:-0.04em; line-height:1; color:#fff; margin:0; }
        .ct-sub { font-family:'Inter',sans-serif; font-size: clamp(15px,1.3vw,18px); line-height:1.65; color:rgba(255,255,255,0.55); margin: 18px 0 0; }

        .ct-grid { display:grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: clamp(14px,1.4vw,22px); }
        @media (max-width: 1100px) { .ct-grid { grid-template-columns: repeat(3, minmax(0,1fr)); } }
        @media (max-width: 640px)  { .ct-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }

        .ct-card { display:flex; flex-direction:column; text-align:left; padding:0; background:none; border:none; cursor:pointer; }
        .ct-img-wrap { position:relative; width:100%; aspect-ratio: 4/5; border-radius:18px; overflow:hidden; background:#0d1b2e; border:1px solid rgba(255,255,255,0.08); box-shadow: var(--shadow-dark-2); transition: box-shadow var(--dur-base) var(--ease-emphasized); }
        .ct-card:hover .ct-img-wrap { box-shadow: var(--shadow-dark-4), var(--glow-gold-soft); }
        .ct-img { width:100%; height:100%; object-fit:cover; object-position: top center; transition: transform .5s ease, filter .4s ease; filter: grayscale(0.15); }
        .ct-card:hover .ct-img { transform: scale(1.05); filter: grayscale(0); }
        .ct-img-wrap::after { content:''; position:absolute; inset:0; border-radius:18px; box-shadow: inset 0 0 0 0 rgba(255,217,0,0); transition: box-shadow .3s ease; pointer-events:none; }
        .ct-card:hover .ct-img-wrap::after { box-shadow: inset 0 0 0 2px rgba(255,217,0,0.85); }
        .ct-view { position:absolute; left:0; right:0; bottom:0; padding:34px 16px 14px; font-family:'Inter',sans-serif; font-size:13px; font-weight:700; letter-spacing:0.02em; color:#FFD900; background:linear-gradient(to top, rgba(4,6,23,0.9), rgba(4,6,23,0)); opacity:0; transform: translateY(8px); transition: opacity .3s ease, transform .3s ease; }
        .ct-card:hover .ct-view { opacity:1; transform: translateY(0); }
        .ct-meta { padding: 14px 2px 0; }
        .ct-name { font-family:'Inter',sans-serif; font-size: clamp(15px,1.1vw,18px); font-weight:700; letter-spacing:-0.02em; line-height:1.2; color:#fff; margin:0; }
        .ct-role { font-family:'Inter',sans-serif; font-size:13px; font-weight:500; color:rgba(255,255,255,0.5); margin:4px 0 0; }

        .ct-overlay { position:fixed; inset:0; background:rgba(3,6,15,0.72); backdrop-filter:blur(5px); z-index:4000; }
        .ct-modal-wrap { position:fixed; inset:0; z-index:4001; display:flex; align-items:center; justify-content:center; padding: clamp(16px,4vw,48px); }
        .ct-modal { position:relative; width:100%; max-width:880px; max-height:88vh; overflow:hidden; background:#0A1728; border:1px solid rgba(255,217,0,0.22); border-radius:24px; display:grid; grid-template-columns: 0.9fr 1.1fr; box-shadow:0 40px 100px rgba(0,0,0,0.6); }
        .ct-modal-img { background:#0d1b2e; }
        .ct-modal-img img { width:100%; height:100%; object-fit:cover; object-position: top center; display:block; }
        .ct-modal-body { padding: clamp(32px,4vw,48px); overflow-y:auto; }
        .ct-modal-eyebrow { font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#FFD900; margin:0 0 12px; }
        .ct-modal-name { font-size: clamp(28px,3.4vw,40px); font-weight:800; letter-spacing:-0.03em; line-height:1.02; color:#fff; margin:0; }
        .ct-modal-role { font-size:16px; font-weight:500; color:rgba(255,255,255,0.55); margin:10px 0 0; }
        .ct-modal-divider { height:1px; background:rgba(255,255,255,0.1); margin: clamp(22px,3vw,30px) 0; }
        .ct-modal-bio { font-size: clamp(15px,1.3vw,17px); line-height:1.75; color:rgba(255,255,255,0.72); margin:0; }
        .ct-modal-email { display:inline-block; margin-top:26px; font-size:14px; font-weight:600; color:#FFD900; text-decoration:none; border-bottom:1px solid rgba(255,217,0,0.4); padding-bottom:2px; }
        .ct-close { position:absolute; top:16px; right:16px; z-index:2; width:40px; height:40px; border-radius:50%; border:1px solid rgba(255,255,255,0.18); background:rgba(10,23,40,0.7); color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; transition: background .2s; }
        .ct-close:hover { background:rgba(255,255,255,0.14); }
        .ct-close svg { width:20px; height:20px; }
        @media (max-width: 720px) {
          .ct-modal { grid-template-columns: 1fr; max-height:90vh; overflow-y:auto; }
          .ct-modal-img { aspect-ratio: 3/2; }
        }
      `}</style>

      <div className="ct-inner">
        <div className="ct-head-row">
          <motion.header className="ct-head"
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          >
            <span className="ct-eyebrow"><span className="bar" /> Board of Trustees</span>
            <h2 className="ct-title">Lady Mico Trustees</h2>
            <p className="ct-sub">The stewards entrusted with safeguarding the mission, legacy, and future of The Mico.</p>
          </motion.header>
        </div>

        <div className="ct-grid">
          {team.map((member, i) => (
            <TrusteeCard key={member.name} member={member} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <ProfileModal member={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
