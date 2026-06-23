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

function getSignature(name) {
  const parts = name.replace(/^(Mr\.|Dr\.|Mrs\.|Ms\.)\s*/i, "").split(" ");
  const first  = parts[0]?.[0] || "";
  const last   = parts[parts.length - 1]?.replace(/,|CD\.|J\.P\./gi, "") || "";
  return `${first}. ${last}`;
}

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

            {/* Full message body — flows around and below the image */}
            {message.body.map((para, i) => (
              <p key={i} style={{ ...inter, fontSize:"19px", color:"#414651", lineHeight:"1.9", margin:"0 0 24px" }}>
                {para}
              </p>
            ))}

            <div style={{ clear:"both" }} />

            {/* Signature */}
            <div style={{ borderTop:"1px solid #E5E6EB", paddingTop:"32px", marginTop:"20px" }}>
              <p style={{ ...inter, fontSize:"11px", fontWeight:600, color:"#9CA3AF", letterSpacing:"0.18em", textTransform:"uppercase", margin:"0 0 8px" }}>
                Official Signature
              </p>
              <p style={{ fontSize:"36px", color:"#040617", margin:0, fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", letterSpacing:"-0.5px" }}>
                {signature}
              </p>
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

    </main>
  );
}