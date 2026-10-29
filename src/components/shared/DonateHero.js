"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const DEFAULTS = {
  title: "The Mico",
  subtitle: "University College",
  script: "Donate",
  tagline: "Save the 135-year-old\nepicenter of teacher education",
  buttonText: "",
  buttonLink: "",
  logoUrl: "/images/donate/hero-logo.jpg",
  logoAlt: "Project Buxton Restore — Save the Buxton",
  leftUrl: "/images/donate/hero-left.jpg",
  leftAlt: "Volunteers collecting donations at a community fundraiser",
  rightUrl: "/images/donate/hero-right.jpg",
  rightAlt: "Community members placing donations in a collection box",
};

const GOLD = "#EBCB8B";

export default function DonateHero() {
  const [c, setC] = useState(DEFAULTS);

  useEffect(() => {
    client.fetch(queries.donateHero)
      .then((d) => {
        if (!d) return;
        setC({
          title: d.title || DEFAULTS.title,
          subtitle: d.subtitle || DEFAULTS.subtitle,
          script: d.script || DEFAULTS.script,
          tagline: d.tagline || DEFAULTS.tagline,
          buttonText: d.buttonText || "",
          buttonLink: d.buttonLink || "",
          logoUrl: d.logo?.asset ? urlFor(d.logo).width(700).url() : DEFAULTS.logoUrl,
          logoAlt: d.logo?.alt || DEFAULTS.logoAlt,
          leftUrl: d.leftImage?.asset ? urlFor(d.leftImage).width(1400).url() : DEFAULTS.leftUrl,
          leftAlt: d.leftImage?.alt || DEFAULTS.leftAlt,
          rightUrl: d.rightImage?.asset ? urlFor(d.rightImage).width(1000).url() : DEFAULTS.rightUrl,
          rightAlt: d.rightImage?.alt || DEFAULTS.rightAlt,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="dh-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@500;600&family=Cormorant+Garamond:wght@500;600&family=Pinyon+Script&display=swap');
        .dh-root { width:100%; background:#fff; }
        .dh-grid { display:grid; grid-template-columns: 44fr 28.5fr 27.5fr; aspect-ratio: 2.5 / 1; width:100%; max-width:2000px; margin:0 auto; background:#fff; }
        .dh-photo { position:relative; overflow:hidden; min-width:0; }
        .dh-photo img { width:100%; height:100%; object-fit:cover; display:block; }
        .dh-panel { position:relative; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; color:${GOLD};
          padding: 0 clamp(12px, 1.6vw, 32px);
          background:
            radial-gradient(1.5px 1.5px at 18% 82%, rgba(235,203,139,.9), transparent 60%),
            radial-gradient(1px 1px at 30% 90%, rgba(235,203,139,.7), transparent 60%),
            radial-gradient(1.5px 1.5px at 62% 86%, rgba(235,203,139,.8), transparent 60%),
            radial-gradient(1px 1px at 78% 93%, rgba(235,203,139,.7), transparent 60%),
            radial-gradient(1px 1px at 48% 96%, rgba(235,203,139,.6), transparent 60%),
            radial-gradient(ellipse at 50% 112%, rgba(235,203,139,.16), transparent 45%),
            linear-gradient(180deg, #17253f 0%, #1e3058 45%, #242e47 100%); }
        .dh-title { font-family:'Cormorant SC', serif; font-weight:500; font-size:clamp(26px, 3.1vw, 62px); line-height:1.1; letter-spacing:.02em; margin:0; }
        .dh-sub { font-family:'Cormorant SC', serif; font-weight:500; font-size:clamp(14px, 1.55vw, 31px); letter-spacing:.04em; margin:.35em 0 0; }
        .dh-logo { width:clamp(110px, 13vw, 260px); height:auto; margin: clamp(10px, 1.6vw, 32px) 0 clamp(6px, 1vw, 20px); -webkit-mask-image:radial-gradient(ellipse at center, #000 38%, transparent 82%); mask-image:radial-gradient(ellipse at center, #000 38%, transparent 82%); }
        .dh-script { font-family:'Pinyon Script', cursive; color:#fff; font-size:clamp(34px, 4.4vw, 88px); line-height:1.1; margin:0; }
        .dh-tag { font-family:'Cormorant Garamond', serif; font-weight:500; font-size:clamp(14px, 1.75vw, 35px); line-height:1.35; margin:clamp(8px, 1.2vw, 24px) 0 0; white-space:pre-line; }
        .dh-btn { margin-top:clamp(10px,1.4vw,28px); display:inline-block; padding:.7em 1.6em; border-radius:999px; background:${GOLD}; color:#0f1b40; font-family:'Cormorant Garamond', serif; font-weight:600; font-size:clamp(13px,1.2vw,22px); text-decoration:none; }
        @media (max-width: 767px) {
          .dh-grid { grid-template-columns: 1fr 1fr; aspect-ratio:auto; }
          .dh-panel { grid-column: 1 / -1; grid-row: 1; padding: 48px 24px; }
          .dh-photo { aspect-ratio: 4 / 5; }
          .dh-title { font-size: 40px; } .dh-sub { font-size: 22px; }
          .dh-logo { width: 200px; } .dh-script { font-size: 64px; } .dh-tag { font-size: 22px; }
          .dh-btn { font-size: 16px; }
        }
      `}</style>

      <div className="dh-grid">
        <motion.div className="dh-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
          <img src={c.leftUrl} alt={c.leftAlt} />
        </motion.div>

        <motion.div className="dh-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <h1 className="dh-title">{c.title}</h1>
          <p className="dh-sub">{c.subtitle}</p>
          <img className="dh-logo" src={c.logoUrl} alt={c.logoAlt} />
          <p className="dh-script">{c.script}</p>
          <p className="dh-tag">{c.tagline}</p>
          {c.buttonText && c.buttonLink && (
            /^https?:/.test(c.buttonLink)
              ? <a className="dh-btn" href={c.buttonLink}>{c.buttonText}</a>
              : <Link className="dh-btn" href={c.buttonLink}>{c.buttonText}</Link>
          )}
        </motion.div>

        <motion.div className="dh-photo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <img src={c.rightUrl} alt={c.rightAlt} />
        </motion.div>
      </div>
    </section>
  );
}
