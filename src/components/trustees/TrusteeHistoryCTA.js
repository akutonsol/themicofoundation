"use client";

import { useState, useEffect } from "react";
import { client, queries } from "@/sanity/lib/sanity";

const staticContent = {
  ctaEyebrow: 'Dive Deeper',
  ctaTitle: 'Continue to Learn About Our History',
  ctaButtonText: 'Explore History',
  ctaButtonLink: '/history',
  ctaBodyText: "",
};

export default function TrusteeHistoryCTA() {
  const [content, setContent] = useState(staticContent);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await client.fetch(queries.trusteeLegacy);
        if (data) {
          setContent({
            ctaEyebrow: data.ctaEyebrow || staticContent.ctaEyebrow,
            ctaTitle: data.ctaTitle || staticContent.ctaTitle,
            ctaButtonText: data.ctaButtonText || staticContent.ctaButtonText,
            ctaButtonLink: data.ctaButtonLink || staticContent.ctaButtonLink,
            ctaBodyText: data.ctaBodyText || staticContent.ctaBodyText,
          });
        }
      } catch (error) {
        console.error('Error fetching trustee history CTA content:', error);
      }
    }
    fetchContent();
  }, []);

  return (
    <section className="legacy-cta">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&family=Syne:wght@400;500;700&display=swap');
        .legacy-cta { background: #05080F; padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px); position: relative; overflow: hidden; }
        .legacy-cta .cta-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center; }
        .legacy-cta .cta-label { font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #f3af19; margin: 0 0 20px; }
        .legacy-cta .cta-body { max-width: 1400px; margin: clamp(36px,5vw,52px) auto 0; }
        .legacy-cta .cta-body-p { font-family: 'Syne', sans-serif; font-size: clamp(17px,1.4vw,20px); line-height: 1.85; color: rgba(255,255,255,0.72); margin: 0 0 24px; }
        .legacy-cta .cta-body-p:last-child { margin-bottom: 0; }
        .legacy-cta .cta-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(44px,6vw,88px); font-weight: 300; color: #FFFFFF; margin: 0; line-height: 0.92; letter-spacing: -0.03em; }
        .legacy-cta .cta-title em { font-style: italic; color: #FFD900; }
        .legacy-cta .cta-btn { display: inline-flex; align-items: center; gap: 16px; background: #FFD900; color: #040617; font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 18px 32px; border-radius: 100px; text-decoration: none; transition: background 0.2s, transform 0.2s; flex-shrink: 0; white-space: nowrap; }
        .legacy-cta .cta-btn:hover { background: #fff; transform: translateY(-2px); }
        .legacy-cta .cta-arrow { width: 20px; height: 20px; transition: transform 0.2s; }
        .legacy-cta .cta-btn:hover .cta-arrow { transform: translate(2px, -2px); }
        @media (max-width: 900px) {
          .legacy-cta .cta-inner { grid-template-columns: 1fr; }
        }
      `}</style>
      <div className="cta-inner">
        <div>
          <p className="cta-label">{content.ctaEyebrow}</p>
          <h2 className="cta-title">{content.ctaTitle}</h2>
        </div>
        <a href={content.ctaButtonLink} className="cta-btn">
          {content.ctaButtonText}
          <svg className="cta-arrow" viewBox="0 0 20 20" fill="none">
            <path d="M4 16L16 4M16 4H7M16 4v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {content.ctaBodyText && (
        <div className="cta-body">
          {content.ctaBodyText.split(/\n{2,}/).map((para, i) => (
            <p key={i} className="cta-body-p">{para.trim()}</p>
          ))}
        </div>
      )}
    </section>
  );
}
