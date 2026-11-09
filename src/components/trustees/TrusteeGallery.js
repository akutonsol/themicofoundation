"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

export default function TrusteeGallery() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    client.fetch(queries.trusteeGallery).then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const items = (data?.images || []).filter((i) => i?.image?.asset);
  if (!items.length) return null;
  const current = active !== null ? items[active] : null;

  return (
    <section className="tg-section">
      <style>{`
        .tg-section { background:#FFFDF9; padding: clamp(64px,8vw,110px) clamp(24px,5vw,80px); }
        .tg-inner { max-width:1650px; margin:0 auto; }
        .tg-title { font-size:clamp(34px,4.4vw,64px); font-weight:600; letter-spacing:-.04em; line-height:1; color:#040617; margin:0; }
        .tg-intro { margin:16px 0 0; max-width:720px; font-size:18px; line-height:1.7; color:#6F7181; }
        .tg-grid { margin-top:48px; display:grid; gap:28px; grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr)); }
        .tg-card { text-align:left; background:#fff; border:1px solid rgba(4,6,23,.07); border-radius:18px; overflow:hidden; cursor:pointer; padding:0; box-shadow:0 8px 24px rgba(4,6,23,.06); transition:transform .2s, box-shadow .2s; }
        .tg-card:hover { transform:translateY(-3px); box-shadow:0 14px 32px rgba(4,6,23,.12); }
        .tg-img { width:100%; aspect-ratio:4/3; object-fit:cover; display:block; }
        .tg-body { padding:18px 20px 22px; }
        .tg-card-title { font-size:20px; font-weight:600; letter-spacing:-.02em; color:#040617; margin:0; }
        .tg-card-desc { margin:8px 0 0; font-size:15px; line-height:1.6; color:#6F7181; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .tg-lb { position:fixed; inset:0; z-index:200; background:rgba(4,6,23,.88); display:flex; align-items:center; justify-content:center; padding:24px; }
        .tg-lb-box { max-width:min(1100px,100%); max-height:100%; overflow:auto; background:#fff; border-radius:18px; position:relative; }
        .tg-lb-img { width:100%; max-height:70vh; object-fit:contain; background:#040617; display:block; }
        .tg-lb-body { padding:20px 28px 26px; }
        .tg-lb-close { position:absolute; top:12px; right:12px; width:40px; height:40px; border-radius:50%; border:0; background:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 14px rgba(4,6,23,.25); }
      `}</style>
      <div className="tg-inner" style={inter}>
        <h2 className="tg-title">{data?.heading || "Gallery"}</h2>
        {data?.intro && <p className="tg-intro">{data.intro}</p>}
        <div className="tg-grid">
          {items.map((it, i) => (
            <motion.button
              key={it._key || i} type="button" className="tg-card"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(i)}
            >
              <img className="tg-img" src={urlFor(it.image).width(900).height(675).fit("crop").url()} alt={it.title || ""} />
              {(it.title || it.description) && (
                <div className="tg-body">
                  {it.title && <h3 className="tg-card-title">{it.title}</h3>}
                  {it.description && <p className="tg-card-desc">{it.description}</p>}
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {current && (
            <motion.div className="tg-lb" role="dialog" aria-modal="true" onClick={() => setActive(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="tg-lb-box" style={inter} onClick={(e) => e.stopPropagation()}>
                <button type="button" className="tg-lb-close" aria-label="Close" onClick={() => setActive(null)}><X size={20} color="#040617" /></button>
                <img className="tg-lb-img" src={urlFor(current.image).width(1800).url()} alt={current.title || ""} />
                {(current.title || current.description) && (
                  <div className="tg-lb-body">
                    {current.title && <h3 className="tg-card-title" style={{ fontSize: 24 }}>{current.title}</h3>}
                    {current.description && <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.7, color: "#4a4d5c", whiteSpace: "pre-line" }}>{current.description}</p>}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
