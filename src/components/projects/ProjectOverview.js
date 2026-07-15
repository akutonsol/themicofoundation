"use client";

import { useState, useEffect } from "react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const GOLD = "#f3af19";
const FALLBACKS = [
  "/images/home/banner1.png",
  "/images/home/banner2.png",
  "/images/home/banner3.png",
  "/images/home/banner4.png",
  "/images/home/project1.png",
];

const DEFAULTS = {
  heroImage: null,
  heroEyebrow: "Our Work",
  heroTitle: "Projects That Create Lasting Impact",
  heroSubtitle: "Through community programs, outreach initiatives, and meaningful partnerships, the Mico Foundation is committed to building brighter futures.",
  introEyebrow: "Current Initiatives",
  introTitle: "Supporting communities through purpose-driven projects",
  introBody: "Our projects are designed to meet real needs within the communities we serve. From education and youth development to outreach, wellness, and local support, each initiative reflects our mission to uplift, empower, and create opportunity.\n\nExplore our current projects and see how the Mico Foundation is making a difference one initiative at a time.",
  actionEyebrow: "In Action",
  actionTitle: "A look at our current projects",
  ctaEyebrow: "Explore More",
  ctaTitle: "View all of our foundation projects",
  ctaSubtitle: "Learn more about the initiatives currently making an impact through the Mico Foundation.",
  ctaButtonText: "View Our Projects",
  ctaButtonLink: "/projects",
};

export default function ProjectOverview() {
  const [projects, setProjects] = useState([]);
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch(queries.projects);
        if (data?.length > 0) {
          setProjects(data.map(p => ({
            title: p.title,
            slug: p.slug,
            image: p.image ? urlFor(p.image).width(1000).url() : null,
          })));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }
    async function fetchContent() {
      try {
        const d = await client.fetch(queries.projectOverview);
        if (d) {
          setContent(prev => {
            const merged = { ...prev };
            Object.keys(DEFAULTS).forEach(k => { if (d[k]) merged[k] = d[k]; });
            merged.heroImage = d.heroImage || null;
            return merged;
          });
        }
      } catch (error) {
        console.error("Error fetching project overview content:", error);
      }
    }
    fetchProjects();
    fetchContent();
  }, []);

  const heroImg = content.heroImage ? urlFor(content.heroImage).width(1800).url() : FALLBACKS[0];
  const introParas = (content.introBody || "").split(/\n{2,}/).map(s => s.trim()).filter(Boolean);

  // Build a 5-cell collage from current projects, padded with fallbacks.
  const collage = Array.from({ length: 5 }).map((_, i) => {
    const p = projects[i];
    return {
      img: p?.image || FALLBACKS[i % FALLBACKS.length],
      slug: p?.slug || null,
      title: p?.title || "",
    };
  });

  return (
    <section className="po">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        .po { background: #FFFDF9; }

        /* ── HERO ── */
        .po-hero { position: relative; min-height: clamp(460px, 62vh, 640px); display: flex; align-items: center; overflow: hidden; background: #050608; }
        .po-hero-img { position: absolute; inset: 0; z-index: 0; }
        .po-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
        .po-hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(100deg, rgba(5,6,8,0.97) 0%, rgba(5,6,8,0.88) 34%, rgba(5,6,8,0.45) 68%, rgba(5,6,8,0.15) 100%); }
        .po-hero-inner { position: relative; z-index: 2; max-width: 1440px; margin: 0 auto; width: 100%; padding: clamp(60px,8vw,96px) clamp(24px,5vw,80px); }
        .po-eyebrow { display:inline-flex; align-items:center; gap:12px; font-family:'Inter',sans-serif; font-size:13px; font-weight:800; letter-spacing:0.24em; text-transform:uppercase; color:${GOLD}; margin:0 0 22px; }
        .po-hero-title { font-family:'Inter',sans-serif; font-size: clamp(40px,6vw,74px); font-weight:800; letter-spacing:-0.035em; line-height:1.02; color:#fff; margin:0; max-width:720px; }
        .po-hero-rule { width:88px; height:4px; border-radius:4px; background:${GOLD}; margin: clamp(24px,3vw,34px) 0; }
        .po-hero-sub { font-family:'Inter',sans-serif; font-size: clamp(16px,1.4vw,19px); line-height:1.6; color:rgba(255,255,255,0.72); margin:0; max-width:520px; }

        /* ── CURRENT INITIATIVES ── */
        .po-intro { background:#F5F3EC; padding: clamp(60px,8vw,110px) clamp(24px,5vw,80px); }
        .po-intro-inner { max-width:1440px; margin:0 auto; display:grid; grid-template-columns: 1fr 1px 1fr; gap: clamp(32px,5vw,72px); align-items:start; }
        .po-intro-eyebrow { font-family:'Inter',sans-serif; font-size:12px; font-weight:800; letter-spacing:0.2em; text-transform:uppercase; color:#B8860B; margin:0 0 20px; }
        .po-intro-title { font-family:'Inter',sans-serif; font-size: clamp(30px,3.6vw,48px); font-weight:800; letter-spacing:-0.035em; line-height:1.08; color:#0A0A0A; margin:0; }
        .po-intro-title .dot { color:${GOLD}; }
        .po-intro-divider { background:#DEDBCF; width:1px; height:100%; }
        .po-intro-body p { font-family:'Inter',sans-serif; font-size: clamp(16px,1.35vw,18px); line-height:1.75; color:#4A4A4A; margin:0 0 22px; }
        .po-intro-body p:last-child { margin-bottom:0; }
        @media (max-width: 900px) {
          .po-intro-inner { grid-template-columns: 1fr; gap: 32px; }
          .po-intro-divider { display:none; }
        }

        /* ── IN ACTION collage ── */
        .po-action { background:#FFFDF9; padding: clamp(60px,8vw,110px) clamp(24px,5vw,80px); }
        .po-action-inner { max-width:1320px; margin:0 auto; }
        .po-action-head { text-align:center; margin:0 auto clamp(40px,5vw,56px); }
        .po-action-eyebrow { display:inline-block; font-family:'Inter',sans-serif; font-size:12px; font-weight:800; letter-spacing:0.22em; text-transform:uppercase; color:#B8860B; margin:0 0 14px; }
        .po-action-title { font-family:'Inter',sans-serif; font-size: clamp(30px,4vw,52px); font-weight:800; letter-spacing:-0.035em; line-height:1.05; color:#0A0A0A; margin:0; }
        .po-action-rule { width:70px; height:4px; border-radius:4px; background:${GOLD}; margin:20px auto 0; }

        .po-collage { display:grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: minmax(0, 1fr); gap: clamp(12px,1.6vw,20px); height: clamp(560px, 60vw, 760px); }
        .po-cell { position:relative; overflow:hidden; border-radius:18px; background:#0d0d0d; display:block; text-decoration:none; }
        .po-cell.tall { grid-row: span 2; }
        .po-cell img { width:100%; height:100%; object-fit:cover; object-position:center; transition: transform .55s ease; }
        .po-cell.link { cursor:pointer; }
        .po-cell.link:hover img { transform: scale(1.06); }
        .po-cell::after { content:''; position:absolute; inset:0; border-radius:18px; box-shadow: inset 0 0 0 0 ${GOLD}; transition: box-shadow .3s ease; pointer-events:none; }
        .po-cell.link:hover::after { box-shadow: inset 0 0 0 3px ${GOLD}; }
        .po-cell-label { position:absolute; left:0; right:0; bottom:0; z-index:2; padding: clamp(24px,3vw,36px) 18px 16px; opacity:0; transform: translateY(10px); transition: opacity .3s ease, transform .3s ease; background:linear-gradient(to top, rgba(5,6,8,0.92), rgba(5,6,8,0)); }
        .po-cell.link:hover .po-cell-label { opacity:1; transform: translateY(0); }
        .po-cell-name { font-family:'Inter',sans-serif; font-size:15px; font-weight:700; color:#fff; margin:0; line-height:1.25; }
        .po-cell-view { font-family:'Inter',sans-serif; font-size:12px; font-weight:700; letter-spacing:0.02em; color:${GOLD}; margin:6px 0 0; }
        @media (max-width: 820px) {
          .po-collage { grid-template-columns: 1fr 1fr; height:auto; grid-auto-rows: clamp(180px, 42vw, 260px); }
          .po-cell.tall { grid-row: span 1; }
        }
        @media (max-width: 520px) {
          .po-collage { grid-template-columns: 1fr; }
        }

        /* ── CTA banner ── */
        .po-cta-wrap { padding: 0 clamp(24px,5vw,80px) clamp(70px,9vw,120px); background:#FFFDF9; }
        .po-cta { position:relative; overflow:hidden; max-width:1320px; margin:0 auto; background: linear-gradient(135deg, #0B0B0D 0%, #141210 55%, #1c1607 100%); border:1px solid rgba(243,175,25,0.28); border-radius:26px; padding: clamp(44px,5vw,64px) clamp(28px,5vw,72px); display:flex; align-items:center; gap: clamp(28px,4vw,52px); }
        .po-cta::before { content:''; position:absolute; top:-120px; right:-80px; width:420px; height:420px; border-radius:50%; background: radial-gradient(circle, rgba(243,175,25,0.16) 0%, rgba(243,175,25,0) 70%); pointer-events:none; }
        .po-cta-icon { flex-shrink:0; width: clamp(88px,10vw,128px); height: clamp(88px,10vw,128px); border-radius:50%; background:${GOLD}; display:flex; align-items:center; justify-content:center; box-shadow: 0 18px 44px rgba(243,175,25,0.3); }
        .po-cta-icon svg { width:46%; height:46%; }
        .po-cta-body { position:relative; z-index:1; flex:1; text-align:center; }
        .po-cta-eyebrow { font-family:'Inter',sans-serif; font-size:12px; font-weight:800; letter-spacing:0.22em; text-transform:uppercase; color:${GOLD}; margin:0 0 12px; }
        .po-cta-title { font-family:'Inter',sans-serif; font-size: clamp(26px,3.4vw,44px); font-weight:800; letter-spacing:-0.03em; line-height:1.08; color:#fff; margin:0 0 14px; }
        .po-cta-sub { font-family:'Inter',sans-serif; font-size: clamp(15px,1.3vw,17px); line-height:1.6; color:rgba(255,255,255,0.6); margin:0 auto 26px; max-width:520px; }
        .po-cta-btn { display:inline-flex; align-items:center; gap:12px; background:${GOLD}; color:#0A0A0A; font-family:'Inter',sans-serif; font-size:15px; font-weight:800; letter-spacing:0.02em; padding:16px 30px; border-radius:100px; text-decoration:none; transition: background .2s, transform .2s; }
        .po-cta-btn:hover { background:#FFD900; transform: translateY(-2px); }
        .po-cta-btn svg { width:18px; height:18px; transition: transform .2s; }
        .po-cta-btn:hover svg { transform: translateX(3px); }
        @media (max-width: 760px) {
          .po-cta { flex-direction:column; text-align:center; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div className="po-hero">
        <div className="po-hero-img"><img src={heroImg} alt="Mico Foundation projects" /></div>
        <div className="po-hero-overlay" />
        <div className="po-hero-inner">
          <p className="po-eyebrow">{content.heroEyebrow}</p>
          <h1 className="po-hero-title">{content.heroTitle}</h1>
          <div className="po-hero-rule" />
          <p className="po-hero-sub">{content.heroSubtitle}</p>
        </div>
      </div>

      {/* ── CURRENT INITIATIVES ── */}
      <div className="po-intro">
        <div className="po-intro-inner">
          <div>
            <p className="po-intro-eyebrow">{content.introEyebrow}</p>
            <h2 className="po-intro-title">
              {content.introTitle}<span className="dot">.</span>
            </h2>
          </div>
          <div className="po-intro-divider" />
          <div className="po-intro-body">
            {introParas.map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
      </div>

      {/* ── IN ACTION collage ── */}
      <div className="po-action">
        <div className="po-action-inner">
          <div className="po-action-head">
            <span className="po-action-eyebrow">{content.actionEyebrow}</span>
            <h2 className="po-action-title">{content.actionTitle}</h2>
            <div className="po-action-rule" />
          </div>

          <div className="po-collage">
            {collage.map((cell, i) => {
              const Tag = cell.slug ? "a" : "div";
              const props = cell.slug ? { href: `/projectdetail/${cell.slug}` } : {};
              return (
                <Tag
                  key={i}
                  className={`po-cell${i === 0 ? " tall" : ""}${cell.slug ? " link" : ""}`}
                  {...props}
                >
                  <img src={cell.img} alt={cell.title || "Foundation project"} />
                  {cell.slug && (
                    <div className="po-cell-label">
                      <p className="po-cell-name">{cell.title}</p>
                      <p className="po-cell-view">View project →</p>
                    </div>
                  )}
                </Tag>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="po-cta-wrap">
        <div className="po-cta">
          <div className="po-cta-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 42c0-8 4-14 12-16-8-2-12-8-12-16 0 8-4 14-12 16 8 2 12 8 12 16Z" fill="#0A0A0A"/>
              <path d="M24 6v36M8 24h32" stroke="#0A0A0A" strokeWidth="2.4" strokeLinecap="round" opacity="0.18"/>
            </svg>
          </div>
          <div className="po-cta-body">
            <p className="po-cta-eyebrow">{content.ctaEyebrow}</p>
            <h2 className="po-cta-title">{content.ctaTitle}</h2>
            <p className="po-cta-sub">{content.ctaSubtitle}</p>
            <a href={content.ctaButtonLink} className="po-cta-btn">
              {content.ctaButtonText}
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
