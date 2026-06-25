"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { client, urlFor, queries } from "@/sanity/lib/sanity";

const inter = { fontFamily: "'Inter', sans-serif" };

const staticMessages = [
  {
    slug: "burchell-duhaney-message",
    role: "Secretary Manager",
    name: "Mr. Burchell Duhaney J.P.",
    image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg",
    intro: "I am indeed happy to lead the management team of The Mico Foundation at this time when The Mico University College is on the verge of changing its status to full university.",
    body: [
      "The Mico Foundation continues to play a vital role in safeguarding the legacy, mission, and future development of The Mico University College.",
      "As we continue this journey, we remain focused on strengthening our institutional partnerships, supporting strategic projects, and ensuring that future generations inherit an educational environment that reflects excellence, resilience, and opportunity.",
      "We are grateful to our donors, alumni, trustees, partners, and friends who continue to support the Foundation's work.",
    ],
  },
  {
    slug: "karl-james-message",
    role: "Trustee",
    name: "Dr. R. Karl James CD.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1400&q=80",
    intro: "The work of The Mico Foundation is deeply connected to educational stewardship, legacy, and service.",
    body: [
      "Our responsibility is to protect the mission entrusted to us while supporting the continued development of one of the Caribbean's most important educational institutions.",
      "Through thoughtful leadership and sustained support, we aim to strengthen opportunities for students, educators, and the wider community.",
    ],
  },
  {
    slug: "sylvester-tulloch-message",
    role: "Chairman",
    name: "Dr. Sylvester Tulloch, CD.",
    image: "https://www.micofoundation.org/wp-content/uploads/2023/09/Dr.-Sylvester-Tulloch-CD.jpg",
    intro: "Leadership, service, and education remain at the center of our work as a Foundation.",
    body: [
      "The Mico Foundation stands on a proud legacy of educational impact. Our goal is to ensure that legacy continues with strength, vision, and accountability.",
      "We invite our community to continue walking with us as we support meaningful projects and institutional advancement.",
    ],
  },
];

function CloseIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function MessageDetail({ slug }) {
  const [message,     setMessage]     = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [showPanel,   setShowPanel]   = useState(false);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const [messageData, allData] = await Promise.all([
          client.fetch(queries.messageBySlug(slug)),
          client.fetch(queries.allMessages),
        ]);
        if (messageData) {
          setMessage({
            slug:  messageData.slug,
            role:  messageData.role,
            name:  messageData.name,
            image: urlFor(messageData.photo).width(900).url(),
            intro: messageData.quote,
            body:  messageData.fullMessage
              ? messageData.fullMessage.split("\n\n").filter(Boolean)
              : [],
          });
        } else {
          setMessage(staticMessages.find(m => m.slug === slug) || staticMessages[0]);
        }
        setAllMessages(allData?.length ? allData : staticMessages.map(m => ({ slug: m.slug, name: m.name })));
      } catch {
        setMessage(staticMessages.find(m => m.slug === slug) || staticMessages[0]);
        setAllMessages(staticMessages.map(m => ({ slug: m.slug, name: m.name })));
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchMessage();
    else {
      setMessage(staticMessages[0]);
      setAllMessages(staticMessages.map(m => ({ slug: m.slug, name: m.name })));
      setLoading(false);
    }
  }, [slug]);

  // Full-message panel: close on Escape, lock background scroll while open
  useEffect(() => {
    if (!showPanel) return;
    const onKey = e => { if (e.key === "Escape") setShowPanel(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [showPanel]);

  if (loading) return (
    <section style={{ backgroundColor:"#FAF9F6", minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ ...inter, fontSize:"20px", color:"#6F7181" }}>Loading message...</p>
    </section>
  );

  if (!message) return (
    <section style={{ backgroundColor:"#FAF9F6", minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ ...inter, fontSize:"20px", color:"#6F7181" }}>Message not found</p>
    </section>
  );

  const currentIndex = allMessages.findIndex(m => m.slug === message.slug);
  const prevMessage  = currentIndex > 0 ? allMessages[currentIndex - 1] : null;
  const nextMessage  = currentIndex < allMessages.length - 1 ? allMessages[currentIndex + 1] : null;
  const isChairman   = (message.role || "").toLowerCase().includes("chairman");
  const title        = isChairman ? "Chairman Message" : "Message from the Foundation";

  return (
    <main style={{ backgroundColor:"#FAF9F6", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,600&display=swap');

        .md-section { padding: 48px clamp(24px, 8vw, 165px) 80px; max-width: 1760px; margin: 0 auto; }

        @media (max-width: 1200px) { .md-section { padding: 48px 64px 80px; } }
        @media (max-width: 900px) {
          .md-section { padding: 40px 28px 60px; }
          .md-left { float: none !important; width: 100% !important; margin-right: 0 !important; }
          .md-heading { font-size: 40px !important; }
        }

        .md-nav-arrow {
          width: 54px; height: 54px; border-radius: 14px;
          background: #E5E6EB; color: #040617;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: background 0.2s;
          flex-shrink: 0;
        }
        .md-nav-arrow:hover { background: #FFD900; }

        .md-read-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #040617; color: white;
          font-size: 15px; font-weight: 600;
          padding: 16px 32px; border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.15s;
        }
        .md-read-btn:hover { background: #1a1f3c; transform: scale(1.02); }
        .panel-editorial {
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
          font-weight: 400; color: rgba(255,255,255,0.7);
          line-height: 1.85; margin: 0 0 22px;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="md-section">

        {/* Back link */}
        <Link href="/messages" style={{ ...inter, display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"14px", color:"#6F7181", textDecoration:"none", marginBottom:"40px" }}>
          <ArrowLeft size={16} />
          All Messages
        </Link>

        {/* Main card */}
        <div style={{ borderRadius:"32px", border:"1px solid #E5E6EB", backgroundColor:"rgba(255,255,255,0.85)", padding:"64px", backdropFilter:"blur(8px)" }}>

          {/* Title */}
          <motion.h1
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            className="md-heading"
            style={{ ...inter, fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, color:"#040617", lineHeight:"1.05", letterSpacing:"-2px", margin:"0 0 44px" }}>
            {title}
          </motion.h1>

          {/* Full message wrapped around the floated image */}
          <motion.div
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1 }}
          >
            {/* Floated photo + name card */}
            <div className="md-left" style={{ float:"left", width:"400px", marginRight:"48px", marginBottom:"28px" }}>
              <div style={{ display:"flex", gap:"0" }}>
                <div style={{ width:"4px", borderRadius:"4px", backgroundColor:"#FFD900", flexShrink:0, alignSelf:"stretch" }} />
                <div style={{ flex:1 }}>
                  <div style={{ borderRadius:"0 20px 0 0", overflow:"hidden" }}>
                    <img
                      src={message.image || "/images/home/holness.jpg"}
                      alt={message.name}
                      style={{ width:"100%", height:"560px", objectFit:"cover", objectPosition:"top", display:"block" }}
                    />
                  </div>
                  <div style={{ backgroundColor:"#040617", padding:"24px 28px", borderRadius:"0 0 20px 0" }}>
                    <h3 style={{ ...inter, fontSize:"26px", fontWeight:700, color:"white", letterSpacing:"-0.3px", lineHeight:1.2, margin:"0 0 6px" }}>
                      {message.name}
                    </h3>
                    <p style={{ ...inter, fontSize:"14px", color:"rgba(255,255,255,0.5)", margin:0, fontStyle:"italic" }}>
                      {message.role} of The Mico Foundation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message body — wraps around the floated image */}
            {message.body.map((para, i) => (
              <p key={i} style={{ ...inter, fontSize:"19px", color:"#414651", lineHeight:"1.9", margin:"0 0 24px" }}>
                {para}
              </p>
            ))}

            <div style={{ clear:"both" }} />

            <div style={{ display:"flex", justifyContent:"center", marginTop:"44px" }}>
              <button onClick={() => setShowPanel(true)} className="md-read-btn">
                Read Full Message
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Prev / Next */}
        <div style={{ marginTop:"60px", paddingTop:"32px", borderTop:"1px solid #E5E6EB", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
          <div>
            {prevMessage ? (
              <Link href={`/messagesdetail/${prevMessage.slug}`} style={{ display:"inline-flex", alignItems:"center", gap:"14px", textDecoration:"none" }}>
                <span className="md-nav-arrow"><ArrowLeft size={22} /></span>
                <div>
                  <p style={{ ...inter, fontSize:"13px", fontWeight:600, color:"#9CA3AF", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.1em" }}>Previous</p>
                  <p style={{ ...inter, fontSize:"16px", fontWeight:600, color:"#040617", margin:0 }}>{prevMessage.name}</p>
                </div>
              </Link>
            ) : (
              <p style={{ ...inter, fontSize:"15px", color:"#9CA3AF" }}>First message</p>
            )}
          </div>
          <div style={{ textAlign:"right" }}>
            {nextMessage ? (
              <Link href={`/messagesdetail/${nextMessage.slug}`} style={{ display:"inline-flex", alignItems:"center", gap:"14px", textDecoration:"none" }}>
                <div>
                  <p style={{ ...inter, fontSize:"13px", fontWeight:600, color:"#9CA3AF", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.1em" }}>Next</p>
                  <p style={{ ...inter, fontSize:"16px", fontWeight:600, color:"#040617", margin:0 }}>{nextMessage.name}</p>
                </div>
                <span className="md-nav-arrow"><ArrowRight size={22} /></span>
              </Link>
            ) : (
              <p style={{ ...inter, fontSize:"15px", color:"#9CA3AF" }}>Last message</p>
            )}
          </div>
        </div>
      </div>

      {/* ── SLIDE-UP FULL MESSAGE PANEL ── */}
      <AnimatePresence>
        {showPanel && (
          <>
            <motion.div
              key="md-backdrop"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setShowPanel(false)}
              style={{ position:"fixed", inset:0, backgroundColor:"rgba(4,6,23,0.6)", zIndex:9998, backdropFilter:"blur(4px)", cursor:"pointer" }}
            />
            <motion.div
              key="md-panel"
              initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }}
              transition={{ type:"spring", damping:28, stiffness:260 }}
              style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:9999, backgroundColor:"#FAF9F6", borderRadius:"28px 28px 0 0", height:"92vh", display:"flex", flexDirection:"column", boxShadow:"0 -32px 80px rgba(0,0,0,0.4)" }}
            >
              <button
                onClick={() => setShowPanel(false)}
                style={{ position:"absolute", top:"20px", right:"24px", zIndex:10, width:"40px", height:"40px", borderRadius:"50%", backgroundColor:"rgba(4,6,23,0.06)", border:"1px solid #E5E6EB", color:"#040617", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
              >
                <CloseIcon size={17} />
              </button>

              <div style={{ flex:1, overflowY:"auto", padding:"clamp(40px,5vw,64px) clamp(24px,6vw,80px) 64px" }}>
                <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

                  {/* Dark header banner */}
                  <div style={{ background:"#040617", borderRadius:"20px", padding:"clamp(28px,3vw,44px)", marginBottom:"40px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
                      <div style={{ width:"28px", height:"2px", backgroundColor:"#FFD900" }} />
                      <span style={{ ...inter, fontSize:"11px", fontWeight:700, color:"#FFD900", letterSpacing:"0.2em", textTransform:"uppercase" }}>
                        {title}
                      </span>
                    </div>
                    <h2 style={{ ...inter, fontSize:"clamp(2rem,4vw,3.4rem)", fontWeight:800, color:"white", letterSpacing:"-1.5px", lineHeight:1.04, margin:"0 0 8px" }}>
                      {message.name}
                    </h2>
                    <p style={{ ...inter, fontSize:"14px", color:"rgba(255,255,255,0.55)", margin:0, fontStyle:"italic" }}>
                      {message.role} of The Mico Foundation
                    </p>
                  </div>

                  {/* Full message — same wrapped layout as the main page */}
                  <div>
                    <div className="md-left" style={{ float:"left", width:"400px", marginRight:"48px", marginBottom:"28px" }}>
                      <div style={{ display:"flex", gap:"0" }}>
                        <div style={{ width:"4px", borderRadius:"4px", backgroundColor:"#FFD900", flexShrink:0, alignSelf:"stretch" }} />
                        <div style={{ flex:1 }}>
                          <div style={{ borderRadius:"0 20px 0 0", overflow:"hidden" }}>
                            <img src={message.image || "/images/home/holness.jpg"} alt={message.name}
                              style={{ width:"100%", height:"500px", objectFit:"cover", objectPosition:"top", display:"block" }} />
                          </div>
                          <div style={{ backgroundColor:"#040617", padding:"22px 26px", borderRadius:"0 0 20px 0" }}>
                            <h3 style={{ ...inter, fontSize:"24px", fontWeight:700, color:"white", letterSpacing:"-0.3px", lineHeight:1.2, margin:"0 0 6px" }}>
                              {message.name}
                            </h3>
                            <p style={{ ...inter, fontSize:"14px", color:"rgba(255,255,255,0.5)", margin:0, fontStyle:"italic" }}>
                              {message.role} of The Mico Foundation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {message.body.map((para, i) => (
                      <p key={i} style={{ ...inter, fontSize:"19px", color:"#414651", lineHeight:"1.9", margin:"0 0 24px" }}>{para}</p>
                    ))}

                    <div style={{ clear:"both" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}