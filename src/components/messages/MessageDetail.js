"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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

export default function MessageDetail({ slug }) {
  const [message,     setMessage]     = useState(null);
  const [allMessages, setAllMessages] = useState([]);
  const [loading,     setLoading]     = useState(true);

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
            // Different photo for the Read Full Message panel (falls back to profile photo)
            panelImage: urlFor(messageData.fullMessagePhoto || messageData.photo).width(900).url(),
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
    <section style={{ backgroundColor:"#040617", minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ ...inter, fontSize:"20px", color:"rgba(255,255,255,0.6)" }}>Loading message...</p>
    </section>
  );

  if (!message) return (
    <section style={{ backgroundColor:"#040617", minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ ...inter, fontSize:"20px", color:"rgba(255,255,255,0.6)" }}>Message not found</p>
    </section>
  );

  const currentIndex = allMessages.findIndex(m => m.slug === message.slug);
  const prevMessage  = currentIndex > 0 ? allMessages[currentIndex - 1] : null;
  const nextMessage  = currentIndex < allMessages.length - 1 ? allMessages[currentIndex + 1] : null;
  const isChairman   = (message.role || "").toLowerCase().includes("chairman");
  const title        = isChairman ? "Chairman Message" : "Message from the Foundation";

  return (
    <main style={{ backgroundColor:"#040617", position:"relative", overflow:"hidden" }}>
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
          background: rgba(255,255,255,0.08); color: #fff;
          display: flex; align-items: center; justify-content: center;
          text-decoration: none; transition: background 0.2s, color 0.2s;
          flex-shrink: 0;
        }
        .md-nav-arrow:hover { background: #FFD900; color: #040617; }

        .md-read-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background: #FFD900; color: #040617;
          font-size: 15px; font-weight: 700;
          padding: 16px 32px; border-radius: 12px;
          border: none; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: background 0.2s, transform 0.15s;
        }
        .md-read-btn:hover { background: #ffe24d; transform: scale(1.02); }
        .panel-editorial {
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
          font-weight: 400; color: rgba(255,255,255,0.7);
          line-height: 1.85; margin: 0 0 22px;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="md-section">

        {/* Back link */}
        <Link href="/messages" style={{ ...inter, display:"inline-flex", alignItems:"center", gap:"8px", fontSize:"14px", color:"rgba(255,255,255,0.5)", textDecoration:"none", marginBottom:"40px" }}>
          <ArrowLeft size={16} />
          All Messages
        </Link>

        {/* Main message section — dark navy, matching the slide-up panel */}
        <div>

          {/* Title */}
          <motion.h1
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
            className="md-heading"
            style={{ ...inter, fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, color:"#FFFFFF", lineHeight:"1.05", letterSpacing:"-2px", margin:"0 0 44px" }}>
            {title}
          </motion.h1>

          {/* Full message — image floated left, text wraps around and flows to the end */}
          <motion.div
            initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.1 }}
          >
            <div className="md-left" style={{ float:"left", width:"400px", marginRight:"48px", marginBottom:"28px" }}>
              <div style={{ display:"flex", gap:"0" }}>
                <div style={{ width:"4px", borderRadius:"4px", backgroundColor:"#FFD900", flexShrink:0, alignSelf:"stretch" }} />
                <div style={{ flex:1 }}>
                  <div style={{ borderRadius:"0 20px 0 0", overflow:"hidden" }}>
                    <img src={message.panelImage || message.image || "/images/home/holness.jpg"} alt={message.name}
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
              <p key={i} style={{ ...inter, fontSize:"19px", color:"rgba(255,255,255,0.72)", lineHeight:"1.7", margin:"0 0 20px" }}>
                {para}
              </p>
            ))}

            <div style={{ clear:"both" }} />
          </motion.div>
        </div>

        {/* Prev / Next */}
        <div style={{ marginTop:"60px", paddingTop:"32px", borderTop:"1px solid rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"16px" }}>
          <div>
            {prevMessage ? (
              <Link href={`/messagesdetail/${prevMessage.slug}`} style={{ display:"inline-flex", alignItems:"center", gap:"14px", textDecoration:"none" }}>
                <span className="md-nav-arrow"><ArrowLeft size={22} /></span>
                <div>
                  <p style={{ ...inter, fontSize:"13px", fontWeight:600, color:"#9CA3AF", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:"0.1em" }}>Previous</p>
                  <p style={{ ...inter, fontSize:"16px", fontWeight:600, color:"#FFFFFF", margin:0 }}>{prevMessage.name}</p>
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
                  <p style={{ ...inter, fontSize:"16px", fontWeight:600, color:"#FFFFFF", margin:0 }}>{nextMessage.name}</p>
                </div>
                <span className="md-nav-arrow"><ArrowRight size={22} /></span>
              </Link>
            ) : (
              <p style={{ ...inter, fontSize:"15px", color:"#9CA3AF" }}>Last message</p>
            )}
          </div>
        </div>
      </div>


    </main>
  );
}