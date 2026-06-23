"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Play, X } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

// Extract an 11-char YouTube id from a full URL, youtu.be link, or raw id.
function getYouTubeId(url) {
  if (!url) return null;
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(url) ? url : null;
}

const staticProjects = [
  {
    slug: "buxton-college", status: "active", label: "Active Project",
    title: "Buxton College", location: "Jamaica, Buxton",
    mediaUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=2200&q=80",
    progress: 65, raised: "$14M", goal: "$20M", raisedRaw: 14000000, goalRaw: 20000000,
    description: ["The Buxton College Project is a cornerstone initiative by the Mico Foundation, dedicated to preserving and restoring one of Jamaica's most iconic historical landmarks.", "This project aims to fully restore the Buxton Building's structure, renew its learning facilities, and repurpose the space into a vibrant, modern center for academic development.", "With the support of donors, alumni, and community partners, we are working to ensure that Buxton College continues to inspire and serve students and educators for decades to come."],
    donationItems: ["Deteriorating Roof & Ceiling", "Decaying Columns", "Rotten Doors & Windows", "Aged & Peeling Paint", "Modernize and Beautify the Building"],
  },
];

function formatCurrency(amount) {
  if (!amount) return "$0";
  if (amount >= 1000000) return `$${Math.round(amount / 1000000)}M`;
  if (amount >= 1000) return `$${Math.round(amount / 1000)}K`;
  return `$${amount}`;
}

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const step = (ts) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function StatCounter({ value, label, prefix = "", suffix = "" }) {
  const [count, ref] = useCountUp(typeof value === "number" ? value : 0);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(48px,6vw,88px)", fontWeight: 700, color: "#FFD900", margin: 0, lineHeight: 1, letterSpacing: "-0.02em" }}>
        {prefix}{typeof value === "number" ? count : value}{suffix}
      </p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.14em", margin: "10px 0 0", fontWeight: 500 }}>{label}</p>
    </div>
  );
}

export default function ProjectDetailPage({ slug }) {
  const [project, setProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const { scrollYProgress } = useScroll();
  const imgScale = useTransform(scrollYProgress, [0, 0.25], [1.08, 1]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.3], [0.5, 0.25]);

  useEffect(() => {
    async function fetchProject() {
      try {
        const all = await client.fetch(queries.projects);
        if (all?.length) {
          const found = all.find(p => p.slug === slug);
          if (found) {
            const progress = found.targetAmount > 0 ? Math.round((found.amountDonated / found.targetAmount) * 100) : 0;
            setProject({
              slug: found.slug,
              status: found.status,
              label: found.label,
              title: found.title,
              location: found.location,
              mediaUrl: found.image ? urlFor(found.image).width(2200).url() : staticProjects[0].mediaUrl,
              videoUrl: found.videoUrl || null,
              progress,
              raised: formatCurrency(found.amountDonated),
              goal: formatCurrency(found.targetAmount),
              raisedRaw: found.amountDonated,
              goalRaw: found.targetAmount,
              description: found.description ? found.description.split("\n\n").filter(Boolean) : [],
              donationItems: found.completedItems || [],
            });
            const active = all.filter(p => p.status === "active");
            const idx = active.findIndex(p => p.slug === slug);
            const nxt = active[(idx + 1) % active.length];
            if (nxt?.slug !== slug) setNextProject(nxt);
          } else {
            setProject(staticProjects[0]);
          }
        } else {
          setProject(staticProjects[0]);
        }
      } catch {
        setProject(staticProjects[0]);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchProject();
    } else {
      setProject(staticProjects[0]);
      setLoading(false);
    }
  }, [slug]);

  // Lightbox: close on Escape, lock background scroll while open
  useEffect(() => {
    if (!showVideo) return;
    const onKey = e => { if (e.key === "Escape") setShowVideo(false); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [showVideo]);

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#05060F", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <style>{`@keyframes spin2{to{transform:rotate(360deg)}}`}</style>
      <div style={{ width: "48px", height: "48px", border: "2px solid rgba(255,217,0,0.15)", borderTopColor: "#FFD900", borderRadius: "50%", animation: "spin2 0.7s linear infinite" }} />
    </div>
  );

  if (!project) return null;

  const videoId = getYouTubeId(project.videoUrl);

  return (
    <main style={{ background: "#05060F" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600&display=swap');
        .pd-back { font-family:'Inter',sans-serif; display:inline-flex; align-items:center; gap:8px; color:rgba(255,255,255,0.4); font-size:14px; text-decoration:none; transition:color 0.2s; font-weight:500; letter-spacing:0.04em; text-transform:uppercase; }
        .pd-back:hover { color:#FFD900; }
        .pd-back svg { transition:transform 0.2s; }
        .pd-back:hover svg { transform:translateX(-3px); }
        .pd-item:hover { background:rgba(255,217,0,0.06) !important; border-color:rgba(255,217,0,0.2) !important; }
        .pd-next:hover { background:rgba(255,217,0,0.05) !important; }
        .pd-next:hover .pd-next-arrow { background:#FFD900 !important; }

        .pd-watch-btn { display:inline-flex; align-items:center; gap:12px; margin-top:32px; padding:11px 22px 11px 11px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.14); border-radius:100px; color:#fff; font-family:'Inter',sans-serif; font-size:14px; font-weight:600; letter-spacing:0.02em; cursor:pointer; transition:background 0.25s, border-color 0.25s, transform 0.2s; }
        .pd-watch-btn:hover { background:rgba(255,217,0,0.12); border-color:rgba(255,217,0,0.4); transform:translateY(-2px); }
        .pd-watch-icon { display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:50%; background:#FFD900; flex-shrink:0; transition:transform 0.2s; }
        .pd-watch-btn:hover .pd-watch-icon { transform:scale(1.08); }
        .pd-lb-close:hover { background:rgba(255,255,255,0.2) !important; }

        .pd-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; position:relative; }
        .pd-used-head { display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:end; margin-bottom:clamp(48px,6vw,80px); }
        @media (max-width: 900px) {
          .pd-hero { grid-template-columns:1fr; min-height:auto; }
          .pd-hero-img { height:56vh; min-height:320px; order:-1; }
          .pd-hero-text { justify-content:flex-start !important; gap:44px; padding-top:96px !important; padding-bottom:56px !important; }
          .pd-used-head { grid-template-columns:1fr !important; gap:24px !important; }
        }
      `}</style>

      {/* ── VIDEO LIGHTBOX ── */}
      <AnimatePresence>
        {showVideo && videoId && (
          <motion.div
            key="pd-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowVideo(false)}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(4,6,15,0.92)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,48px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{ position: "relative", width: "100%", maxWidth: "1100px", aspectRatio: "16 / 9" }}
            >
              <button
                onClick={() => setShowVideo(false)}
                className="pd-lb-close"
                aria-label="Close video"
                style={{ position: "absolute", top: "-52px", right: "0", width: "40px", height: "40px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
              >
                <X size={20} />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${project.title} video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%", borderRadius: "14px", display: "block", boxShadow: "0 30px 80px rgba(0,0,0,0.55)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO: SPLIT LAYOUT ── */}
      <section className="pd-hero">

        {/* Left — text panel */}
        <div className="pd-hero-text" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(32px,4vw,56px) clamp(32px,4vw,72px)", background: "#05060F", position: "relative", zIndex: 2 }}>

          {/* Top nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/" className="pd-back">
              <ArrowLeft size={14} />
              Back
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,217,0,0.1)", border: "1px solid rgba(255,217,0,0.2)", borderRadius: "100px", padding: "5px 14px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FFD900" }} />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 600, color: "#FFD900", letterSpacing: "0.1em", textTransform: "uppercase" }}>{project.label || "Active"}</span>
            </div>
          </div>

          {/* Main title block */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
              <MapPin size={14} color="rgba(255,255,255,0.35)" />
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em" }}>{project.location}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(54px,7.5vw,124px)", fontWeight: 900, color: "#FFFFFF", lineHeight: 0.88, letterSpacing: "-0.03em", margin: 0 }}>
              {project.title}
            </motion.h1>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
              style={{ height: "2px", background: "linear-gradient(to right, #FFD900, transparent)", marginTop: "36px", transformOrigin: "left" }} />

            {/* Watch Video CTA — only when the CMS has a video link */}
            {videoId && (
              <motion.button
                type="button"
                onClick={() => setShowVideo(true)}
                className="pd-watch-btn"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
                aria-label="Watch project video"
              >
                <span className="pd-watch-icon"><Play size={15} fill="#040617" color="#040617" /></span>
                <span>Watch the Video</span>
              </motion.button>
            )}
          </div>

          {/* Progress + stats */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em" }}>PROGRESS</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "20px", color: "#FFD900", fontWeight: 700 }}>{project.progress}%</span>
            </div>
            <div style={{ height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "100px", overflow: "hidden", marginBottom: "28px" }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                style={{ height: "100%", background: "linear-gradient(to right, #FFD900, #FFF3A0)", borderRadius: "100px" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
              {[{ label: "Raised", value: project.raised, gold: true }, { label: "Goal", value: project.goal }].map((s, i) => (
                <div key={i} style={{ padding: "20px 24px", background: "#05060F" }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", margin: "0 0 6px" }}>{s.label}</p>
                  <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(28px,3vw,40px)", fontWeight: 700, color: s.gold ? "#FFD900" : "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1 }}>{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — image panel */}
        <div className="pd-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <motion.img src={project.mediaUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", scale: imgScale, opacity: imgOpacity }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #05060F 0%, rgba(5,6,15,0.2) 40%, rgba(5,6,15,0) 100%)" }} />
          <div style={{ position: "absolute", bottom: "48px", right: "48px", fontFamily: "'Playfair Display',serif", fontSize: "160px", fontWeight: 900, color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none" }}>01</div>
        </div>
      </section>

      {/* ── PROJECT STORY ── */}
      <section style={{ background: "#FAFAF7", padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "56px" }}>
            <div style={{ width: "48px", height: "2px", background: "#040617" }} />
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: "12px", fontWeight: 600, color: "#040617", textTransform: "uppercase", letterSpacing: "0.16em" }}>Project Story</span>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px,5vw,64px)" }}>
            {project.description.map((para, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: i * 0.08 }}
                style={{ fontFamily: i === 0 ? "'Playfair Display',serif" : "'Inter',sans-serif", fontSize: i === 0 ? "clamp(28px,3.2vw,46px)" : "clamp(18px,1.8vw,24px)", lineHeight: i === 0 ? 1.25 : 1.75, color: i === 0 ? "#040617" : "#4A4D5A", margin: 0, marginLeft: i % 2 === 1 ? "clamp(40px,8vw,140px)" : 0, fontWeight: i === 0 ? 700 : 300, letterSpacing: i === 0 ? "-0.02em" : "0" }}>
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW YOUR DONATION IS USED ── */}
      <section style={{ background: "#08090F", padding: "clamp(80px,10vw,120px) clamp(24px,5vw,80px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display',serif", fontSize: "clamp(100px,18vw,280px)", fontWeight: 900, color: "rgba(255,217,0,0.025)", whiteSpace: "nowrap", pointerEvents: "none", lineHeight: 1, userSelect: "none" }}>BUILD</div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="pd-used-head">
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(36px,5vw,72px)", fontWeight: 700, color: "#FFFFFF", margin: 0, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              How Your<br /><em style={{ color: "#FFD900" }}>Donation</em><br />Is Used
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ fontFamily: "'Inter',sans-serif", fontSize: "clamp(16px,1.6vw,20px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
              Every dollar donated goes directly toward restoring and transforming {project.title} into a world-class educational institution.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
            {project.donationItems.map((item, i) => (
              <motion.div key={i} className="pd-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "18px", padding: "28px 24px", display: "flex", gap: "18px", alignItems: "flex-start", transition: "background 0.2s, border-color 0.2s", cursor: "default" }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "13px", fontWeight: 700, color: "rgba(255,217,0,0.5)", minWidth: "28px", marginTop: "2px" }}>0{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ width: "28px", height: "2px", background: "#FFD900", borderRadius: "1px", marginBottom: "14px", opacity: 0.6 }} />
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "17px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5, margin: 0, fontWeight: 400 }}>{item}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)", borderRadius: "20px", overflow: "hidden", marginTop: "48px" }}>
            {[
              { label: "Fundraising Goal", value: project.goalRaw || 20000000, prefix: "$", suffix: "" },
              { label: "Total Raised", value: project.raisedRaw || 14000000, prefix: "$", suffix: "" },
              { label: "Percent Funded", value: project.progress, prefix: "", suffix: "%" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "32px 24px", background: i === 1 ? "rgba(255,217,0,0.06)" : "#08090F", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <StatCounter value={s.value} label={s.label} prefix={s.prefix} suffix={s.suffix} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEXT PROJECT ── */}
      {nextProject && (
        <section style={{ background: "#05060F", padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", justifyContent: "flex-end" }}>
            <Link href={`/projectdetail/${nextProject.slug}`} className="pd-next" style={{ display: "flex", alignItems: "center", gap: "28px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "20px", padding: "28px 36px", textDecoration: "none", transition: "background 0.25s" }}>
              <div>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>Next Project</p>
                <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(22px,2.8vw,36px)", color: "#FFFFFF", margin: 0, lineHeight: 1.05, fontWeight: 700 }}>{nextProject.title}</p>
              </div>
              <div className="pd-next-arrow" style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.25s" }}>
                <ArrowRight size={22} color="rgba(255,255,255,0.6)" />
              </div>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}