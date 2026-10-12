"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const DEFAULTS = {
  title: "THE MICO\nFOUNDATION",
  tagline: "Service, Donate Create",
  body: "Be a part of history. Join the community of donors and help to transform The Mico University College and shape the future of education together.",
  checklist: [
    { label: "Donations",  link: "/donate" },
    { label: "Pledges",    link: "/pledge" },
    { label: "Endowments", link: "/endowments" },
  ],
  plaqueHeading: "Be a part of history.",
  plaqueText: "Get your name, your company, or a family member’s name on the historical recognition plaque.",
  photoUrl: "/images/year1981/cheque-presentation.jpg",
  photoAlt: "Mico Foundation donation presentation",
};

const ease = [0.22, 1, 0.36, 1];

export default function Year1981Page() {
  const [content, setContent] = useState(DEFAULTS);

  useEffect(() => {
    client.fetch(queries.year1981Page)
      .then((data) => {
        if (!data) return;
        setContent({
          title: data.title || DEFAULTS.title,
          tagline: data.tagline || DEFAULTS.tagline,
          body: data.body || DEFAULTS.body,
          checklist: data.checklist?.length ? data.checklist : DEFAULTS.checklist,
          plaqueHeading: data.plaqueHeading || DEFAULTS.plaqueHeading,
          plaqueText: data.plaqueText || DEFAULTS.plaqueText,
          photoUrl: data.photo?.asset ? urlFor(data.photo).width(1400).height(1007).fit("crop").url() : DEFAULTS.photoUrl,
          photoAlt: data.photo?.alt || DEFAULTS.photoAlt,
        });
      })
      .catch((error) => console.error("Error fetching Year 1981 page:", error));
  }, []);

  return (
    <section className="y81">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Yellowtail&display=swap');

        .y81 {
          --y81-gold: #F5C142;
          position: relative;
          overflow: hidden;
          background-color: #161616;
          background-image:
            radial-gradient(ellipse 80% 90% at 70% 40%, rgba(255,255,255,0.05) 0%, transparent 70%),
            repeating-linear-gradient(78deg, rgba(255,255,255,0.035) 0 2px, transparent 2px 120px),
            repeating-linear-gradient(-12deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 90px),
            linear-gradient(180deg, #1c1c1c 0%, #121212 100%);
          font-family: 'Montserrat', sans-serif;
        }

        .y81-stage {
          position: relative;
          aspect-ratio: 2.03 / 1;
          padding: 4.6% 2.5% 3.5% 37.5%;
        }

        .y81-stripe {
          position: absolute;
          top: 0; bottom: 0;
          left: 16.5%;
          width: 16.5%;
          background: var(--y81-gold);
          display: flex;
          justify-content: center;
        }
        .y81-logo {
          width: 86%;
          height: auto;
          margin-top: 6%;
          align-self: flex-start;
          filter: brightness(1.08) contrast(1.05);
          mix-blend-mode: multiply;
        }

        .y81-oval {
          position: absolute;
          left: 1.1%;
          bottom: 3.2%;
          width: 43.5%;
          aspect-ratio: 1.39 / 1;
          border-radius: 50%;
          border: 4px solid var(--y81-gold);
          overflow: hidden;
          background: #222;
          box-shadow: 0 20px 50px rgba(0,0,0,0.45);
        }
        .y81-oval img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: scale(1.06);
        }

        .y81-title {
          margin: 0;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 4.75vw;
          line-height: 1.02;
          letter-spacing: 0.005em;
        }
        .y81-script {
          margin: -0.6vw 0 0 -0.8vw;
          color: var(--y81-gold);
          font-family: 'Yellowtail', cursive;
          font-weight: 400;
          font-size: 7.4vw;
          line-height: 1.05;
          white-space: nowrap;
          transform: rotate(-3deg);
          transform-origin: left center;
        }

        .y81-lower { margin-left: 16%; }
        .y81-body {
          margin: 1.6vw 0 0;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 1.75vw;
          line-height: 1.55;
          max-width: 51vw;
        }

        .y81-checks {
          display: flex;
          justify-content: space-between;
          max-width: 47vw;
          margin: 4.6vw 0 0;
          padding: 0 0.6vw;
        }
        .y81-check {
          display: inline-flex;
          align-items: center;
          gap: 1vw;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 1.55vw;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .y81-check svg { width: 2.4vw; height: 2.4vw; color: var(--y81-gold); flex-shrink: 0; transition: transform 0.2s ease; }
        .y81-check:hover { color: var(--y81-gold); }
        .y81-check:hover svg { transform: scale(1.1); }

        .y81-divider {
          height: 2px;
          background: rgba(255,255,255,0.85);
          margin: 2.2vw 0 0 6%;
          max-width: 44.5vw;
        }

        .y81-plaque { margin: 2.6vw 0 0 -12.5%; }
        .y81-plaque-h {
          margin: 0 0 0.5vw;
          text-align: center;
          color: var(--y81-gold);
          font-weight: 600;
          font-size: 1.95vw;
          padding-left: 12.5%;
        }
        .y81-plaque-p {
          margin: 0;
          color: var(--y81-gold);
          font-weight: 600;
          font-size: 1.72vw;
          line-height: 1.6;
        }

        @media (min-width: 1700px) {
          .y81-stage { max-width: 1700px; margin: 0 auto; }
          .y81-title { font-size: 81px; }
          .y81-script { font-size: 126px; margin: -10px 0 0 -14px; }
          .y81-body { font-size: 30px; max-width: 870px; margin-top: 27px; }
          .y81-checks { max-width: 800px; margin-top: 78px; }
          .y81-check { font-size: 26px; gap: 17px; }
          .y81-check svg { width: 41px; height: 41px; }
          .y81-divider { max-width: 757px; margin-top: 37px; }
          .y81-plaque { margin-top: 44px; }
          .y81-plaque-h { font-size: 33px; margin-bottom: 8px; }
          .y81-plaque-p { font-size: 29px; }
        }

        @media (max-width: 860px) {
          .y81-stage { aspect-ratio: auto; padding: 0 20px 56px; }
          .y81-media { display: flex; flex-direction: column; align-items: center; }
          .y81-stripe { position: relative; left: auto; width: 46%; padding: 24px 0 110px; }
          .y81-logo { width: 74%; margin-top: 0; }
          .y81-oval { position: relative; left: auto; bottom: auto; width: 100%; margin-top: -90px; }
          .y81-title { font-size: 40px; margin-top: 36px; }
          .y81-script { font-size: clamp(44px, 12.5vw, 72px); margin: 0 0 0 -4px; white-space: normal; }
          .y81-lower { margin-left: 0; }
          .y81-body { font-size: 18px; max-width: none; margin-top: 18px; }
          .y81-checks { max-width: none; margin-top: 30px; padding: 0; flex-wrap: wrap; gap: 14px 20px; justify-content: flex-start; }
          .y81-check { font-size: 17px; gap: 10px; }
          .y81-check svg { width: 26px; height: 26px; }
          .y81-divider { margin: 28px 0 0; max-width: none; }
          .y81-plaque { margin: 26px 0 0; }
          .y81-plaque-h { font-size: 22px; padding-left: 0; margin-bottom: 8px; }
          .y81-plaque-p { font-size: 17px; text-align: center; }
        }
      `}</style>

      <div className="y81-stage">
        <div className="y81-media">
          <div className="y81-stripe">
            <img src="/images/home/the_mico_foundation.png" alt="The Mico Foundation — Founded 1981" className="y81-logo" />
          </div>
          <motion.div
            className="y81-oval"
            initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <img src={content.photoUrl} alt={content.photoAlt} />
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <h1 className="y81-title" style={{ whiteSpace: "pre-line" }}>{content.title}</h1>
          <p className="y81-script">{content.tagline}</p>
        </motion.div>

        <motion.div className="y81-lower" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.2 }}>
          <p className="y81-body">{content.body}</p>

          <div className="y81-checks">
            {content.checklist.map((item) => {
              const inner = (<><CircleCheckBig strokeWidth={2.4} />{item.label}</>);
              return /^https?:\/\//.test(item.link)
                ? <a key={item.label} href={item.link} target="_blank" rel="noopener noreferrer" className="y81-check">{inner}</a>
                : <Link key={item.label} href={item.link} className="y81-check">{inner}</Link>;
            })}
          </div>

          <div className="y81-divider" />

          <div className="y81-plaque">
            <p className="y81-plaque-h">{content.plaqueHeading}</p>
            <p className="y81-plaque-p">{content.plaqueText}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
