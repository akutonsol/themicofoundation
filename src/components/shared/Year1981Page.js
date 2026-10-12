"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const CHECK_ITEMS = [
  { label: "Donations",  href: "/donate" },
  { label: "Pledges",    href: "/pledge" },
  { label: "Endowments", href: "/endowments" },
];

export default function Year1981Page() {
  const [photoUrl, setPhotoUrl] = useState("/images/home/holness.jpg");

  useEffect(() => {
    async function fetchPhoto() {
      try {
        const data = await client.fetch(queries.legacyImpact);
        if (data?.heroImage) setPhotoUrl(urlFor(data.heroImage).width(900).url());
      } catch (error) {
        console.error("Error fetching Year 1981 photo:", error);
      }
    }
    fetchPhoto();
  }, []);

  return (
    <main style={{ background: "#FFFDF9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Inter:wght@400;600;700;800;900&display=swap');

        .y81-wrap { padding: clamp(40px,6vw,80px) clamp(20px,5vw,64px); }
        .y81-card {
          position: relative;
          overflow: hidden;
          border-radius: 28px;
          background: #0B0B0D;
          box-shadow: var(--shadow-dark-4, 0 30px 80px rgba(0,0,0,0.45));
          min-height: 640px;
          display: grid;
          grid-template-columns: 220px 1fr;
        }
        .y81-texture {
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 64px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.035) 0px, rgba(255,255,255,0.035) 1px, transparent 1px, transparent 64px);
          pointer-events: none;
        }
        .y81-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 70% 60% at 75% 20%, rgba(243,175,25,0.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .y81-stripe {
          position: relative;
          background: linear-gradient(180deg, #FFD900 0%, #f3af19 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: clamp(28px,4vw,44px) 16px 0;
        }
        .y81-logo { width: 100%; max-width: 160px; height: auto; }

        .y81-oval {
          position: absolute;
          left: 50%;
          bottom: -48px;
          transform: translateX(-20%);
          width: clamp(220px,24vw,300px);
          height: clamp(280px,30vw,380px);
          border-radius: 999px;
          background: linear-gradient(180deg, #FFD900 0%, #f3af19 90%);
          box-shadow: 0 0 0 6px #0B0B0D, 0 24px 48px rgba(0,0,0,0.5);
          overflow: hidden;
          z-index: 5;
        }
        .y81-oval img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; object-position: center bottom; }

        .y81-content { position: relative; z-index: 2; padding: clamp(32px,4.5vw,56px) clamp(24px,4vw,56px) clamp(90px,10vw,120px); }
        .y81-title { font-family: 'Inter', sans-serif; font-weight: 900; color: #FFFFFF; font-size: clamp(34px,4.4vw,56px); line-height: 1.02; letter-spacing: -0.03em; margin: 0; }
        .y81-script { font-family: 'Dancing Script', cursive; font-weight: 700; color: #f3af19; font-size: clamp(38px,5.4vw,78px); line-height: 1; margin: 6px 0 22px; }
        .y81-para { font-family: 'Inter', sans-serif; font-weight: 700; color: #FFFFFF; font-size: clamp(16px,1.6vw,22px); line-height: 1.5; max-width: 620px; margin: 0 0 clamp(24px,3vw,36px); text-align: justify; }

        .y81-checks { display: flex; flex-wrap: wrap; gap: clamp(18px,2.4vw,36px); margin-bottom: clamp(24px,3vw,32px); }
        .y81-check-item { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
        .y81-check-badge { width: 26px; height: 26px; border-radius: 50%; background: #f3af19; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: transform 0.2s ease; }
        .y81-check-item:hover .y81-check-badge { transform: scale(1.1); }
        .y81-check-label { font-family: 'Inter', sans-serif; font-weight: 700; color: #FFFFFF; font-size: clamp(16px,1.5vw,19px); transition: color 0.2s ease; }
        .y81-check-item:hover .y81-check-label { color: #f3af19; }

        .y81-divider { height: 1px; background: rgba(255,255,255,0.14); margin-bottom: clamp(24px,3vw,32px); }

        .y81-plaque { text-align: center; }
        .y81-plaque-h { font-family: 'Inter', sans-serif; font-weight: 800; color: #f3af19; font-size: clamp(20px,2.2vw,28px); margin: 0 0 8px; }
        .y81-plaque-p { font-family: 'Inter', sans-serif; font-weight: 700; color: #f3af19; font-size: clamp(14px,1.3vw,17px); line-height: 1.5; max-width: 640px; margin: 0 auto; text-align: justify; }

        .y81-cta-row { display: flex; justify-content: center; margin-top: clamp(50px,6vw,64px); }
        .y81-cta { display: inline-flex; align-items: center; gap: 10px; background: #f3af19; color: #040617; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 16px; padding: 16px 32px; border-radius: 16px; text-decoration: none; transition: transform 0.2s ease; }
        .y81-cta:hover { transform: translateY(-2px); }

        @media (max-width: 760px) {
          .y81-card { grid-template-columns: 1fr; }
          .y81-stripe { padding: 28px 16px 70px; }
          .y81-oval { position: static; transform: none; margin: 24px auto -40px; box-shadow: 0 0 0 6px #0B0B0D; }
          .y81-content { padding: 32px 22px 70px; }
          .y81-checks { gap: 16px; }
        }
      `}</style>

      <div className="y81-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="y81-card"
        >
          <div className="y81-texture" />
          <div className="y81-gradient" />

          {/* LEFT — gold stripe + logo + oval photo */}
          <div className="y81-stripe">
            <img src="/images/home/mico-logo-footer.png" alt="The Mico Foundation" className="y81-logo" />
            <div className="y81-oval">
              <img src={photoUrl} alt="The Mico Foundation community" />
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="y81-content">
            <h1 className="y81-title">THE MICO<br />FOUNDATION</h1>
            <p className="y81-script">Service, Donate, Create</p>

            <p className="y81-para">
              Be a part of history. Join the community of donors and help to transform The Mico University College and shape the future of education together.
            </p>

            <div className="y81-checks">
              {CHECK_ITEMS.map((item) => (
                <Link key={item.label} href={item.href} className="y81-check-item">
                  <span className="y81-check-badge"><Check size={15} color="#040617" strokeWidth={3} /></span>
                  <span className="y81-check-label">{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="y81-divider" />

            <div className="y81-plaque">
              <p className="y81-plaque-h">Be a part of history.</p>
              <p className="y81-plaque-p">
                Get your name, your company, or a family member&rsquo;s name on the historical recognition plaque.
              </p>
            </div>

            <div className="y81-cta-row">
              <Link href="/pledge" className="y81-cta">
                Make Your Pledge
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
