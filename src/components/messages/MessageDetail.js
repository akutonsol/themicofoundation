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

function getSignature(name) {
  const parts = name.replace(/^(Mr\.|Dr\.|Mrs\.|Ms\.)\s*/i, "").split(" ");
  const first  = parts[0]?.[0] || "";
  const last   = parts[parts.length - 1]?.replace(/,|CD\.|J\.P\./gi, "") || "";
  return `${first}. ${last}`;
}

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
  const [panelOpen,   setPanelOpen]   = useState(false);

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
  const signature    = getSignature(message.name);
  const previewBody  = message.body.slice(0, 2);

  // Panel split: first 2 beside image, rest below in large text
  const panelSide  = message.body.slice(0, 2);
  const panelBelow = message.body.slice(2);

  return (
    <main style={{ backgroundColor:"#FAF9F6", position:"relative", overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@1,600&display=swap');

        .md-section { padding: 48px 165px 80px; max-width: 1760px; margin: 0 auto; }

        @media (max-width: 1200px) { .md-section { padding: 48px 64px 80px; } }
        @media (max-width: 900px) {
          .md-section { padding: 40px 28px 60px; }
          .md-grid { grid-template-columns: 1fr !important; }
          .md-left { width: 100% !important; }
          .md-heading { font-size: 40px !important; }
          .md-quote { font-size: 22px !important; }
        }

        .md-read-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #040617; color: white;
          font-size: 15px; font-weight: 600;
          padding: 16px 32px; border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .md-read-btn:hover { background: #1a1f3c; transform: scale(1.02); }

        .md-nav-arrow {
          width: 54px; height: 54px; border-radius: 14px;
          background: #E5E6EB; color: #040617;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: background 0.2s;
          flex-shrink: 0;
        }
        .md-nav-arrow:hover { background: #FFD900; }

        /* Panel large editorial text below image */
        .panel-editorial {
          font-size: clamp(1.6rem, 2.8vw, 2.4rem);
          font-weight: 600;
          color: white;
          line-height: 1.5;
          letter-spacing: -0.03em;
          font-family: 'Inter', sans-serif;
          margin: 0 0 32px;
        }
      `}</style>

      <div className="md-section">

        {/* Back link */}
        <Link href="/messages" style={{ ...inter, display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"14px", color:"#6F7181", textDecoration:"none", marginBottom:"40px" }}>
          <ArrowLeft size={16} />
          All Messages
        </Link>

        {/* Eyebrow bar */}
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"48px" }}>
          <span style={{ ...inter, fontSize:"12px", fontWeight:700, color:"#040617", letterSpacing:"0.15em", textTransform:"uppercase" }}>
            Leadership
          </span>
          <div style={{ flex:"0 0 48px", height:"1px", backgroundColor:"#FFD900" }} />
          <span style={{ ...inter, fontSize:"13px", color:"#6F7181", letterSpacing:"0.04em" }}>
            A Message from the {message.role}
          </span>
        </div>

        {/* Main card */}
        <div style={{ borderRadius:"32px", border:"1px solid #E5E6EB", backgroundColor:"rgba(255,255,255,0.85)", padding:"64px", backdropFilter:"blur(8px)" }}>
          <div className="md-grid" style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:"64px", alignItems:"start" }}>

            {/* LEFT: photo + name card */}
            <motion.div
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
              className="md-left"
              style={{ width:"400px" }}
            >
              <div style={{ display:"flex", gap:"0" }}>
                <div style={{ width:"4px", borderRadius:"4px", backgroundColor:"#FFD900", flexShrink:0, alignSelf:"stretch" }} />
                <div style={{ flex:1 }}>
                  <div style={{ borderRadius:"0 20px 0 0", overflow:"hidden" }}>
                    <img
                      src={message.image || "/images/home/holness.jpg"}
                      alt={message.name}
                      style={{ width:"100%", height:"580px", objectFit:"cover", objectPosition:"top", display:"block" }}
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
            </motion.div>

            {/* RIGHT: content */}
            <motion.div
              initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1 }}
            >
              <h1 className="md-heading"
                style={{ ...inter, fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, color:"#040617", lineHeight:"1.05", letterSpacing:"-2px", margin:"0 0 36px" }}>
                Message from<br />
                <span style={{ color:"#040617" }}>the Foundation</span>
              </h1>

              <div style={{ position:"relative", marginBottom:"36px" }}>
                <span style={{ position:"absolute", top:"-12px", left:"-8px", fontSize:"80px", color:"#E5E6EB", fontFamily:"Georgia, serif", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>
                  "
                </span>
                <blockquote className="md-quote"
                  style={{ ...inter, fontSize:"clamp(1.2rem,2vw,1.5rem)", fontWeight:500, color:"#040617", lineHeight:"1.7", fontStyle:"italic", margin:0, paddingLeft:"16px" }}>
                  {message.intro}"
                </blockquote>
              </div>

              <div style={{ height:"1px", backgroundColor:"#E5E6EB", margin:"32px 0" }} />

              <div style={{ display:"flex", flexDirection:"column", gap:"20px", marginBottom:"40px" }}>
                {previewBody.map((para, i) => (
                  <p key={i} style={{ ...inter, fontSize:"17px", color:"#6F7181", lineHeight:"1.8", margin:0 }}>
                    {para}
                  </p>
                ))}
                {message.body.length > 2 && (
                  <p style={{ ...inter, fontSize:"14px", color:"#9CA3AF", margin:0, fontStyle:"italic" }}>
                    Continue reading for the full message...
                  </p>
                )}
              </div>

              <div style={{ height:"1px", backgroundColor:"#E5E6EB", marginBottom:"32px" }} />

              <div style={{ display:"flex", alignItems:"center", gap:"32px", flexWrap:"wrap" }}>
                <div>
                  <p style={{ ...inter, fontSize:"11px", fontWeight:600, color:"#9CA3AF", letterSpacing:"0.18em", textTransform:"uppercase", margin:"0 0 8px" }}>
                    Official Signature
                  </p>
                  <p style={{ fontSize:"36px", color:"#040617", margin:0, fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", letterSpacing:"-0.5px" }}>
                    {signature}
                  </p>
                </div>
                <button onClick={() => setPanelOpen(true)} className="md-read-btn">
                  Read Full Message
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          </div>
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

      {/* SLIDE-UP PANEL */}
      <AnimatePresence>
        {panelOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              onClick={() => setPanelOpen(false)}
              style={{ position:"fixed", inset:0, backgroundColor:"rgba(4,6,23,0.6)", zIndex:9998, backdropFilter:"blur(4px)", cursor:"pointer" }}
            />

            <motion.div
              key="panel"
              initial={{ y:"100%" }} animate={{ y:0 }} exit={{ y:"100%" }}
              transition={{ type:"spring", damping:28, stiffness:260 }}
              style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:9999, backgroundColor:"#040617", borderRadius:"28px 28px 0 0", height:"90vh", display:"flex", flexDirection:"column", boxShadow:"0 -32px 80px rgba(0,0,0,0.5)" }}
            >
              {/* Close button */}
              <button
                onClick={() => setPanelOpen(false)}
                style={{ position:"absolute", top:"20px", right:"24px", zIndex:10, width:"40px", height:"40px", borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"rgba(255,255,255,0.8)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
              >
                <CloseIcon size={17} />
              </button>

              {/* Scrollable content */}
              <div style={{ flex:1, overflowY:"auto", padding:"44px 6% 60px" }}>
                <div style={{ maxWidth:"1200px", margin:"0 auto" }}>

                  {/* Full-width header */}
                  <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
                    <div style={{ width:"28px", height:"2px", backgroundColor:"#FFD900" }} />
                    <span style={{ ...inter, fontSize:"11px", fontWeight:700, color:"#FFD900", letterSpacing:"0.2em", textTransform:"uppercase" }}>
                      Full Message
                    </span>
                  </div>
                  <h2 style={{ ...inter, fontSize:"clamp(2rem,4vw,3.5rem)", fontWeight:800, color:"white", letterSpacing:"-2px", lineHeight:"1.0", margin:"0 0 20px" }}>
                    {message.name}
                  </h2>
                  <div style={{ height:"1px", backgroundColor:"rgba(255,255,255,0.1)", marginBottom:"32px" }} />

                  {/* Image floated left - quote + 2 paragraphs beside it */}
                  <div style={{ float:"left", width:"400px", marginRight:"48px", marginBottom:"16px" }}>
                    <div style={{ borderRadius:"16px", overflow:"hidden", position:"relative" }}>
                      <img
                        src={message.image || "/images/home/holness.jpg"}
                        alt={message.name}
                        style={{ width:"100%", height:"500px", objectFit:"cover", objectPosition:"top", display:"block" }}
                      />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(4,6,23,0.85) 0%, rgba(4,6,23,0) 55%)" }} />
                      <div style={{ position:"absolute", bottom:"20px", left:"20px", right:"20px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px" }}>
                          <div style={{ width:"14px", height:"2px", backgroundColor:"#FFD900" }} />
                          <span style={{ ...inter, fontSize:"10px", fontWeight:700, color:"#FFD900", letterSpacing:"0.16em", textTransform:"uppercase" }}>
                            {message.role}
                          </span>
                        </div>
                        <p style={{ ...inter, fontSize:"20px", fontWeight:700, color:"white", lineHeight:1.2, margin:0 }}>
                          {message.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quote + first 2 paragraphs beside the image */}
                  <blockquote style={{ ...inter, fontSize:"20px", fontWeight:500, color:"rgba(255,255,255,0.85)", lineHeight:"1.75", fontStyle:"italic", margin:"0 0 24px", paddingLeft:"20px", borderLeft:"3px solid #FFD900" }}>
                    "{message.intro}"
                  </blockquote>

                  {panelSide.map((para, i) => (
                    <p key={i} style={{ ...inter, fontSize:"17px", color:"rgba(255,255,255,0.65)", lineHeight:"1.85", margin:"0 0 18px" }}>
                      {para}
                    </p>
                  ))}

                  {/* Clear float - editorial large text below */}
                  <div style={{ clear:"both" }} />

                  {panelBelow.length > 0 && (
                    <div style={{ marginTop:"12px" }}>
                      {panelBelow.map((para, i) => (
                        <p key={i} className="panel-editorial">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Signature */}
                  <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"28px", marginTop:"16px", display:"flex", alignItems:"center", gap:"24px", flexWrap:"wrap" }}>
                    <div>
                      <p style={{ ...inter, fontSize:"11px", color:"rgba(255,255,255,0.3)", letterSpacing:"0.14em", textTransform:"uppercase", margin:"0 0 6px" }}>
                        Official Signature
                      </p>
                      <p style={{ fontSize:"32px", color:"#FFD900", margin:0, fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic" }}>
                        {signature}
                      </p>
                    </div>
                    <button onClick={() => setPanelOpen(false)}
                      style={{ ...inter, display:"inline-flex", alignItems:"center", gap:"8px", backgroundColor:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"rgba(255,255,255,0.6)", fontSize:"14px", fontWeight:600, padding:"12px 24px", borderRadius:"12px", cursor:"pointer" }}>
                      Close
                    </button>
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